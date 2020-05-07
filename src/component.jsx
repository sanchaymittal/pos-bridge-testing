import React from "react";
import ReactDOM from "react-dom";

var MyComponent = React.createClass({
    getInitialState: function () {
      return { input: '' };
    },
  
    handleChange: function(e) {
      this.setState({ input: e.target.value });
    },
  
    handleClick: function() {
      console.log(this.state.input);
    },
  
    render: function() {
      return (
        <div>
          <input type="text" onChange={ this.handleChange } />
          <input
            type="button"
            value="Alert the text input"
            onClick={this.handleClick}
          />
        </div>
      );
    }
  });
  
  ReactDOM.render(
    <MyComponent />,
    document.getElementById('container')
  )