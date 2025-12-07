import React, { Component } from 'react';
import { View } from 'react-native';
import CalculatorDisplay from './CalculatorDisplay';
import CalculatorKeypad from './CalculatorKeypad';
import styles from '../estilos/styles';

export default class CalculatorLogic extends Component {
  state = {
    currentValue: '0',
    expression: '',
    previousValue: null,
    operator: null,
    resetOnNextInput: false,
  };

  inputDigit = (digit) => {
    const { currentValue, resetOnNextInput, expression } = this.state;

    if (resetOnNextInput) {
      this.setState({
        currentValue: String(digit),
        expression: expression + String(digit),
        resetOnNextInput: false,
      });
    } else {
      this.setState({
        currentValue: currentValue === '0' ? String(digit) : currentValue + digit,
        expression: expression === '' ? String(digit) : expression + digit,
      });
    }
  };

  inputDecimal = () => {
    const { currentValue, resetOnNextInput, expression } = this.state;

    if (resetOnNextInput) {
      this.setState({
        currentValue: '0.',
        expression: expression + '0.',
        resetOnNextInput: false,
      });
      return;
    }

    if (!currentValue.includes('.')) {
      this.setState({
        currentValue: currentValue + '.',
        expression: expression + '.',
      });
    }
  };

  clearDisplay = () => {
    this.setState({
      currentValue: '0',
      expression: '',
      previousValue: null,
      operator: null,
    });
  };

  handleOperation = (nextOperator) => {
    const { currentValue, previousValue, operator, expression } = this.state;
    const inputValue = parseFloat(currentValue);

    if (nextOperator === '√') {
      const result = Math.sqrt(inputValue);
      this.setState({
        currentValue: String(result),
        expression: `√(${currentValue})`,
        resetOnNextInput: true,
      });
      return;
    }

    if (nextOperator === '^') {
      this.setState({
        previousValue: inputValue,
        operator: '^',
        expression: expression + '^',
        resetOnNextInput: true,
      });
      return;
    }

    if (previousValue == null) {
      this.setState({
        previousValue: inputValue,
        operator: nextOperator,
        expression: expression + nextOperator,
        resetOnNextInput: true,
      });
    } else if (operator) {
      const result = this.calculate(previousValue, inputValue, operator);
      
      this.setState({
        previousValue: result,
        currentValue: String(result),
        operator: nextOperator,
        expression: expression + nextOperator,
        resetOnNextInput: true,
      });
    }
  };

  calculateResult = () => {
    const { currentValue, previousValue, operator, expression } = this.state;
    const inputValue = parseFloat(currentValue);

    if (operator === '^') {
      const result = Math.pow(previousValue, inputValue);
      this.setState({
        currentValue: String(result),
        expression: String(result),
        previousValue: null,
        operator: null,
        resetOnNextInput: true,
      });
      return;
    }

    if (previousValue != null && operator) {
      const result = this.calculate(previousValue, inputValue, operator);
      
      this.setState({
        currentValue: String(result),
        expression: String(result),
        previousValue: null,
        operator: null,
        resetOnNextInput: true,
      });
    }
  };

  calculate = (firstOperand, secondOperand, operation) => {
    switch (operation) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '*':
        return firstOperand * secondOperand;
      case '/':
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  };

  render() {
    const { currentValue, expression } = this.state;

    return (
      <View style={styles.container}>
        <CalculatorDisplay 
          currentValue={currentValue} 
          expression={expression} 
        />
        <CalculatorKeypad
          onDigitPress={this.inputDigit}
          onDecimalPress={this.inputDecimal}
          onOperatorPress={this.handleOperation}
          onClearPress={this.clearDisplay}
          onCalculatePress={this.calculateResult}
        />
      </View>
    );
  }
}