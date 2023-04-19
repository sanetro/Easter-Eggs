setInterval(() => {
  const game = document.querySelector("#game");

  const egg = new Image();
  egg.addEventListener("load", () => {
    egg.classList.add("egg");
    const x = Math.round(Math.random() * (120 - (5 * egg.width / egg.height)));
    egg.style.left = x + "vh";
    game.appendChild(egg);
  });

  egg.src = "images/easter-653985_640.png";
}, 1000);

setInterval(() => {
  document.querySelectorAll("#game > .egg").forEach(egg => {
    const top = egg.style.top.length !== 0 ? parseFloat(egg.style.top) : 0;
    console.log(egg.style.top);
    egg.style.top = (top + 0.5) + "vh";

    if(parseFloat(egg.style.top) > 100) {
      const basket = document.querySelector("#game > .basket");
      const basketX = parseFloat(basket.style.left);
      const eggX= parseFloat(egg.style.left);
      const eggWidth= (5 * egg.widt / egg.height);
    }else if(parseFloat(egg.style.top) > 100) {
      egg.remove();

      const heart = document.querySelector(".heart");
      heart.remove();
      if(!document.querySelector(".heart")) {
        alert("Game Over!");
        window.location.reload();
      }
    }
  })
}, 30 / 1000);

document.body.addEventListener("keydown", event => {
  const basket = document.querySelector("#game > .basket");
  switch (event.key) {
    case "ArrowLeft":
      basket.style.left = updatePosition(basket.style.left, -1);
      break;
    case "ArrowRight":
      basket.style.left = updatePosition(basket.style.left, 1);
      break;
  }
})

function updatePosition(position, delta) {
  const top = position.length !== 0 ? parseFloat(position) : 0;
  return (top + delta) + "vh";
}
