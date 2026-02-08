var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

// ✅ Detect mobile vs desktop
const isMobile = window.innerWidth <= 768;

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* =====================
   STAR SETUP
===================== */

for (var i = 0; i < stars; i++) {
    starArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2,
        hue: colorrange[getRandom(0, colorrange.length - 1)],
        sat: getRandom(50, 100),
        opacity: Math.random()
    });
}

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;

var baseFrame = context.getImageData(0, 0, canvas.width, canvas.height);

/* =====================
   STAR FUNCTIONS
===================== */

function drawStars() {
    starArray.forEach(star => {
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fillStyle = `hsla(${star.hue}, ${star.sat}%, 88%, ${star.opacity})`;
        context.fill();
    });
}

function updateStars() {
    starArray.forEach(star => {
        if (Math.random() > 0.99) star.opacity = Math.random();
    });
}

/* =====================
   BUTTON + GIF
===================== */

const button = document.getElementById("valentinesButton");
const gif = document.getElementById("loveGif");

button.addEventListener("click", () => {
    button.style.display = "none";
    gif.style.display = "block";
});

/* =====================
   TEXT HELPERS
===================== */

function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
    lines.forEach((line, i) => {
        context.fillText(line, x, y + i * (fontSize + lineHeight));
    });
}

/* =====================
   TEXT ANIMATION
===================== */

function drawText() {

    // ✅ Font size adjusted ONLY for mobile
    var fontSize = isMobile
        ? Math.min(42, window.innerWidth / 14)
        : Math.min(30, window.innerWidth / 24);

    var lineHeight = isMobile ? 14 : 8;

    context.font = fontSize + "px Comic Sans MS";
    context.textAlign = "center";

    context.shadowColor = "rgba(45,45,255,1)";
    context.shadowBlur = 8;

    /* 💖 INTRO LINES */
    const INTRO_LINE_FRAMES = isMobile ? 160 : 100;

    const introLines = [
        "Hi Gayatri, on this special Valentine's Day.",
        "I want to first thank you for choosing me over billions of people",
        "These are a few of my feelings that I want to share with you",
        "You really looked like an angel when I first saw you ❤️",
        "From the day you accepted me, every day I still can't believe how lucky I am"
    ];

    const INTRO_END = INTRO_LINE_FRAMES * introLines.length;

    if (frameNumber < INTRO_END) {
        const local = frameNumber % INTRO_LINE_FRAMES;
        const idx = Math.floor(frameNumber / INTRO_LINE_FRAMES);

        const fadeIn = isMobile ? 60 : 40;
        const fadeOut = isMobile ? 100 : 60;

        if (local < fadeIn) opacity = local / fadeIn;
        else if (local > fadeOut) opacity = 1 - (local - fadeOut) / fadeIn;
        else opacity = 1;

        context.fillStyle = `rgba(45,45,255,${opacity})`;
        context.fillText(introLines[idx], canvas.width / 2, canvas.height / 2);
        return;
    }

    /* ❤️ FINAL MESSAGE */
    const f = frameNumber - INTRO_END;

    if (f < 300) {
        context.fillStyle = `rgba(45,45,255,${opacity})`;
        drawTextWithLineBreaks(
            [
                "Here we come to the end of the page, but not my love!!",
                "Thank you for making time to listen to this small heart's feelings."
            ],
            canvas.width / 2,
            canvas.height / 2,
            fontSize,
            lineHeight
        );
        opacity += 0.01;
    }

    if (f >= 300) {
        context.fillStyle = `rgba(45,45,255,${secondOpacity})`;
        drawTextWithLineBreaks(
            [
                "Here we come to the end of the page, but not my love!!",
                "Thank you for making time to listen to this small heart's feelings."
            ],
            canvas.width / 2,
            canvas.height / 2,
            fontSize,
            lineHeight
        );

        context.fillText(
            "I love you, Gayatri!! And Happy Valentine's Day ❤️",
            canvas.width / 2,
            canvas.height / 2 + 140
        );

        secondOpacity += 0.01;
        button.style.display = "block";
    }

    context.shadowBlur = 0;
}

/* =====================
   DRAW LOOP
===================== */

function draw() {
    context.putImageData(baseFrame, 0, 0);
    drawStars();
    updateStars();
    drawText();
    frameNumber++;
    requestAnimationFrame(draw);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    baseFrame = context.getImageData(0, 0, canvas.width, canvas.height);
});

requestAnimationFrame(draw);
