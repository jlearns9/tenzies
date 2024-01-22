import React from "react"
import Die from "./Die"
import Stopwatch from "./Stopwatch"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
        faDiceOne, 
        faDiceTwo, 
        faDiceThree, 
        faDiceFour, 
        faDiceFive, 
        faDiceSix 
    } 
from '@fortawesome/free-solid-svg-icons'


export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [totalRolls, setTotalRolls] = React.useState(0)
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(!tenzies) {
            setTotalRolls(prevRolls => prevRolls + 1)
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setTotalRolls(0)
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti />}
            <div className="flex">
                <FontAwesomeIcon className="bottom-dice" icon={faDiceOne} />
                <FontAwesomeIcon className="bottom-dice" icon={faDiceTwo} />
                <FontAwesomeIcon className="bottom-dice" icon={faDiceThree} />
                <h1 className="title">Tenzies</h1>
                <FontAwesomeIcon className="bottom-dice" icon={faDiceFour} />
                <FontAwesomeIcon className="bottom-dice" icon={faDiceFive} />
                <FontAwesomeIcon className="bottom-dice" icon={faDiceSix} />
            </div>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
            <div>Total Rolls: {totalRolls}</div>
            <Stopwatch tenzies={tenzies} />
        </main>
    )
}