// ════════════════════════════════════════
// DATA
// ════════════════════════════════════════
const WARDS=[
  {name:"Indiranagar",    score:91,scans:2847,hotspot:false,wet:45,dry:38,haz:10,san:7,trend:+2},
  {name:"Koramangala",    score:84,scans:3102,hotspot:false,wet:48,dry:35,haz:9, san:8,trend:+1},
  {name:"HSR Layout",     score:88,scans:1876,hotspot:false,wet:42,dry:41,haz:10,san:7,trend:+3},
  {name:"Malleswaram",    score:82,scans:1923,hotspot:false,wet:46,dry:37,haz:10,san:7,trend:-1},
  {name:"Jayanagar",      score:79,scans:2234,hotspot:false,wet:49,dry:33,haz:11,san:7,trend:0},
  {name:"Electronic City",score:76,scans:3891,hotspot:false,wet:50,dry:32,haz:11,san:7,trend:-2},
  {name:"BTM Layout",     score:73,scans:2965,hotspot:true, wet:55,dry:27,haz:11,san:7,trend:-4},
  {name:"Whitefield",     score:67,scans:4210,hotspot:true, wet:52,dry:29,haz:12,san:7,trend:-3},
  {name:"Rajajinagar",    score:61,scans:3450,hotspot:true, wet:58,dry:24,haz:13,san:5,trend:-5},
  {name:"Yelahanka",      score:58,scans:2671,hotspot:true, wet:60,dry:22,haz:12,san:6,trend:-6},
];
const TREND7=[
  {day:"Mon",wet:48,dry:35,haz:11,san:6,scans:3800},{day:"Tue",wet:45,dry:38,haz:10,san:7,scans:4100},
  {day:"Wed",wet:52,dry:31,haz:12,san:5,scans:3600},{day:"Thu",wet:47,dry:36,haz:11,san:6,scans:4400},
  {day:"Fri",wet:50,dry:33,haz:10,san:7,scans:4900},{day:"Sat",wet:55,dry:29,haz:9,san:7,scans:5200},
  {day:"Sun",wet:43,dry:40,haz:11,san:6,scans:3900},
];
const HOURLY=[
  {h:"5am",v:80},{h:"6am",v:190},{h:"7am",v:420},{h:"8am",v:680},{h:"9am",v:590},
  {h:"10am",v:510},{h:"11am",v:460},{h:"12pm",v:390},{h:"1pm",v:330},{h:"2pm",v:370},
  {h:"3pm",v:440},{h:"4pm",v:520},{h:"5pm",v:690},{h:"6pm",v:820},{h:"7pm",v:760},
  {h:"8pm",v:540},{h:"9pm",v:310},{h:"10pm",v:180},
];
const WEEKLY8=[72,74,71,75,76,74,77,76];
const FEED=[
  {item:"500ml Bisleri Bottle",  cat:"Dry Waste",      ward:"Indiranagar",     ok:true},
  {item:"Vegetable Peels",       cat:"Wet Waste",       ward:"Koramangala",     ok:true},
  {item:"Pizza Box (greasy)",    cat:"Dry Waste",       ward:"BTM Layout",      ok:false},
  {item:"AA Battery",            cat:"Hazardous Waste", ward:"Whitefield",      ok:true},
  {item:"Mixed Food Scraps",     cat:"Wet Waste",       ward:"HSR Layout",      ok:true},
  {item:"Soiled Cardboard",      cat:"Dry Waste",       ward:"Yelahanka",       ok:false},
  {item:"Sanitary Pad",          cat:"Sanitary Waste",  ward:"Jayanagar",       ok:true},
  {item:"Plastic Carry Bag",     cat:"Dry Waste",       ward:"Rajajinagar",     ok:false},
  {item:"Tetra Pack",            cat:"Dry Waste",       ward:"Malleswaram",     ok:true},
  {item:"Medicine Strips",       cat:"Hazardous Waste", ward:"Electronic City", ok:true},
];
const ACTIONS=[
  {ward:"Rajajinagar",    action:"Deploy BBMP awareness squad immediately",priority:"Critical"},
  {ward:"Yelahanka",      action:"Schedule dry waste collection audit",     priority:"Critical"},
  {ward:"BTM Layout",     action:"DWCC capacity expansion review",          priority:"High"},
  {ward:"Whitefield",     action:"IT corridor e-waste drive Q1",           priority:"High"},
  {ward:"Jayanagar",      action:"Follow-up on composting unit install",    priority:"Medium"},
  {ward:"Electronic City",action:"Increase pickup frequency Fri & Sat",    priority:"Medium"},
];
const DEMOS={
  pizza:  {item:"Pizza Box (Greasy)",category:"Dry Waste",contaminated:true,confidence:97,weight_kg:.5,weight_label:"500g",volume:"N/A",pieces:1,material:"Cardboard",brand_or_type:"Pizza Box",contamination_reason:"Grease prevents cardboard recycling",advice:"Greasy pizza boxes cannot go in dry waste. Tear off any clean portions for the Blue bin, and place the oily base in the Green Wet Waste bin. BBMP does not accept grease-contaminated cardboard for recycling.",instructions:["Tear off clean non-greasy sections","Place clean parts in Blue Dry Waste bin","Discard oily sections in Green Wet Waste bin","Do not put the full box in dry waste"]},
  battery:{item:"Used AA Alkaline Battery",category:"Hazardous Waste",contaminated:false,confidence:99,weight_kg:.025,weight_label:"25g",volume:"N/A",pieces:1,material:"Alkaline",brand_or_type:"AA Battery",contamination_reason:null,advice:"Batteries contain toxic heavy metals. Never dispose in regular bins. BBMP has designated hazardous waste drop-off points — check bbmp.gov.in for locations near you.",instructions:["Never put in regular bins","Store in a sealed dry container","Locate nearest BBMP hazardous drop-off","Check bbmp.gov.in for drop locations"]},
  plastic:{item:"500ml PET Plastic Bottle",category:"Dry Waste",contaminated:false,confidence:96,weight_kg:.025,weight_label:"25g",volume:"500ml",pieces:1,material:"PET Plastic",brand_or_type:"Water Bottle",contamination_reason:null,advice:"Clean PET plastic is fully recyclable. Rinse it out, remove the cap separately (different plastic grade), crush to save space and place in the Blue Dry Waste bin for BBMP collection.",instructions:["Rinse bottle to remove residue","Remove and separate the cap","Crush bottle flat to save bin space","Place in Blue Dry Waste bin"]},
  food:   {item:"Mixed Food Scraps",category:"Wet Waste",contaminated:false,confidence:99,weight_kg:.4,weight_label:"400g",volume:"~1L",pieces:null,material:"Organic",brand_or_type:null,contamination_reason:null,advice:"Organic food waste is ideal for composting. Drain excess liquid, do not wrap in plastic, and place directly in the Green Wet Waste bin. BBMP collects daily and routes to composting facilities.",instructions:["Drain all excess liquid first","Do NOT wrap in plastic bags","Place directly in Green Wet Waste bin","BBMP collects daily for city compost plants"]},
};
const TYPE_MAP={
  "Wet Waste":      {color:"#29B6F6",bg:"#041420",bin:"🟢 GREEN BIN", binBg:"rgba(76,175,80,.12)", binBorder:"#4CAF5040"},
  "Dry Waste":      {color:"#00E676",bg:"#041808",bin:"🔵 BLUE BIN",  binBg:"rgba(33,150,243,.12)",binBorder:"#2196F340"},
  "Hazardous Waste":{color:"#FFB300",bg:"#180F00",bin:"🔴 RED BIN",   binBg:"rgba(244,67,54,.12)", binBorder:"#F4433640"},
  "Sanitary Waste": {color:"#FF80AB",bg:"#180410",bin:"🟡 YELLOW BIN",binBg:"rgba(255,193,7,.12)", binBorder:"#FFC10740"},
};
const RECENT_SCANS=[
  {item:"Bisleri Bottle",cat:"Dry Waste",     ward:"Indiranagar",    ok:true, ago:"2m ago"},
  {item:"Vegetable Peels",cat:"Wet Waste",    ward:"Koramangala",    ok:true, ago:"5m ago"},
  {item:"Pizza Box",cat:"Dry Waste",          ward:"BTM Layout",     ok:false,ago:"9m ago"},
  {item:"Used Battery",cat:"Hazardous Waste", ward:"Whitefield",     ok:true, ago:"14m ago"},
  {item:"Cardboard Box",cat:"Dry Waste",      ward:"HSR Layout",     ok:true, ago:"18m ago"},
];
const INI=[
  {name:"Dry Waste Collection Centres",count:"186 active",icon:"🏭",color:"#00E676",desc:"Ward-level aggregation hubs sorting paper, plastic, metal, glass"},
  {name:"Decentralised Composting",     count:"1,200+",  icon:"🌿",color:"#29B6F6",desc:"On-site composting for apartments, markets, bulk generators"},
  {name:"Biogas Plants",                count:"8 plants",icon:"⚡",color:"#FFB300",desc:"Kalasipalya, KR Market and 6 other vegetable markets"},
  {name:"Hasiru Dala Integration",      count:"15,000",  icon:"👥",color:"#29B6F6",desc:"Informal waste pickers integrated into formal supply chains"},
  {name:"E-Waste Drives",               count:"Quarterly",icon:"📱",color:"#FFB300",desc:"BBMP × KSPCB joint drives across all assembly constituencies"},
  {name:"BBMP Solid Waste Portal",      count:"Online",  icon:"💻",color:"#00E676",desc:"Register bulk generators, schedule pickup, track compliance"},
];
const RECYCLERS=["E-Parisaraa (KSPCB authorised)","Attero Recycling","Ramky Enviro Engineers","Apollo Pharmacy take-back","Saahas Zero Waste","Antony Waste Handling","Hasiru Dala Innovations"];

