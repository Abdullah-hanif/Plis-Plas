import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import React from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import Ico from 'react-native-vector-icons/Entypo';
import LogOut from 'react-native-vector-icons/MaterialIcons';
import Home from 'react-native-vector-icons/Feather';
import Order from 'react-native-vector-icons/FontAwesome';
import Profile from 'react-native-vector-icons/MaterialCommunityIcons';
import Cross from 'react-native-vector-icons/EvilIcons';
import {color} from '../../theme';

export const DrawerContent = ({navigation}) => {
  return (
    <>
      <View style={{flex: 1, margin: 10, backgroundColor: 'white'}}>
        <DrawerContentScrollView showsVerticalScrollIndicator={false}>
          <View>
            <TouchableOpacity onPress={() => navigation.closeDrawer()}>
              {/* <Image source={require("../../../assets/icons/close.png")} /> */}
              <Cross name="close" size={40} color={'black'} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 5,
            }}>
            <View
              style={{
                backgroundColor: color.blue,
                alignItems: 'center',
                justifyContent: 'center',

                height: 100,
                width: 100,
                borderRadius: 70,
              }}>
              <Image
                style={{height: 95, width: 95, borderRadius: 70}}
                source={require('../../assets/Images/men.jpg')}
              />
            </View>
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 19}}>
              Poco Ramos
            </Text>
          </View>
          {/* Start Drawer ITems */}
          <DrawerItemContainer
            ico={<Home name="home" size={30} color="black" />}
            name={<Text style={{margin: 10, color: 'black'}}>Home</Text>}
          />
          <DrawerItemContainer
            onpress={() => navigation.navigate('ProfileScreen')}
            ico={
              <Profile name="account-circle-outline" size={30} color="black" />
            }
            name={<Text style={{margin: 10, color: 'black'}}>Profile</Text>}
          />
          <DrawerItemContainer
            ico={<Order name="calendar-check-o" size={30} color="black" />}
            name={<Text style={{margin: 10, color: 'black'}}>Orders</Text>}
          />
          <DrawerItemContainer
            onpress={() => navigation.navigate('SettingScreen')}
            ico={<Home name="settings" size={30} color="black" />}
            name={<Text style={{margin: 10, color: 'black'}}>Settings</Text>}
          />
          <DrawerItemContainer
            ico={<LogOut name="logout" size={30} color="black" />}
            name={<Text style={{margin: 10, color: 'black'}}>Logout</Text>}
          />
          {/*END Drawer ITems */}
        </DrawerContentScrollView>
      </View>
    </>
  );
};

const DrawerItemContainer = ({ico, name, onpress}) => {
  return (
    <>
      <TouchableOpacity onPress={onpress}>
        <View style={{margin: 10, flexDirection: 'row'}}>
          {ico}
          {name}
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({});
