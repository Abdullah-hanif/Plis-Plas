import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  StatusBar,
  Image,
  Switch,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from '../screens/DrawerContent/DrawerContent';
import RBSheet from 'react-native-raw-bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Header from '../components/Header';
import {color} from '../theme';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}
      />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>

    // <View>
    //   <Text>DrawerNavigation</Text>
    // </View>
  );
};
export default DrawerNavigator;
const Home = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <>
      <Header onClick={() => navigation.openDrawer()} />
      {/* Map is rendering here!!!!! */}
      <Text>Map is rendering here </Text>
      <View
        style={{
          flex: 1,
          // backgroundColor: 'yellow',
          flexDirection: 'column-reverse',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            // borderColor: 'lightgray',
            // borderWidth: 1,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.32,
            shadowRadius: 5.46,

            elevation: 9,
          }}>
          <View style={{padding: 10}}>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'darkred',
              }}>
              Your're Offline
            </Text>
            {/* 2nd Container */}
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    height: 50,
                    width: 50,

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
                      height: 48,
                      width: 48,
                      resizeMode: 'contain',
                    }}
                    source={require('../assets/Images/men.jpg')}
                  />
                </View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    left: 10,
                    color: 'black',
                    fontSize: 19,
                    top: 13,
                  }}>
                  Poco Ramos
                </Text>
              </View>
              {/* <Switch /> */}
              <Switch
                trackColor={{false: '#767577', true: color.blue}}
                thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
            {/* End 2nd Container */}
            {/* 3rd Container */}
            <View
              style={{
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AntDesign name="checkcircle" size={30} color={'#1284f2'} />
                <Text style={{fontWeight: 'bold', color: 'black'}}>95.0%</Text>
                <Text style={{fontSize: 15, color: 'gray'}}>Acceptance</Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AntDesign name="closecircle" size={30} color={'#1284f2'} />
                <Text style={{fontWeight: 'bold', color: 'black'}}>2.0%</Text>
                <Text style={{fontSize: 15, color: 'gray'}}>Cancellation</Text>
              </View>
            </View>
            {/* End 3rd Container */}
          </View>
        </View>
      </View>
    </>
  );
};

const About = () => {
  return (
    <>
      <View>
        <Text>AboutUs</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({});
