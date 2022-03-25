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
  
  typeCharacter(newKey) {
    this.setState(prevState=> ({
      typedWord: prevState.typedWord + newKey
    }))
  }
  
  clearAll(flag) {
    !flag ? this.setState({typedWord: this.state.typedWord.slice(0,-1)}) : this.setState({typedWord: ""});
  }

  getTypedWord(){
    return this.state.typedWord.length ?
      this.state.typedWord + `_` : this.state.staticText;
  }
  
  render() {
    return (
    <div className="app">
      <h2>{this.getTypedWord()}</h2>
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