import React, { useState, useEffect, useCallback } from "react";
import { KeyItem } from "./KeyItem";
import { keyTypes } from "./utilities/KeyBoardInterface.ts";
import { Container, Row, Col } from "react-bootstrap";

const Keyboard = ({ keysList, typeCharacter, clearAll }) => {
	const [capsOn, toggleCapsLock] = useState(false);
	const [shiftOn, toggleShift] = useState(false);
	const [renderedKeysList, setRenderedKeysList] = useState(keysList);

	const filterKeys = useCallback((type, ofType) => {
		if(ofType)
			return renderedKeysList.filter(eachKey => eachKey.type === type);
		else return renderedKeysList.filter(eachKey => eachKey.type !== type);
	}, [renderedKeysList]);
	
	useEffect(() => {
		let letterKeysList = filterKeys(keyTypes[2], true);
		let nonLetterKeysList = filterKeys(keyTypes[2], false);
		letterKeysList.forEach((letterKey, idx) => {
			if(capsOn || shiftOn) letterKeysList[idx].name = letterKey.name.toUpperCase();
			else letterKeysList[idx].name =  letterKey.name.toLowerCase();
		});
		setRenderedKeysList([...letterKeysList, ...nonLetterKeysList]);
		// eslint-disable-next-line
	},[capsOn, shiftOn]);
	
	/**
	 * function to shuffle list of alphabet keys only
	 * Algorithm used : Durstenfeld shuffle
	 * @param array 
	 */
	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	/**
	 * logic for shuffle keys
	 * @param clickedKeyType type of key clicked
	 */
	const shuffleKeys = (clickedKeyType) => {
		if(clickedKeyType !== keyTypes[3]) {
			let firstKeysList = filterKeys(clickedKeyType, true);
			let secondKeysList = filterKeys(clickedKeyType, false);
			shuffleArray(firstKeysList);
			setRenderedKeysList([ ...firstKeysList, ...secondKeysList]);
		}
	}

	/**
	 * function to handle click on special keys
	 * @param keyName name of the key pressed
	 */
	const handleSpecialKeyClick = (keyName) => {
		switch(keyName) {
			case 'caps' :
				toggleCapsLock(!capsOn);
				break;
			case 'shift' :
				if(!capsOn)	toggleShift(true);
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
			case 'clear all' :
			default:
				clearAll(true)
				break;
		}
	}

	/**
	 * function to handle add character operation
	 * @param char 
	 */
	const handleAddCharacter = (char) => {
		typeCharacter(char);
		if(shiftOn)	toggleShift(false);
	}

	return (
		<Container>
			<Row>
				<Col xs={6}>
					{filterKeys(keyTypes[2], true).map((keyItem, index) =>
						<KeyItem
							key={index}
							keyName={keyItem.name}
							keyType={keyItem.type}
							addCharacter={handleAddCharacter}
							handleSpecialKeyClick={handleSpecialKeyClick}
							shuffleLetters={shuffleKeys}
						/>)}
				</Col>
				<Col xs={3}>
					{filterKeys(keyTypes[0], true).map((keyItem, index) =>
						<KeyItem
							key={index}
							keyName={keyItem.name}
							keyType={keyItem.type}
							addCharacter={handleAddCharacter}
							handleSpecialKeyClick={handleSpecialKeyClick}
							shuffleLetters={shuffleKeys}
						/>)}
				</Col>
				<Col xs={3}>
				 	{filterKeys(keyTypes[1], true).map((keyItem, index) =>
						<KeyItem
							key={index}
							keyName={keyItem.name}
							keyType={keyItem.type}
							addCharacter={handleAddCharacter}
							handleSpecialKeyClick={handleSpecialKeyClick}
							shuffleLetters={shuffleKeys}
						/>)}
				</Col>
				<Col xs={12}>
				 {filterKeys(keyTypes[3], true).map((keyItem, index) =>
						<KeyItem
							key={index}
							keyName={keyItem.name}
							keyType={keyItem.type}
							addCharacter={handleAddCharacter}
							handleSpecialKeyClick={handleSpecialKeyClick}
							shuffleLetters={shuffleKeys}
						/>)}
				</Col>
			</Row>
		</Container>
	);
}

export default Keyboard;