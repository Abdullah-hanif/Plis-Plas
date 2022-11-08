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
const Login = ({navigation}) => {
  return (
    <>
      <StatusBar hidden />
      <ScrollView>
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
                fontSize: 18,
                color: 'black',
              }}>
              Login
            </Text>
          </View>
          <View style={styles.txtInputContainer}>
            <View style={styles.emailInput}>
              <Image
                style={{height: 20, width: 20, top: 15, tintColor: 'gray'}}
                source={require('../../assets/Icons/mail.png')}
              />
              <TextInput placeholder="Paco ramos" />
            </View>
            <View style={styles.passInput}>
              <Image
                style={{height: 20, width: 20, top: 15, tintColor: 'gray'}}
                source={require('../../assets/Icons/mail.png')}
              />
              <TextInput placeholder="Password" />
            </View>
          </View>
          <View style={{alignItems: 'flex-end', margin: 20}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={{color: 'black', fontWeight: 'bold'}}>
                Forgot Password ?
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Button />
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
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtInputContainer: {
    margin: 20,
  },
  emailInput: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  passInput: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
});
