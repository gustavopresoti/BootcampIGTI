import React, { Component } from 'react';
import ProgressBarSalary from './components/bar/ProgressBarSalary';
import InputFullSalary from './components/inputs/InputFullSalary';
import InputReadOnly from './components/inputs/InputReadOnly';
import { calculateSalaryFrom } from './helpers/salary';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      fullSalary: 0,
    };
  }

  handleChangeSalary = (newText) => {
    this.setState({
      fullSalary: parseFloat(newText),
    });
  };

  render() {
    const { fullSalary } = this.state;
    const newBar = calculateSalaryFrom(fullSalary);

    return (
      <div>
        <h1>
          <center>React Salário</center>
        </h1>

        <InputFullSalary onChangeSalary={this.handleChangeSalary} />

        <InputReadOnly
          onChangeBar={this.handleChangeBar}
          fullSalary={fullSalary}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 5%',
          }}
        >
          <ProgressBarSalary
            value={newBar.checkedPercentINSS}
            color="#e67e22"
          />
          <ProgressBarSalary
            value={newBar.checkedPercentIRPF}
            color="#c0392b"
          />
          <ProgressBarSalary
            value={newBar.checkedPercentNetSalary}
            color="#16a085"
          />
        </div>
      </div>
    );
  }
}
