import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {color} from '../theme';
import Drawer from 'react-native-vector-icons/EvilIcons';
import Bell from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const Header = ({onClick}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onClick}>
        <Drawer name="navicon" size={20} style={{top: 20}} color="white" />
      </TouchableOpacity>
      <Image
        style={styles.imgStyle}
        source={require('../assets/Icons/Group15265.png')}
      />
      <Bell name="bell-o" style={{top: 20}} size={20} color="white" />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: color.blue,
    padding: 20,

    justifyContent: 'space-between',
  },
  imgStyle: {
    height: 50,
    width: 50,
    tintColor: 'white',
  },
});
