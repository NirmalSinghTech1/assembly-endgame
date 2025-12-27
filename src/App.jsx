import { useState } from 'react'
import clsx from 'clsx'
import './App.css'
import languages from './Js/languages'

function App() {
    // State Variables
    const [currentWord, setCurrentWord] = useState('react')
    const [guessedLetters, setGuessedLetters] = useState([])

    // Derived Variables
    const wrongGuessCount = guessedLetters.filter(letter => !currentWord.split('').includes(letter)).length
    console.log(wrongGuessCount)
    // Static Variables 
    const alphabets =  ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

    // Get currently selected letter from keyboard
    function handleGuessedLetter(letter) {
        setGuessedLetters(prevLetters => 
            prevLetters.includes(letter) ? [...prevLetters] :
            [...prevLetters, letter.toLowerCase()]
        )
    }
    console.log(guessedLetters)

    // Language Elements
    const languageElements = languages.map( (item, index) => {
        const styles = {
            backgroundColor: item.bgColor,
            color: item.color
        }

        const className = clsx('chip', {
            wrong: index < wrongGuessCount
        })

        return (
            <span 
                key={index}
                style={styles}
                className={className}
            >{item.language}
            </span>
        )}
    )

    // Word Elements
    const wordElements = currentWord.split('').map((letter, index) => {
        return (
            <span key={index}>
                {guessedLetters.includes(letter.toLowerCase()) 
                ? letter.toUpperCase() 
                : ""}
            </span>
        )
    })

    // Keyboard buttons
    const keyboard = alphabets.map( letter => {
        const className = clsx({
            correct: guessedLetters.includes(letter) && currentWord.split('').includes(letter),
            incorrect: guessedLetters.includes(letter) && !currentWord.includes(letter)
        })

        return (
            <button 
                onClick={() => handleGuessedLetter(letter)} 
                key={letter}
                className={className}
            >{letter.toUpperCase()}
            </button>
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
            <section className={clsx('keyboard', {
                disable: wrongGuessCount === languages.length - 1
            })}>
                {keyboard}
            </section>

            <button className='new-game-btn'>New Game</button>
        </main>
    )
}

export default App