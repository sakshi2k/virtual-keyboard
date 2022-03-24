import React, { useState } from "react";
import { keyTypes } from "./utilities/KeyBoardInterface.ts";

const KeyItem = ({keyName, keyType, index, addCharacter, handleSpecialKeyClick, shuffleLetters}) => {
    // const [specialKeySelected, handleSpecialKeySelected] = useState('');

    function addLetter(){
        addCharacter(keyName);
    }

    function handleLettersClick() {
        addLetter();
        shuffleLetters(keyType);
    }

    function handleNumbersClick() {
        addLetter();
    }

    function handleSpecialCharClick() {
        addLetter();
    }

    function handleAnyKeyClick() {
        switch(keyType) {
            case keyTypes[0] : 
                handleLettersClick();
                break;
            case keyTypes[1] : 
                handleNumbersClick();
                break;
            case keyTypes[2] : 
                handleSpecialCharClick();
                break;
            case keyTypes[3] :
            default: handleSpecialKeyClick(keyName);
        }
    }

    return (
        <button className={keyName==='space'?'btn-drop space-bar':'btn-drop'} onClick={handleAnyKeyClick}>{keyName}</button>
    );     
};

export { KeyItem }; 