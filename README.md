# Virtual Keyboard

### Link to Deployed Application:
https://virtual-keyboard-light.netlify.app/

## About the Project
This is a minimalistic virtual keyboard application built using React.js with Bootstrap 4 (for styling).
Project's purpose : SDE assesment at Commerce IQ.

## Project setup

```
1. Clone the repo
2. cd virtual-keyboard
3. npm install
4. npm run start
5. Open the project on localhost:3000
```

## Problem Statement of the Application

1. The virtual keyboard needs to facilitate numbers (1-5), special characters (any 5 character), and alphabets(A-O) along with space, delete, enter, shift and caps lock

2. The layout of the virtual keyboard has to be fixed, you can choose the layout specifications like a number of rows, what each row should hold, etc.

3. The keys need to rearrange in a random order as the user clicks on any key (Keeping the layout fixed).

4. If the user clicks the normal keys like alphabets or letters, the keys should change its position randomly.
Example → qwerty (before user clicked any key) → e (user pressed e) →  reuqy (keys after user pressed e key)

5. If the user clicks not the function keys like Caps, Shift - keys should stay in the same position.

    Example → qwerty (before user clicked caps) → Caps → QWERTY (Keys after user pressed Caps key)

6. On user interaction, have the sentence fed into a text area just above the keyboard.

7. Ensure keys like delete, shift, caps lock works as expected.


## Technology Stack

- React.js v17.0.2
- React-Bootstrap v2.2.1"(for styling)

#### Shuffling algorithm used :
Durstenfeld shuffle, an optimized version of Fisher-Yates jhn

#### More insights on the code :
- Modular code with reusable components.
    - each key is a seperate component
    - keyboard is itself a seperate component for better encapsulation of functionalities.
- Fixed layout for each key character type[alphabets, numbers, special characters, special keys(space, delete, enter, shift and caps lock)].
- Each layout is configurable.
- Additional "Clear All" button to reset complete text.
- Approach for better user experience (UX) encorporated.
- Functional components used majorly for all components except for main component (i.e App component) which is instead a Class component.
- Arrow functions used commonly for functionalities.
- React Hooks used vastly.


#### Future Scope of improvements : 
- system's keyboard's keys' click should be synced with the 
- styling for keys can be made configurable with better logic implementation.
- use of "KeysProperties" for maintain validation of the key's object data throughout the application. Refer : src/components/utilities/KeyBoardInterface.ts
- additional helper functionalities like:   
    - copy text to clipboard.