(()=>{
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const nav=$('#mainNav'), menu=$('#menuToggle'); if(menu&&nav)menu.addEventListener('click',()=>{nav.classList.toggle('open');menu.setAttribute('aria-expanded',nav.classList.contains('open')?'true':'false')});
const head=$('.site-header'); const scroll=()=>head&&head.classList.toggle('scrolled',window.scrollY>12);scroll();window.addEventListener('scroll',scroll,{passive:true});
// Staggered reveal on all main content blocks.
const candidates=$$('main section, .category-card, .product-card, .contact-card, .proof-placeholder, .feature-list article, .cta-panel, .order-note, .panel');
candidates.forEach((el,i)=>{el.classList.add('reveal');if(el.classList.contains('hero'))el.classList.add('reveal-left');el.style.transitionDelay=Math.min((i%5)*65,260)+'ms'});
if('IntersectionObserver' in window){document.documentElement.classList.add('reveal-ready');const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -35px 0px'});candidates.forEach(el=>io.observe(el));}else candidates.forEach(el=>el.classList.add('is-visible'));
// Music starts only after a tap, as required by iPhone/Safari autoplay rules.
const audio=$('#bgMusic'),toggle=$('#musicToggle'),label=$('#musicLabel');if(audio&&toggle){audio.volume=.28;audio.preload='auto';const paint=()=>{const on=!audio.paused;document.body.classList.toggle('music-playing',on);if(label)label.textContent=on?'Music on':'Music off';toggle.setAttribute('aria-pressed',on?'true':'false')};toggle.addEventListener('click',async()=>{try{if(audio.paused){await audio.play()}else{audio.pause()}paint()}catch(e){if(label)label.textContent='Tap to play';}});audio.addEventListener('play',paint);audio.addEventListener('pause',paint);}
// Mouse/touch spotlight motion for cards.
$$('.product-card,.category-card,.contact-card').forEach(card=>card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();card.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');card.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%')}));
})();