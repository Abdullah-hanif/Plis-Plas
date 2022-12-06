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
      <View
        style={{
          flex: 1,
          margin: 10,
          backgroundColor: 'white',
        }}>
        <DrawerContentScrollView showsVerticalScrollIndicator={false}>
          <View>
            <TouchableOpacity
              style={{left: 5, top: 10, padding: 20}}
              onPress={() => navigation.closeDrawer()}>
              {/* <Image source={require("../../../assets/icons/close.png")} /> */}
              <Cross name="close" size={30} color={'black'} />
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

                height: 83,
                width: 83,
                borderRadius: 70,
              }}>
              <Image
                style={{height: 80, width: 80, borderRadius: 70}}
                source={require('../../assets/Images/men.jpg')}
              />
            </View>
            <Text
              style={{
                fontWeight: '700',
                color: 'black',
                fontSize: 18,
                marginTop: 10,
              }}>
              Poco Ramos
            </Text>
          </View>
          {/* Start Drawer ITems */}
          <DrawerItemContainer
            ico={
              <Image
                source={require('../../assets/Icons/home.png')}
                style={{height: 25, width: 25}}
              />
            }
            name={
              <Text style={{margin: 10, left: 10, color: 'black'}}>Home</Text>
            }
          />
          <DrawerItemContainer
            onpress={() => navigation.navigate('ProfileScreen')}
            ico={
              <Image
                source={require('../../assets/Icons/Group4076.png')}
                style={{height: 25, width: 25}}
              />
            }
            name={
              <Text style={{margin: 10, left: 10, color: 'black'}}>
                Profile
              </Text>
            }
          />
          <DrawerItemContainer
            ico={
              <Image
                source={require('../../assets/Icons/Group10645.png')}
                style={{height: 25, width: 25}}
              />
            }
            name={
              <Text style={{margin: 10, left: 10, color: 'black'}}>Orders</Text>
            }
          />
          <DrawerItemContainer
            onpress={() => navigation.navigate('SettingScreen')}
            ico={
              <Image
                source={require('../../assets/Icons/Settings.png')}
                style={{height: 25, width: 25}}
              />
            }
            name={
              <Text style={{margin: 10, left: 10, color: 'black'}}>
                Settings
              </Text>
            }
          />
          <DrawerItemContainer
          onpress={()=>(navigation.navigate('Login'))}
            ico={
              <Image
                source={require('../../assets/Icons/Group4090.png')}
                style={{height: 25, width: 25}}
              />
            }
            name={
              <Text style={{margin: 10, left: 10, color: 'black'}}>Logout</Text>
            }
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
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          right: 50,
          // marginTop: 10,
          top: 10,
        }}
        onPress={onpress}>
        <View
          style={{
            marginVertical: 5,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>{ico}</View>
          <View style={{width: '30%'}}>{name}</View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({});
