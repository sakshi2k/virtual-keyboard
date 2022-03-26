import React, { useState, useEffect, useCallback } from "react";
import { KeyItem } from "./KeyItem";
import { keyTypes } from "./utilities/KeyBoardInterface.ts";
import { Container, Row, Col } from "react-bootstrap";

const Keyboard = ({ keysList, typeCharacter, clearAll }) => {
	const [capsOn, toggleCapsLock] = useState(false);
	const [shiftOn, toggleShift] = useState(false);
	const [renderedKeysList, setRenderedKeysList] = useState(keysList)

	/* filters out alphabet keys */
	const getAlphabetKeys = useCallback(() => {
		return renderedKeysList.filter(eachKey => eachKey.type === keyTypes[2]);;
	}, [renderedKeysList]);
	
	/* filters out non alphabet keys */
	const getNonAlphabetKeys = useCallback(() => {
		return renderedKeysList.filter(eachKey => eachKey.type !== keyTypes[2]);
	}, [renderedKeysList]);
	
	useEffect(() => {
		let letterKeysList = getAlphabetKeys();
		let nonLetterKeysList = getNonAlphabetKeys();
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
		if(clickedKeyType === keyTypes[2]) {
			let letterKeysList = getAlphabetKeys();
			let nonLetterKeysList = getNonAlphabetKeys();
			shuffleArray(letterKeysList);
			setRenderedKeysList([ ...letterKeysList, ...nonLetterKeysList]);
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

	// getter for all number keys
	const getNumericKeys = () => {
		return renderedKeysList.filter(eachKey => eachKey.type === keyTypes[0]);;
	}
	
	// getter for all special char keys
	const getSpecialCharKeys = () => {
		return renderedKeysList.filter(eachKey => eachKey.type === keyTypes[1]);
	}
	
	// getter for all special keys
	const getSpecialKeys = () => {
		return renderedKeysList.filter(eachKey => eachKey.type === keyTypes[3]);
	}

	return (
		<Container>
			<Row>
				<Col xs={6}>
					{getAlphabetKeys().map((keyItem, index) =>
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
					{getNumericKeys().map((keyItem, index) =>
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
					{getSpecialCharKeys().map((keyItem, index) =>
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
					{getSpecialKeys().map((keyItem, index) =>
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