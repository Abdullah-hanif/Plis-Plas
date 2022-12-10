import {StyleSheet, Text, View, PermissionsAndroid, LogBox} from 'react-native';
import React from 'react';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import Login from './src/screens/Login/Login';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './src/navigations/StackNavigation';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {ForegroundHandler} from './src/utils/ForegroundHandler';

//Toast Notification
import {ToastProvider} from 'react-native-toast-notifications';

import {
  requestUserPermission,
  NotificationListner,
} from './src/utils/pushnotification_helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

LogBox.ignoreAllLogs();
const App = () => {
  //Post token

  React.useEffect(() => {
    NotificationListner();
    requestUserPermission();
  }, []);

  React.useEffect(() => {
    getToken();
  }, []);
  const getToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    AsyncStorage.setItem('token', token);
    return console.log('====>TOKENNNNNN====>', token);
  };

  return (
    <>
      {/* <Text>App</Text> */}
      {/* <Login /> */}
      <ToastProvider>
        <ForegroundHandler />
        <NavigationContainer>
          <StackNavigation />
        </NavigationContainer>
      </ToastProvider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
