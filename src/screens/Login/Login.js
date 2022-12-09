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

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');

  const login = async () => {
    //  navigation.navigate('DrawerNavigator')

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
        setUserId(data?.data?.id);
        if (data?.message == 'Email and password are required') {
          alert(data?.message);
        } else if (data?.message == 'Email or password is incorrect') {
          alert(data?.message);
        } else {
          // navigation.navigate('DrawerNavigator');
          alert('sucessfully');
        }
        console.log(data?.data?.fcm);

        navigation.navigate('DrawerNavigator');
      });
  };

  React.useEffect(() => {
    setFCM();
  }, [userId]);

  const setFCM = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('TOKEN===>', token);
    const params = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        userId: userId,
        fcm: token,
      }),
    };
    fetch(`${Base_Url}/store-fcm`, params)
      .then(response => response.json())
      .then(data => {
        console.log('TOKENSSS', data);

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
              Login
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
                placeholderTextColor={'black'}
                placeholder="Password"
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
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Button onPress={login} text={'LOGIN'} />
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
