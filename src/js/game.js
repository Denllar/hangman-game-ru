import { WORDS, KEYBOARDS_LETTERS1, KEYBOARDS_LETTERS2, KEYBOARDS_LETTERS3 } from "./consts";

const gameDiv = document.getElementById("game");
const logoH1 = document.getElementById("logo");

let triesLeft
let winCount
const createPlaceholdersHTML = () => {
  const word = sessionStorage.getItem("word");
  const wordArray = Array.from("_".repeat(word.length));
  const placeholdersHTML = wordArray.reduce(
    (acc, curr, i) => acc + `<h1 id="letter_${i}" class="letter">_</h1>`,
    ""
  );
  return `<div id='placeholders' class='placeholders-wrapper'>${placeholdersHTML}</div>`;
};

const createKeyboard = () => {
  const keyboard = document.createElement("div");
  keyboard.classList.add("keyboard");
  keyboard.id = "keyboard";

  const keyboardHTML1 = KEYBOARDS_LETTERS1.reduce((acc, curr, i) =>acc + `<button id="${curr}" class="button-primary keyboard-button">${curr}</button>`,"");
  const keyboardHTML2 = KEYBOARDS_LETTERS2.reduce((acc, curr, i) =>acc + `<button id="${curr}" class="button-primary keyboard-button">${curr}</button>`,"");
  const keyboardHTML3 = KEYBOARDS_LETTERS3.reduce((acc, curr, i) =>acc + `<button id="${curr}" class="button-primary keyboard-button">${curr}</button>`,"");
  keyboard.innerHTML += `<div class="keyboard-button-div1 ">${keyboardHTML1}</div>`;
  keyboard.innerHTML += `<div class="keyboard-button-div2">${keyboardHTML2}</div>`;
  keyboard.innerHTML += `<div class="keyboard-button-div3">${keyboardHTML3}</div>`;
  return keyboard;
};

const createHangmanImg = () => {
  const image = document.createElement("img");
  image.alt = "Hangman Game";
  image.src = "images/hg-0.png";
  image.id = "hangman-img";
  image.classList.add("hangman-img");
  return image;
};

const checkLetter = (letter, category) => {
    const word = sessionStorage.getItem('word')
    const inputLetter = letter.toLowerCase()
    if (!word.includes(inputLetter)){
        const triesCounter = document.getElementById('tries-left')
        triesLeft -= 1
        triesCounter.innerText = triesLeft

        const hangmanImg = document.getElementById('hangman-img')
        hangmanImg.src = `images/hg-${10-triesLeft}.png`;

        if(triesLeft===0){
            stopGame('lose', category);
        }
    } else {
        const wordArray = Array.from(word)
        wordArray.forEach((currentLetter, i)=>{
            if (currentLetter === inputLetter) {
                winCount ++;
                if (winCount===word.length){
                    stopGame('win', category)
                    return;
                }
                document.getElementById(`letter_${i}`).innerText = inputLetter.toUpperCase()

            }
        })
    }
}

const stopGame = (status, category) => {
    document.getElementById('placeholders').remove();
    document.getElementById('tries').remove();
    document.getElementById('keyboard').remove();
    document.getElementById('quit').remove()

    const word = sessionStorage.getItem('word')
    if (status === 'win'){
        document.getElementById('hangman-img').src = 'images/hg-win.png';
        document.getElementById('game').innerHTML += '<h2 class="result-header win">Победа!</h2>';
    } else if (status==='lose'){
        document.getElementById('game').innerHTML += '<h2 class="result-header lose">Проигрыш :(((</h2>';
    } else if (status==='quit'){
        document.getElementById('hangman-img').remove()
        document.getElementById('logo').classList.remove('logo-sm')
    }

    document.getElementById('game').innerHTML += `<p class="mb-4">Было загадано: <span class="result-word font-bold">${word}</span></p><button id="play-again" class="button-primary">Играть снова</button>`
    document.getElementById('play-again').addEventListener('click', ()=>startGame(category));
}

const returnToHome = () => {
    gameDiv.innerHTML = ''
    logoH1.classList.remove("logo-sm");
    const categoryDiv = document.createElement('div')
    categoryDiv.id = 'category'
    gameDiv.appendChild(categoryDiv)

    categoryDiv.innerHTML += '<button id="animals" class="button-primary">Животные</button>';
    categoryDiv.innerHTML += '<button id="countries" class="button-primary">Страны</button>';
    categoryDiv.innerHTML += '<button id="colors" class="button-primary">Цвета</button>';
    categoryDiv.innerHTML += '<button id="fruits" class="button-primary">Фрукты</button>';
    categoryDiv.innerHTML += '<button id="vegetables" class="button-primary">Овощи</button>';

    document.getElementById('animals').addEventListener('click', ()=>startGame('animals'));
    document.getElementById('countries').addEventListener('click', ()=>startGame('countries'));
    document.getElementById('colors').addEventListener('click', ()=>startGame('colors'));
    document.getElementById('fruits').addEventListener('click', ()=>startGame('fruits'));
    document.getElementById('vegetables').addEventListener('click', ()=>startGame('vegetables'));
    
}

export const startGame = (category) => {
    triesLeft = 10
    winCount = 0
    logoH1.classList.add("logo-sm");
    const randomIndex = Math.floor(Math.random() * WORDS[category].length);
    const wordToGuess = WORDS[category][randomIndex];
    sessionStorage.setItem("word", wordToGuess);

    gameDiv.innerHTML = createPlaceholdersHTML();
    gameDiv.innerHTML +=
        '<p id="tries" class="mt-2">ОСТАЛОСЬ ПОПЫТОК: <span id="tries-left" class="font-medium text-red-600">10</span></p>';

    const keyboardDiv = createKeyboard();
    keyboardDiv.addEventListener("click", (event) => {
        if (event.target.tagName.toLowerCase() === 'button'){
            event.target.disabled = true;
            checkLetter(event.target.id, category)
        }
    });
    gameDiv.appendChild(keyboardDiv);
    gameDiv.prepend(createHangmanImg());
    gameDiv.insertAdjacentHTML('beforeend', '<button id="quit" class="button-secondary px-2 py-1 mt-4">Выход</button>')
    document.getElementById('quit').onclick = () => {
        const isSure = confirm('Ты уверен, что хочешь выйти и потерять результат?')
        if(isSure) {
            returnToHome()
        }
    }
};
