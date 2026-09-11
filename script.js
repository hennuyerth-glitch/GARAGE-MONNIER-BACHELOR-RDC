const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const nav = document.querySelector('.nav');

const reservationStyles = `
.nav-reservation{background:#f4c400;color:#10243a!important;padding:9px 12px;border-radius:4px;font-weight:800;display:inline-flex;align-items:center;gap:6px}.nav-reservation:hover{opacity:.9}
.reservation-hero-btn{margin-left:8px}
.reservation-overlay{position:fixed;inset:0;background:rgba(0,25,48,.72);z-index:9999;display:none;align-items:center;justify-content:center;padding:20px}
.reservation-overlay.is-open{display:flex}
.reservation-modal{width:min(760px,100%);max-height:92vh;overflow:auto;background:#fff;border-radius:10px;box-shadow:0 25px 80px rgba(0,0,0,.28);color:#122235}
.reservation-head{background:#003b70;color:#fff;padding:24px 28px;display:flex;justify-content:space-between;gap:20px;align-items:flex-start}
.reservation-head h2{font-family:Montserrat,Arial,sans-serif;margin:4px 0 4px;font-size:28px}
.reservation-head p{margin:0;color:#dce9f5;font-size:13px}
.reservation-close{border:0;background:rgba(255,255,255,.12);color:#fff;width:38px;height:38px;border-radius:5px;font-size:23px;cursor:pointer}
.reservation-body{padding:28px}
.reservation-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.reservation-field{display:flex;flex-direction:column;gap:6px}
.reservation-field.full{grid-column:1/-1}
.reservation-field label{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:#33465a}
.reservation-field input,.reservation-field select,.reservation-field textarea{width:100%;border:1px solid #cbd6e0;border-radius:5px;padding:11px 12px;font:inherit;color:#122235;background:#fff}
.reservation-field textarea{min-height:100px;resize:vertical}
.reservation-field input:focus,.reservation-field select:focus,.reservation-field textarea:focus{outline:none;border-color:#003b70;box-shadow:0 0 0 3px rgba(0,59,112,.08)}
.reservation-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:20px}
.reservation-btn{border:0;border-radius:5px;padding:13px 18px;font-weight:800;font-size:13px;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;justify-content:center}
.reservation-btn-primary{background:#f4c400;color:#10243a}
.reservation-btn-secondary{background:#003b70;color:#fff}
.reservation-note{margin-top:16px;padding:13px;background:#fff8d8;border:1px solid #eadb83;border-radius:5px;font-size:12px;color:#4c4214}
.reservation-success{display:none;margin-top:18px;padding:16px;background:#eef7f1;border:1px solid #b9ddc6;border-radius:6px;font-size:13px}
.reservation-success strong{display:block;margin-bottom:5px}
@media(max-width:700px){.reservation-grid{grid-template-columns:1fr}.reservation-field.full{grid-column:auto}.reservation-head{padding:20px}.reservation-body{padding:20px}.reservation-hero-btn{margin-left:0;margin-top:8px}}
`;

const style = document.createElement('style');
style.textContent = reservationStyles;
document.head.appendChild(style);

function openReservation(){
  const overlay = document.getElementById('reservationOverlay');
  if (overlay) {
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    const date = document.getElementById('reservationDate');
    if (date && !date.min) {
      const today = new Date();
      today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
      date.min = today.toISOString().slice(0,10);
    }
  }
}

function closeReservation(){
  const overlay = document.getElementById('reservationOverlay');
  if (overlay) overlay.classList.remove('is-open');
  document.body.style.overflow = '';
}

if (nav && !document.querySelector('.nav-reservation')) {
  const link = document.createElement('a');
  link.className = 'nav-reservation';
  link.href = '#reservation';
  link.textContent = 'Réserver';
  link.addEventListener('click', event => {
    event.preventDefault();
    openReservation();
  });
  nav.insertBefore(link, nav.querySelector('.nav-phone') || null);
}

const heroActions = document.querySelector('.hero-copy .actions');
if (heroActions && !heroActions.querySelector('.reservation-hero-btn')) {
  const button = document.createElement('a');
  button.href = '#reservation';
  button.className = 'btn btn-white reservation-hero-btn';
  button.textContent = 'Réserver un rendez-vous';
  button.addEventListener('click', event => {
    event.preventDefault();
    openReservation();
  });
  heroActions.appendChild(button);
}

