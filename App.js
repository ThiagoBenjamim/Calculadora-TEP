import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import CalculatorLogic from './components/CalculatorLogic';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <CalculatorLogic/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});