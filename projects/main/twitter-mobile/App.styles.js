import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    justifyContent: 'start',
  },
  wrapper: {
    width: '90%',
  },
  space: {
    marginBottom: 12,
  },
  logo: {
    big: {
      width: 128,
      height: 128,
      resizeMode: 'contain',
    },
    small: {
      width: 32,
      height: 32,
      resizeMode: 'contain',
    },
  },
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 16,
  },
  button: {
    borderRadius: 12,
    padding: 12,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 12,
    fontSize: 16,
    padding: 12,
    width: '100%',
  },
  inputError: {
    borderColor: 'red',
  },
  primary: {
    background: {
      backgroundColor: '#1D9CF0',
    },
    text: {
      color: 'white',
      fontSize: 16,
      textAlign: 'center',
    },
  },
  secondary: {
    background: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'gray',
    },
    text: {
      color: 'gray',
      fontSize: 16,
      textAlign: 'center',
    },
  },
});

export default styles;