if (!document.getElementById('reservationOverlay')) {
  const overlay = document.createElement('div');
  overlay.id = 'reservationOverlay';
  overlay.className = 'reservation-overlay';
  overlay.innerHTML = `
    <div class="reservation-modal" role="dialog" aria-modal="true" aria-labelledby="reservationTitle">
      <div class="reservation-head">
        <div><div style="font-size:11px;font-weight:800;letter-spacing:.16em;color:#f4c400">PRISE DE RENDEZ-VOUS</div><h2 id="reservationTitle">Réserver au Garage Monnier</h2><p>Choisissez la prestation et vos disponibilités. Le garage confirme ensuite le créneau.</p></div>
        <button class="reservation-close" type="button" aria-label="Fermer">×</button>
      </div>
      <div class="reservation-body">
        <form id="reservationForm">
          <div class="reservation-grid">
            <div class="reservation-field full"><label for="reservationService">Prestation</label><select id="reservationService" required><option value="">Choisir une prestation</option><option>Entretien / révision</option><option>Réparation / diagnostic</option><option>Véhicule électrique ou hybride</option><option>Pare-brise</option><option>Location courte durée</option><option>Vente de véhicule</option><option>Autre demande</option></select></div>
            <div class="reservation-field"><label for="reservationDate">Date souhaitée</label><input id="reservationDate" type="date" required></div>
            <div class="reservation-field"><label for="reservationTime">Créneau</label><select id="reservationTime" required><option value="">Choisir</option><option>Matin</option><option>Après-midi</option><option>Indifférent</option></select></div>
            <div class="reservation-field"><label for="reservationName">Nom & prénom</label><input id="reservationName" type="text" autocomplete="name" placeholder="Votre nom" required></div>
            <div class="reservation-field"><label for="reservationPhone">Téléphone</label><input id="reservationPhone" type="tel" autocomplete="tel" placeholder="06 00 00 00 00" required></div>
            <div class="reservation-field"><label for="reservationVehicle">Véhicule</label><input id="reservationVehicle" type="text" placeholder="Marque, modèle, immatriculation"></div>
            <div class="reservation-field"><label for="reservationEmail">E-mail</label><input id="reservationEmail" type="email" autocomplete="email" placeholder="vous@exemple.fr"></div>
            <div class="reservation-field full"><label for="reservationMessage">Précisions</label><textarea id="reservationMessage" placeholder="Décrivez votre besoin ou vos contraintes…"></textarea></div>
          </div>
          <div class="reservation-actions"><button class="reservation-btn reservation-btn-primary" type="submit">Préparer ma demande</button><button class="reservation-btn reservation-btn-secondary" type="button" id="reservationCall">Appeler le garage</button></div>
          <div class="reservation-note"><strong>Important :</strong> ce formulaire constitue une demande de rendez-vous. Le créneau doit être confirmé par le garage. Pour une panne ou une urgence, appelez le <strong>06 13 27 19 85</strong>.</div>
          <div id="reservationSuccess" class="reservation-success"><strong>Votre demande est prête.</strong><span id="reservationSummary"></span><div class="reservation-actions"><a class="reservation-btn reservation-btn-secondary" href="tel:+33251393068">Confirmer au 02 51 39 30 68</a><a class="reservation-btn reservation-btn-primary" href="tel:+33613271985">Assistance 24/7</a></div></div>
        </form>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  overlay.querySelector('.reservation-close').addEventListener('click', closeReservation);
  overlay.addEventListener('click', event => { if (event.target === overlay) closeReservation(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeReservation(); });

  const callButton = document.getElementById('reservationCall');
  if (callButton) callButton.addEventListener('click', () => { window.location.href = 'tel:+33251393068'; });

  const form = document.getElementById('reservationForm');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const service = document.getElementById('reservationService').value;
    const date = document.getElementById('reservationDate').value;
    const time = document.getElementById('reservationTime').value;
    const name = document.getElementById('reservationName').value.trim();
    const formattedDate = date ? new Date(date + 'T12:00:00').toLocaleDateString('fr-FR') : '';
    document.getElementById('reservationSummary').textContent = `${name}, votre demande pour « ${service} » le ${formattedDate} (${time}) est préparée. Appelez le 02 51 39 30 68 pour confirmer le créneau avec l'équipe.`;
    document.getElementById('reservationSuccess').style.display = 'block';
    document.getElementById('reservationSuccess').scrollIntoView({behavior:'smooth',block:'center'});
  });
}
