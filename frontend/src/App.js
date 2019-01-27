import React, { Component } from "react";

import Button from "@material-ui/core/Button";
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Button variant="contained" color="primary">
            Hello World
          </Button>
        </header>
      </div>
    );
  }
}

export default App;
