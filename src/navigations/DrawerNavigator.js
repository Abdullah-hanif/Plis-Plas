import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from '../screens/DrawerContent/DrawerContent';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>

    // <View>
    //   <Text>DrawerNavigation</Text>
    // </View>
  );
};
export default DrawerNavigator;
const Home = () => {
  return (
    <>
      <View>
        <Text>Home</Text>
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
