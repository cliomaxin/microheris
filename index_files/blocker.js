{let e=()=>"10000000-1000-4000-8000-100000000000".replace(/[018]/g,e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16)),t=e=>{let t=document.cookie.match("(^|;)\\s*"+e+"\\s*=\\s*([^;]+)");return t?t.pop():""},i=(e,t,i)=>{var n="";if(i){var o=new Date;o.setTime(o.getTime()+864e5*i),n="; expires="+o.toUTCString()}document.cookie=e+"="+(t||"")+n+"; path=/"},n=()=>{let n=t("_idy_cid");if(n){let o=localStorage.getItem("_idy_cid");o||localStorage.setItem("_idy_cid",n)}return!n&&(n=localStorage.getItem("_idy_cid"))&&i("_idy_cid",n,1825),n||(n=e(),i("_idy_cid",n,1825),localStorage.setItem("_idy_cid",n)),n},o=()=>{let e=document.getElementById("bm-preload-mask");e&&e.parentNode.removeChild(e)},a=async()=>{if(!0==window.bmExtension)return;window.bmExtension=!0;let e=new URLSearchParams(window.location.search).get("idya");if(e){let a=new URLSearchParams(window.location.search).get("shopId"),r=new URLSearchParams(window.location.search).get("silence"),c=new URLSearchParams(window.location.search).get("code");if(!r){let s=window.location.protocol+"//"+window.location.host+window.location.pathname;window.history.replaceState({},document.title,s)}let l=await fetch("https://rbdata.boostymark.com/api/visit/verifyAdminAccess",{method:"POST",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"},body:JSON.stringify({shopId:a,mode:e,code:c})}),d=await l.json();if(!0===d.status){if(i("_idy_admin",e,1825),r||alert(`Admin Access mode ${d.mode?"enabled":"disabled"}.`),"true"===e)return}else r||alert("Enable Admin Access mode failed.")}let p=t("_idy_admin");if("true"===p){o();return}try{let m=new URLSearchParams(window.location.search).get("bgio"),y=new URLSearchParams(document.currentScript.src.split("?")[1]),$=y.get("shop");$.includes("myshopify.com")||($=Shopify&&Shopify.shop);let h=Shopify&&Shopify.checkout,f=window.location.href;if(f.startsWith(`https://${$}/admin`)||-1!==f.indexOf("shopifypreview.com")||(f=window.top&&window.top.location&&window.top.location.href)&&f.startsWith(`https://${$}/admin`)||f&&-1!==f.indexOf("shopifypreview.com"))return;let u={shop:$,cid:n(),url:f,title:document.title,r:document.referrer};h&&!m&&(u.pageData=JSON.stringify(h));let b=await fetch("https://rbdata.boostymark.com/api/visit/note",{method:"POST",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"},body:JSON.stringify(u)}),g=await b.json(),x=document.createElement("div");if(x.style="top: 0px;left: 0px;position: fixed;width: 100%;height: 100%;display: flex;flex-direction: column;align-items: center;justify-content:flex-start;z-index: 2147483647 !important;background-color: white !important;letter-spacing: 0 !important;",x.innerHTML=`<div style="font-weight:500;font-size:2.2rem;margin:100px 20px 0 20px;text-align: center;">${g.bmh??""}</div><div style="margin: 5px 0 0 0;">${g.bmh?'<hr style="border: none; height: 0.1px; background: #747474; width: 400px;margin:0 10px;">':""}</div><div style="font-weight:300;font-size:1rem;margin:10px 20px 0 20px;max-width: 500px;text-align: center;">${g.bmd??""}</div>`,"redirect"==g.status)g.ret||(o(),document.body.appendChild(x)),window.location.replace(g.url);else if("stay"==g.status){o();let w=`<meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${g.bmh}</title>`;document.body&&(document.head.innerHTML=w,document.body.innerHTML="",document.body.appendChild(x)),setInterval(()=>{console.clear(),document.body&&(document.head.innerHTML=w,document.body.innerHTML="",document.body.appendChild(x))},500)}else if("part"==g.status)o(),g.se.forEach(e=>{document.querySelectorAll(e).forEach(e=>e.style.display="block")}),g.he.forEach(e=>{document.querySelectorAll(e).forEach(e=>e.style.display="none")});else if("success"==g.status&&(o(),window._bm_blocked&&!0!=g.hb)){var k=document.createElement("script");k.className="analytics",k.textContent=window._bm_blocked_script,document.head.appendChild(k)}if(g.cp){if(g.cp.m_rc&&(document.body.oncontextmenu=function(){return!1}),g.cp.m_ts){let _=document.createElement("style");_.textContent=`body {
        -webkit-touch-callout: none; 
        -webkit-user-select: none;
        -khtml-user-select: none; 
        -moz-user-select: none; 
        -ms-user-select: none; 
        user-select: none; 
      }`,document.head.appendChild(_)}if(g.cp.m_dd&&(document.body.ondragstart=function(){return!1},document.body.ondrop=function(){return!1}),g.cp.pr_t){let v=document.createElement("style");v.media="print",v.textContent="* { display: none; }",document.head.appendChild(v)}(g.cp.k_all||g.cp.k_copy||g.cp.k_paste||g.cp.k_print||g.cp.k_save)&&(document.body.onkeydown=function(e){if(g.cp.k_all&&"a"==e.key.toLowerCase()&&(e.ctrlKey||e.metaKey)||g.cp.k_copy&&"c"==e.key.toLowerCase()&&(e.ctrlKey||e.metaKey)||g.cp.k_paste&&"v"==e.key.toLowerCase()&&(e.ctrlKey||e.metaKey)||g.cp.k_print&&"p"==e.key.toLowerCase()&&(e.ctrlKey||e.metaKey)||g.cp.k_save&&"s"==e.key.toLowerCase()&&(e.ctrlKey||e.metaKey))return!1})}}catch(C){o()}};a()}