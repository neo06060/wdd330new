import{l as q}from"./loadHeaderFooter-DATsXWpA.js";import{u as h,n as C,g as E,s as S}from"./utils-DCDllkeh.js";import"./main-0nrLRdWW.js";const l=t=>`$${Number(t||0).toFixed(2)}`;function c(){return E("so-cart")||[]}function u(t){S("so-cart",t),h(),window.dispatchEvent(new Event("cart:updated"))}function I(t){const n=t?.FinalPrice??t?.Price??0,r=Number.parseInt(t?.quantity??1,10)||1;return Number(n)*r}function g(t){return t.reduce((n,r)=>n+I(r),0)}function m(){const t=document.querySelector(".product-list"),n=document.querySelector(".cart-empty"),r=document.querySelector(".cart-total .value");if(!t)return;const o=c();if(t.innerHTML="",o.length===0){n&&(n.hidden=!1),r&&(r.textContent=l(0));return}n&&(n.hidden=!0),o.forEach(e=>{const a=document.createElement("li");a.className="cart-card divider",a.dataset.id=e.Id;const p=e?.Colors?.[0]?.ColorName??"N/A",y=Number.parseInt(e?.quantity??1,10)||1,v=e?.FinalPrice??e?.Price??0,b=C(e.Image||e.PrimaryMedium||e.PrimaryLarge||"");a.innerHTML=`
      <a class="cart-card__image">
        <img src="${b}" alt="${e.Name}"
             onerror="this.onerror=null;this.src='data:image/svg+xml;utf8,${encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='320' height='240'><rect width='320' height='240' fill='#eee'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' fill='#888'>No image</text></svg>")}';" />
      </a>
      <a><h2 class="card__name">${e.Name}</h2></a>
      <p class="cart-card__color">${p}</p>
      <p class="cart-card__price">${l(v)}</p>
      <div class="cart-card__controls">
        <label>qty: <input type="number" class="qty" min="1" step="1" value="${y}"></label>
        <button class="remove btn btn-link" type="button">Remove</button>
      </div>
    `,a.querySelector(".qty").addEventListener("change",s=>{const d=Math.max(1,Number.parseInt(s.target.value,10)||1),i=c(),f=i.findIndex(x=>String(x.Id)===String(e.Id));f>-1&&(i[f].quantity=d,u(i),r&&(r.textContent=l(g(i))))}),a.querySelector(".remove").addEventListener("click",()=>{const s=c().filter(d=>String(d.Id)!==String(e.Id));u(s),m()}),t.appendChild(a)}),r&&(r.textContent=l(g(c())))}function N(){u([]),m()}document.addEventListener("DOMContentLoaded",()=>{m(),h();const t=document.querySelector(".checkout-btn");t&&t.addEventListener("click",()=>{if(!c().length){alert("Your cart is empty.");return}const o=location.pathname.replace(/index\.html?$/i,"");location.href=`${o}checkout.html`});const n=document.querySelector("#clearCart");n&&n.addEventListener("click",N)});q();
