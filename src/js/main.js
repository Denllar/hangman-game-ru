import '../css/style.css'
import { darkModeHandle } from './utills'
import { startGame} from './game'
darkModeHandle()

const startGameButton = document.getElementById('startGame')
startGameButton.addEventListener('click', ()=>{
    startGame()
})
