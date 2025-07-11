import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f5f5f5',
      padding: 20,
    },
    expressionContainer: {
      padding: 10,
      width: '100%',
      alignItems: 'flex-end',
      minHeight: 30,
    },
    expressionText: {
      fontSize: 20,
      color: '#666',
    },
    displayContainer: {
      padding: 20,
      backgroundColor: '#fff',
      width: '100%',
      alignItems: 'flex-end',
      marginBottom: 20,
      borderRadius: 5,
    },
    displayText: {
      fontSize: 36,
    },
    buttonsContainer: {
      width: '100%',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    button: {
      backgroundColor: '#e0e0e0',
      padding: 20,
      borderRadius: 5,
      width: '22%',
      alignItems: 'center',
    },
    zeroButton: {
      width: '48%',
    },
    buttonText: {
      fontSize: 24,
    },
  });

  export default styles;