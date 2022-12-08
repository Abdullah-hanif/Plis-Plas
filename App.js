import {StyleSheet, Text, View, PermissionsAndroid} from 'react-native';
import React from 'react';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import Login from './src/screens/Login/Login';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/navigations/StackNavigation';
import messaging from '@react-native-firebase/messaging';

import {
  requestUserPermission,
  NotificationListner,
} from './src/utils/pushnotification_helper';

const App = () => {
  React.useEffect(() => {
    NotificationListner();
    requestUserPermission();
  }, []);

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
