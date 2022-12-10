import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Switch,
  Platform,
} from 'react-native';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';

import MapViewDirections from 'react-native-maps-directions';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import Loader from '../components/Loader';
import {
  locationPermission,
  getCurrentLocation,
} from '../../helper/helperFunction';
import Header from '../../components/Header';
import {color} from '../../theme';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAP_KEY = 'AIzaSyC_47Al-kSZhkd7VidzuGiKl1R39E1lN8E';

const MapScreen = ({navigation}) => {
  const mapRef = useRef();
  const markerRef = useRef();

  const [state, setState] = useState({
    curLoc: {
      latitude: 24.833797888244483,
      longitude: 67.07092911044822,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    destinationCords: {
      latitude: 24.822977,
      longitude: 67.137927,
    },
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitude: 24.833797888244483,
      longitude: 67.07092911044822,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    time: 0,
    distance: 0,
    heading: 0,
  });

  const {
    curLoc,
    time,
    distance,
    destinationCords,
    isLoading,
    coordinate,
    heading,
  } = state;
  const updateState = data => setState(state => ({...state, ...data}));

  useEffect(() => {
    getLiveLocation();
  }, []);

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const {latitude, longitude, heading} = await getCurrentLocation();
      console.log('get live location after 4 second', heading);
      animate(latitude, longitude);
      updateState({
        heading: heading,
        curLoc: {latitude, longitude},
        coordinate: new AnimatedRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }),
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const onPressLocation = () => {
    navigation.navigate('chooseLocation', {getCordinates: fetchValue});
  };
  const fetchValue = data => {
    console.log('this is data', data);
    updateState({
      destinationCords: {
        latitude: data.destinationCords.latitude,
        longitude: data.destinationCords.longitude,
      },
    });
  };

  const animate = (latitude, longitude) => {
    const newCoordinate = {latitude, longitude};
    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  const onCenter = () => {
    mapRef.current.animateToRegion({
      latitude: curLoc.latitude,
      longitude: curLoc.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };

  const fetchTime = (d, t) => {
    updateState({
      distance: d,
      time: t,
    });
  };

  return (
    <>
      <Header onClick={() => navigation.openDrawer()} />
      <View style={styles.container}>
        {/* {distance !== 0 && time !== 0 && (
          <View style={{alignItems: 'center', marginVertical: 16}}>
            <Text>Time left: {time.toFixed(0)} </Text>
            <Text>Distance left: {distance.toFixed(0)}</Text>
          </View>
        )} */}
        <View style={{flex: 1}}>
          <MapView
            ref={mapRef}
            style={StyleSheet.absoluteFill}
            initialRegion={{
              ...curLoc,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}>
            <Marker.Animated ref={markerRef} coordinate={coordinate}>
              <Image
                source={require('../../assets/Icons/carssss.png')}
                style={{
                  width: 40,
                  height: 40,
                  transform: [{rotate: `${heading}deg`}],
                }}
                resizeMode="contain"
              />
            </Marker.Animated>

            {Object.keys(destinationCords).length > 0 && (
              <Marker
                coordinate={destinationCords}
                // pinColor="hotpink"

                // source={require('../../assets/Icons/Group15307.png')}
              >
                <Image
                  source={require('../../assets/Icons/Group15307.png')}
                  style={{
                    width: 40,
                    height: 40,
                    transform: [{rotate: `${heading}deg`}],
                  }}
                  resizeMode="contain"
                />
              </Marker>
            )}

            {Object.keys(destinationCords).length > 0 && (
              <MapViewDirections
                origin={curLoc}
                destination={destinationCords}
                apikey={GOOGLE_MAP_KEY}
                strokeWidth={6}
                strokeColor="black"
                optimizeWaypoints={true}
                onStart={params => {
                  console.log(
                    `Started routing between "${params.origin}" and "${params.destination}"`,
                  );
                }}
                onReady={result => {
                  console.log(`Distance: ${result.distance} km`);
                  console.log(`Duration: ${result.duration} min.`);
                  fetchTime(result.distance, result.duration),
                    mapRef.current.fitToCoordinates(result.coordinates, {
                      edgePadding: {
                        // right: 30,
                        // bottom: 300,
                        // left: 30,
                        // top: 100,
                      },
                    });
                }}
                onError={errorMessage => {
                  // console.log('GOT AN ERROR');
                }}
              />
            )}
          </MapView>
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
            }}
            onPress={onCenter}>
            <Image
              style={{height: 80, width: 80}}
              source={require('../../assets/Icons/Group15300.png')}
            />
          </TouchableOpacity>
        </View>
        <BottomSheet />
      </View>
    </>
  );
};
const BottomSheet = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomCard: {
    backgroundColor: 'white',
    width: '100%',
    padding: 30,
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
  },
  inpuStyle: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    marginTop: 16,
  },
});

export default MapScreen;
