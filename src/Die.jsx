/* eslint-disable react/prop-types */
// import React from "react"
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

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "lightskyblue" : "white"
    }
    
    function diceImgDisplay() {
        const icons = {
            1: faDiceOne,
            2: faDiceTwo,
            3: faDiceThree,
            4: faDiceFour,
            5: faDiceFive,
            6: faDiceSix
        }
        
        return <FontAwesomeIcon className="dice" icon={icons[props.value]} />;
    }
    
    return (
        <div 
            className="die-face" 
            style={styles}
            onClick={props.holdDice}
        >
            <h2 className="die-num">{diceImgDisplay()}</h2>
        </div>
    )
}