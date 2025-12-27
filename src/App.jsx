import { useState } from 'react'
import './App.css'
import languages from './Js/languages'

function App() {
    // State Variables
    const [currentWord, setCurrentWord] = useState('react')

    // Static Variables 
    const alphabets =  ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

    // Language Elements
    const languageElements = languages.map( (item, index) => {
        const styles = {
            backgroundColor: item.bgColor,
            color: item.color
        }
        return (
            <span 
                key={index}
                style={styles}
                className='chip'
            >{item.language}
            </span>
        )}
    )

    // Word Elements
    const wordElements = currentWord.split('').map((letter, index) => {
        return (
            <span key={index}>{letter.toUpperCase()}</span>
        )
    })

    // Keyboard buttons
    const keyboard = alphabets.map( letter => {
        return (
            <button key={letter}>{letter}</button>
        )
    })

    return (
        <main>
            {/* Header Section */}
            <section className="header">
                <h1>Assembly Endgame</h1>
                <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            </section>

            {/* Farewell message to indicate if the guess is wrong */}
            <section className="farewell-message">
                <div>
                    <p>Farewell HTML and CSS!</p>
                </div>
            </section>

            {/* Languages Section*/}
            <section className="language-chips">
                {languageElements}
            </section>

            {/* Guess Word Section */}
            <section className="word">
                {wordElements}
            </section>

            {/* Keyboard Section */}
            <section className="keyboard">
                {keyboard}
            </section>

            <button className='new-game-btn'>New Game</button>
        </main>
    )
}

export default App