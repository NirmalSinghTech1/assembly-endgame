// import { useState } from 'react'
import './App.css'
import alphabets from './Js/alphabets'

function App() {
  const word = 'refactor'.split('').map( (char, index) => {
    return <span key={index} className='char'>{char.toUpperCase()}</span>
  })

  return (
    <main>
      <div className='header'>
        <h1 className='title'>Assembly: Endgame</h1>
        <p className='description'>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
        <div className='popup-message-container'>
          <h2>You Win!</h2>
          <p>Well done!🎉</p>
        </div>
      </div>
      <div className='languages-container'>
        <span style={{backgroundColor: "#E2680F"}}>HTML</span>
        <span style={{backgroundColor: "#328AF1"}}>CSS</span>
        <span style={{backgroundColor: "#F4EB13", color: "#1E1E1E"}}>JavaScript</span>
        <span style={{backgroundColor: "#2ED3E9", color: "#1E1E1E"}}>React</span>
        <span style={{backgroundColor: "#298EC6"}}>TypeScript</span>
        <span style={{backgroundColor: "#599137"}}>Node.js</span>
        <span style={{backgroundColor: "#FFD742", color: "#1E1E1E"}}>Python</span>
        <span style={{backgroundColor: "#D02B2B"}}>Ruby</span>
        <span style={{backgroundColor: "#2D519F"}}>Assembly</span>
      </div>
      <div className='word-container'>
       {word}
      </div>
      <div className='keyboard'>
        {alphabets.map( item => {
          return <button key={item}>{item}</button>
        })}
      </div>
      <button className='new-game-button'>New Game</button>
    </main>
  )
}

export default App
