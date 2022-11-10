import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {color} from '../theme';
import Back from 'react-native-vector-icons/AntDesign';
import Bell from 'react-native-vector-icons/FontAwesome';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Back name="left" size={30} color="white" />
      <Image
        style={styles.imgStyle}
        source={require('../assets/Icons/Group15265.png')}
      />
      <Bell name="bell-o" size={25} color="white" />
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