// ════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════
const scol=s=>s>=85?"#00E676":s>=70?"#FFB300":"#FF3D3D";
const slbl=s=>s>=85?"✓ Excellent":s>=70?"▲ Fair":"✕ Poor";
const sclss=s=>s>=85?"bg-good":s>=70?"bg-fair":"bg-poor";
const catColor=c=>c.includes('Wet')?'var(--wet)':c.includes('Dry')?'var(--dry)':c.includes('Haz')?'var(--haz)':'var(--san)';

// ════════════════════════════════════════
// VIEW SWITCHING
// ════════════════════════════════════════
function setView(v){
  document.getElementById('vt-citizen').classList.toggle('active',v==='citizen');
  document.getElementById('vt-authority').classList.toggle('active',v==='authority');
  document.getElementById('mobile-app').style.display=v==='citizen'?'flex':'none';
  document.getElementById('desktop-app').style.display=v==='authority'?'block':'none';
  document.getElementById('clock-el').style.display=v==='authority'?'inline':'none';
  if(v==='authority')updateClock();
}

// ════════════════════════════════════════
// MOBILE NAV
// ════════════════════════════════════════
function setMobileTab(tab,btn){
  document.querySelectorAll('.m-nav-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.m-page').forEach(p=>p.classList.remove('active'));
  if(btn)btn.classList.add('active');
  document.getElementById('mp-'+tab).classList.add('active');
}

