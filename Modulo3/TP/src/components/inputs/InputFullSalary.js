import React, { Component } from 'react';
import css from './inputfullsalary.module.css';

export default class InputFullSalary extends Component {
  handleInputChange = (event) => {
    const newText = event.target.value;

    this.props.onChangeSalary(newText);
  };

  render() {
    return (
      <div className={css.flexRow}>
        <label>Salário bruto</label>
        <input
          type="number"
          step="100"
          min="0"
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}
