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
import React, {useRef} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {DrawerContent} from '../screens/DrawerContent/DrawerContent';
import RBSheet from 'react-native-raw-bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {color} from 'react-native-reanimated';
import Header from '../components/Header';

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
const Home = () => {
  const refRBSheet = useRef();
  return (
    <>
      <Header />
      <TouchableOpacity
        onPress={() => refRBSheet.current.open()}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <View>
          <RBSheet
            ref={refRBSheet}
            closeOnDragDown={true}
            closeOnPressMask={false}
            onOpen={true}
            customStyles={{
              container: {
                borderColor: 'lightgray',
                borderWidth: 1,
                borderTopRightRadius: 30,
                borderTopLeftRadius: 30,
              },
              wrapper: {
                borderColor: 'black',
                // marginTop: 50,
                backgroundColor: 'transparent',
              },
              draggableIcon: {
                backgroundColor: '#000',
              },
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
                        height: 45,
                        width: 45,
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
                <Switch />
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
                  <Text style={{fontWeight: 'bold', color: 'black'}}>
                    95.0%
                  </Text>
                  <Text style={{fontSize: 17}}>Acceptance</Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <AntDesign name="closecircle" size={30} color={'#1284f2'} />
                  <Text style={{fontWeight: 'bold', color: 'black'}}>2.0%</Text>
                  <Text style={{fontSize: 17}}>Cancellation</Text>
                </View>
              </View>
              {/* End 3rd Container */}
            </View>
          </RBSheet>
        </View>
      </TouchableOpacity>
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
