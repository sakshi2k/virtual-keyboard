import React, { useState, useEffect } from "react";
import { KeyItem } from "./KeyItem";
import { keyTypes } from "./utilities/KeyBoardInterface.ts";

const Keyboard = ({ keysList, typeCharacter, clearAll}) => {

    const [newKey, emitKeyLetter] = useState("");
    const [newKeyEntered, keyEntered] = useState(false);
    const [capsOn, toggleCapsLock] = useState(false);
    
    useEffect(() => {
        if(capsOn) {
            keysList
                // .filter(element => element.type===keyTypes[0])
                .map(eachLetterKey => {
                    if(eachLetterKey.type===keyTypes[0]){
                        eachLetterKey.name = eachLetterKey.name.toUpperCase()
                        console.log(eachLetterKey);
                    }
                });   
            } else {
                keysList
                // .filter(element => element.type===keyTypes[0])
                .map(eachLetterKey => {
                    if(eachLetterKey.type===keyTypes[0]){
                        eachLetterKey.name = eachLetterKey.name.toLowerCase()
                        console.log(eachLetterKey);
                    }
                });  
                 
        }
    },[capsOn]);

    useEffect(() => {
        if(newKeyEntered)
        typeCharacter(newKey);

        keyEntered(!newKeyEntered)
    },[newKey]);

    const shuffleLetters = () => {
        console.log("shuffleLetters")
    }

    const handleSpecialKeyClick = (keyName) => {
        // keyEntered(true);
        switch(keyName) {
            case 'caps' :
                toggleCapsLock(!capsOn);
                break;
            case 'shift' :
                toggleCapsLock(!capsOn);
                break;
            case 'delete' :
                clearAll(false);
                break;
            case 'space' :
                emitKeyLetter(' ')
                break;
            case 'enter' :
                emitKeyLetter('\n')
                break;
            case 'clearAll' :
                clearAll(true)
                break;
        }
    }

    const handleAddCharacter = (char) => {
        keyEntered(true);
        emitKeyLetter(char);
    }

    return (
        <div className="keyboard-style">
            {keysList.map((keyItem, index) => 
                <KeyItem 
                    key={index} 
                    keyName={keyItem.name} 
                    keyType={keyItem.type} 
                    addCharacter={handleAddCharacter}
                    handleSpecialKeyClick={handleSpecialKeyClick}
                    shuffleLetters={shuffleLetters}
                />)}
        </div>
    );
}

export default Keyboard;