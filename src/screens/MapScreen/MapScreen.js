import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  StatusBar,
  Image,
  Switch,
  ScrollView,
  Dimensions,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MapView, {Marker} from 'react-native-maps';

import Header from '../../components/Header';
import {color} from 'react-native-reanimated';
import {CustomMapStyle} from './CustomMapStyle';

import GetLocation from 'react-native-get-location';
// import Geolocation from 'react-native-geolocation-service';
// import Geolocation from '@react-native-community/geolocation';

const MapScreen = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [region, setRegion] = useState();

  const [latitude, setLatitude] = useState(24.833797888244483);
  const [longitude, setLongitute] = useState(67.07092911044822);

  try {
    const granted = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Cool Photo App Camera Permission',
        message:
          'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the Location');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }

  //GetPermission
  useEffect(() => {
    geLocation();
  }, []);

  const geLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        console.log('===>', location);
        setLongitute(location.longitude);
        setLatitude(location.latitude);
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  };
  const Data = {
    markers: [
      {
        coordinate: {
          latitude: 37.298984,
          longitude: -122.050362,
        },
        title: 'Best Place',
        description: 'Description1',
        id: 1,
      },
      {
        coordinate: {
          latitude: 37.297803,
          longitude: -122.050037,
        },
        title: 'Best Place2',
        description: 'Description 2',
        id: 2,
      },
    ],
  };
  return (
    <>
      <Header onClick={() => navigation.openDrawer()} />
      {/* Map is rendering here!!!!! */}
      <ScrollView style={{flex: 1, backgroundColor: 'green'}}>
        <MapView
          //   mapPadding={{top: 300, right: 300, bottom: 300, left: 300}}
          pinColor="red"
          initialRegion={{
            latitude: 24.833797888244483,
            longitude: 67.07092911044822,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          zoomEnabled={true}
          showsUserLocation={true}
          style={styles.map}
          showsMyLocationButton={true}
          onRegionChange={region => console.log('REGION====>', region)}
          //   customMapStyle={CustomMapStyle}
        >
          <Marker
            coordinate={{
              //   latitude: 24.833797888244483,
              latitude,
              longitude,
              //   longitude: 67.07092911044822,
            }}
            title="altaf"
            description="des"
            pinColor="red"
            // style={{backgroundColor: 'blue'}}
            // image={require('../../assets/Icons/Group15301.png')}
          >
            <Image
              source={require('../../assets/Icons/Group15301.png')}
              style={{width: 50, height: 50}}
              resizeMode="contain"
            />
          </Marker>
        </MapView>
      </ScrollView>
      <View
        style={{
          //   flex: 1,
          //   backgroundColor: 'yellow',
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
                    marginLeft: '8%',
                    borderWidth: 3,
                    borderColor: 'black',
                    borderRadius: 360,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    style={{
                      margin: 10,

                      borderRadius: 360,
                      height: 48,
                      width: 48,
                      resizeMode: 'contain',
                    }}
                    source={require('../../assets/Images/men.jpg')}
                  />
                </View>
                <Text
                  style={{
                    fontWeight: 'bold',
                    left: 15,
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
                style={{marginRight: '2%'}}
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

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    // flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height / 1.8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
});
