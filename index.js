import{a as S,S as v,i as n}from"./assets/vendor-Dy2ZTtfi.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const R="https://pixabay.com/api/",$="28802663-ddb0f5d28ea31cc45b363b962";let g=1;const p=15;let h=0,f=0;async function m(s,r){const a=new URLSearchParams({key:$,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:p}),e=(await S.get(`${R}?${a.toString()}`)).data;return f=e.totalHits,h=Math.ceil(f/p),e}function y(){g+=1}function d(){return g}function M(){return h}let u;function b(s,r){const a=s.map(o=>`<li class="gallery-element">
      <a href="${o.largeImageURL}" class="photo-card">
        <div class="image-wrapper">
          <img
            class="gallery-image"
            src="${o.webformatURL}"
            alt="${o.tags}"
            loading="lazy"
          />
        </div>
        <div class="info">
          <p class="info-item">
            <b>Likes</b> <span class="photo_span">${o.likes} </span>
          </p>
          <p class="info-item">
            <b>Views</b> <span class="photo_span">${o.views}</span>
          </p>
          <p class="info-item">
            <b>Comments</b> <span class="photo_span">${o.comments}</span>
          </p>
          <p class="info-item">
            <b>Downloads</b> <span class="photo_span">${o.downloads}</span>
          </p>
        </div>
      </a>
    </li>
        `).join("");r.insertAdjacentHTML("beforeend",a),u?u.refresh():u=new v(".gallery a",{captionData:"alt",captionDelay:250})}function E(s){s.innerHTML=""}const L=document.querySelector(".loader");function P(){L.classList.remove("is-hidden")}function w(){L.classList.add("is-hidden")}const q=document.querySelector(".load-more-btn");async function N(s,r){if(!s){n.info({title:"No query",message:"Please enter your query",position:"topRight"});return}P();try{const a=d(),o=M(),e=await m(s,a);if(e.hits.length===0){n.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}b(e.hits,r),y();const t=document.querySelector(".gallery-element");if(t){const l=t.getBoundingClientRect().height;window.scrollBy({top:l*2,behavior:"smooth"})}d()>=o&&(n.info({title:"No results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),_())}catch(a){n.error({title:"Error",message:`${a.message}`,position:"topRight"})}finally{w()}}function _(){q.classList.add("is-hidden")}function B(){q.classList.remove("is-hidden")}const i={searchForm:document.querySelector(".form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more-btn")};let c="";i.searchForm.addEventListener("submit",async s=>{if(s.preventDefault(),c=s.currentTarget.elements.search.value.trim(),!c){n.info({title:"No query",message:"Please enter your query",position:"topRight"});return}E(i.gallery),P();try{const r=d(),a=await m(c,r);if(a.hits.length===0){n.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}b(a.hits,i.gallery),y(),B()}catch(r){n.error({title:"Error",message:`${r.message}`,position:"topRight"})}finally{w(),i.searchForm.reset()}});i.loadMoreBtn.addEventListener("click",()=>N(c,i.gallery));
//# sourceMappingURL=index.js.map
