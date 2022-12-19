import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  LogBox,
  NativeModules,
} from 'react-native';
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
import {useTranslation} from 'react-i18next';
import './src/constants/DCSLocalize';

import {
  requestUserPermission,
  NotificationListner,
} from './src/utils/pushnotification_helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

LogBox.ignoreAllLogs();
const App = () => {
  // languge Changer
  const locale = NativeModules.I18nManager.localeIdentifier;
  console.log('==>LOCAL BEFORE===>', locale);
  // const localLang = locale.split('_');
  const {t, i18n} = useTranslation();

  const localLang = ['es', 'es'];
  // es mean spanish
  console.log('====>DEVICE LANG', localLang[0]);

  const setLanguge = code => {
    return i18n.changeLanguage(code);
  };

  React.useEffect(() => {
    setLanguge(localLang[0]);
    setTimeout(() => {
      setLanguge(localLang[0]);
    }, 2000);
  }, []);

  // Languge change end

  //Post token

  React.useEffect(() => {
    NotificationListner();
    requestUserPermission();
  }, []);

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
