import{a as R,S as w,i as T}from"./assets/vendor-c493984e.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const g of r.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&a(g)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const b="44174782-27b27c44e5570cc8c29375d58",_=(t,o,n)=>R.get(`https://pixabay.com/api/?key=${b}&q=${t}
&image_type=photo&orientation=horizontal&safesearch=true
&page=${o}&per_page=${n}`),y={getImages:_},d=(t,o)=>{const n=document.createElement("div"),a=document.createElement("span"),e=document.createElement("span");return n.className="imgInfoItem",a.className="item",e.className="item",a.className="itemTitle",e.className="itemValue",a.innerHTML=o,e.innerHTML=t[o],n.appendChild(a),n.appendChild(e),n},A=t=>{const o=document.createElement("a"),n=document.createElement("div"),a=document.createElement("img"),e=document.createElement("div");return o.className="gallery-link",o.href=t.largeImageURL,o.append(a),n.className="imgCard gallery-item",a.className="gallery-image imgBox",a.alt=t.tags,a.src=t.webformatURL,e.className="imgInfo",o.appendChild(a),n.append(o),n.appendChild(e),e.appendChild(d(t,"likes")),e.appendChild(d(t,"views")),e.appendChild(d(t,"comments")),e.appendChild(d(t,"downloads")),n},E={createImgCard:A};let l=1;const h=20,m="error",M="info",S="Something went wrong, please try again later!",P="Search text cant be empty!",v=`Sorry, there are no images matching your search
query. Please try again!`,B=`We're sorry, but you've reached the end of
search results.`,O=document.querySelector(".searchForm"),I=document.querySelector(".loaderBox"),f=document.querySelector(".container"),q=document.querySelector(".inputSearch"),C=document.querySelector(".loadMoreBox"),H=document.querySelector(".loadMore");let p="";const s=[],c=(t,o)=>{T[o]({position:"topRight",message:t})},L=()=>I.style.display="flex",i=()=>I.style.display="none",x=()=>C.style.display="flex",F=()=>C.style.display="none",$=()=>f.innerHTML="",N=t=>Math.round(t/h)!==l,u=new w(".gallery a",{captionsData:"alt",captionDelay:250,captionPosition:"bottom"}),D=()=>{const t=document.querySelector(".imgCard");t&&window.scrollBy(0,t.getBoundingClientRect().height*2)};O.addEventListener("submit",async t=>{if(t.preventDefault(),p=q.value,l=1,s.length=0,p==="")return c(P,m);$(),L();try{const o=await y.getImages(p,l,h);if(o.data){const{hits:n,totalHits:a}=o.data;if(n.length===0)return i(),c(v,m);s.push(...n.map(e=>E.createImgCard(e))),i(),f.append(...s),N(a)&&x()}}catch(o){console.log(o),i(),c(S,m)}u.refresh(),u.next()});H.addEventListener("click",async()=>{try{L(),l+=1;const t=await y.getImages(p,l,h);if(t.data){const{hits:o,totalHits:n}=t.data;s.push(...o.map(a=>E.createImgCard(a))),i(),f.append(...s),D(),N(n)?x():(F(),c(B,M))}}catch(t){console.log(t),i(),c(S,m)}u.refresh(),u.next()});
//# sourceMappingURL=commonHelpers.js.map
