const yesBtn = document.getElementById("yesBtn");
const noBtn  = document.getElementById("noBtn");
const msgBox = document.getElementById("messageBox");
const msgTitle = document.getElementById("msgTitle");
const msgText  = document.getElementById("msgText");
const againBtn = document.getElementById("againBtn");
const shareBtn = document.getElementById("shareBtn");
const hint = document.getElementById("hint");

const audio = document.getElementById("bgMusic");

// Mensajes troll para el botón "No"
const noMessages = [
  "¿Segurísima? 🥺",
  "El botón No tiembla… 😅",
  "No te creo… intenta otra vez 😏",
  "Te juro que ‘Sí’ se ve mejor 👀",
  "Anajhely… porfa 🥹",
  "Kevin está a punto de llorar 😭",
  "Ok, última oportunidad… 😳",
  "El ‘No’ se fue a comprar flores y no volvió 🌹"
];

let noCount = 0;

// --- Música: en móviles requiere interacción ---
function tryPlayMusic() {
  audio.volume = 0.5;
  audio.play().then(() => {
    hint.textContent = "🎵 Música activada";
    setTimeout(() => hint.style.display = "none", 1400);
  }).catch(() => {
    // Si el navegador bloquea autoplay, no pasa nada.
  });
}

// Intenta al cargar (en PC a veces funciona)
tryPlayMusic();

// Si toca cualquier parte, arrancamos música
document.addEventListener("click", () => tryPlayMusic(), { once: true });

// --- Botón NO: se mueve y cambia texto ---
function moveNoButton() {
  const area = document.querySelector(".controls");
  const rect = area.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  // límites dentro del contenedor
  const maxX = rect.width  - btnRect.width;
  const maxY = rect.height - btnRect.height;

  // si el contenedor es muy pequeño, no lo muevas tanto
  const x = Math.max(0, Math.random() * maxX);
  const y = Math.max(0, Math.random() * maxY);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top  = `${y}px`;
}

noBtn.addEventListener("mouseenter", () => {
  // PC: al pasar el mouse
  moveNoButton();
});

noBtn.addEventListener("touchstart", (e) => {
  // Móvil: al intentar tocar
  e.preventDefault();
  moveNoButton();
  showNoMessage();
}, { passive: false });

noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
  showNoMessage();
});

function showNoMessage() {
  const msg = noMessages[Math.min(noCount, noMessages.length - 1)];
  noCount++;
  hint.style.display = "block";
  hint.textContent = msg;

  // hacer que "Sí" se vea más tentador cada vez 😏
  const scale = 1 + Math.min(noCount * 0.06, 0.45);
  yesBtn.style.transform = `scale(${scale})`;
  yesBtn.style.filter = `brightness(${1 + Math.min(noCount * 0.08, 0.6)})`;
}

// --- Botón SÍ: mensaje final romántico + gracioso + confeti ---
yesBtn.addEventListener("click", () => {
  audio.volume = 0.7;
  audio.play();
  showFinal();
  startConfetti(3200);
});

function showFinal() {
  msgBox.classList.remove("hidden");
  msgTitle.textContent = "¡SÍ! 💖🥳";
  msgText.innerHTML = `
    <b>Anajhely</b>, oficialmente acabas de hacer a <b>Kevin</b> la persona más feliz 😭💘<br><br>
    Prometo: flores (aunque sean imaginarias), risas reales y un San Valentín inolvidable 😌✨<br>
    <span style="opacity:.9">PD: el botón “No” ya puede descansar… estaba sudando.</span>
  `;
}

// Repetir (reiniciar)
againBtn.addEventListener("click", () => {
  msgBox.classList.add("hidden");
  hint.style.display = "block";
  hint.textContent = "Ok, otra vez… pero el ‘No’ sigue nervioso 😅";
  noCount = 0;
  yesBtn.style.transform = "";
  yesBtn.style.filter = "";
  // reubicar NO al centro
  noBtn.style.position = "relative";
  noBtn.style.left = "";
  noBtn.style.top = "";
});

// Copiar link
shareBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    hint.style.display = "block";
    hint.textContent = "Link copiado 🔗✨ ¡Ahora envíaselo!";
  } catch {
    hint.style.display = "block";
    hint.textContent = "No pude copiar automático 😅 copia el link del navegador.";
  }
});


// ---------- CONFETTI (simple y liviano) ----------
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let confetti = [];
let animId = null;

function startConfetti(durationMs = 2000) {
  const end = performance.now() + durationMs;
  confetti = [];

  const colors = ["#ff2d7a","#ffd1dc","#ff8fb1","#ffffff","#ff5fa2","#ffb3c7"];

  for (let i=0; i<180; i++){
    confetti.push({
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random()*window.innerHeight*0.4,
      w: 6 + Math.random()*6,
      h: 8 + Math.random()*10,
      vx: (Math.random()-0.5)*3,
      vy: 2 + Math.random()*4,
      rot: Math.random()*Math.PI,
      vr: (Math.random()-0.5)*0.2,
      color: colors[Math.floor(Math.random()*colors.length)],
      alpha: 0.8 + Math.random()*0.2
    });
  }

  function frame(now){
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);

    confetti.forEach(p=>{
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore();
    });

    confetti = confetti.filter(p => p.y < window.innerHeight + 40);

    if (now < end && confetti.length > 0) {
      animId = requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
      cancelAnimationFrame(animId);
      animId = null;
    }
  }

  animId = requestAnimationFrame(frame);
}

