import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {color} from '../../theme';
import Mail from 'react-native-vector-icons/Fontisto';
import Back from 'react-native-vector-icons/Ionicons';

const ForgotPassword = ({navigation}) => {
  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <TouchableOpacity
          style={{left: 15, top: 15}}
          onPress={() => navigation.goBack()}>
          <Back name="chevron-back" size={30} color="black" />
        </TouchableOpacity>
        <ScrollView>
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
                fontSize: 20,
                color: 'black',
              }}>
              Forgot Password
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
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: Dimensions.get('screen').height / 5.5,
              margin: 30,
              padding: 13,
              borderRadius: 40,
              backgroundColor: color.blue,
            }}>
            <Text style={{fontWeight: 'bold', color: 'white'}}>SENT</Text>
            {/* <Button /> */}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

export default ForgotPassword;

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
    marginVertical: 30,
    borderBottomColor: 'black',
    alignItems:'center'
  },
  passInput: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
});
