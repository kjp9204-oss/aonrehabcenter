"use strict";
(() => {
const tools=[
{id:"akps",name:"앞무릎 통증 기능 설문",abbreviation:"AKPS · Kujala",category:"무릎",region:"knee",description:"앞무릎 통증과 계단, 스쿼트, 달리기 등 활동에서의 기능을 확인합니다.",purpose:"전방 무릎 통증"},
{id:"koos",name:"무릎 손상·관절염 결과 평가",abbreviation:"KOOS",category:"무릎",region:"knee",description:"무릎 증상, 통증, 일상생활, 스포츠·여가와 삶의 질을 폭넓게 기록합니다.",purpose:"무릎 기능과 삶의 질",officialUrl:"https://koos.nu/faq.html",sourceStatus:"공식 이용 안내 확인 · 한국어 원문 대조 전",rightsStatus:"이용허가 확인 필요 · AON 재배포 파일 없음"},
{id:"csi",name:"중추감작 관련 증상 설문",abbreviation:"CSI",category:"통증·자기효능감",region:"pain",description:"중추감작과 관련된 다양한 신체·감각 증상의 정도를 살펴보는 선별도구입니다.",purpose:"중추감작 관련 증상"},
{id:"odi",name:"오스웨스트리 요통 장애 설문",abbreviation:"ODI",category:"허리",region:"spine",description:"허리 통증이 일상생활과 기능에 미치는 영향을 기록합니다.",purpose:"요통 장애"},
{id:"start-back",name:"요통 위험도 선별 도구",abbreviation:"STarT Back",category:"허리",region:"spine",description:"요통 회복에 영향을 줄 수 있는 신체적·심리사회적 요소를 선별합니다.",purpose:"요통 위험도 선별",officialUrl:"https://keele.health/startbacktool/",sourceStatus:"공식 사이트 한국어판 목록 확인 · 문항·버전 대조 전",rightsStatus:"사용·재배포 조건 확인 전 · AON 자체 파일 없음"},
{id:"roland-morris",name:"롤랜드–모리스 요통 기능 설문",abbreviation:"Roland–Morris",category:"허리",region:"spine",description:"허리 통증으로 인한 일상 기능 제한의 변화를 확인합니다.",purpose:"요통 기능 제한",officialUrl:"https://www.rmdq.org/",sourceStatus:"공식 사이트 · 연결 확인 필요",rightsStatus:"사용·재배포 조건 확인 전 · AON 자체 파일 없음"},
{id:"dash",name:"팔·어깨·손 기능 장애 설문",abbreviation:"DASH",category:"팔·어깨·손",region:"upper",description:"팔·어깨·손의 증상과 일상 및 작업 수행의 어려움을 확인합니다.",purpose:"상지 기능",officialUrl:"https://www.dash.iwh.on.ca/user-profile",sourceStatus:"공식 이용 안내 확인 · 한국어 원문 대조 전",rightsStatus:"이용 목적별 라이선스 확인 필요 · AON 자체 파일 없음"},
{id:"hagos",name:"고관절·서혜부 결과 평가",abbreviation:"HAGOS",category:"고관절·서혜부",region:"hip",description:"고관절·서혜부 증상과 활동, 스포츠 참여, 삶의 질을 확인합니다.",purpose:"고관절·서혜부"},
{id:"hit-6",name:"두통 영향 검사",abbreviation:"HIT-6",category:"두통",region:"headache",description:"두통이 일상생활과 사회활동에 미치는 영향을 기록합니다.",purpose:"두통 영향"},
{id:"pseq",name:"통증 자기효능감 설문",abbreviation:"PSEQ",category:"통증·자기효능감",region:"pain",description:"통증이 있어도 활동과 일상을 수행할 수 있다는 자신감을 살펴봅니다.",purpose:"통증 자기효능감",officialUrl:"https://www.tac.vic.gov.au/files-to-move/media/upload/pain_self_efficacy_questionnaire.pdf",sourceStatus:"공식 기관 제공 영어 원본 · 한국어판 대조 전",rightsStatus:"제3자 허가 조건 · AON 복제·재배포 미승인"},
{id:"leaf-q",name:"여성 운동선수 에너지 가용성 설문",abbreviation:"LEAF-Q",category:"선수 건강",region:"athlete",description:"여성 운동선수의 낮은 에너지 가용성과 관련된 위험 신호를 선별합니다.",purpose:"에너지 가용성"},
{id:"ioc-reds-cat2",name:"스포츠 상대적 에너지 결핍 임상평가 도구",abbreviation:"IOC REDs CAT2",category:"선수 건강",region:"athlete",description:"상대적 에너지 결핍 위험을 임상적으로 평가하고 다음 조치를 논의하는 틀입니다.",purpose:"선수 건강 선별"}
];

tools.unshift(
 {id:"ndi",name:"목 통증 기능장애 설문",abbreviation:"NDI",category:"목·편타손상",region:"neck",description:"목 통증이 일상생활과 활동에 미치는 영향을 기록하는 도구입니다.",purpose:"목 통증과 일상 기능",officialUrl:"https://eprovide.mapi-trust.org/instruments/neck-disability-index",sourceStatus:"Mapi 공식 안내에 한국어판이 등록되어 있습니다. 사용할 판본과 문항을 확인해야 합니다.",rightsStatus:"© Howard Vernon. 사용·복제·전자화에 대한 해당 조건을 확인해야 합니다. AON 공개 재배포 및 전자판 허가 미확인."},
 {id:"wdq",name:"편타손상 관련 어려움 설문",abbreviation:"WDQ",category:"목·편타손상",region:"neck",description:"목이 급격히 흔들리는 손상 이후 증상과 생활의 어려움을 살펴보는 도구입니다.",purpose:"편타손상 이후 증상과 생활 영향",officialUrl:"https://www.worksafe.qld.gov.au/__data/assets/pdf_file/0015/20940/whiplash_disability_questionnaire1.pdf",sourceStatus:"WorkSafe Queensland가 제공하는 영어 원문입니다. 한국어 번역 예비연구(2018)가 있으며, 본 페이지는 한국어 설문을 배포하지 않습니다.",rightsStatus:"WorkSafe 원문에 허가받은 재게시 표시가 있습니다. 이것이 AON의 재배포 허가를 뜻하지는 않습니다. 한국어 전자화·공개 배포 허가 미확인.",officialLabel:"공식기관의 영어 원문 PDF 확인 ↗"}
);
Object.assign(tools.find(t=>t.id==="hit-6"),{
 officialUrl:"https://eprovide.mapi-trust.org/instruments/headache-impact-test",
 sourceStatus:"Mapi·IQVIA 공식 안내 기준으로 사용할 한국어판과 표준·단기 판본을 확인해야 합니다.",
 rightsStatus:"© IQVIA. 사용·채점 및 전자화는 라이선스·화면 검토 조건 확인이 필요합니다. AON 공개 재배포·전자화 허가 미확인."
});
const key="aon-outcome-tool-favorites-v1";
const validIds=new Set(tools.map(t=>t.id));
let favorites=new Set(), favoritesOnly=false, dialogTrigger=null;
try{const saved=JSON.parse(localStorage.getItem(key)||"[]");if(Array.isArray(saved))favorites=new Set(saved.filter(id=>typeof id==="string"&&validIds.has(id)));}catch{}
const grid=document.getElementById("tool-grid");
const search=document.getElementById("tool-search");
const filter=document.getElementById("region-filter");
const dialog=document.getElementById("tool-dialog");
function element(tag,cls,text){const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;}
function setText(id,value){document.getElementById(id).textContent=value;}
function openTool(t,trigger){
 dialogTrigger=trigger;
 setText("dialog-category",t.category);
 setText("dialog-title",t.name);
 setText("dialog-abbreviation",t.abbreviation);
 setText("dialog-description",t.description);
 setText("dialog-purpose",t.purpose);
 setText("dialog-source-status",t.sourceStatus||"원본·한국어판·버전 대조 확인 전");
 setText("dialog-rights-status",t.rightsStatus||"사용·재배포 조건 확인 전 · 임의 문항·번역 제공 안 함");
 setText("dialog-availability","공개 재배포와 해당 언어판·전자화 조건 확인 전입니다. 현재 이 사이트에서 설문 문항 파일이나 자동채점 설문을 제공하지 않습니다.");
 const a=document.getElementById("dialog-official-link");
 a.hidden=true;a.removeAttribute("href");
 a.textContent=t.officialLabel||"공식 출처·이용 조건 확인 ↗";
 if(t.officialUrl&&/^https:\/\//.test(t.officialUrl)){a.href=t.officialUrl;a.hidden=false;}
 dialog.showModal();
 document.getElementById("dialog-close").focus();
}
function renderFeatured(){
 const featured=document.getElementById("featured-grid");
 ["ndi","hit-6","wdq"].forEach((id,i)=>{
  const t=tools.find(item=>item.id===id),card=element("article","feature-card"),top=element("div","feature-top");
  top.append(element("span","feature-code",t.abbreviation),element("span","feature-index","0"+(i+1)+" / "+t.category));
  const button=element("button","","목적·사용 조건 확인");
  button.type="button";button.setAttribute("aria-label",t.abbreviation+" 목적·사용 조건 확인");
  const arrow=element("span","","↗");arrow.setAttribute("aria-hidden","true");button.append(arrow);
  button.addEventListener("click",()=>openTool(t,button));
  card.append(top,element("h3","",t.name),element("p","",t.description),button);featured.append(card);
 });
}
function render(){
 const query=search.value.trim().toLocaleLowerCase("ko-KR");
 const selected=tools.filter(t=>(filter.value==="all"||t.region===filter.value)&&(!favoritesOnly||favorites.has(t.id))&&[t.name,t.abbreviation,t.description,t.purpose,t.category].join(" ").toLocaleLowerCase("ko-KR").includes(query));
 grid.replaceChildren();
 for(const t of selected){
  const card=element("article","card"),meta=element("div","card-meta"),fav=element("button","favorite",favorites.has(t.id)?"★":"☆");
  card.dataset.tool=t.id;fav.type="button";
  fav.setAttribute("aria-label",t.abbreviation+" 즐겨찾기 "+(favorites.has(t.id)?"해제":"추가"));
  fav.setAttribute("aria-pressed",String(favorites.has(t.id)));
  fav.addEventListener("click",()=>{
   favorites.has(t.id)?favorites.delete(t.id):favorites.add(t.id);
   try{localStorage.setItem(key,JSON.stringify([...favorites]));}catch{}
   render();
   const next=grid.querySelector('[data-tool="'+t.id+'"] .favorite');
   (next||document.getElementById("favorite-filter")).focus();
  });
  meta.append(element("span","category",t.category),fav);
  const detail=element("button","detail","설명·사용 조건 확인");
  detail.type="button";detail.setAttribute("aria-label",t.abbreviation+" 설명·사용 조건 확인");
  detail.addEventListener("click",()=>openTool(t,detail));
  card.append(meta,element("p","abbreviation",t.abbreviation),element("h3","",t.name),element("p","description",t.description),element("p","purpose",t.purpose),element("p","status",t.officialUrl?"공식 출처 연결 · 파일 배포 전":"원본·한국어판·사용 조건 확인 전"),detail);
  grid.append(card);
 }
 setText("result-count","전체 "+tools.length+"개 중 "+selected.length+"개 도구");
 document.getElementById("empty-state").hidden=selected.length!==0;
}
function resetFilters(){search.value="";filter.value="all";favoritesOnly=false;document.getElementById("favorite-filter").setAttribute("aria-pressed","false");render();}
search.addEventListener("input",render);
filter.addEventListener("change",render);
document.getElementById("favorite-filter").addEventListener("click",event=>{favoritesOnly=!favoritesOnly;event.currentTarget.setAttribute("aria-pressed",String(favoritesOnly));render();});
document.getElementById("reset-filters").addEventListener("click",resetFilters);
document.getElementById("empty-reset").addEventListener("click",()=>{resetFilters();search.focus();});
document.getElementById("dialog-close").addEventListener("click",()=>dialog.close());
dialog.addEventListener("close",()=>{if(dialogTrigger?.isConnected)dialogTrigger.focus();});
document.getElementById("print-guide").addEventListener("click",()=>window.print());
dialog.addEventListener("click",event=>{if(event.target===dialog){const b=dialog.getBoundingClientRect();if(event.clientX<b.left||event.clientX>b.right||event.clientY<b.top||event.clientY>b.bottom)dialog.close();}});
renderFeatured();render();
})();
