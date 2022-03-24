import React, { useState, useEffect } from "react";
import { KeyItem } from "./KeyItem";
import { keyTypes } from "./utilities/KeyBoardInterface.ts";
import { Container, Row, Col } from "react-bootstrap";

const Keyboard = ({ keysList, typeCharacter, clearAll }) => {
	const [capsOn, toggleCapsLock] = useState(false);
	const [shiftOn, toggleShift] = useState(false);
	const [renderedKeysList, setRenderedKeysList] = useState(keysList)
	
	useEffect(() => {
		let letterKeysList = getAlphabetKeys();
		let nonLetterKeysList = getNonAlphabetKeys();
		letterKeysList.forEach((letterKey, idx) => {
			if(capsOn || shiftOn) letterKeysList[idx].name = letterKey.name.toUpperCase();
			else letterKeysList[idx].name =  letterKey.name.toLowerCase();
		});
		setRenderedKeysList([...letterKeysList, ...nonLetterKeysList]);
	},[capsOn, shiftOn]);

	// Durstenfeld shuffle
	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			let j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	const shuffleKeys = (clickedKeyType) => {
		if(clickedKeyType === keyTypes[2]) {
			let letterKeysList = getAlphabetKeys();
			let nonLetterKeysList = getNonAlphabetKeys();
			shuffleArray(letterKeysList);
			setRenderedKeysList([ ...letterKeysList, ...nonLetterKeysList]);
		}
	}

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
				clearAll(true)
				break;
		}
	}

	const handleAddCharacter = (char) => {
		typeCharacter(char);
		if(shiftOn)	toggleShift(false);
	}

	const getAlphabetKeys = () => {
		return renderedKeysList.filter(eachKey => eachKey.type === keyTypes[2]);;
	}

	const getNonAlphabetKeys = () => {
		return renderedKeysList.filter(eachKey => eachKey.type !== keyTypes[2]);
	}

	const getNumericKeys = () => {
		return renderedKeysList.filter(eachKey => eachKey.type === keyTypes[0]);;
	}

	const getSpecialCharKeys = () => {
		return renderedKeysList.filter(eachKey => eachKey.type === keyTypes[1]);
	}

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