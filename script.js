var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Initialize stars
for (var i = 0; i < stars; i++) {
    var x = Math.random() * canvas.offsetWidth;
    var y = Math.random() * canvas.offsetHeight;
    var radius = Math.random() * 1.2;
    var hue = colorrange[getRandom(0, colorrange.length - 1)];
    var sat = getRandom(50, 100);
    var opacity = Math.random();
    starArray.push({ x, y, radius, hue, sat, opacity });
}

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

var baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);

/* =====================
   STAR FUNCTIONS
===================== */

function drawStars() {
    for (var i = 0; i < stars; i++) {
        var star = starArray[i];
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 360);
        context.fillStyle = `hsla(${star.hue}, ${star.sat}%, 88%, ${star.opacity})`;
        context.fill();
    }
}

function updateStars() {
    for (var i = 0; i < stars; i++) {
        if (Math.random() > 0.99) {
            starArray[i].opacity = Math.random();
        }
    }
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
    lines.forEach((line, index) => {
        context.fillText(line, x, y + index * (fontSize + lineHeight));
    });
}

/* =====================
   TEXT ANIMATION
===================== */

function drawText() {
    var fontSize = Math.min(30, window.innerWidth / 24);
    var lineHeight = 8;

    context.font = fontSize + "px Comic Sans MS";
    context.textAlign = "center";

    // glow
    context.shadowColor = "rgba(45, 45, 255, 1)";
    context.shadowBlur = 8;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;

    /* ⚡ INTRO */
    const INTRO_LINE_FRAMES = 100;
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

        if (local < 40) opacity = local / 40;
        else if (local > 60) opacity = 1 - (local - 60) / 40;
        else opacity = 1;

        context.fillStyle = `rgba(45,45,255,${opacity})`;
        context.fillText(introLines[idx], canvas.width / 2, canvas.height / 2);
        return;
    }

    /* 🔁 MAIN STORY */
    const f = frameNumber - INTRO_END;

    // ---- lucky line ----
    if (f < 250) {
        context.fillStyle = `rgba(45,45,255,${opacity})`;
        context.fillText("Among billions of people, destiny brought us together", canvas.width/2, canvas.height/2);
        opacity += 0.01;
    }

    if (f >= 250 && f < 500) {
        context.fillStyle = `rgba(45,45,255,${opacity})`;
        context.fillText("Among billions of people, destiny brought us together", canvas.width/2, canvas.height/2);
        opacity -= 0.01;
    }

    if (f == 500) opacity = 0;

    // ---- stars line ----
    if (f > 500 && f < 750) {
        context.fillStyle = `rgba(45,45,255,${opacity})`;
        context.fillText("Even though we spoke only a few times, I quickly got connected to you", canvas.width/2, canvas.height/2);
        opacity += 0.01;
    }

    if (f >= 750 && f < 1000) {
        context.fillStyle = `rgba(45,45,255,${opacity})`;
        context.fillText("Even though we spoke only a few times, I quickly got connected to you", canvas.width/2, canvas.height/2);
        opacity -= 0.01;
    }

    if (f == 1000) opacity = 0;

    // ---- alive line ----
    if (f > 1000 && f < 1250) {
        context.fillStyle = `rgba(45,45,255,${opacity})`;
        context.fillText("Among all these days, I wait every week just to speak with you", canvas.width/2, canvas.height/2);
        opacity += 0.01;
    }

    if (f >= 1250 && f < 1500) {
        context.fillStyle = `rgba(45,45,255,${opacity})`;
        context.fillText("Among all these days, I wait every week just to speak with you", canvas.width/2, canvas.height/2);
        opacity -= 0.01;
    }

    if (f == 1500) opacity = 0;

    // ---- unlikely ----
    if (f > 1500 && f < 1750) {
        context.fillStyle = `rgba(45,45,255,${opacity})`;
        drawTextWithLineBreaks(
            ["As we spoke earlier, I have already added you to my best friend list", "I hope you have added me to yours too 😊"],
            canvas.width/2, canvas.height/2, fontSize, lineHeight
        );
        opacity += 0.01;
    }

    if (f >= 1750 && f < 2000) {
        context.fillStyle = `rgba(45,45,255,${opacity})`;
        drawTextWithLineBreaks(
            ["As we spoke earlier, I have already added you to my best friend list", "I hope you have added me to yours too 😊"],
            canvas.width/2, canvas.height/2, fontSize, lineHeight
        );
        opacity -= 0.01;
    }

    if (f == 2000) opacity = 0;

    // ---- impossible ----
    if (f > 2000 && f < 2250) {
        context.fillStyle = `rgba(45,45,255,${opacity})`;
        drawTextWithLineBreaks(
            ["At last, I promise you", "that I will always try to make you happy and never make you cry"],
            canvas.width/2, canvas.height/2, fontSize, lineHeight
        );
        opacity += 0.01;
    }

    if (f >= 2250 && f < 2500) {
        context.fillStyle = `rgba(45,45,255,${opacity})`;
        drawTextWithLineBreaks(
            ["At last, I promise you", "that I will always try to make you happy and never make you cry"],
            canvas.width/2, canvas.height/2, fontSize, lineHeight
        );
        opacity -= 0.01;
    }

    if (f == 2500) opacity = 0;

    /* ❤️ FINAL (SAME SCREEN, SEQUENTIAL) */

    // Love message
    if (f > 2500 && f < 2800) {
        context.fillStyle = `rgba(45,45,255,${opacity})`;
        drawTextWithLineBreaks(
            [
                "Here we come to the end of the page, but not my love!!",
                "Thank you for making time to listen to this small heart's feelings."
            ],
            canvas.width/2, canvas.height/2, fontSize, lineHeight
        );
        opacity += 0.01;
    }

    // Happy Valentine's (appears after, stays together)
    if (f >= 2800) {
        context.fillStyle = `rgba(45,45,255,${secondOpacity})`;

        drawTextWithLineBreaks(
            [
                "Here we come to the end of the page, but not my love!!",
                "Thank you for making time to listen to this small heart's feelings."
            ],
            canvas.width/2, canvas.height/2, fontSize, lineHeight
        );

        context.fillText(
            "I love you, Gayatri!! And Happy Valentine's Day ❤️",
            canvas.width/2,
            canvas.height/2 + 120
        );

        secondOpacity += 0.01;
        button.style.display = "block";
    }

    // reset shadow
    context.shadowColor = "transparent";
    context.shadowBlur = 0;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
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
    baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);
});

requestAnimationFrame(draw);
