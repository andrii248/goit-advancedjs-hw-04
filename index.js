import{a as R,S as $,i as n}from"./assets/vendor-Dy2ZTtfi.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const M="https://pixabay.com/api/",E="28802663-ddb0f5d28ea31cc45b363b962";let p=1;const g=15;let h=0,f=0;async function m(s,o){const a=new URLSearchParams({key:E,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:g}),e=(await R.get(`${M}?${a.toString()}`)).data;return f=e.totalHits,h=Math.ceil(f/g),e}function y(){p+=1}function N(){p=1}function u(){return p}function b(){return h}let d;function L(s,o){const a=s.map(t=>`<li class="gallery-element">
      <a href="${t.largeImageURL}" class="photo-card">
        <div class="image-wrapper">
          <img
            class="gallery-image"
            src="${t.webformatURL}"
            alt="${t.tags}"
            loading="lazy"
          />
        </div>
        <div class="info">
          <p class="info-item">
            <b>Likes</b> <span class="photo_span">${t.likes} </span>
          </p>
          <p class="info-item">
            <b>Views</b> <span class="photo_span">${t.views}</span>
          </p>
          <p class="info-item">
            <b>Comments</b> <span class="photo_span">${t.comments}</span>
          </p>
          <p class="info-item">
            <b>Downloads</b> <span class="photo_span">${t.downloads}</span>
          </p>
        </div>
      </a>
    </li>
        `).join("");o.insertAdjacentHTML("beforeend",a),d?d.refresh():d=new $(".gallery a",{captionData:"alt",captionDelay:250})}function _(s){s.innerHTML=""}const P=document.querySelector(".loader");function w(){P.classList.remove("is-hidden")}function q(){P.classList.add("is-hidden")}const S=document.querySelector(".load-more-btn");async function B(s,o){if(!s){n.info({title:"No query",message:"Please enter your query",position:"topRight"});return}w();try{const a=u(),t=b(),e=await m(s,a);if(e.hits.length===0){n.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}L(e.hits,o),y();const r=document.querySelector(".gallery-element");if(r){const l=r.getBoundingClientRect().height;window.scrollBy({top:l*2,behavior:"smooth"})}u()>=t&&(n.info({title:"No results",message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),v())}catch(a){n.error({title:"Error",message:`${a.message}`,position:"topRight"})}finally{q()}}function v(){S.classList.add("is-hidden")}function O(){S.classList.remove("is-hidden")}const i={searchForm:document.querySelector(".form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more-btn")};let c="";i.searchForm.addEventListener("submit",async s=>{if(s.preventDefault(),v(),c=s.currentTarget.elements.search.value.trim(),!c){n.info({title:"No query",message:"Please enter your query",position:"topRight"});return}N(),_(i.gallery),w();try{const o=u(),a=await m(c,o);if(a.hits.length===0){n.info({title:"No results",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}L(a.hits,i.gallery);const t=b(),e=u();t>e&&(y(),O())}catch(o){n.error({title:"Error",message:`${o.message}`,position:"topRight"})}finally{q(),i.searchForm.reset()}});i.loadMoreBtn.addEventListener("click",()=>B(c,i.gallery));
//# sourceMappingURL=index.js.map
