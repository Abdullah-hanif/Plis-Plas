import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import Login from '../screens/Login/Login';
import AppIntroSliders from '../screens/Walkthrough/AppIntroSliders';
import ForgotPassword from '../screens/ForgotPassword/ForgotPassword';
import OrderDetails from '../screens/OrderDetails/OrderDetails';
import SettingScreen from '../screens/SettingScreen/SettingScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import DrawerNavigator from './DrawerNavigator';
import MyWallet from '../screens/MyWallet/MyWallet';

const Stack = createStackNavigator();
const StackNavigation = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="SplashScreen">
        {/* <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} /> */}
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="AppIntroSliders" component={AppIntroSliders} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="MyWallet" component={MyWallet} />

        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      </Stack.Navigator>
    </>
  );
};

export default StackNavigation;

const styles = StyleSheet.create({});
