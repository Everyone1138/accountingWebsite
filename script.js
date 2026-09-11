const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');
const pageLang = document.documentElement.lang.startsWith('en') ? 'en' : 'es';

function updateHeader() {
  header.classList.toggle('scrolled', window.scrollY > 16);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuToggle.addEventListener('click', () => {
  const open = !nav.classList.contains('open');
  nav.classList.toggle('open', open);
  menuToggle.classList.toggle('active', open);
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? (pageLang === 'en' ? 'Close menu' : 'Cerrar menú') : (pageLang === 'en' ? 'Open menu' : 'Abrir menú'));
  document.body.classList.toggle('menu-open', open);
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', pageLang === 'en' ? 'Open menu' : 'Abrir menú');
    document.body.classList.remove('menu-open');
  });
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal');
if (reducedMotion || !('IntersectionObserver' in window)) {
  revealEls.forEach(el => el.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.13, rootMargin: '0px 0px -35px' });
  revealEls.forEach(el => revealObserver.observe(el));
}

const revenue = document.getElementById('revenue');
const expenses = document.getElementById('expenses');
const payroll = document.getElementById('payroll');
const marginResult = document.getElementById('marginResult');
const profitResult = document.getElementById('profitResult');
const gaugeFill = document.getElementById('gaugeFill');

const cop = new Intl.NumberFormat(pageLang === 'en' ? 'en-US' : 'es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
function updateCalculator() {
  const rev = Math.max(0, Number(revenue.value) || 0);
  const exp = Math.max(0, Number(expenses.value) || 0);
  const pay = Math.max(0, Number(payroll.value) || 0);
  const profit = rev - exp - pay;
  const margin = rev > 0 ? (profit / rev) * 100 : 0;
  marginResult.textContent = `${margin.toFixed(1)}%`;
  profitResult.textContent = `${pageLang === 'en' ? 'Operating result' : 'Resultado operativo'}: ${cop.format(profit)}`;
  const gaugeValue = Math.min(100, Math.max(0, margin));
  gaugeFill.style.width = `${gaugeValue}%`;
  gaugeFill.style.opacity = profit < 0 ? '.45' : '1';
}
[revenue, expenses, payroll].forEach(input => input.addEventListener('input', updateCalculator));
updateCalculator();

const details = document.querySelectorAll('.accordion details');
details.forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      details.forEach(other => {
        if (other !== item) other.open = false;
      });
    }
  });
});

const form = document.getElementById('contactForm');
form.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const isEn = pageLang === 'en';
  const subject = encodeURIComponent(`${isEn ? 'Arco V&S inquiry' : 'Consulta Arco V&S'} — ${data.get('service')}`);
  const body = encodeURIComponent(
    `${isEn ? 'Name' : 'Nombre'}: ${data.get('name')}\n` +
    `${isEn ? 'Company' : 'Empresa'}: ${data.get('company') || (isEn ? 'Not provided' : 'No indicado')}\n` +
    `${isEn ? 'Email' : 'Correo'}: ${data.get('email')}\n` +
    `${isEn ? 'Phone' : 'Teléfono'}: ${data.get('phone') || (isEn ? 'Not provided' : 'No indicado')}\n` +
    `${isEn ? 'Service' : 'Servicio'}: ${data.get('service')}\n\n` +
    `${isEn ? 'Message' : 'Mensaje'}:\n${data.get('message')}`
  );
  window.location.href = `mailto:sergio.gacha@arcovysconsulting.com?subject=${subject}&body=${body}`;
});

document.getElementById('year').textContent = new Date().getFullYear();
