const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const msgBox = document.getElementById("messageBox");
const againBtn = document.getElementById("againBtn");
const hint = document.getElementById("hint");
const audio = document.getElementById("bgMusic");

let noCount = 0;
const noTexts = [
  "¿Segura? 🥺",
  "El botón No está asustado 😅",
  "Piénsalo otra vez 😳",
  "Kevin confía en ti 💙",
  "Última oportunidad 😭"
];

/* BOTÓN NO QUE HUYE */
function moveNo(){
  const parent = noBtn.parentElement;
  const maxX = parent.clientWidth - noBtn.offsetWidth;
  const maxY = parent.clientHeight - noBtn.offsetHeight;

  noBtn.style.position = "absolute";
  noBtn.style.left = Math.random()*maxX + "px";
  noBtn.style.top  = Math.random()*maxY + "px";

  hint.textContent = noTexts[Math.min(noCount, noTexts.length-1)];
  noCount++;
}

noBtn.addEventListener("mouseenter", moveNo);
noBtn.addEventListener("click", e => {
  e.preventDefault();
  moveNo();
});

/* BOTÓN SÍ */
yesBtn.addEventListener("click", () => {
  audio.volume = 0.7;
  audio.play();

  msgBox.classList.remove("hidden");
  hint.textContent = "💖🎵";

  launchConfetti();
});

/* REPETIR */
againBtn.addEventListener("click", () => {
  msgBox.classList.add("hidden");
  noBtn.style.position = "relative";
  noBtn.style.left = "";
  noBtn.style.top = "";
  hint.textContent = "Toca “Sí”… tengo una sorpresa 🎵";
});

/* CONFETTI */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function launchConfetti(){
  const pieces = Array.from({length:180}, () => ({
    x:Math.random()*canvas.width,
    y:-20,
    r:Math.random()*6+4,
    d:Math.random()*canvas.height,
    c:`hsl(${Math.random()*360},80%,70%)`
  }));

  let frame = 0;
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p=>{
      ctx.beginPath();
      ctx.fillStyle=p.c;
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
      p.y+=Math.cos(frame+p.d)+3;
    });
    frame+=0.02;
    if(frame<200) requestAnimationFrame(draw);
  }
  draw();
}

