const yesBtn = document.getElementById("yesBtn");
const noBtn  = document.getElementById("noBtn");
const msgBox = document.getElementById("messageBox");
const againBtn = document.getElementById("againBtn");
const hint = document.getElementById("hint");
const soundBtn = document.getElementById("soundBtn");
const audio = document.getElementById("bgMusic");
const controls = document.querySelector(".controls");

alert("JS nuevo cargado ❤️");

// ---------- MÚSICA “EN TODO MOMENTO” (realista) ----------
// Importante: navegadores móviles NO permiten audio con sonido sin interacción.
// Lo más cercano a “siempre”: autoplay muted + al primer toque se activa con sonido.
function attemptAutoplay() {
  audio.muted = true;
  audio.volume = 0.8;
  const p = audio.play();
  if (p && typeof p.then === "function") {
    p.catch(() => {
      // si el navegador bloquea, se activará con cualquier toque
    });
  }
}
attemptAutoplay();

function enableSound() {
  audio.muted = false;
  audio.volume = 0.85;
  audio.play().catch(()=>{});
  hint.textContent = "🎵 Música activada";
}

document.addEventListener("click", () => {
  // primer click de la usuaria: activamos sonido
  if (audio.muted) enableSound();
}, { once: true });

soundBtn?.addEventListener("click", () => {
  if (audio.muted) enableSound();
  else { audio.muted = true; hint.textContent = "🔇 Silenciado"; }
});

function resetNoNextToYes() {
  noBtn.style.position = "relative"; // vuelve al recuadro
  noBtn.style.left = "";
  noBtn.style.top  = "";
  noBtn.style.zIndex = "";
} 
resetNoNextToYes();
// ---------- BOTÓN NO (solo se mueve dentro del recuadro) ----------
const controls = document.querySelector(".controls");

function placeNoNextToYes() {
  // lo colocamos a la derecha del "Sí" dentro del recuadro
  noBtn.style.position = "absolute";
  noBtn.style.left = "62%";
  noBtn.style.top  = "50%";
  noBtn.style.transform = "translate(-50%, -50%)";
}
placeNoNextToYes();

function moveNoInsideBox() {
  const padding = 8;

  const box = controls.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();

  // límites dentro del recuadro
  const maxX = box.width - btn.width - padding;
  const maxY = box.height - btn.height - padding;

  // por seguridad
  if (maxX <= padding || maxY <= padding) return;

  const x = Math.floor(Math.random() * maxX) + padding;
  const y = Math.floor(Math.random() * maxY) + padding;

  // coordenadas relativas al recuadro
  noBtn.style.left = x + "px";
  noBtn.style.top  = y + "px";
  noBtn.style.transform = "translate(0, 0)";

  const msgs = [
    "¿Segura? 😳",
    "Nope 😅",
    "Intenta otra vez 😂",
    "Jeje 💘",
    "Kevin confía en ti 💙"
  ];
  hint.textContent = msgs[Math.floor(Math.random() * msgs.length)];
}

// PC: cuando acerquen el mouse
noBtn.addEventListener("mouseenter", moveNoInsideBox);

// Móvil: cuando intenten tocar
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoInsideBox();
}, { passive:false });

// Click (si lo logran)
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoInsideBox();
});



// PC: cuando acerque el mouse
noBtn.addEventListener("mouseenter", moveNoAnywhere);
// Móvil: cuando intente tocar
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoAnywhere();
}, { passive:false });
// Click (por si logra)
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoAnywhere();
});

// ---------- BOTÓN SÍ ----------
yesBtn.addEventListener("click", () => {
  enableSound(); // al decir sí, garantizamos sonido
  msgBox.classList.remove("hidden");
  startConfetti(2800);
  hint.textContent = "💖💖💖";
});

// Repetir
againBtn.addEventListener("click", () => {
  msgBox.classList.add("hidden");
  hint.textContent = "Toca “Sí”… tengo algo para ti 🎵";
  resetNoNextToYes();
});

// ---------- CORAZONES QUE CAEN ----------
const heartsLayer = document.getElementById("heartsLayer");
const heartChars = ["💗","💖","💕","💘","❤️"];

function spawnHeart() {
  const el = document.createElement("div");
  el.className = "heart-fall";
  el.textContent = heartChars[Math.floor(Math.random()*heartChars.length)];

  const size = 16 + Math.random() * 26;
  const x = Math.random() * window.innerWidth;

  const drift = (Math.random() * 160 - 80) + "px";
  const rot = (Math.random() * 160 - 80) + "deg";
  const dur = (6 + Math.random() * 6); // 6-12s

  el.style.left = x + "px";
  el.style.fontSize = size + "px";
  el.style.setProperty("--drift", drift);
  el.style.setProperty("--rot", rot);
  el.style.animationDuration = dur + "s";

  heartsLayer.appendChild(el);

  setTimeout(() => el.remove(), (dur * 1000) + 300);
}

// genera corazones siempre
setInterval(spawnHeart, 260);

// ---------- CONFETTI ----------
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
    // limpia piezas fuera
    for (let i=pieces.length-1;i>=0;i--){
      if (pieces[i].y > window.innerHeight + 40) pieces.splice(i,1);
    }
    if (t < end && pieces.length){
      requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
    }
  }
  requestAnimationFrame(frame);
}

// ---------- COLLAGE DINÁMICO ----------
const collage = document.getElementById("collage");

// Ajusta aquí cuántas fotos tienes
const totalPhotos = 8;

for (let i = 1; i <= totalPhotos; i++) {
  const img = document.createElement("img");
  img.src = `assets/photos/${i}.jpeg`;
  img.alt = "";
  img.loading = "lazy";

  // si alguna foto no existe, la quitamos y seguimos
  img.onerror = () => img.remove();

  collage.appendChild(img);
}
