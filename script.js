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

// Initialize stars with random opacity values
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

function drawStars() {
    for (var i = 0; i < stars; i++) {
        var star = starArray[i];

        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 360);
        context.fillStyle = "hsla(" + star.hue + ", " + star.sat + "%, 88%, " + star.opacity + ")";
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

const button = document.getElementById("valentinesButton");

button.addEventListener("click", () => {
  if (button.textContent === "Click Me! ❤") {
    button.textContent = "loading...";
    fetch('send_mail.php')
      .then(response => {
        if (response.ok) {
          button.textContent = "Check Your Email 🙃";
        } else {
          console.error('Failed to send email');
          button.textContent = "Error 😞";
        }
      })
      .catch(error => {
        // Handle network errors or other issues
        console.error('Error:', error);
        button.textContent = "Error 😞";
      });
  }
});

function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
    lines.forEach((line, index) => {
        context.fillText(line, x, y + index * (fontSize + lineHeight));
    });
}

function drawText() {
    var fontSize = Math.min(30, window.innerWidth / 24);
    var lineHeight = 8;

    context.font = fontSize + "px Comic Sans MS";
    context.textAlign = "center";

    // glow effect
    context.shadowColor = "rgba(45, 45, 255, 1)";
    context.shadowBlur = 8;

    // 0–250
    if (frameNumber < 250) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("Hi Gayatri, on this special Valentine’s Day", canvas.width / 2, canvas.height / 2);
        opacity += 0.01;
    }

    if (frameNumber >= 250 && frameNumber < 500) {
        context.fillText("Hi Gayatri, on this special Valentine’s Day", canvas.width / 2, canvas.height / 2);
        opacity -= 0.01;
    }

    if (frameNumber == 500) opacity = 0;

    // 500–750
    if (frameNumber > 500 && frameNumber < 750) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("I want to first thank you for choosing me over billions of people", canvas.width / 2, canvas.height / 2);
        opacity += 0.01;
    }

    if (frameNumber >= 750 && frameNumber < 1000) {
        context.fillText("I want to first thank you for choosing me over billions of people", canvas.width / 2, canvas.height / 2);
        opacity -= 0.01;
    }

    if (frameNumber == 1000) opacity = 0;

    // 1000–1250
    if (frameNumber > 1000 && frameNumber < 1250) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("These are a few of my feelings which I want to share with you", canvas.width / 2, canvas.height / 2);
        opacity += 0.01;
    }

    if (frameNumber >= 1250 && frameNumber < 1500) {
        context.fillText("These are a few of my feelings which I want to share with you", canvas.width / 2, canvas.height / 2);
        opacity -= 0.01;
    }

    if (frameNumber == 1500) opacity = 0;

    // 1500–1750
    if (frameNumber > 1500 && frameNumber < 1750) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("You really looked like an angel when I first saw you ❤", canvas.width / 2, canvas.height / 2);
        opacity += 0.01;
    }

    if (frameNumber >= 1750 && frameNumber < 2000) {
        context.fillText("You really looked like an angel when I first saw you ❤", canvas.width / 2, canvas.height / 2);
        opacity -= 0.01;
    }

    if (frameNumber == 2000) opacity = 0;

    // 2000–2250
    if (frameNumber > 2000 && frameNumber < 2250) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("From the day you accepted me, everyday I cannot believe how lucky I am", canvas.width / 2, canvas.height / 2);
        opacity += 0.01;
    }

    if (frameNumber >= 2250 && frameNumber < 2500) {
        context.fillText("From the day you accepted me, everyday I cannot believe how lucky I am", canvas.width / 2, canvas.height / 2);
        opacity -= 0.01;
    }

    if (frameNumber == 2500) opacity = 0;

    // 2500–2750
    if (frameNumber > 2500 && frameNumber < 2750) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("I promise you that I will always try to make you happy and never make you cry", canvas.width / 2, canvas.height / 2);
        opacity += 0.01;
    }

    if (frameNumber >= 2750 && frameNumber < 3000) {
        context.fillText("I promise you that I will always try to make you happy and never make you cry", canvas.width / 2, canvas.height / 2);
        opacity -= 0.01;
    }

    if (frameNumber == 3000) opacity = 0;

    // 3000–3250
    if (frameNumber > 3000 && frameNumber < 3250) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        drawTextWithLineBreaks(
            ["Amongst trillions and trillions of stars,", "over billions of years"],
            canvas.width / 2,
            canvas.height / 2,
            fontSize,
            lineHeight
        );
        opacity += 0.01;
    }

    if (frameNumber >= 3250 && frameNumber < 3500) {
        drawTextWithLineBreaks(
            ["Amongst trillions and trillions of stars,", "over billions of years"],
            canvas.width / 2,
            canvas.height / 2,
            fontSize,
            lineHeight
        );
        opacity -= 0.01;
    }

    if (frameNumber == 3500) opacity = 0;

    // 3500–3750
    if (frameNumber > 3500 && frameNumber < 3750) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("To be alive, and to get to spend this life with you", canvas.width / 2, canvas.height / 2);
        opacity += 0.01;
    }

    if (frameNumber >= 3750 && frameNumber < 4000) {
        context.fillText("To be alive, and to get to spend this life with you", canvas.width / 2, canvas.height / 2);
        opacity -= 0.01;
    }

    if (frameNumber == 4000) opacity = 0;

    // 4000–4250
    if (frameNumber > 4000 && frameNumber < 4250) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText("Is so incredibly, unfathomably unlikely", canvas.width / 2, canvas.height / 2);
        opacity += 0.01;
    }

    if (frameNumber >= 4250 && frameNumber < 4500) {
        context.fillText("Is so incredibly, unfathomably unlikely", canvas.width / 2, canvas.height / 2);
        opacity -= 0.01;
    }

    if (frameNumber == 4500) opacity = 0;

    // 4500+
    if (frameNumber > 4500) {
        context.fillStyle = `rgba(45, 45, 255, ${opacity})`;
        context.fillText(
            "I love you so much Gayatri, more than all the time and space in the universe can contain",
            canvas.width / 2,
            canvas.height / 2
        );
        opacity += 0.005;
    }

    if (frameNumber > 4750) {
        context.fillStyle = `rgba(45, 45, 255, ${secondOpacity})`;
        context.fillText(
            "And I can't wait to spend all the time in the world to share that love with you!",
            canvas.width / 2,
            canvas.height / 2 + 50
        );
        secondOpacity += 0.005;
    }

    if (frameNumber > 5000) {
        context.fillStyle = `rgba(45, 45, 255, ${thirdOpacity})`;
        context.fillText("Happy Valentine's Day <3", canvas.width / 2, canvas.height / 2 + 110);
        thirdOpacity += 0.005;
        button.style.display = "block";
    }

    // reset glow
    context.shadowBlur = 0;
}

function draw() {
    context.putImageData(baseFrame, 0, 0);

    drawStars();
    updateStars();
    drawText();

    if (frameNumber < 99999) {
        frameNumber++;
    }
    window.requestAnimationFrame(draw);
}

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);
});

window.requestAnimationFrame(draw);
