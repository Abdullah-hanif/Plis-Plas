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
import React from 'react';
import {color} from '../../theme';
import Button from '../../components/Button/Button';
import Mail from 'react-native-vector-icons/Fontisto';
import Lock from 'react-native-vector-icons/EvilIcons';

const Login = ({navigation}) => {
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
            <Button onPress={() => navigation.navigate('DrawerNavigator')} text={'LOGIN'}/>
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
    borderBottomColor: 'black',
    alignItems:'center',
  },
  passInput: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    fontSize: 18,
    borderBottomColor: 'black',
    alignItems:'center'
  },
});
