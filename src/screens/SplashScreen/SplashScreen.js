import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import React from 'react';
import {color} from '../../theme';

const SplashScreen = ({navigation}) => {
  setTimeout(() => {
    navigation.navigate('AppIntroSliders');
  }, 4000);
  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={'white'} />
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
