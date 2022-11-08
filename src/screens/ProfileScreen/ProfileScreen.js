import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import React from 'react';
import Ico from 'react-native-vector-icons/AntDesign';
import Edit from 'react-native-vector-icons/Feather';
import Gender from 'react-native-vector-icons/MaterialCommunityIcons';
import Emial from 'react-native-vector-icons/Fontisto';

import {color} from '../../theme';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header Started */}
      <ScrollView>
        <View style={styles.topHeader}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Ico name="left" size={25} color="white" />
            <Text style={styles.txt}>My Profile</Text>
            <Edit name="edit" size={25} color="white" />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              top: 20,
            }}>
            <View
              style={{
                height: 130,
                width: 130,

                borderWidth: 3,
                borderColor: 'black',
                borderRadius: 60,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  margin: 10,

                  borderRadius: 60,
                  height: 128,
                  width: 128,
                  resizeMode: 'contain',
                }}
                source={require('../../assets/Images/men.jpg')}
              />
            </View>
          </View>
        </View>
        {/* Header Ender */}
        {/* FirstComp Started */}
        <View
          style={{
            margin: 20,
            marginTop: 110,
            backgroundColor: 'white',
            // padding: 10,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,

            elevation: 24,
          }}>
          {/* Informtion area */}
          <View style={{paddingVertical: 10, borderBottomWidth: 1}}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                margin: 10,
                color: 'black',
                // padding: 10,
              }}>
              Information
            </Text>
          </View>
          {/* End Informtion area */}

          <InfromationDetails
            icon={<Gender name="account" size={25} color="black" />}
            title="Name"
            name="Poco Ramos"
          />
          <InfromationDetails
            icon={<Ico name="phone" size={25} color="black" />}
            title="Phone"
            name="+92345628299"
          />
          <InfromationDetails
            icon={<Emial name="email" size={25} color="black" />}
            title="Email"
            name="PocoRamos@gmail.com"
          />
          <InfromationDetails
            icon={<Gender name="gender-female" size={25} color="black" />}
            title="Gender"
            name="Male"
          />
          <InfromationDetails
            icon={<Ico name="calender" size={25} color="black" />}
            title="DOB"
            name="8/17/1996"
          />
        </View>
      </ScrollView>
      {/* FirstComp Ended */}
    </View>
  );
};

const InfromationDetails = ({icon, title, name}) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          margin: 10,
          // justifyContent: 'space-evenly',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}>
        {icon}
        {/* <Ico name="left" size={25} color="white" /> */}
        <Text
          style={{
            fontWeight: 'bold',
            color: 'black',
            right: 30,
            textAlign: 'right',
          }}>
          {title}
        </Text>
        <Text style={{color: 'black', textAlign: 'left'}}>{name}</Text>
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topHeader: {
    height: Dimensions.get('screen').height / 4.5,
    padding: 10,
    backgroundColor: color.blue,
  },
  txt: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 19,
    margin: 10,
  },
  profileContainer: {
    padding: 30,

    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
  },
});
