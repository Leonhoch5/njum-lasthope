if (typeof playerAnswers === "undefined") {
  var playerAnswers = {}; // Initialize playerAnswers object
}

// Save answers to session storage
function saveAnswers() {
  sessionStorage.setItem("playerAnswers", JSON.stringify(playerAnswers));
}

function loadLevel() {
  const weaponPrompt = {
    text: "Would you like to buy a new weapon for the AI?",
    imgSrc: "/assets/weapons/Icon28_21.png",
    yesButton: {
      text: "Yes",
      x: canvas.width / 2 - 50,
      y: canvas.height / 2 + 50,
      width: 100,
      height: 40,
    },
    noButton: {
      text: "No",
      x: canvas.width / 2 - 50,
      y: canvas.height / 2 + 100,
      width: 100,
      height: 40,
    },
  };

  function drawWeaponPrompt() {
    console.log("Drawing weapon prompt");
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.fillRect(canvas.width / 2 - 150, canvas.height / 2 - 100, 300, 300);

    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.font = "20px Arial";
    ctx.fillText(weaponPrompt.text, canvas.width / 2, canvas.height / 2 - 50);

    const img = new Image();
    img.src = weaponPrompt.imgSrc;
    img.onload = () => {
      ctx.drawImage(
        img,
        canvas.width / 2 - 50,
        canvas.height / 2 - 30,
        100,
        100
      );
    };

    ctx.fillStyle = "gray";
    ctx.fillRect(
      weaponPrompt.yesButton.x,
      weaponPrompt.yesButton.y,
      weaponPrompt.yesButton.width,
      weaponPrompt.yesButton.height
    );
    ctx.fillRect(
      weaponPrompt.noButton.x,
      weaponPrompt.noButton.y,
      weaponPrompt.noButton.width,
      weaponPrompt.noButton.height
    );

    ctx.fillStyle = "white";
    ctx.fillText(
      weaponPrompt.yesButton.text,
      weaponPrompt.yesButton.x + weaponPrompt.yesButton.width / 2,
      weaponPrompt.yesButton.y + 25
    );
    ctx.fillText(
      weaponPrompt.noButton.text,
      weaponPrompt.noButton.x + weaponPrompt.noButton.width / 2,
      weaponPrompt.noButton.y + 25
    );
  }

  function handleCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    console.log("Canvas clicked at:", x, y);

    if (
      x >= weaponPrompt.yesButton.x &&
      x <= weaponPrompt.yesButton.x + weaponPrompt.yesButton.width &&
      y >= weaponPrompt.yesButton.y &&
      y <= weaponPrompt.yesButton.y + weaponPrompt.yesButton.height
    ) {
      playerAnswers.buyNewWeapon = true;
      console.log("Yes button clicked:", playerAnswers.buyNewWeapon);
      saveAnswers(); // Save answers to session storage
      canvas.removeEventListener("click", handleCanvasClick);
      drawGame(); // Redraw the game without the prompt
    }

    if (
      x >= weaponPrompt.noButton.x &&
      x <= weaponPrompt.noButton.x + weaponPrompt.noButton.width &&
      y >= weaponPrompt.noButton.y &&
      y <= weaponPrompt.noButton.y + weaponPrompt.noButton.height
    ) {
      playerAnswers.buyNewWeapon = false;
      console.log("No button clicked:", playerAnswers.buyNewWeapon);
      saveAnswers(); // Save answers to session storage
      canvas.removeEventListener("click", handleCanvasClick);
      drawGame(); // Redraw the game without the prompt
    }
  }

  function drawGame() {
    console.log("Drawing game");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawWeaponPrompt();
  }

  console.log("Adding event listener for canvas clicks");
  canvas.addEventListener("click", handleCanvasClick);

  console.log("Initial draw");
  drawGame();

  // Ensure groundY is defined
  const groundY = canvas.height - 50; // Example value, adjust as needed
  // Define level-specific properties
  player.x = canvas.width / 4;
  player.y = groundY - player.height;
  ai.x = (canvas.width * 3) / 4;
  ai.y = groundY - ai.height;

  zombies.length = 0;
  checkpoints.length = 0;

  checkpoints.push({
    x: canvas.width / 2,
    y: groundY - 50,
    frame: 0,
    lastFrameChange: performance.now(),
    activated: false,
  });
  checkpoints.push({
    x: canvas.width / 1.5,
    y: groundY - 100,
    frame: 0,
    lastFrameChange: performance.now(),
    activated: false,
  });

  spawnZombieWave(5, 1000);
  moneyObjects.push({
    x: canvas.width / 2,
    y: groundY - 24,
    frame: 0,
    lastFrameChange: performance.now(),
    amount: 50,
  });

  doors.push({
    x: 150,
    y: groundY - 64,
    frame: 0,
    lastFrameChange: performance.now(),
    roomScript: "level1room1.js",
  });
}
