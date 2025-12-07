import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from '../estilos/styles';

export default class CalculatorKeypad extends Component {
  render() {
    const {
      onDigitPress,
      onDecimalPress,
      onOperatorPress,
      onClearPress,
      onCalculatePress,
    } = this.props;

    return (
      <View style={styles.buttonsContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={onClearPress}>
            <Text style={styles.buttonText}>CC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => onOperatorPress('√')}>
            <Text style={styles.buttonText}>√</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => onOperatorPress('^')}>
            <Text style={styles.buttonText}>^</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => onOperatorPress('/')}>
            <Text style={styles.buttonText}>/</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          {[7, 8, 9].map(num => (
            <TouchableOpacity key={num} style={styles.button} onPress={() => onDigitPress(num)}>
              <Text style={styles.buttonText}>{num}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.button} onPress={() => onOperatorPress('*')}>
            <Text style={styles.buttonText}>X</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          {[4, 5, 6].map(num => (
            <TouchableOpacity key={num} style={styles.button} onPress={() => onDigitPress(num)}>
              <Text style={styles.buttonText}>{num}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.button} onPress={() => onOperatorPress('-')}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          {[1, 2, 3].map(num => (
            <TouchableOpacity key={num} style={styles.button} onPress={() => onDigitPress(num)}>
              <Text style={styles.buttonText}>{num}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.button} onPress={() => onOperatorPress('+')}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={[styles.button, styles.zeroButton]} onPress={() => onDigitPress(0)}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onDecimalPress}>
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onCalculatePress}>
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}