const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const nav = document.querySelector('.nav');
if (nav && !document.querySelector('.nav-reservation')) {
  const link = document.createElement('a');
  link.className = 'nav-reservation';
  link.href = 'reservation.html';
  link.textContent = 'Réserver';
  nav.insertBefore(link, nav.querySelector('.nav-phone') || null);
}
