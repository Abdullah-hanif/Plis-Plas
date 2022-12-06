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
import MapScreen from '../screens/MapScreen/MapScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        options={{headerShown: false}}
        name="MapScreen"
        component={MapScreen}
      />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>

    // <View>
    //   <Text>DrawerNavigation</Text>
    // </View>
  );
};
export default DrawerNavigator;

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
