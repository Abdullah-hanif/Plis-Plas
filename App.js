import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import Login from './src/screens/Login/Login';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/navigations/StackNavigation';

const App = () => {
  return (
    <>
      {/* <Text>App</Text> */}
      {/* <Login /> */}
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
