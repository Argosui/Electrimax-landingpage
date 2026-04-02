const btnRight = document.getElementById("btnright");

let cardCounter = 1;

btnRight.addEventListener("click", slideRight);

function slideRight() {

  const actualCard = document.getElementById(`review${cardCounter}`);
  actualCard.classList.toggle("hidden");

  if (cardCounter == 4){
    cardCounter = 1;
  } else {
    cardCounter += 1;
  }
  
  const nextCard = document.getElementById(`review${cardCounter}`);
  nextCard.classList.toggle("hidden");
}

