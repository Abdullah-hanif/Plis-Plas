import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {color} from '../theme';
import Drawer from 'react-native-vector-icons/EvilIcons';
import Bell from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const Header = ({onClick}) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={onClick} style={{paddingLeft:'5%'}}>
      <Image
        style={{width:20,height:20}}
        source={require('../assets/Icons/menu.png')}
      />
      </TouchableOpacity>
      <Image
        style={styles.imgStyle}
        source={require('../assets/Icons/Group15265.png')}
      />
       <TouchableOpacity style={{paddingRight:'5%'}}>
       <Image
        style={{width:20,height:20}}
        source={require('../assets/Icons/bell.png')}
      />
      </TouchableOpacity>
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
    alignItems:'center'
  },
  imgStyle: {
    height: 50,
    width: 50,
    tintColor: 'white',
  },
});
