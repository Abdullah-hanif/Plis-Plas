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
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigations/StackNavigation';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { ForegroundHandler } from './src/utils/ForegroundHandler';

//Toast Notification
import { ToastProvider } from 'react-native-toast-notifications';
import { useTranslation } from 'react-i18next';
import './src/constants/DCSLocalize';

//Redux toolkit
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

import {
  requestUserPermission,
  NotificationListner,
} from './src/utils/pushnotification_helper';


LogBox.ignoreAllLogs();
const App = () => {

  const locale = NativeModules.I18nManager.localeIdentifier;
  const localLang = locale.split('_');
  const { t, i18n } = useTranslation();
  const setLanguge = code => {
    return i18n.changeLanguage(code);
  };

  React.useEffect(() => {
    setLanguge(localLang[0]);
    setTimeout(() => {
      setLanguge(localLang[0]);
    }, 2000);
  }, []);


  React.useEffect(() => {
    NotificationListner();
    requestUserPermission();
  }, []);

  return (
    <>
      <Provider store={store}>
        <ToastProvider>
          <ForegroundHandler />
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
        </ToastProvider>
      </Provider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
