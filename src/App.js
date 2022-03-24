import * as React from "react";
import "./App.css";
import Keyboard from "./components/Keyboard";
import keysLists from "./components/utilities/keysUtilities";

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
    console.log(this.state.typedWord)
  }
  
  clearAll(flag) {
    if(!flag) this.setState({typedWord: this.state.typedWord.slice(0,-1)})
    else this.setState({typedWord: ""})
  }

  getTypedWord(){
    if(this.state.typedWord.length){
      return this.state.typedWord + `_`;
    }
    else return this.state.staticText;
  }
  
  render() {
    return (
    <div className="App">
      <h2>{this.getTypedWord()}</h2>
      <div className="demoPage">
          <Keyboard keysList={keysLists} typeCharacter={this.typeCharacter} clearAll={this.clearAll}/>
      </div>
    </div>
    );
  }
}

export default App;