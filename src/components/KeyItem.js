import React, { useState } from "react";
import { keyTypes } from "./utilities/KeyBoardInterface.ts";

const KeyItem = ({keyName, keyType, index, addCharacter, handleSpecialKeyClick, shuffleLetters}) => {
	const [capsLockOn, setCapsLock] = useState(false);

	// function to add key
	function addLetter(){
		addCharacter(keyName);
	}
	
	// function to handle click on alphabets keys
	function handleLettersClick() {
		addLetter();
		shuffleLetters(keyType);
	}
	
	// function to handle click on number keys
	function handleNumbersClick() {
		addLetter();
	}
	
	// function to handle click on special char keys
	function handleSpecialCharClick() {
		addLetter();
	}
	
	// function to handle click on any key 
	function handleAnyKeyClick() {
		switch(keyType) {
			case keyTypes[2] : 
				handleLettersClick();
				break;
			case keyTypes[0] : 
				handleNumbersClick();
				break;
			case keyTypes[1] : 
				handleSpecialCharClick();
				break;
			case keyTypes[3] :
			default: 
				if(keyName==='caps') setCapsLock(!capsLockOn);
				handleSpecialKeyClick(keyName);
		}
	}

	return (
		<button
			className={keyName==='space'?'btn-drop space-bar':'btn-drop'}
			style={{backgroundColor: keyName==='caps'&& capsLockOn?'yellow':''}}
			onClick={handleAnyKeyClick}>{keyName}</button>
	);     
};

export {KeyItem}; 