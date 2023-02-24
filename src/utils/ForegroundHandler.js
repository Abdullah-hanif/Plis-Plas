import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export const ForegroundHandler = () => {
  React.useEffect(() => {
    const unSubscribe = messaging().onMessage(async remoteMessage => {
      console.log(
        'notification on foreground state forgroundHandler....',
        remoteMessage?.notification,
      );
      PushNotification.localNotification({
        channelId: 'chanel-1',
        title: remoteMessage?.notification.title,
        body: remoteMessage?.notification.body,
        soundName: 'default',
        vibrate: true,
        playSound: true,
      });
      // Alert.alert(1);
      alert(1);
      return unSubscribe;
    });
  }, []);
  // AsyncStorage.setItem('status', 'show');

  return null;
};
