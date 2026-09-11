const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const nav = document.querySelector('.nav');
if (nav && !document.querySelector('.nav-reservation')) {
  const link = document.createElement('a');
  link.className = 'nav-reservation';
  link.href = 'reservation.html';
  link.textContent = 'Réserver';
  nav.insertBefore(link, nav.querySelector('.nav-phone') || null);

  const style = document.createElement('style');
  style.textContent = '.nav-reservation{background:#f4c400;color:#10243a!important;padding:9px 12px;border-radius:4px;font-weight:800}.nav-reservation:hover{opacity:.9}';
  document.head.appendChild(style);
}
