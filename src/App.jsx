import * as React from "react";
import Keyboard from "./components/Keyboard";
import keysLists from "./components/utilities/keysUtilities";
import "./App.css";

class App extends React.Component {
  constructor( props ){
    super(props);
    this.state = {
      typedWord : "",
      staticText : "Click keys to start typing..",
    };
    this.typeCharacter = this.typeCharacter.bind(this);
    this.getTypedWord = this.getTypedWord.bind(this);
    this.clearAll = this.clearAll.bind(this);

  }
  
  /**
   * functions used to add typed characters to typed sentence
   * @param newKey new key to be added
   */
  typeCharacter(newKey) {
    this.setState(prevState=> ({
      typedWord: prevState.typedWord + newKey
    }))
  }
  
  /**
   * function called for delete and clear all functionality
   * @param flag whether should clear all text or just one character from the end
   */
  clearAll(flag) {
    !flag ? this.setState({typedWord: this.state.typedWord.slice(0,-1)}) : this.setState({typedWord: ""});
  }

  /**
   * getter for typed word
   * @returns typed word
   */
  getTypedWord(){
    return this.state.typedWord.length ?
      this.state.typedWord + `_` : this.state.staticText;
  }
  
  render() {
    return (
    <div className="app">
      <textarea value={this.getTypedWord()}></textarea>
      <div className="demo-page">
          <Keyboard 
            keysList={keysLists} 
            typeCharacter={this.typeCharacter} 
            clearAll={this.clearAll}
          />
      </div>
    </div>
    );
  }
}

export default App;