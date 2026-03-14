const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '20mb' })); // large enough for base64 images

// ── Anthropic client ─────────────────────────────────────────────────────────
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── Classification rules (CPCB / SWM Rules 2016) ─────────────────────────────
const RULES = `
STRICT CLASSIFICATION RULES (CPCB / SWM Rules 2016):

TYPE "Organic" → Green bin:
  food waste (cooked/raw/meat/fish/dairy), fruit & veg peels, seeds, cores,
  garden waste (leaves/grass/flowers/branches), tea bags, coffee grounds,
  eggshells, food-soiled paper/cardboard, coconut shells, agarbatti ash.
  NOT: dry clean paper, plastic food packaging.

TYPE "Recyclable" → Blue bin:
  PET/HDPE plastic bottles & containers (dry/clean), dry paper (newspaper/books/
  cardboard/office paper/magazines), glass bottles & jars (rinsed), aluminium cans,
  tin cans, steel utensils, clean aluminium foil, tetra packs & milk cartons (rinsed).
  NOT: soiled/wet paper, food-contaminated plastic, broken sharp glass, circuits/batteries.

TYPE "Hazardous" → Red bin:
  ALL batteries (AA/AAA/C/D/9V/button/car/Li-ion/power bank cells),
  paints/varnishes/thinners/turpentine, pesticides/insecticides/rat poison,
  chemical cleaners (toilet cleaner/drain opener/bleach concentrate),
  CFL bulbs & fluorescent tubes (mercury), motor/engine oil, aerosol cans,
  nail polish & remover, ink cartridges, thermometers (mercury).
  CRITICAL: ONE battery = Hazardous. Never Recyclable or E-Waste.

TYPE "E-Waste" → Purple bin / e-waste drop:
  ALL electronic devices (phones/laptops/tablets/desktops/monitors/TVs/DVD),
  peripherals (keyboard/mouse/printer/scanner/webcam),
  ALL cables & chargers (USB/HDMI/phone charger/power adapter),
  circuit boards/PCBs/chips, remote controls, set-top boxes,
  large appliances (fridge/washing machine/AC),
  small appliances (mixer/grinder/kettle/iron/hair dryer/fan/electric toothbrush).
  CRITICAL: broken phone = E-Waste NOT Recyclable.

TYPE "Dry/Inert" → Grey bin:
  Thermocol/Styrofoam, broken ceramics/crockery/tiles/pottery,
  sanitary waste (used diapers/pads/tampons/cotton swabs — non-medical),
  cigarette butts, soiled plastic (too dirty to clean), rubber (tyres/bands/erasers),
  leather goods/shoes/belts, composite multi-material items, dust, sweep waste,
  thermal paper receipts (BPA coating = not recyclable), mirrors (chemical coating).

TYPE "Medical" → Yellow bin / CBWTF:
  used syringes/needles/lancets, medical gloves, used surgical masks (clinical),
  bandages/gauze/cotton with blood or bodily fluids, IV tubes/catheters,
  expired medicines/pharmaceuticals, medicine vials & blister packs with residue,
  pathological waste, COVID-19 PPE from isolation.

MULTI-ITEM RULE: If multiple distinct waste items present, return SEPARATE object for EACH.
  Never merge two different items into one result.

MULTI-MATERIAL SINGLE ITEM: classify by most hazardous/dominant component.
  soiled pizza box=Organic, clean pizza box=Recyclable, broken tube light=Hazardous,
  phone charger=E-Waste, power bank=Hazardous (Li-ion), mirror=Dry/Inert.
`;

const SCHEMA = `
Return ONLY a valid JSON array (even for a single item). No markdown, no backticks.
Each element must be:
{
  "item": "specific descriptive name of THIS waste item",
  "wasteType": "one of: Organic | Recyclable | Hazardous | E-Waste | Dry/Inert | Medical",
  "subCategory": "specific sub-type e.g. PET Plastic, Li-ion Battery, Food Waste",
  "confidence": <integer 0-100>,
  "weight": "realistic estimate e.g. 150-300g",
  "binColor": "Green | Blue | Red | Purple | Grey | Yellow",
  "disposal": "2-sentence disposal instruction per Indian SWM Rules.",
  "routing": "exact destination: Composting facility | MRF | TSDF | CPCB-certified e-waste dismantler | Sanitary landfill | CBWTF",
  "recyclable": <true|false>,
  "urgency": "Normal | Caution | High",
  "whyThisCategory": "one sentence why this category",
  "doNot": "one critical mistake citizens make with this item",
  "tips": "one actionable citizen tip"
}
`;

// ── Helper: parse AI response to JSON array ───────────────────────────────────
function parseResults(raw) {
  const clean = raw
    .replace(/```json[\s\S]*?```|```[\s\S]*?```/g, s => s.replace(/```json|```/g, ''))
    .trim();
  const match = clean.match(/(\[[\s\S]*\]|\{[\s\S]*\})/);
  if (!match) throw new Error('No JSON found in AI response');
  let parsed = JSON.parse(match[1]);
  if (!Array.isArray(parsed)) parsed = [parsed];
  if (!parsed.length) throw new Error('Empty results from AI');
  return parsed;
}

// ── POST /api/classify ────────────────────────────────────────────────────────
app.post('/api/classify', async (req, res) => {
  const { type, description, imageBase64, mimeType } = req.body;

  if (!type || (type === 'image' && !imageBase64) || (type === 'text' && !description)) {
    return res.status(400).json({ error: 'Missing required fields: type + (description or imageBase64)' });
  }

  try {
    let userContent;

    if (type === 'image') {
      userContent = [
        {
          type: 'image',
          source: { type: 'base64', media_type: mimeType || 'image/jpeg', data: imageBase64 }
        },
        {
          type: 'text',
          text: `STEP 1 — Scan the entire image carefully. List EVERY distinct waste item visible.
STEP 2 — For EACH item independently apply the strict classification rules.
STEP 3 — Return one JSON array element per detected item.
IMPORTANT: If you see 3 items, return 3 objects. Never merge different items.
${SCHEMA}`
        }
      ];
    } else {
      userContent = `The user describes these waste items: "${description}"
Identify every distinct item mentioned. Classify EACH one separately.
Return one array element per item — never merge two items into one.
${SCHEMA}`;
    }

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 3000,
      system: `You are an expert Indian municipal waste segregation AI trained on CPCB / SWM Rules 2016. ${RULES}`,
      messages: [{ role: 'user', content: userContent }]
    });

    const rawText = message.content[0]?.text || '[]';
    const results = parseResults(rawText);

    res.json({ success: true, count: results.length, results });
  } catch (err) {
    console.error('Classification error:', err.message);
    res.status(500).json({ error: err.message || 'Classification failed' });
  }
});

// ── GET /api/health ───────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'EcoScan API',
    timestamp: new Date().toISOString(),
    apiKeySet: !!process.env.ANTHROPIC_API_KEY
  });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🌿 EcoScan Backend running at http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
  console.log(`   Classify endpoint: POST http://localhost:${PORT}/api/classify\n`);
});
