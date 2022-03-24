import React, { useState } from "react";
import { keyTypes } from "./utilities/KeyBoardInterface.ts";

const KeyItem = ({keyName, keyType, index, addCharacter, handleSpecialKeyClick, shuffleLetters}) => {
	const [capsLockOn, setCapsLock] = useState(false);

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