import{l as m}from"./loadHeaderFooter-DATsXWpA.js";import{P as g}from"./ProductData-lcQ-4hqf.js";import{a as d,n as h}from"./utils-DCDllkeh.js";await m();const a=d("category")||"tents",y=new g(a),o=document.querySelector(".product-list"),i=document.querySelector(".category-title");function n(e){return e.replace(/-/g," ").replace(/\b\w/g,t=>t.toUpperCase())}const l="data:image/svg+xml;utf8,"+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='320' height='240' viewBox='0 0 320 240'>
      <rect width='320' height='240' fill='#eee'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
            font-family='Arial,Helvetica,sans-serif' font-size='18' fill='#888'>
        No image
      </text>
    </svg>`),f={"880RR":"marmot-ajax-3.html","985RF":"northface-alpine-3.html","344YJ":"northface-talus-4.html","410JX":"cedar-ridge-rimrock-2.html"};function p(e){const t=e?.PrimaryMedium||e?.PrimaryLarge||e?.Image||"";return h(t)||l}function u(e){const s=`../product_pages/${f[String(e.Id)]??"marmot-ajax-3.html"}?product=${e.Id}`,c=p(e),r=(e.FinalPrice&&e.FinalPrice.toFixed?e.FinalPrice.toFixed(2):e.ListPrice)??"";return`
    <li class="product-card" style="list-style:none;">
      <a href="${s}" class="product-card__image" style="display:block;">
        <img src="${c}" alt="${e.Name}"
             onerror="this.onerror=null;this.src='${l}';"
             style="max-width:100%;height:auto;display:block;">
      </a>
      <h2 class="card__name">${e.Name}</h2>
      <p class="card__price">${r?`$${r}`:""}</p>
    </li>`}async function w(){try{const e=await y.getData();o.innerHTML=e&&e.length?e.map(u).join(""):`<li style="list-style:none;margin:1rem 0;"><em>No products found for "${n(a)}".</em></li>`}catch(e){console.error(e),o.innerHTML='<li style="list-style:none;margin:1rem 0;color:#b00;"><strong>Error:</strong> unable to load products.</li>'}finally{i&&(i.textContent=`Top Products: ${n(a)}`)}}w();
