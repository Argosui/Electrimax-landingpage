const btnRight = document.getElementById("btnright");

let cardCounter = 1;
intervalo = setInterval(slideRight,5000);

btnRight.addEventListener("click", ()=>{
  slideRight();

  clearInterval(intervalo);
  intervalo = setInterval(slideRight,5000);
});

function slideRight() {

  const actualCard = document.getElementById(`review${cardCounter}`);
  actualCard.classList.toggle("active");


  if (cardCounter == 4){
    cardCounter = 1;
  } else {
    cardCounter += 1;
  }
  
  const nextCard = document.getElementById(`review${cardCounter}`);
  nextCard.classList.toggle("active");
}

