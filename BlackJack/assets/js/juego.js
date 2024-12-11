const newGameButton = document.getElementById('newGameButton');
const hitButton = document.getElementById('hitButton');
const standButton = document.getElementById('standButton');
const element = document.querySelectorAll('small');
const cardPlayerDiv = document.querySelector('#jugador-cartas');
const cardSystemDiv = document.querySelector('#computadora-cartas');

let deck = [];

const types = ['C', 'D', 'H', 'S'];
const specials = ['A', 'J', 'Q', 'K'];

let playerScore = 0,
    systemScore = 0;


const createDeck = () => {

    for (let i = 2; i <= 10; i++) { 
        for (let type of types) {
            deck.push(i + type);
        }
    }

    for (let type of types) {
        for (let spc of specials) {
            deck.push(spc + type);
        }
    }

    deck = _.shuffle( deck );
    console.log(deck);
    return deck;
};

createDeck();

const pedirCarta = () => {
    if (deck.length === 0) {
        alert('No hay cartas en el mazo');
    }

    let card = deck.pop();
    return card;
};

const cardValue = (card) => {
    const value = card.substring(0, card.length - 1);
    return ( isNaN (value)) ? 
            ( value === 'A' ) ? 11 : 10
            : value * 1;
};

const systemTurn = (minimumScore) => {
  if (minimumScore > 21) {
    return;
  }

  let delay = 1000; 
  let index = 0;

  const addCard = () => {
    const card = pedirCarta();
    systemScore = systemScore + cardValue(card);
    element[1].innerText = systemScore;

    const cardImage = document.createElement("img");
    cardImage.src = `assets/cartas/${card}.png`;
    cardImage.classList.add("carta");
    cardSystemDiv.append(cardImage);

    index++;

    if (systemScore < minimumScore && systemScore <= 21) {
      setTimeout(addCard, delay);
    } else {
      setTimeout(() => {
        if (systemScore > 21) {
          alert("La computadora se pasó de 21. Has ganado!");
        } else if (systemScore === minimumScore) {
          alert("Es un empate!");
        } else if (systemScore > minimumScore && systemScore <= 21) {
          alert("La computadora ha ganado!");
        }
      }, delay);  
    }
  };

  addCard(); 
};
  
  

hitButton.addEventListener("click", () => {
    const card = pedirCarta();

    playerScore = playerScore + cardValue(card);
    element[0].innerText = playerScore;

    const cardImage = document.createElement('img');
    cardImage.src = `assets/cartas/${card}.png`;
    cardImage.classList.add('carta');
    cardPlayerDiv.append(cardImage);

    setTimeout(() => {
        if (playerScore > 21) {
            alert('¡Te has pasado de 21! Has perdido.');
            hitButton.disabled = true;  
            standButton.disabled = true;  
            systemTurn(playerScore);

        } else if (playerScore === 21) {
            alert('¡Felicidades, tienes 21!');
            hitButton.disabled = true;  
            standButton.disabled = true;  
            systemTurn(playerScore);
        }
    }, 100); 
});

standButton.addEventListener("click", () => {
    hitButton.disabled = true;  
    standButton.disabled = true;  
    systemTurn(playerScore); 
});

newGameButton.addEventListener("click", () => {
    hitButton.disabled = false;  
    standButton.disabled = false; 
    playerScore = 0;
    systemScore = 0;
    element[0].innerText = playerScore;
    element[1].innerText = systemScore;

    cardPlayerDiv.innerHTML = ''; 
    cardSystemDiv.innerHTML = ''; 

    deck = createDeck();
});
