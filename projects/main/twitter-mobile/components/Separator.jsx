import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Separator({ text = '' }) {
  return (
    <View style={styles.container}>
      <View style={styles.line}></View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    backgroundColor: 'gainsboro',
    height: 1,
    position: 'absolute',
    width: '100%',
  },
  text: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    color: 'gray',
    zIndex: 1,
  },
});
