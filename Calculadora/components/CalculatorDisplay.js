import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from '../estilos/styles';

export default class CalculatorDisplay extends Component {
  render() {
    const { expression, currentValue } = this.props;
    
    return (
      <View style={styles.displayContainer}>
        <View style={styles.expressionContainer}>
          <Text style={styles.expressionText}>{expression}</Text>
        </View>
        <View style={styles.displayContainer}>
          <Text style={styles.displayText}>{currentValue}</Text>
        </View>
      </View>
    );
  }
}