// ════════════════════════════════════════
// DESKTOP NAV
// ════════════════════════════════════════
function setDeskPage(id,btn){
  document.querySelectorAll('.d-page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
  if(btn)btn.classList.add('active');
  document.getElementById('dp-'+id).classList.add('active');
}

// ════════════════════════════════════════
// CLOCK
// ════════════════════════════════════════
function updateClock(){
  document.getElementById('clock-el').textContent=new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
}
setInterval(updateClock,1000);

// ════════════════════════════════════════
// CAMERA
// ════════════════════════════════════════
let camStream=null, camFacing='environment';
let scanCtx=null; // 'mobile' or 'desktop'

function camOpen(){
  const ma=document.getElementById('mobile-app');
  scanCtx=(ma.style.display===''||ma.style.display==='flex'||ma.style.display==='block')?'mobile':'desktop';
  if(scanCtx==='mobile'){setScanState('camera');}else{setDeskScanState('camera');}
  startCam(camFacing);
}
async function startCam(facing){
  const errId=scanCtx==='mobile'?'cam-err-box':'cam-err-box2';
  const vidId=scanCtx==='mobile'?'cam-vid':'cam-vid2';
  document.getElementById(errId).style.display='none';
  try{
    if(camStream)camStream.getTracks().forEach(t=>t.stop());
    camStream=await navigator.mediaDevices.getUserMedia({video:{facingMode:facing,width:{ideal:1280},height:{ideal:720}},audio:false});
    const vid=document.getElementById(vidId);vid.srcObject=camStream;vid.play();
  }catch(e){
    const eb=document.getElementById(errId);eb.style.display='block';
    eb.textContent='⚠️ Camera access denied. Allow permission in browser settings, or use the Gallery button.';
  }
}
function camFlip(){camFacing=camFacing==='environment'?'user':'environment';startCam(camFacing);}
function camClose(){if(camStream)camStream.getTracks().forEach(t=>t.stop());camStream=null;if(scanCtx==='mobile')setScanState('idle');else setDeskScanState('idle');}
function camCapture(){
  const ma=document.getElementById('mobile-app');
  scanCtx=(ma.style.display===''||ma.style.display==='flex'||ma.style.display==='block')?'mobile':'desktop';
  const vidId=scanCtx==='mobile'?'cam-vid':'cam-vid2';
  const vid=document.getElementById(vidId);
  const cv=document.getElementById('cam-canvas');
  cv.width=vid.videoWidth||640;cv.height=vid.videoHeight||480;
  cv.getContext('2d').drawImage(vid,0,0);
  const url=cv.toDataURL('image/jpeg',.92);
  if(camStream)camStream.getTracks().forEach(t=>t.stop());camStream=null;
  showPreview(url);
  analyzeAI(url.split(',')[1],'image/jpeg');
}
function galHandle(e){
  const file=e.target.files?.[0];if(!file)return;
  if(camStream)camStream.getTracks().forEach(t=>t.stop());camStream=null;
  const ma=document.getElementById('mobile-app');
  scanCtx=(ma.style.display===''||ma.style.display==='flex'||ma.style.display==='block')?'mobile':'desktop';
  const r=new FileReader();r.onload=ev=>{showPreview(ev.target.result);analyzeAI(ev.target.result.split(',')[1],file.type||'image/jpeg');};r.readAsDataURL(file);
}

// ════════════════════════════════════════
// SCAN STATES
// ════════════════════════════════════════
function setScanState(s){
  ['idle','camera','scanning','result'].forEach(st=>{
    const el=document.getElementById('m-'+st);if(el)el.style.display=st===s?'block':'none';
  });
}
function setDeskScanState(s){
  ['idle','camera','scanning','result'].forEach(st=>{
    const el=document.getElementById('d-'+st);if(el)el.style.display=st===s?'block':'none';
  });
}
function showPreview(url){
  if(scanCtx==='mobile'){
    const prev=document.getElementById('scan-prev');prev.src=url;prev.style.display='block';
    document.getElementById('scan-icon-box').style.display='none';setScanState('scanning');
  }else{
    const prev=document.getElementById('scan-prev2');prev.src=url;prev.style.display='block';
    document.getElementById('scan-icon-box2').style.display='none';setDeskScanState('scanning');
  }
}
function setProg(pct,lbl){
  if(scanCtx==='mobile'){
    document.getElementById('scan-pct').textContent=pct+'%';
    document.getElementById('scan-bar').style.width=pct+'%';
    document.getElementById('scan-lbl').textContent=lbl;
  }else{
    document.getElementById('scan-pct2').textContent=pct+'%';
    document.getElementById('scan-bar2').style.width=pct+'%';
    document.getElementById('scan-lbl2').textContent=lbl;
  }
}

// ════════════════════════════════════════
// AI ANALYSIS
// ════════════════════════════════════════
let scanResult=null,qtyMul=1;
const AI_PROMPT=`You are WasteGPT, BBMP Bengaluru's AI waste classifier. Analyze the image and respond ONLY with a JSON object — no markdown, no extra text. Identify EXACTLY what waste item is shown (be specific, e.g. "500ml Bisleri PET Bottle" not just "bottle"). JSON: {"item":"<n>","category":"<Wet Waste|Dry Waste|Hazardous Waste|Sanitary Waste>","contaminated":<bool>,"confidence":<50-99>,"weight_kg":<num>,"weight_label":"<e.g. 25g>","volume":"<e.g. 500ml or N/A>","pieces":<int or null>,"material":"<e.g. PET Plastic>","brand_or_type":"<or null>","advice":"<2-3 sentence BBMP disposal advice>","instructions":["step1","step2","step3"],"contamination_reason":"<reason or null>"}`;

async function analyzeAI(b64,mime){
  scanCtx=scanCtx||'mobile';
  if(scanCtx==='mobile')setScanState('scanning');else setDeskScanState('scanning');
  setProg(10,'🔍 Sending image to AI…');
  try{
    setProg(30,'🧠 Classifying waste type…');
    const apiKey=(document.getElementById('api-key-input')||{}).value||'';
    if(!apiKey){
      showScanErr('Please enter your Anthropic API key in the key box above.');
      if(scanCtx==='mobile')setScanState('idle');else setDeskScanState('idle');
      return;
    }
    const res=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',headers:{'Content-Type':'application/json','x-api-key':apiKey,'anthropic-version':'2023-06-01','anthropic-dangerous-direct-browser-access':'true'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:1000,messages:[{role:'user',content:[{type:'image',source:{type:'base64',media_type:mime,data:b64}},{type:'text',text:AI_PROMPT}]}]})});
    setProg(70,'⚠️ Checking contamination…');
    const data=await res.json();
    console.log('API response:',JSON.stringify(data).slice(0,500));
    if(data.error){
      showScanErr('API error: '+data.error.message);
      if(scanCtx==='mobile')setScanState('idle');else setDeskScanState('idle');
      return;
    }
    const txt=(data.content||[]).map(b=>b.text||'').join('');
    if(!txt){showScanErr('No response from AI. Please try again.');if(scanCtx==='mobile')setScanState('idle');else setDeskScanState('idle');return;}
    let parsed;
    try{parsed=JSON.parse(txt.replace(/```json|```/g,'').trim());}
    catch(pe){
      const m=txt.match(/\{[\s\S]*\}/);
      if(m)parsed=JSON.parse(m[0]);
      else{showScanErr('Could not parse AI response. Try again.');if(scanCtx==='mobile')setScanState('idle');else setDeskScanState('idle');return;}
    }
    setProg(95,'✅ Generating report…');
    await new Promise(r=>setTimeout(r,400));
    showResult(parsed);
  }catch(e){
    console.error('analyzeAI error:',e);
    showScanErr('Could not analyze image. Check your connection and try again.');
    if(scanCtx==='mobile')setScanState('idle');else setDeskScanState('idle');
  }
}
function showScanErr(msg){
  const id=scanCtx==='mobile'?'m-err-bar':'d-err-bar';
  const el=document.getElementById(id);if(!el)return;el.textContent='⚠️ '+msg;el.style.display='block';setTimeout(()=>el.style.display='none',5000);
}
function runDemo(preset){
  const r=DEMOS[preset];if(!r)return;
  scanCtx=document.getElementById('mobile-app').style.display==='none'?'desktop':'mobile';
  if(scanCtx==='mobile'){document.getElementById('scan-prev').style.display='none';document.getElementById('scan-icon-box').style.display='flex';setScanState('scanning');}
  else{document.getElementById('scan-prev2').style.display='none';document.getElementById('scan-icon-box2').style.display='flex';setDeskScanState('scanning');}
  let p=0;
  const iv=setInterval(()=>{p+=12;setProg(Math.min(p,95),p<35?'🧠 Classifying waste type…':p<65?'⚠️ Checking contamination…':'✅ Generating report…');if(p>=95){clearInterval(iv);showResult(r);}},80);
}

function showResult(r){
  scanResult=r;qtyMul=1;
  const t=TYPE_MAP[r.category]||TYPE_MAP['Dry Waste'];
  const isMobile=scanCtx==='mobile';
  if(isMobile)setScanState('result');else setDeskScanState('result');
  const suf=isMobile?'':'2';

  // banner
  const ban=document.getElementById('r-banner'+suf);ban.style.background=t.bg;ban.style.border=`1px solid ${t.color}22`;
  const det=document.getElementById('r-detected'+suf);det.textContent='Detected Item';det.style.color=t.color;
  const typ=document.getElementById('r-type'+suf);typ.textContent=r.category;typ.style.color=t.color;
  const bp=document.getElementById('r-bin'+suf);bp.textContent=t.bin;bp.style.background=t.binBg;bp.style.border=`1px solid ${t.binBorder}`;bp.style.color=t.color;
  // item row
  document.getElementById('r-item'+suf).textContent=r.item;
  document.getElementById('r-conf'+suf).textContent=(r.confidence||90)+'%';
  document.getElementById('r-dot'+suf).style.background=t.color;
  // contamination
  const cb=document.getElementById('r-contam'+suf);
  cb.innerHTML=r.contaminated?`<span style="font-size:18px">⚠️</span><div><div style="font-size:13px;font-weight:700;color:var(--danger)">Contamination Detected</div><div style="font-size:11px;color:var(--textDim);margin-top:2px">${r.contamination_reason||'Special handling required'}</div></div>`:`<span style="font-size:18px">✅</span><div style="font-size:13px;font-weight:700;color:var(--accent)">Clean — Ready for disposal</div>`;
  cb.style.background=r.contaminated?'var(--dangerDim)':'rgba(0,230,118,.05)';
  // material
  const mr=document.getElementById('mat-row'+suf);mr.innerHTML='';
  if(r.material)mr.innerHTML+=`<div style="background:var(--panel2);border-radius:8px;padding:5px 10px;display:flex;gap:6px;align-items:center"><span>🧪</span><span style="font-size:12px;font-weight:600">${r.material}</span></div>`;
  if(r.brand_or_type)mr.innerHTML+=`<div style="background:var(--panel2);border-radius:8px;padding:5px 10px;display:flex;gap:6px;align-items:center"><span>🏷️</span><span style="font-size:12px;color:var(--textMid)">${r.brand_or_type}</span></div>`;
  if(!r.material&&!r.brand_or_type)mr.style.display='none';
  // tabs
  const pfx=isMobile?'tab-':'tab2-';
  document.getElementById(pfx+'advice').innerHTML=`<div style="display:flex;gap:8px;margin-bottom:10px"><span>🤖</span><span style="font-size:13px;font-weight:700;color:var(--accent)">WasteGPT Guidance</span></div><p style="font-size:13px;color:var(--textMid);line-height:1.7">${r.advice||''}</p>`;
  document.getElementById(pfx+'steps').innerHTML=(r.instructions||[]).map((s,i)=>`<div class="step-item"><div class="step-num">${i+1}</div><div style="font-size:13px;color:var(--textMid);line-height:1.5">${s}</div></div>`).join('');
  document.getElementById(pfx+'details').innerHTML=[
    r.material?`<div style="display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--border)"><span style="font-size:12px;color:var(--textMid)">Material</span><span style="font-size:13px;font-weight:700;font-family:var(--mono)">${r.material}</span></div>`:'',
    r.brand_or_type?`<div style="display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--border)"><span style="font-size:12px;color:var(--textMid)">Brand/Type</span><span style="font-size:13px;font-weight:700;font-family:var(--mono)">${r.brand_or_type}</span></div>`:'',
    `<div style="display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid var(--border)"><span style="font-size:12px;color:var(--textMid)">Category</span><span style="font-size:13px;font-weight:700;color:${t.color};font-family:var(--mono)">${r.category}</span></div>`,
    `<div style="display:flex;justify-content:space-between;padding:9px 0"><span style="font-size:12px;color:var(--textMid)">Confidence</span><span style="font-size:13px;font-weight:700;color:var(--accent);font-family:var(--mono)">${r.confidence||90}%</span></div>`,
  ].join('');
  updateQty();
}

function updateQty(){
  if(!scanResult)return;const r=scanResult;const isMobile=scanCtx==='mobile';const suf=isMobile?'':'2';
  const w=(r.weight_kg||.1)*qtyMul;
  const wStr=w>=1?w.toFixed(1)+'kg':Math.round(w*1000)+'g';
  document.getElementById('q-wt'+suf).textContent=wStr;
  document.getElementById('q-vol'+suf).textContent=r.volume&&r.volume!=='N/A'?r.volume:'—';
  document.getElementById('q-cnt'+suf).textContent=r.pieces?r.pieces*qtyMul:qtyMul;
  document.getElementById('q-mul'+suf).textContent=isMobile?qtyMul:'×'+qtyMul;
  const co2=((r.weight_kg||.1)*qtyMul*2.3).toFixed(2);
  const co2el=document.getElementById(isMobile?'co2-txt':'co2-row2');
  if(co2el)co2el.innerHTML=`🌱 Correctly segregating <strong style="color:var(--accent)">${wStr}</strong> saves approx. <strong style="color:var(--accent)">${co2} kg CO₂</strong> from landfill`;
}
function changeQty(d){qtyMul=Math.max(1,Math.min(50,qtyMul+d));updateQty();}

function switchTab(id,btn){
  const par=btn.closest('.res-panel');
  par.querySelectorAll('.res-tab').forEach(t=>t.classList.remove('active'));
  par.querySelectorAll('.tab-body').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');document.getElementById('tab-'+id).classList.add('active');
}
function switchTab2(id,btn){
  const par=btn.closest('.res-panel');
  par.querySelectorAll('.res-tab').forEach(t=>t.classList.remove('active'));
  par.querySelectorAll('.tab-body').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');document.getElementById('tab2-'+id).classList.add('active');
}

function scanReset(){
  scanResult=null;qtyMul=1;
  ['scan-prev','scan-prev2'].forEach(id=>{const el=document.getElementById(id);if(el){el.src='';el.style.display='none';}});
  ['scan-icon-box','scan-icon-box2'].forEach(id=>{const el=document.getElementById(id);if(el)el.style.display='flex';});
  if(scanCtx==='mobile')setScanState('idle');else setDeskScanState('idle');
}

// ════════════════════════════════════════
// RECENT SCANS
// ════════════════════════════════════════
function buildRecentList(elId){
  const el=document.getElementById(elId);if(!el)return;
  RECENT_SCANS.forEach((s,i)=>{
    const cc=catColor(s.cat);
    el.innerHTML+=`<div style="display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:${i<RECENT_SCANS.length-1?'1px solid var(--border)':'none'}">
      <div style="width:7px;height:7px;border-radius:50%;background:${s.ok?'var(--accent)':'var(--danger)'};flex-shrink:0"></div>
      <div style="flex:1"><div style="font-size:13px;font-weight:600">${s.item}</div><div style="font-size:11px;color:var(--textDim);margin-top:1px">${s.ward} · ${s.ago}</div></div>
      <span style="font-size:11px;font-weight:700;color:${cc}">${s.cat}</span>
    </div>`;
  });
}
buildRecentList('m-recent-list');
buildRecentList('d-recent-list');

// ════════════════════════════════════════
// MY WARD
// ════════════════════════════════════════
const wardSelEl=document.getElementById('ward-sel');
WARDS.forEach(w=>{wardSelEl.innerHTML+=`<option value="${w.name}">${w.name}</option>`;});
function renderMyWard(name){
  if(!name){document.getElementById('ward-body').style.display='none';return;}
  const w=WARDS.find(x=>x.name===name);if(!w)return;
  document.getElementById('ward-body').style.display='block';
  const col=scol(w.score);const circ=2*Math.PI*40;
  const arc=document.getElementById('ring-arc');arc.style.stroke=col;arc.setAttribute('stroke-dasharray',`${(w.score/100)*circ} ${circ}`);
  document.getElementById('ring-lbl').textContent=w.score+'%';document.getElementById('ring-lbl').style.color=col;
  document.getElementById('ward-nm').textContent=w.name;
  document.getElementById('hotspot-tag').style.display=w.hotspot?'flex':'none';
  document.getElementById('sw-scans').textContent=w.scans.toLocaleString();
  document.getElementById('sw-wet').textContent=w.wet+'%';document.getElementById('sw-dry').textContent=w.dry+'%';document.getElementById('sw-haz').textContent=w.haz+'%';
  const tips=[
    "Segregate wet & dry waste before disposal every morning",
    w.haz>11?"⚠️ High hazardous waste detected — strictly use the BBMP red bin":"Keep hazardous waste strictly separate from other streams",
    "Rinse all dry waste items before placing in the blue bin",
    w.score<75?"🚨 Ward score is low — community awareness drive needed":"Maintain consistent daily segregation habits for a better score"
  ];
  document.getElementById('ward-tips').innerHTML=tips.map((t,i)=>`<div style="display:flex;gap:10px;padding:12px 16px;border-bottom:${i<tips.length-1?'1px solid var(--border)':'none'};align-items:flex-start"><div style="width:20px;height:20px;border-radius:50%;background:var(--accentGlow);border:1px solid rgba(0,230,118,.2);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:var(--accent);flex-shrink:0;font-family:var(--mono)">${i+1}</div><div style="font-size:13px;color:var(--textMid);line-height:1.5">${t}</div></div>`).join('');
}

// ════════════════════════════════════════
// RECYCLE / INI
// ════════════════════════════════════════
function buildIniList(elId,compact){
  const el=document.getElementById(elId);if(!el)return;
  INI.forEach(ini=>{
    el.innerHTML+=`<div style="background:var(--panel2);border:1px solid var(--border);border-radius:12px;padding:${compact?'12px':'14px 16px'};display:flex;gap:12px;align-items:flex-start;margin-bottom:9px">
      <div style="width:40px;height:40px;border-radius:11px;background:${ini.color}18;border:1px solid ${ini.color}28;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">${ini.icon}</div>
      <div style="flex:1"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3px"><div style="font-size:13px;font-weight:700">${ini.name}</div><span style="font-size:10px;font-weight:700;color:${ini.color};font-family:var(--mono);background:${ini.color}18;padding:2px 8px;border-radius:10px">${ini.count}</span></div><div style="font-size:11px;color:var(--textMid);line-height:1.5">${ini.desc}</div></div>
    </div>`;
  });
}
function buildRecyclerList(elId){
  const el=document.getElementById(elId);if(!el)return;
  RECYCLERS.forEach((r,i)=>{
    el.innerHTML+=`<div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:${i<RECYCLERS.length-1?'1px solid var(--border)':'none'}"><span style="color:var(--accent)">♻️</span><span style="font-size:13px;color:var(--textMid)">${r}</span></div>`;
  });
}
buildIniList('ini-list',true);buildIniList('ini-list2',false);
buildRecyclerList('recycler-list');buildRecyclerList('recycler-list2');

// ════════════════════════════════════════
// SIDEBAR WARD LIST
// ════════════════════════════════════════
const wlEl=document.getElementById('ward-list');
[...WARDS].sort((a,b)=>b.score-a.score).forEach(w=>{
  const d=document.createElement('div');d.className='ward-mini';
  d.id='wm-'+w.name.replace(/\s/g,'');
  d.innerHTML=`<div style="display:flex;align-items:center;justify-content:space-between">${w.hotspot?'<span style="width:6px;height:6px;border-radius:50%;background:var(--danger);display:inline-block;margin-right:4px;box-shadow:0 0 5px var(--danger)"></span>':''}<span style="color:var(--textMid);font-weight:500;font-size:12px;flex:1">${w.name}</span><span style="font-family:var(--mono);font-size:12px;font-weight:700;color:${scol(w.score)}">${w.score}%</span></div>`;
  d.onclick=()=>{setDeskPage('wards',document.getElementById('nav-wards'));selectWard(w.name);};
  wlEl.appendChild(d);
});

// ════════════════════════════════════════
// HOTSPOT GRID
// ════════════════════════════════════════
WARDS.filter(w=>w.hotspot).forEach(w=>{
  document.getElementById('hotspot-grid').innerHTML+=`
    <div style="background:var(--dangerDim);border:1px solid rgba(255,61,61,.28);border-radius:12px;padding:14px 16px">
      <div style="display:flex;align-items:center;gap:7px;margin-bottom:8px"><div class="hot-dot"></div><span style="font-size:13px;font-weight:700">${w.name}</span></div>
      <div style="font-size:22px;font-weight:900;color:var(--danger);font-family:var(--mono);line-height:1;margin-bottom:4px">${w.score}%</div>
      <div style="font-size:11px;color:var(--textMid)">${w.scans.toLocaleString()} scans · Contamination: ${100-w.score}%</div>
      <div style="margin-top:8px;font-size:11px;color:var(--danger);background:rgba(255,61,61,.07);border-radius:6px;padding:6px 8px">High contamination in Dry Waste stream</div>
    </div>`;
});

// ════════════════════════════════════════
// WARD TABLE + DRILLDOWN
// ════════════════════════════════════════
const tbody=document.getElementById('ward-table-body');
[...WARDS].sort((a,b)=>b.score-a.score).forEach((w,i)=>{
  const tr=document.createElement('tr');tr.id='wtr-'+w.name.replace(/\s/g,'');
  tr.innerHTML=`<td style="font-weight:600;display:flex;align-items:center;gap:8px">${w.hotspot?`<span style="width:7px;height:7px;border-radius:50%;background:var(--danger);animation:pulse 1.5s infinite;box-shadow:0 0 5px var(--danger);display:inline-block;flex-shrink:0"></span>`:'<span style="width:7px;display:inline-block"></span>'}${w.name}</td>
    <td style="font-size:15px;font-weight:900;color:${scol(w.score)};font-family:var(--mono)">${w.score}%</td>
    <td style="font-family:var(--mono);color:var(--textMid)">${w.scans.toLocaleString()}</td>
    <td style="color:var(--wet);font-family:var(--mono)">${w.wet}%</td>
    <td style="color:var(--dry);font-family:var(--mono)">${w.dry}%</td>
    <td style="color:var(--haz);font-family:var(--mono)">${w.haz}%</td>
    <td style="font-family:var(--mono);font-weight:700;color:${w.trend>0?'var(--accent)':w.trend<0?'var(--danger)':'var(--textDim)'}">${w.trend>0?`↑${w.trend}%`:w.trend<0?`↓${Math.abs(w.trend)}%`:'—'}</td>
    <td><span class="badge ${sclss(w.score)}" style="color:${scol(w.score)};font-size:11px">${slbl(w.score)}</span></td>`;
  tr.onclick=()=>selectWard(w.name);tbody.appendChild(tr);
});

function selectWard(name){
  document.querySelectorAll('#ward-table-body tr').forEach(r=>r.classList.remove('selected'));
  document.querySelectorAll('.ward-mini').forEach(d=>d.classList.remove('selected'));
  const tr=document.getElementById('wtr-'+name.replace(/\s/g,''));if(tr)tr.classList.add('selected');
  const mi=document.getElementById('wm-'+name.replace(/\s/g,''));if(mi)mi.classList.add('selected');
  const w=WARDS.find(x=>x.name===name);if(!w)return;
  document.getElementById('ward-drilldown-placeholder').style.display='none';
  document.getElementById('ward-drilldown').style.display='block';
  const col=scol(w.score),circ=2*Math.PI*28;
  document.getElementById('drilldown-card').innerHTML=`
    <div style="display:flex;align-items:center;gap:14px;margin-bottom:18px;padding-bottom:16px;border-bottom:1px solid var(--border)">
      <div style="position:relative;width:68px;height:68px;flex-shrink:0">
        <svg width="68" height="68" style="transform:rotate(-90deg)" viewBox="0 0 68 68">
          <circle cx="34" cy="34" r="28" fill="none" stroke="var(--border)" stroke-width="6"/>
          <circle cx="34" cy="34" r="28" fill="none" stroke="${col}" stroke-width="6" stroke-linecap="round" stroke-dasharray="${(w.score/100)*circ} ${circ}"/>
        </svg>
        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:900;color:${col};font-family:var(--mono)">${w.score}%</div>
      </div>
      <div><div style="font-size:16px;font-weight:800">${w.name}</div><div style="font-size:12px;color:var(--textMid);margin-top:2px">${w.scans.toLocaleString()} scans</div>
        ${w.hotspot?'<div style="font-size:11px;color:var(--danger);margin-top:4px">⚠ Active Hotspot</div>':''}
        <span class="badge ${sclss(w.score)}" style="color:${col};margin-top:6px;display:inline-flex;font-size:11px">${slbl(w.score)}</span>
      </div>
    </div>
    <div style="font-size:10px;font-weight:700;color:var(--textMid);font-family:var(--mono);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:12px">Waste Breakdown</div>
    ${[{l:"Wet Waste",v:w.wet,c:"var(--wet)"},{l:"Dry Waste",v:w.dry,c:"var(--dry)"},{l:"Hazardous",v:w.haz,c:"var(--haz)"},{l:"Sanitary",v:w.san,c:"var(--san)"}].map(b=>`
      <div style="margin-bottom:10px"><div style="display:flex;justify-content:space-between;margin-bottom:5px"><span style="font-size:12px;color:var(--textMid)">${b.l}</span><span style="font-size:12px;font-weight:700;color:${b.c};font-family:var(--mono)">${b.v}%</span></div>
      <div class="bar-track"><div class="bar-fill" style="width:${b.v}%;background:${b.c}"></div></div></div>`).join('')}
    <div style="margin-top:16px;background:rgba(0,230,118,.05);border:1px solid rgba(0,230,118,.15);border-radius:10px;padding:12px">
      <div style="font-size:10px;font-weight:700;color:var(--accent);font-family:var(--mono);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:10px">🔮 Tomorrow's Prediction</div>
      ${[{l:"Wet",v:w.wet+3,c:"var(--wet)"},{l:"Dry",v:w.dry-2,c:"var(--dry)"},{l:"Haz",v:w.haz+1,c:"var(--haz)"}].map(p=>`
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:7px">
          <div style="width:28px;font-size:11px;color:var(--textMid)">${p.l}</div>
          <div class="bar-track" style="flex:1"><div class="bar-fill" style="width:${p.v}%;background:${p.c};opacity:.75"></div></div>
          <div style="width:30px;text-align:right;font-size:11px;font-weight:700;color:${p.c};font-family:var(--mono)">${p.v}%</div>
        </div>`).join('')}
      <div style="font-size:10px;color:var(--textDim);margin-top:5px">↑ Weekend market activity expected</div>
    </div>`;
}

// ════════════════════════════════════════
// ANALYTICS
// ════════════════════════════════════════
function makeRankList(elId,wards,color){
  const el=document.getElementById(elId);if(!el)return;
  wards.forEach((w,i)=>{
    el.innerHTML+=`<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:${i<wards.length-1?'1px solid var(--border)':'none'}">
      <div style="width:22px;height:22px;border-radius:7px;background:rgba(0,0,0,.3);border:1px solid ${color}30;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:900;color:${color};font-family:var(--mono);flex-shrink:0">#${i+1}</div>
      <div style="flex:1"><div style="font-size:13px;font-weight:600">${w.name}</div><div class="bar-track" style="margin-top:5px"><div class="bar-fill" style="width:${w.score}%;background:${color}"></div></div></div>
      <div style="font-size:16px;font-weight:900;color:${color};font-family:var(--mono)">${w.score}%</div>
    </div>`;
  });
}
makeRankList('top5-list',[...WARDS].sort((a,b)=>b.score-a.score).slice(0,5),'#00E676');
makeRankList('bot5-list',[...WARDS].sort((a,b)=>a.score-b.score).slice(0,5),'#FF3D3D');

// ════════════════════════════════════════
// ALERTS + ACTIONS
// ════════════════════════════════════════
WARDS.filter(w=>w.hotspot).forEach(w=>{
  document.getElementById('alert-cards').innerHTML+=`
    <div class="alert-card" style="background:var(--dangerDim);border:1px solid rgba(255,61,61,.3)">
      <div class="alert-hdr" style="background:rgba(255,61,61,.05)">
        <div style="display:flex;align-items:center;gap:10px"><div class="hot-dot"></div><span style="font-size:15px;font-weight:800">${w.name}</span></div>
        <span style="font-size:22px;font-weight:900;color:var(--danger);font-family:var(--mono)">${w.score}%</span>
      </div>
      <div class="alert-body">
        <div><div class="a-stat-lbl">Scans</div><div class="a-stat-val" style="color:var(--text)">${w.scans.toLocaleString()}</div></div>
        <div><div class="a-stat-lbl">Wet Waste</div><div class="a-stat-val" style="color:var(--wet)">${w.wet}%</div></div>
        <div><div class="a-stat-lbl">Contamination</div><div class="a-stat-val" style="color:var(--danger)">${100-w.score}%</div></div>
      </div>
      <div class="alert-foot"><span style="color:var(--danger);font-weight:700">Action: </span>Deploy BBMP awareness squad · Conduct DWCC audit · Schedule door-to-door segregation drive</div>
    </div>`;
});
WARDS.filter(w=>w.score>=65&&w.score<80).forEach(w=>{
  document.getElementById('warn-cards').innerHTML+=`<div style="background:var(--warnDim);border:1px solid rgba(255,179,0,.25);border-radius:12px;padding:14px 18px;margin-bottom:10px;display:flex;justify-content:space-between;align-items:center"><div><div style="font-size:14px;font-weight:700">${w.name}</div><div style="font-size:11px;color:var(--textMid);margin-top:3px">${w.scans.toLocaleString()} scans · Trend: <span style="color:${w.trend<0?'var(--danger)':'var(--accent)'}">${w.trend<0?`↓${Math.abs(w.trend)}%`:`↑${w.trend}%`}</span></div></div><div style="font-size:24px;font-weight:900;color:var(--warn);font-family:var(--mono)">${w.score}%</div></div>`;
});
WARDS.filter(w=>w.score>=85).forEach(w=>{
  document.getElementById('good-cards').innerHTML+=`<div style="background:var(--accentGlow);border:1px solid rgba(0,230,118,.18);border-radius:12px;padding:12px 18px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center"><div style="font-size:13px;font-weight:700">${w.name}</div><div style="font-size:18px;font-weight:900;color:var(--accent);font-family:var(--mono)">${w.score}%</div></div>`;
});
const prioColor=p=>p==="Critical"?"#FF3D3D":p==="High"?"#FFB300":"#00A854";
ACTIONS.forEach((a,i,arr)=>{
  document.getElementById('action-list').innerHTML+=`<div style="padding:11px 0;border-bottom:${i<arr.length-1?'1px solid var(--border)':'none'};display:flex;gap:10px;align-items:flex-start"><div style="flex:1"><div style="font-size:12px;font-weight:600;line-height:1.4">${a.action}</div><div style="font-size:11px;color:var(--textDim);margin-top:2px">${a.ward}</div></div><span class="tag" style="background:${prioColor(a.priority)}18;border:1px solid ${prioColor(a.priority)}30;color:${prioColor(a.priority)};flex-shrink:0">${a.priority}</span></div>`;
});

// ════════════════════════════════════════
// LIVE FEED
// ════════════════════════════════════════
let feedTick=0;
function renderLiveFeed(){
  const el=document.getElementById('feed-rows');if(!el)return;
  el.innerHTML='';
  FEED.forEach((f,i)=>{
    const cc=catColor(f.cat);
    el.innerHTML+=`<div class="feed-grid feed-row ${i===feedTick?'hi':''}">
      <div style="font-weight:600">${f.item}</div>
      <div style="color:var(--textMid)">${f.ward}</div>
      <div style="color:${cc};font-size:12px">${f.cat}</div>
      <div style="display:flex;align-items:center;gap:6px"><div style="width:6px;height:6px;border-radius:50%;background:${f.ok?'var(--accent)':'var(--danger)'}"></div><span style="font-size:12px;color:${f.ok?'var(--accent)':'var(--danger)'};font-weight:600">${f.ok?"Clean":"Contaminated"}</span></div>
      <div style="color:var(--textDim);font-family:var(--mono);font-size:11px">${i===0?'now':i<=2?i*15+'s':(i*20)+'s'}</div>
    </div>`;
  });
  feedTick=(feedTick+1)%FEED.length;
}
renderLiveFeed();setInterval(renderLiveFeed,2500);
const cleanN=FEED.filter(f=>f.ok).length;const contamN=FEED.length-cleanN;
document.getElementById('feed-summary').innerHTML=[
  {label:"Clean scans",value:`${cleanN}/${FEED.length}`,color:"var(--accent)"},
  {label:"Contaminated",value:`${contamN}/${FEED.length}`,color:"var(--danger)"},
  {label:"Contamination rate",value:`${Math.round(contamN/FEED.length*100)}%`,color:"var(--warn)"},
  {label:"Most active ward",value:"Whitefield",color:"var(--blue)"},
  {label:"Top waste type",value:"Dry Waste",color:"var(--dry)"},
].map((s,i,a)=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:${i<a.length-1?'1px solid var(--border)':'none'}"><span style="font-size:12px;color:var(--textMid)">${s.label}</span><span style="font-size:13px;font-weight:700;color:${s.color};font-family:var(--mono)">${s.value}</span></div>`).join('');

// ════════════════════════════════════════
// PREDICTIONS
// ════════════════════════════════════════
WARDS.slice(0,5).forEach(w=>{
  const pred=Math.max(0,Math.min(100,w.score+Math.round((Math.random()-.3)*5)));
  const col=scol(pred);
  document.getElementById('pred-grid').innerHTML+=`
    <div class="panel panel-pad" style="border-color:${col}30">
      <div style="font-size:12px;font-weight:700;margin-bottom:9px">${w.name}</div>
      <div style="font-size:26px;font-weight:900;color:${col};font-family:var(--mono);line-height:1;margin-bottom:5px">${pred}%</div>
      <div style="font-size:10px;color:var(--textDim);margin-bottom:9px">Predicted score</div>
      ${[{l:"Wet",v:Math.min(99,w.wet+(Math.round(Math.random()*6-2))),c:"var(--wet)"},{l:"Dry",v:Math.max(1,w.dry+(Math.round(Math.random()*4-2))),c:"var(--dry)"},{l:"Haz",v:Math.max(1,w.haz+(Math.round(Math.random()*2-1))),c:"var(--haz)"}].map(b=>`
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">
          <div style="width:22px;font-size:10px;color:var(--textDim)">${b.l}</div>
          <div class="bar-track" style="flex:1"><div class="bar-fill" style="width:${b.v}%;background:${b.c}"></div></div>
          <div style="font-size:10px;font-weight:700;color:${b.c};font-family:var(--mono);width:24px;text-align:right">${b.v}%</div>
        </div>`).join('')}
    </div>`;
});
WARDS.slice(0,6).forEach((w,i,a)=>{
  const co2=((w.scans*0.00035*2.3)).toFixed(1);
  document.getElementById('co2-list').innerHTML+=`<div style="display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:${i<a.length-1?'1px solid var(--border)':'none'}"><span style="font-size:12px;color:var(--textMid)">${w.name}</span><span style="font-size:13px;font-weight:700;color:var(--accent);font-family:var(--mono)">${co2}T CO₂</span></div>`;
});

// ════════════════════════════════════════
// CHARTS
// ════════════════════════════════════════
Chart.defaults.color='rgba(232,245,236,.7)';Chart.defaults.font.family='DM Mono';
const cOpts={responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{backgroundColor:"#0F1E13",borderColor:"#1F3D26",borderWidth:1,titleColor:"#8EAD96",bodyColor:"#E8F5EC",padding:10,cornerRadius:8}}};
const gOpts={color:"rgba(23,43,28,.9)",drawBorder:false};
const axOpts=(cb)=>({grid:gOpts,border:{display:false},ticks:{color:"#3D5C44",font:{size:10},...(cb?{callback:cb}:{})}});

new Chart('hourlyChart',{type:'line',data:{labels:HOURLY.map(h=>h.h),datasets:[{data:HOURLY.map(h=>h.v),borderColor:'#00E676',borderWidth:2.5,fill:true,backgroundColor:ctx=>{const g=ctx.chart.ctx.createLinearGradient(0,0,0,200);g.addColorStop(0,'rgba(0,230,118,.3)');g.addColorStop(1,'rgba(0,230,118,0)');return g;},tension:.4,pointRadius:3,pointBackgroundColor:'#00E676',pointBorderWidth:0}]},options:{...cOpts,scales:{x:axOpts(),y:{...axOpts(),beginAtZero:true}}}});

new Chart('weeklyBar',{type:'bar',data:{labels:TREND7.map(d=>d.day),datasets:[{label:'Wet',data:TREND7.map(d=>d.wet),backgroundColor:'#29B6F6',stack:'s'},{label:'Dry',data:TREND7.map(d=>d.dry),backgroundColor:'#00E676',stack:'s'},{label:'Haz',data:TREND7.map(d=>d.haz),backgroundColor:'#FFB300',stack:'s'},{label:'San',data:TREND7.map(d=>d.san),backgroundColor:'#FF80AB',stack:'s',borderRadius:{topLeft:4,topRight:4}}]},options:{...cOpts,scales:{x:{...axOpts(),stacked:true},y:{...axOpts(v=>v+'%'),stacked:true}}}});

new Chart('pieChart',{type:'doughnut',data:{labels:['Wet','Dry','Hazardous','Sanitary'],datasets:[{data:[50,33,11,6],backgroundColor:['#29B6F6','#00E676','#FFB300','#FF80AB'],borderWidth:0,hoverOffset:5}]},options:{...cOpts,cutout:'65%',plugins:{...cOpts.plugins,legend:{display:false}}}});

const sw=[...WARDS].sort((a,b)=>b.score-a.score);
new Chart('wardBar',{type:'bar',data:{labels:sw.map(w=>w.name),datasets:[{data:sw.map(w=>w.score),backgroundColor:sw.map(w=>scol(w.score)),borderRadius:4,borderSkipped:'left'}]},options:{...cOpts,indexAxis:'y',scales:{x:{...axOpts(v=>v+'%'),max:100},y:{...axOpts(),ticks:{color:'#8EAD96',font:{size:11}}}}}});

new Chart('trendLine',{type:'line',data:{labels:['W1','W2','W3','W4','W5','W6','W7','W8'],datasets:[{data:WEEKLY8,borderColor:'#00E676',borderWidth:2.5,fill:true,backgroundColor:ctx=>{const g=ctx.chart.ctx.createLinearGradient(0,0,0,220);g.addColorStop(0,'rgba(0,230,118,.15)');g.addColorStop(1,'rgba(0,230,118,0)');return g;},tension:.4,pointRadius:4,pointBackgroundColor:'#00E676',pointBorderWidth:0}]},options:{...cOpts,scales:{x:axOpts(),y:{...axOpts(v=>v+'%'),min:68,max:82}}}});

new Chart('contamChart',{type:'bar',data:{labels:WARDS.map(w=>w.name.split(' ')[0]),datasets:[{data:WARDS.map(w=>100-w.score),backgroundColor:WARDS.map(w=>w.hotspot?'#FF3D3D':'#FFB300'),borderRadius:4}]},options:{...cOpts,scales:{x:axOpts(),y:{...axOpts(v=>v+'%')}}}});

new Chart('scanVolChart',{type:'bar',data:{labels:[...WARDS].sort((a,b)=>b.scans-a.scans).map(w=>w.name.split(' ')[0]),datasets:[{data:[...WARDS].sort((a,b)=>b.scans-a.scans).map(w=>w.scans),backgroundColor:'#29B6F6',borderRadius:4}]},options:{...cOpts,scales:{x:axOpts(),y:axOpts()}}});

const catCts={};FEED.forEach(f=>{catCts[f.cat]=(catCts[f.cat]||0)+1;});
new Chart('feedPie',{type:'doughnut',data:{labels:Object.keys(catCts),datasets:[{data:Object.values(catCts),backgroundColor:Object.keys(catCts).map(c=>catColor(c).replace('var(--wet)','#29B6F6').replace('var(--dry)','#00E676').replace('var(--haz)','#FFB300').replace('var(--san)','#FF80AB')),borderWidth:0,hoverOffset:4}]},options:{...cOpts,cutout:'55%',plugins:{...cOpts.plugins,legend:{display:true,position:'bottom',labels:{color:'#8EAD96',font:{size:10},boxWidth:10,padding:8}}}}});

new Chart('predChart',{type:'line',data:{labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],datasets:WARDS.slice(0,3).map((w,i)=>({label:w.name,data:Array.from({length:7},(_,j)=>Math.max(40,Math.min(100,w.score+Math.round(Math.sin(j+i)*4+(Math.random()*3-1.5))))),borderColor:scol(w.score),borderWidth:2,tension:.4,pointRadius:3,pointBorderWidth:0,fill:false}))},options:{...cOpts,plugins:{...cOpts.plugins,legend:{display:true,position:'bottom',labels:{color:'#8EAD96',font:{size:10},boxWidth:10,padding:8}}},scales:{x:axOpts(),y:{...axOpts(v=>v+'%'),min:50,max:100}}}});

// ════════════════════════════════════════
// INIT
// ════════════════════════════════════════
setScanState('idle');
setDeskScanState('idle');

// Drain any queued calls that happened before script loaded
(window.__q||[]).forEach(function(c){
  var fn=window[c[0]];
  if(typeof fn==='function')fn.apply(null,c[1]);
});
window.__q=[];
