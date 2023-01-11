import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {color} from '../../theme';
import Button from '../../components/Button/Button';
import Mail from 'react-native-vector-icons/Fontisto';
import Lock from 'react-native-vector-icons/EvilIcons';

// @API
import {loginUser} from '../../api/api';
import {Base_Url} from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

// @Toast
import {useToast} from 'react-native-toast-notifications';

// @langugeChange
import {useTranslation} from 'react-i18next';
const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');

  const toast = useToast();
  const {t} = useTranslation();

  const login = async () => {
    //  navigation.navigate('DrawerNavigator')
    // setFCM();

    const params = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    };
    fetch(`${Base_Url}/login`, params)
      .then(response => response.json())
      .then(data => {
        console.log('UUIDDDDD===>', typeof data?.data?.id);
        const id = data?.data?.id;
        AsyncStorage.setItem('userID', JSON.stringify(id));
        getToken();
        setUserId(data?.data?.id);
        const fcmid = data?.data?.id;
        setFCM(fcmid);

        // console.log(data?.data?.id, '====>inside login fun');

        if (data?.message == 'Email and password are required') {
          toast.show(data?.message, {
            type: 'danger',
            placement: 'top',
            duration: 4000,
            offset: 30,
            animationType: 'slide-in | zoom-in',
          });
        } else if (data?.message == 'Email or password is incorrect') {
          toast.show(data?.message, {
            type: 'danger',
            placement: 'top',
            duration: 4000,
            offset: 30,
            animationType: 'slide-in | zoom-in',
          });
        } else {
          toast.show('login suceesfully', {
            type: 'success',
            placement: 'top',
            duration: 4000,
            offset: 30,
            animationType: 'slide-in | zoom-in',
          });
          console.log('StATE END LOGIN FUN====>', userId);
          AsyncStorage.setItem('userName', data?.data?.name);
          navigation.navigate('DrawerNavigator');
        }
        // console.log(data?.data?.fcm);

        // navigation.navigate('DrawerNavigator');
      });
    setUsername('');
    setPassword('');
  };

  // React.useEffect(() => {
  //   setFCM();
  // }, []);

  const getToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    AsyncStorage.setItem('token', token);
    return token;
  };

  const setFCM = async fcmid => {
    // console.log('StATE inside setFCm====>', userId);
    // alert(fcmid);

    const token = await getToken();
    console.log('TOKENSSSSSSSSSS===>', token);
    const params = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId: fcmid,
        fcm: token,
      }),
    };
    fetch(`${Base_Url}/store-fcm`, params)
      .then(response => response.json())
      .then(data => {
        console.log('FCMM TOKEN====>', data);
        // alert('TOKENSSS FCMSOTE');

        // navigation.navigate('DrawerNavigator');
      });
  };
  return (
    <>
      <StatusBar hidden />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            <Image
              resizeMode="contain"
              style={styles.imgStyle}
              source={require('../../assets/Icons/Group15265.png')}
            />
            <Text
              style={{
                marginTop: 30,
                fontWeight: 'bold',
                fontSize: 28,
                color: 'black',
              }}>
              {t('common:login')}
            </Text>
          </View>
          <View style={styles.txtInputContainer}>
            <View style={styles.emailInput}>
              <Image
                resizeMode="contain"
                // style={}
                style={{
                  height: 25,
                  width: 25,
                }}
                source={require('../../assets/Icons/mail.png')}
              />
              <TextInput
                value={username}
                placeholderTextColor={'black'}
                placeholder="Paco ramos"
                onChangeText={txt => setUsername(txt)}
                style={{left: 10, fontSize: 15}}
              />
            </View>
            <View style={styles.passInput}>
              <Image
                resizeMode="contain"
                // style={}
                style={{
                  height: 25,
                  width: 25,
                }}
                source={require('../../assets/Icons/Group5461.png')}
              />
              <TextInput
                value={password}
                placeholderTextColor={'black'}
                placeholder={t('common:password')}
                onChangeText={txt => setPassword(txt)}
                secureTextEntry={true}
                style={{left: 10, fontSize: 15}}
              />
            </View>
          </View>
          <View style={{alignItems: 'flex-end', margin: 20}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>
                {t('common:ForgotPassword')}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Button onPress={login} text={t('common:login')} />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.white,
  },
  imgStyle: {
    height: 150,
    width: 150,
  },
  innerContainer: {
    marginVertical: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtInputContainer: {
    margin: 20,
  },
  emailInput: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    marginVertical: 20,
    borderBottomColor: '#C6C6C6',
    alignItems: 'center',
  },
  passInput: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    fontSize: 18,
    borderBottomColor: '#C6C6C6',
    alignItems: 'center',
  },
});
