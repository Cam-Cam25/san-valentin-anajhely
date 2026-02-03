:root{
  --bg1:#ff8fb1;
  --bg2:#ffd1dc;
  --card:#ffffffd9;
  --text:#1f1f1f;
  --shadow: 0 20px 60px rgba(0,0,0,.18);
  --radius: 22px;
}

*{box-sizing:border-box}
html,body{height:100%}
body{
  margin:0;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  color:var(--text);
  overflow:hidden;
  background: radial-gradient(1200px 800px at 20% 10%, var(--bg2), transparent 60%),
              radial-gradient(1200px 800px at 80% 90%, var(--bg1), transparent 60%),
              linear-gradient(135deg, #ffd6e7, #ff9fc2);
}

/* Corazones flotando */
.bg-hearts{
  position:fixed; inset:0;
  pointer-events:none;
  background-image:
    radial-gradient(circle at 10% 20%, rgba(255,255,255,.25) 0 6px, transparent 7px),
    radial-gradient(circle at 80% 30%, rgba(255,255,255,.22) 0 7px, transparent 8px),
    radial-gradient(circle at 30% 80%, rgba(255,255,255,.18) 0 6px, transparent 7px);
  filter: blur(0.2px);
  animation: floatBg 8s ease-in-out infinite alternate;
}
@keyframes floatBg{
  from{transform:translateY(0)}
  to{transform:translateY(-18px)}
}

.card{
  position:relative;
  width:min(560px, 92vw);
  margin: 8vh auto 0;
  padding: 26px 22px 18px;
  background:var(--card);
  border: 1px solid rgba(255,255,255,.7);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  backdrop-filter: blur(8px);
  text-align:center;
}

.badge{
  display:inline-block;
  padding:8px 12px;
  border-radius:999px;
  background:rgba(255,255,255,.7);
  border:1px solid rgba(0,0,0,.06);
  font-size:.92rem;
}

h1{
  margin: 14px 0 8px;
  font-size: clamp(1.7rem, 4vw, 2.4rem);
}
.name{font-weight:800}
.heart{display:inline-block; animation: pulse 1.2s infinite}
@keyframes pulse{
  0%,100%{transform:scale(1)}
  50%{transform:scale(1.12)}
}

.question{
  margin: 6px auto 18px;
  font-size: 1.05rem;
  line-height: 1.35;
}
.sub{
  display:block;
  margin-top:8px;
  font-size:.98rem;
  opacity:.85;
}

.controls{
  position:relative;
  display:flex;
  gap:12px;
  justify-content:center;
  align-items:center;
  margin: 14px 0 10px;
  min-height:58px;
}

.btn{
  border:0;
  padding: 12px 18px;
  border-radius: 999px;
  font-size: 1.05rem;
  cursor:pointer;
  box-shadow: 0 10px 25px rgba(0,0,0,.12);
  transition: transform .08s ease, filter .2s ease;
  user-select:none;
}
.btn:active{transform: translateY(1px) scale(.98)}

.yes{
  background: #ff2d7a;
  color:white;
}
.no{
  background: white;
  color:#222;
  border:1px solid rgba(0,0,0,.12);
  position:relative;
}

.ghost{
  background: rgba(255,255,255,.75);
  border: 1px solid rgba(0,0,0,.08);
  box-shadow:none;
}

.hint{
  margin: 8px 0 0;
  font-size:.92rem;
  opacity:.75;
}

.message{
  margin: 16px auto 6px;
  padding: 14px 14px 12px;
  border-radius: 18px;
  background: rgba(255,255,255,.75);
  border: 1px solid rgba(0,0,0,.08);
}
.message h2{margin:0 0 6px}
.message p{margin:0 0 10px; line-height:1.35}
.hidden{display:none}

.actions{
  display:flex;
  gap:10px;
  justify-content:center;
  flex-wrap:wrap;
}

.footer{
  margin-top: 10px;
  font-size:.95rem;
  opacity:.85;
}

/* Confetti canvas */
#confetti{
  position:fixed;
  inset:0;
  width:100vw;
  height:100vh;
  pointer-events:none;
}

