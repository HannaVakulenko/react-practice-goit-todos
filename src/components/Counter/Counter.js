import React, { Component } from 'react';
import './Counter.css';
import Controls from './Controls';
import Value from './Value';

class Counter extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     value: 0,
  //   };
  // } замість цього всього - піблічна властивість state = {}
  // static defaultProps = {
  //   initialValue: 0;
  // };

  state = {
    value: 0,
  };

  handleIncrement = () => {
    this.setState(prevState => {
      return {
        value: prevState.value + 1,
      };
    });
  };
  handleDecrement = () => {
    this.setState(prevState => {
      return {
        value: prevState.value - 1,
      };
    });
  };

  render() {
    const { value } = this.state;

    return (
      <div className="Counter">
        <Value value={value} />
        {/* <span className="Counter__value">{this.state.value}</span> */}
        <Controls
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
        />
        {/* <div className="Counter__controls">
          <button type="button" onClick={this.handleIncrement}>
            Збільшити на 1
          </button>
          <button type="button" onClick={this.handleDecrement}>
            Зменьшити на 1
          </button>
        </div> */}
      </div>
    );
  }
}

export default Counter;
