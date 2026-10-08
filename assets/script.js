const menu=document.querySelector('.menu'),nav=document.querySelector('.main-nav');if(menu){menu.addEventListener('click',()=>{nav.classList.toggle('open');menu.setAttribute('aria-expanded',nav.classList.contains('open'))});document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')))}const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;const els=document.querySelectorAll('.reveal');if(reduced||!('IntersectionObserver'in window)){els.forEach(e=>e.classList.add('visible'))}else{const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.12});els.forEach(e=>io.observe(e))}const lang=document.documentElement.lang.startsWith('en')?'en':'es';const rev=document.querySelector('#revenue'),exp=document.querySelector('#expenses'),pay=document.querySelector('#payroll'),m=document.querySelector('#marginResult'),profit=document.querySelector('#profitResult'),bar=document.querySelector('#gaugeFill');if(rev){const fmt=new Intl.NumberFormat(lang==='en'?'en-US':'es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0});function calc(){let r=+rev.value||0,e=+exp.value||0,p=+pay.value||0,x=r-e-p,z=r?x/r*100:0;m.textContent=z.toFixed(1)+'%';profit.textContent=(lang==='en'?'Operating result: ':'Resultado operativo: ')+fmt.format(x);bar.style.width=Math.max(0,Math.min(100,z))+'%'}[rev,exp,pay].forEach(i=>i.addEventListener('input',calc));calc()}const form=document.querySelector('#contactForm');if(form)form.addEventListener('submit',e=>{e.preventDefault();let d=new FormData(form),en=lang==='en';let s=encodeURIComponent((en?'Arco V&S inquiry':'Consulta Arco V&S')+' — '+d.get('service'));let b=encodeURIComponent((en?'Name':'Nombre')+': '+d.get('name')+'\n'+(en?'Company':'Empresa')+': '+(d.get('company')||'-')+'\nEmail: '+d.get('email')+'\n'+(en?'Service':'Servicio')+': '+d.get('service')+'\n\n'+(en?'Message':'Mensaje')+':\n'+d.get('message'));location.href='mailto:sergio.gacha@arcovysconsulting.com?subject='+s+'&body='+b});document.querySelectorAll('[data-year]').forEach(x=>x.textContent=new Date().getFullYear());
// Subtle pointer-responsive motion and lightweight 3D interaction
if(!reduced){
  const hero=document.querySelector('.hero');
  const motion=document.querySelector('.hero-motion');
  const heroCopy=document.querySelector('.hero-copy');
  if(hero&&motion){
    hero.addEventListener('pointermove',e=>{
      const r=hero.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      motion.style.transform=`translate3d(${x*-10}px,${y*-8}px,0)`;
      if(heroCopy)heroCopy.style.transform=`translate3d(${x*4}px,${y*3}px,0)`;
    });
    hero.addEventListener('pointerleave',()=>{motion.style.transform='';if(heroCopy)heroCopy.style.transform=''});
  }
  document.querySelectorAll('.feature-card,.mini-card,.calc-card').forEach(card=>{
    card.addEventListener('pointermove',e=>{
      if(matchMedia('(pointer:fine)').matches===false)return;
      const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(900px) rotateX(${y*-2.5}deg) rotateY(${x*3}deg) translateY(-3px)`;
    });
    card.addEventListener('pointerleave',()=>card.style.transform='');
  });
}

// Service page FAQ accordions
document.querySelectorAll('.faq-q').forEach(btn=>btn.addEventListener('click',()=>{const item=btn.closest('.faq-item');const open=item.classList.toggle('open');btn.setAttribute('aria-expanded',open?'true':'false')}));
