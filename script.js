const yesBtn = document.getElementById("yesBtn");
const noBtn  = document.getElementById("noBtn");
const msgBox = document.getElementById("messageBox");
const againBtn = document.getElementById("againBtn");
const hint = document.getElementById("hint");
const soundBtn = document.getElementById("soundBtn");
const audio = document.getElementById("bgMusic");
const controls = document.querySelector(".controls");
const heartsLayer = document.getElementById("heartsLayer");
const collage = document.getElementById("collage");

/* ===== MÚSICA =====
   En móviles no puede sonar con volumen sin interacción.
   Hacemos autoplay muted y al primer toque activamos sonido. */
function attemptAutoplay() {
  if (!audio) return;
  audio.muted = true;
  audio.volume = 0.85;
  const p = audio.play();
  if (p && typeof p.then === "function") p.catch(()=>{});
}
attemptAutoplay();

function enableSound() {
  if (!audio) return;
  audio.muted = false;
  audio.volume = 0.85;
  audio.play().catch(()=>{});
  if (hint) hint.textContent = "🎵 Música activada";
}

// Primer toque en cualquier parte
document.addEventListener("click", () => {
  if (audio && audio.muted) enableSound();
}, { once:true });

// Botón sonido
if (soundBtn) {
  soundBtn.addEventListener("click", () => {
    if (!audio) return;
    if (audio.muted) enableSound();
    else {
      audio.muted = true;
      if (hint) hint.textContent = "🔇 Silenciado";
    }
  });
}

/* ===== BOTÓN NO (solo dentro del recuadro .controls) ===== */
function placeNoNextToYes() {
  // posición inicial al lado de “Sí”
  noBtn.style.left = "62%";
  noBtn.style.top = "50%";
  noBtn.style.transform = "translate(-50%, -50%)";
}
placeNoNextToYes();

function moveNoInsideBox() {
  const padding = 8;
  const box = controls.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();

  const maxX = box.width - btn.width - padding;
  const maxY = box.height - btn.height - padding;

  if (maxX <= padding || maxY <= padding) return;

  const x = Math.floor(Math.random() * maxX) + padding;
  const y = Math.floor(Math.random() * maxY) + padding;

  noBtn.style.left = x + "px";
  noBtn.style.top  = y + "px";
  noBtn.style.transform = "translate(0, 0)";

  const msgs = ["¿Segura? 😳","Nope 😅","Intenta otra vez 😂","Jeje 💘","Confío en ti 💙"];
  if (hint) hint.textContent = msgs[Math.floor(Math.random()*msgs.length)];
}

noBtn.addEventListener("mouseenter", moveNoInsideBox);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoInsideBox();
}, { passive:false });
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoInsideBox();
});

/* ===== BOTÓN SÍ ===== */
yesBtn.addEventListener("click", () => {
  enableSound();
  msgBox.classList.remove("hidden");
  startConfetti(2800);
  if (hint) hint.textContent = "💖💖💖";
});

/* ===== REPETIR ===== */
againBtn.addEventListener("click", () => {
  msgBox.classList.add("hidden");
  if (hint) hint.textContent = "Toca “Sí”… tengo algo para ti 🎵";
  placeNoNextToYes();
});

/* ===== CORAZONES CAYENDO ===== */
const heartChars = ["💗","💖","💕","💘","❤️"];

function spawnHeart() {
  const el = document.createElement("div");
  el.className = "heart-fall";
  el.textContent = heartChars[Math.floor(Math.random()*heartChars.length)];

  const size = 16 + Math.random()*24;
  const x = Math.random()*window.innerWidth;

  const drift = (Math.random()*180 - 90) + "px";
  const rot = (Math.random()*160 - 80) + "deg";
  const dur = 6 + Math.random()*6;

  el.style.left = x + "px";
  el.style.fontSize = size + "px";
  el.style.setProperty("--drift", drift);
  el.style.setProperty("--rot", rot);
  el.style.animationDuration = dur + "s";

  heartsLayer.appendChild(el);
  setTimeout(() => el.remove(), dur*1000 + 400);
}
setInterval(spawnHeart, 260);

/* ===== CONFETTI ===== */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function startConfetti(ms=2500){
  const end = performance.now() + ms;

  const pieces = Array.from({length:160}, () => ({
    x: Math.random()*window.innerWidth,
    y: -20 - Math.random()*200,
    w: 6 + Math.random()*6,
    h: 8 + Math.random()*12,
    vx: (Math.random()-0.5)*3,
    vy: 2 + Math.random()*4,
    r: Math.random()*Math.PI,
    vr: (Math.random()-0.5)*0.2,
    a: 0.7 + Math.random()*0.3
  }));

  function frame(t){
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    for (const p of pieces){
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;

      ctx.save();
      ctx.globalAlpha = p.a;
      ctx.translate(p.x,p.y);
      ctx.rotate(p.r);
      ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore();
    }

    for (let i=pieces.length-1;i>=0;i--){
      if (pieces[i].y > window.innerHeight + 40) pieces.splice(i,1);
    }

    if (t < end && pieces.length) requestAnimationFrame(frame);
    else ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  }
  requestAnimationFrame(frame);
}

/* ===== COLLAGE DINÁMICO (JPEG) ===== */
const totalPhotos = 8; // ajusta según tus fotos
for (let i = 1; i <= totalPhotos; i++) {
  const img = document.createElement("img");
  img.src = `assets/photos/${i}.jpeg`;
  img.alt = "";
  img.loading = "lazy";
  img.onerror = () => img.remove();
  collage.appendChild(img);
}

