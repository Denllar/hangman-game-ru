import '../css/style.css'
import { darkModeHandle } from './utills'
import { startGame } from './game'
darkModeHandle()


const animalsButton = document.getElementById('animals')
animalsButton.addEventListener('click', ()=>{
    document.getElementById('game').classList.add('flex-col')
    startGame('animals')
})

const countriesButton = document.getElementById('countries')
countriesButton.addEventListener('click', ()=>{
    document.getElementById('game').classList.add('flex-col')
    startGame('countries')
})

const colorsButton = document.getElementById('colors')
colorsButton.addEventListener('click', ()=>{
    document.getElementById('game').classList.add('flex-col')
    startGame('colors')
})

const fruitsButton = document.getElementById('fruits')
fruitsButton.addEventListener('click', ()=>{
    document.getElementById('game').classList.add('flex-col')
    startGame('fruits')
})

const vegetablesButton = document.getElementById('vegetables')
vegetablesButton.addEventListener('click', ()=>{
    document.getElementById('game').classList.add('flex-col')
    startGame('vegetables')
})


