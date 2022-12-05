import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {color} from '../../theme';

const Button = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text
        style={{textAlign: 'center', color: color.white, fontWeight: 'bold'}}>
        LOGIN
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '90%',
    margin: 40,
    borderRadius: 40,
    backgroundColor: color.blue,
  },
});
