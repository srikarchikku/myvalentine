/* =====================
   CANVAS SETUP
===================== */

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

/* =====================
   DEVICE
===================== */

const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

/* =====================
   STARS
===================== */

const stars = 500;
const colorrange = [0, 60, 240];
const starArray = [];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

for (let i = 0; i < stars; i++) {
  starArray.push({
    x: rand(0, canvas.width),
    y: rand(0, canvas.height),
    r: Math.random() * 1.2,
    h: colorrange[Math.floor(Math.random() * colorrange.length)],
    s: rand(50, 100),
    o: Math.random()
  });
}

function drawStars() {
  for (const s of starArray) {
    if (Math.random() > 0.99) s.o = Math.random();
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${s.h},${s.s}%,88%,${s.o})`;
    ctx.fill();
  }
}

/* =====================
   AUDIO
===================== */

const music = document.getElementById("bgMusic");
music.volume = 0.4;
let musicStarted = false;

/* =====================
   BUTTONS
===================== */

const feelLoveBtn = document.getElementById("feelLoveButton");
const finalButton = document.getElementById("valentinesButton");
const gif = document.getElementById("loveGif");

feelLoveBtn.style.display = "none";
feelLoveBtn.style.opacity = 0;

finalButton.style.display = "none";
gif.style.display = "none";

/* =====================
   FADE-IN HELPER (NEW)
===================== */

function fadeInFeelLoveButton(duration = 1300) {
  feelLoveBtn.style.display = "block";
  feelLoveBtn.style.opacity = 0;

  const start = performance.now();

  function animate(now) {
    const progress = Math.min((now - start) / duration, 1);
    feelLoveBtn.style.opacity = progress;

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }

  requestAnimationFrame(animate);
}

/* =====================
   TEXT CONFIG
===================== */

const fontSize = () =>
  isMobile ? Math.min(42, innerWidth / 14) : Math.min(30, innerWidth / 24);

const lineHeight = isMobile ? 14 : 8;

ctx.textAlign = "center";
ctx.textBaseline = "middle";

/* =====================
   STORY LINES
===================== */

const lines = [
  ["Hi Gayathri, on this special Valentine's Day."],
  ["I want to first thank you for choosing me over billions of people"],
  ["These are a few of my feelings that I want to share with you"],

  ["You really looked like an angel when I first saw you ❤️"],
  ["From the day you accepted me, every day I still can't believe how lucky I am"],

  ["Among billions of people, destiny brought us together"],
  ["Even though we spoke only a few times, I quickly got connected to you"],
  ["Among all these days, I wait every week just to speak with you"],

  [
    "As we spoke earlier, I have already added you to my best friend list",
    "I hope you have added me to yours too 😊"
  ],
  [
    "At last, I promise you",
    "that I will always try to make you happy and never make you cry"
  ],
  [
    "Here we come to the end of the page, but not my love!!",
    "Thank you for making time to listen to this small heart's feelings."
  ],
  [
    "I love you, Gayathri!!",
    "And Happy Valentine's Day ❤️"
  ]
];

/* =====================
   TIMING
===================== */

const FADE_IN = 1200;
const FADE_OUT = 1200;
const DEFAULT_HOLD = 2500;
const LONG_HOLD = 2800;

const longHoldIndexes = new Set([8, 9, 10]);

/* =====================
   STATE
===================== */

let currentLine = 0;
let startTime = performance.now();
let pausedForLove = false;

/* =====================
   BUTTON HANDLERS
===================== */

feelLoveBtn.addEventListener("click", () => {
  music.currentTime = 0;
  music.play();              // starts immediately
  musicStarted = true;

  feelLoveBtn.style.display = "none";
  feelLoveBtn.style.opacity = 0;

  pausedForLove = false;     // resume animation
  currentLine++;             // move to next line
  startTime = performance.now();
});

finalButton.addEventListener("click", () => {
  finalButton.style.display = "none";
  gif.style.display = "block";
});

/* =====================
   DRAW TEXT
===================== */

function drawText() {
  if (currentLine >= lines.length) return;

  const now = performance.now();
  const elapsed = pausedForLove ? 0 : now - startTime;

  const isLast = currentLine === lines.length - 1;
  const holdTime = longHoldIndexes.has(currentLine)
    ? LONG_HOLD
    : DEFAULT_HOLD;

  const total = FADE_IN + holdTime + FADE_OUT;
  let opacity = 1;

  if (!isLast && !pausedForLove) {
    if (elapsed < FADE_IN) {
      opacity = elapsed / FADE_IN;
    }
    else if (elapsed < FADE_IN + holdTime) {
      opacity = 1;

      // 👉 PAUSE AFTER HOLD + FADE IN BUTTON
      if (currentLine === 2 && !musicStarted) {
        pausedForLove = true;
        fadeInFeelLoveButton(1000); // 👈 smooth fade-in
      }
    }
    else if (elapsed < total) {
      opacity = 1 - (elapsed - FADE_IN - holdTime) / FADE_OUT;
    }
    else {
      currentLine++;
      startTime = now;
      return;
    }
  }

  // Final message stays forever
  if (isLast) {
    opacity = Math.min(1, elapsed / FADE_IN);
    finalButton.style.display = "block";
  }

  ctx.font = `${fontSize()}px "Comic Sans MS", cursive`;
  ctx.shadowColor = "rgba(45,45,255,1)";
  ctx.shadowBlur = 8;
  ctx.fillStyle = `rgba(45,45,255,${opacity})`;

  const block = lines[currentLine];
  const startY =
    canvas.height / 2 -
    ((block.length - 1) * (fontSize() + lineHeight)) / 2;

  block.forEach((line, i) => {
    ctx.fillText(
      line,
      canvas.width / 2,
      startY + i * (fontSize() + lineHeight)
    );
  });
}

/* =====================
   LOOP
===================== */

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawStars();
  drawText();
  requestAnimationFrame(loop);
}

loop();
