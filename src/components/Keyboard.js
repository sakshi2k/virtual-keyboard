import React, { useState, useEffect } from "react";
import { KeyItem } from "./KeyItem";
import { keyTypes } from "./utilities/KeyBoardInterface.ts";

const Keyboard = ({ keysList, typeCharacter, clearAll}) => {

	const [newKey, emitKeyLetter] = useState("");
	const [newKeyEntered, setKeyEntered] = useState(false);
	const [capsOn, toggleCapsLock] = useState(false);
	const [renderedKeysList, setRenderedKeysList] = useState(keysList)
	
	useEffect(() => {
		if(capsOn) {
			renderedKeysList
				.map(eachLetterKey => {
					if(eachLetterKey.type===keyTypes[0]){
						eachLetterKey.name = eachLetterKey.name.toUpperCase()
					}
				});   
		} else {
			renderedKeysList
			.map(eachLetterKey => {
				if(eachLetterKey.type===keyTypes[0]){
						eachLetterKey.name = eachLetterKey.name.toLowerCase()
				}
			});  
		}
	},[capsOn]);

	useEffect(() => {
		if(newKeyEntered)
		typeCharacter(newKey);
		setKeyEntered(!newKeyEntered)
	},[newKey]);

	// Durstenfeld shuffle
	function shuffleArray(array) {
		console.log("shuffleLetters");
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}
	const shuffleLetters = (clickedKeyType) => {
		if(clickedKeyType === keyTypes[0]) {
			let letterKeysList = renderedKeysList.filter(eachKey => eachKey.type === keyTypes[0]);
			let nonLetterKeysList = renderedKeysList.filter(eachKey => eachKey.type !== keyTypes[0]);
			shuffleArray(letterKeysList);
			setRenderedKeysList([...letterKeysList, ...nonLetterKeysList]);
			console.log(renderedKeysList)
		}
	}

	const handleSpecialKeyClick = (keyName) => {
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
					handleAddCharacter(' ')
					break;
			case 'enter' :
					handleAddCharacter('\n')
					break;
			case 'clearAll' :
					clearAll(true)
					break;
		}
	}

	const handleAddCharacter = (char) => {
		setKeyEntered(true);
		emitKeyLetter(char);
	}

	return (
		<div className="keyboard-style">
			{renderedKeysList.map((keyItem, index) => 
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