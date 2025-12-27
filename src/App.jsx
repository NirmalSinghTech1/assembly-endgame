import { useState } from 'react'
import Confetti from 'react-confetti'
import clsx from 'clsx'
import './App.css'
import languages from './Js/languages'
import getFarewellMessage from './Js/utils'
import { getRandomWord } from './Js/utils'

// Static Variable
const alphabets =  ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]

function App() {
    // State Variables
    const [currentWord, setCurrentWord] = useState(() => getRandomWord())
    const [guessedLetters, setGuessedLetters] = useState([])

    // Derived Variables
    const wrongGuessCount = guessedLetters.filter(letter => !currentWord.split('').includes(letter)).length
    const isGameWon = currentWord.split('').every(letter => guessedLetters.includes(letter))
    const isGameLost = wrongGuessCount === languages.length - 1
    const isGameOver = isGameWon || isGameLost
    const isGuessWrong = guessedLetters.length > 0 && !currentWord.split('').includes(guessedLetters[guessedLetters.length - 1])
    

    // Get currently selected letter from keyboard
    function handleGuessedLetter(letter) {
        setGuessedLetters(prevLetters => 
            prevLetters.includes(letter) ? [...prevLetters] :
            [...prevLetters, letter.toLowerCase()]
        )
    }

    // Start New Game
    function startNewGame() {
        setCurrentWord(getRandomWord())        
        setGuessedLetters([])
    }

    // Show farewell messages when the user guessed wrong letter
    function farwellMessages() {
        if(!isGameOver) {
            return (
                <div>
                    <p>{wrongGuessCount > 0 ? getFarewellMessage(languages[wrongGuessCount - 1].language) : null}</p>
                </div>
            )
        }

        if(isGameWon) {
            return (
                <div className='won'>
                    <p>You Won!</p>
                    <p>Well done! 🎉</p>
                </div>
            )
        } 

        if(isGameLost) {
            return (
            <div className='lost'>
                <p>Game Over!</p>
                <p>You lose! Better start learning Assembly 😭</p>
            </div>
        )}
    }

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
            <span key={index} style={{color: isGameLost && !guessedLetters.includes(letter) ? "#EC5D49" : null}}>
                {guessedLetters.includes(letter.toLowerCase()) || isGameLost
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
                aria-disabled={guessedLetters.includes(letter)}
                aria-label={`letter ${letter}`}
            >{letter.toUpperCase()}
            </button>
        )
    })
    
    return (
        <main>
            {isGameWon ? <Confetti numberOfPieces={300} /> : null}
            
            {/* Header Section */}
            <section className="header">
                <h1>Assembly Endgame</h1>
                <p>Guess the word in under 8 attempts to keep the programming world safe from Assembly!</p>
            </section>

            {/* Farewell message to indicate if the guess doesn't match */}
            <section className="farewell-message" aria-live='polite' role='status'>
                {isGuessWrong || isGameOver ? farwellMessages() : null}
            </section>
            
            {/* Languages Section*/}
            <section className="language-chips">
                {languageElements}
            </section>

            {/* Guess Word Section */}
            <section className="word" aria-live='polite'>
                {wordElements}
            </section>
            
            {/* Status section for screen readers only */}
            <section className='sr-only' role='status' aria-live='polite'>
                <p>
                    {currentWord.includes(guessedLetters[guessedLetters.length-1]) ?
                        `Correct! The letter ${guessedLetters[guessedLetters.length-1]} is in the word` :
                        `Sorry! The letter ${guessedLetters[guessedLetters.length-1]} is not in the word`
                    }
                    You have {(languages.length-1) - wrongGuessCount} attempts left.
                </p>
                <p>Current Word: {currentWord.split('').map(letter => 
                    guessedLetters.includes(letter) ? letter : "blank"
                ).join(' ')}</p>
            </section>

            {/* Keyboard Section */}
            <section 
                className={clsx('keyboard', {
                disable: isGameOver
                })}
            >
                {keyboard}
            </section>

            {/* New Game Button */}
            <section className='new-game' aria-live='polite'>
                {isGameOver ? <button onClick={startNewGame} className='new-game-btn'>New Game</button> : null}
            </section>
        </main>
    )
}

export default App