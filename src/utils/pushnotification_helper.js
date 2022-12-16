import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import {ShowAlerScree} from '../screens/MapScreen/MapScreen';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    GetFCMToken();
  }
};

function GetFCMToken() {
  let fcmtoken = AsyncStorage.getItem('fcmtoken');

  if (!fcmtoken) {
    try {
      let fcmtoken = messaging().getToken();
      if (fcmtoken) {
        const token = AsyncStorage.setItem('fcmtoken', fcmtoken);
        console.log(token, '===>');
      } else {
      }
    } catch (error) {
      console.log(error, 'error in fcmtoken');
    }
  }
}

export const NotificationListner = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'notification caused app to open bacgrund state',
      remoteMessage.notification,
    );
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('quit state', remoteMessage.notification);
      }
    });

  messaging().onMessage(remoteMessage => {
    ShowAlerScree(true),
      console.log(
        'notification on foreground state pushnotification....',
        remoteMessage?.data?.data,
        AsyncStorage.setItem('restaurantDetails', remoteMessage?.data?.data),
        ShowAlerScree(true),
      );
  });
};
