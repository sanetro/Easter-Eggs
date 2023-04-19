class Game {

  constructor(endGame) {
    this.endGame = endGame;
  }

  start() {
    // Get the div where must be game
    const game = document.getElementById("game");
    game.style.display = "block";

    this.resetHearts();

    document.querySelectorAll("#game > .egg").forEach(egg => {
      egg.remove();
    });

    document.querySelector("#basket").style.left = "60vh";

    this.eggCreator = setInterval(() => {
      const game = document.querySelector("#game");

      // Set up eggs on top where horizontal position is randomly
      const egg = new Image();
      egg.addEventListener("load", () => {
        egg.classList.add("egg");
        const x = Math.round(Math.random() * (120 - (5 * egg.width / egg.height)));
        egg.style.left = x + "vh";
        game.appendChild(egg);
      });

      egg.src = "images/easter-653985_640.png";
    }, 1000);

    // Falling eggs
    this.eggTick = setInterval(() => {
      document.querySelectorAll("#game > .egg").forEach(egg => {
        egg.style.top = this.updatePosition(egg.style.top, 0.2);

        // Egg hit basket - score +1
        if(parseFloat(egg.style.top) > 87 && parseFloat(egg.style.top) <= 100) {
          const basket = document.querySelector("#basket");
          const basketX = parseFloat(basket.style.left);
          const eggX = parseFloat(egg.style.left);
          const eggWidth = (5 * egg.width / egg.height);

          if(eggX + eggWidth > basketX - 10 && eggX < basketX + 10) {
            egg.remove();
            const score = document.getElementById("score");
            score.innerText = parseInt(score.innerText) + 1 + "";
          }
        }

        // Dropped egg - missed egg
        else if(parseFloat(egg.style.top) > 100) {
          egg.remove();

          const heart = document.querySelector(".heart");
          heart.remove();
          if(!document.querySelector(".heart")) {
            this.stop();
            this.endGame.show(document.getElementById("score").innerText)
          }
        }
      })
    }, 30 / 1000);

    document.body.addEventListener("keydown", event => this.onKeyDown(event));
  }

  resetHearts() {
    const life = document.querySelector("#life");
    life.innerHTML = "";
    for(let i = 0;i < 3;++i) {
      const heart = new Image();
      heart.classList.add("heart")
      heart.src = "images/WikiFont_uniE033_-_heart_-_red.svg";
      life.appendChild(heart);
    }
  }

  // Listener of moving basket
  onKeyDown(event) {
    const basket = document.querySelector("#basket");
    switch (event.key) {
      case "ArrowLeft":
        basket.style.left = this.updatePosition(basket.style.left, -3);
        break;
      case "ArrowRight":
        basket.style.left = this.updatePosition(basket.style.left, 3);
        break;
    }

    // Left border
    if(parseFloat(basket.style.left) < 10) {
      basket.style.left = "10vh";
    }
    // Right border
    if(parseFloat(basket.style.left) > 110) {
      basket.style.left = "110vh";
    }
  }

  // Display basket and eggs in new location
  updatePosition(position, delta) {
    const top = position.length !== 0 ? parseFloat(position) : 0;
    return (top + delta) + "vh";
  }

  stop() {
    clearInterval(this.eggCreator);
    clearInterval(this.eggTick);
    document.body.removeEventListener("keydown", this.onKeyDown); // freeze / stop game
    const game = document.getElementById("game");
    game.style.display = "none";
  }
}
