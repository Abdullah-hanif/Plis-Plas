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
import Button from '../../components/Button/Button';
const ForgotPassword = ({navigation}) => {
  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
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
                fontSize: 18,
                color: 'black',
              }}>
              ForgotPassword
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
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate('OrderDetails')}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 130,
              margin: 30,
              padding: 20,
              borderRadius: 30,
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
    borderBottomColor: 'black',
  },
  passInput: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
});
