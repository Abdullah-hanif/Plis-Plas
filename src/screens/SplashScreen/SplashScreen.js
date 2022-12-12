import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import React from 'react';
import {color} from '../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  setTimeout(async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('SPLASH TOKEN', token);
    if (token == null) {
      navigation.navigate('AppIntroSliders');
      // alert('token is not null');
    } else {
      // alert('token is null');
      navigation.navigate('DrawerNavigator');
    }
  }, 4000);
  return (
    <>
      <StatusBar
        hidden
        // barStyle={'dark-content'} backgroundColor={'white'}
      />
      <View style={styles.container}>
        {/* <Text>splashScreen</Text> */}
        <Image
          resizeMode="contain"
          style={styles.imgStyle}
          source={require('../../assets/Icons/Group15265.png')}
        />
        <Text style={styles.name}>PLIS PLAS</Text>
        <Text style={styles.slogan}>F e e d y o u r c r a v i n g s</Text>
      </View>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgStyle: {
    height: 150,
    width: 150,
  },
  name: {
    fontWeight: 'bold',
    color: color.blue,
    fontSize: 45,
  },
  slogan: {
    color: color.black,
  },
});
