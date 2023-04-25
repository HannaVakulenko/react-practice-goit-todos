import React from 'react';

const Controls = ({ onIncrement, onDecrement }) => (
  <div className="Counter__controls">
    <button type="button" onClick={onIncrement}>
      Збільшити на 1
    </button>
    <button type="button" onClick={onDecrement}>
      Зменьшити на 1
    </button>
  </div>
);

export default Controls;
