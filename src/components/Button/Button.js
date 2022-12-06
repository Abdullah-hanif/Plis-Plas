import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {color} from '../../theme';

const Button = ({onPress,text}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text
        style={{textAlign: 'center', color: color.white, fontWeight: 'bold'}}>
       {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    padding: 13,
    width: '90%',
    margin: 40,
    borderRadius: 40,
    backgroundColor: color.blue,
  },
});
