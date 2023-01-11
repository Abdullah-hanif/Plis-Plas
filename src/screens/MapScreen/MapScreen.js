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
  Touchable,
  Modal,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import {approvedOrder, onlineOffline} from '../../api/api';
import {useToast} from 'react-native-toast-notifications';
// @Translation
import {useTranslation} from 'react-i18next';

// @redux
import {useSelector, useDispatch} from 'react-redux';
import OrderDetails from '../OrderDetails/OrderDetails';
import {useIsFocused} from '@react-navigation/native';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAP_KEY = 'AIzaSyC_47Al-kSZhkd7VidzuGiKl1R39E1lN8E';

let myconditon = null;

export const ShowAlerScree = value => {
  myconditon = value;
  console.log('INSIDE FUNC', myconditon);
  return myconditon;
};

const MapScreen = ({navigation}) => {
  const toast = useToast();

  const mapRef = useRef();
  const markerRef = useRef();
  const [isEnabled, setIsEnabled] = useState(false);
  const [showacceptScreen, setAcceptScree] = useState(false);
  const [checkOutId, setCheckOutId] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [notiData, setNotiData] = useState();
  const [showHeaderDetails, setHeaderDetails] = useState('both');

  // @redux Details
  const [name, setName] = useState('');
  const [profileImg, setProfileImg] = useState(
    'http://projects.websetters.in/digg-seos/digg/wp-content/themes/twentytwenty-child-theme/img/demo-prof.jpg',
  );

  const {t} = useTranslation();

  // const [meetDistance, setMeetDistance] = useState();

  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  // console.log('====FUNICUCNC===>', myconditon);

  const showAcceptScreen = () => {
    setTimeout(() => {
      console.log('ACCPET SCREEN', myconditon);
      // AsyncStorage.setItem("acitveScreen","accept")
      myconditon ? setAcceptScree(true) : null;
    }, 1000);
  };

  const [state, setState] = useState({
    curLoc: {
      latitude: 24.833797888244483,
      longitude: 67.07092911044822,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    destinationCords: {
      latitude: 0.0,
      longitude: 0.0,
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

  // useEffect(() => {
  //   PostionsMarks();
  // }, [meetDistance]);
  //check rider is at restaurant address or not
  // const PostionsMarks = () => {
  //   setMeetDistance(distance * 1000);
  //   return meetDistance <= 30 ? alert('meet done') : console.log('not equal');
  // };

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

  const getAddress = async () => {
    const data = await AsyncStorage.getItem('restaurantDetails');
    // console.log('PUSH NOTIFICATION JSON DATA===>', data);
    const realData = JSON.parse(data);
    setNotiData(realData);
  };

  const getDestination = async () => {
    const data = await AsyncStorage.getItem('restaurantDetails');
    // console.log('PUSH NOTIFICATION JSON DATA===>', data);
    const realData = JSON.parse(data);
    // setNotiData(realData);
    setCheckOutId(realData?.checkoutId);
    // const {destinationCords} = state;

    setState({
      ...state,
      destinationCords: {
        // latitude: 24.816201,
        // longitude: 67.142086,
        // 24.815821, 67.140169
        //<=======================Real COde is here=======================>
        latitude: JSON.parse(realData?.latitude),
        longitude: JSON.parse(realData?.longitude),
        //<=======================Real COde is here=======================>
      },
    });

    console.log('======>LATITIUDEEEEE', realData?.latitude);
    console.log('======>LATITIUDEEEEE', realData?.longitude);
  };

  useEffect(() => {
    getLiveLocation();
    // getToken();
    getAddress();
    showAcceptScreen();
  }, [myconditon]);

  // const getToken = async () => {
  //   await messaging().registerDeviceForRemoteMessages();
  //   const token = await messaging().getToken();
  //   AsyncStorage.setItem('token', token);
  //   return console.log('====>TOKENNNNNN====>', token);
  // };

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

  const reduData = useSelector(state => state.profileDetail);
  const getName = async () => {
    // alert('name fun');
    reduData?.profileDetail.length == 0
      ? setName(await AsyncStorage.getItem('userName'))
      : reduData?.profileDetail.map((data, index) => {
          return setName(data?.name), setProfileImg(data?.profilePicture);
        });
  };
  const focused = useIsFocused();

  const getMode = async () => {
    const mode = await AsyncStorage.getItem('mode');
    console.log('MODE======>', mode);
    const data = await AsyncStorage.getItem('restaurantDetails');
    // console.log('PUSH NOTIFICATION JSON DATA===>', data);
    mode == 'ON' ? setIsEnabled(true) : setIsEnabled(false);
    return mode;
  };

  useEffect(() => {
    // reduData?.profileDetail.map((data, index) => {
    //   return setName(data?.name), setProfileImg(data?.profilePicture);
    // });
    getName();
    getMode();
  }, [focused == true]);

  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 4000);
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

  //OrderDispatched

  const OrderDispatched = async () => {
    // alert('dispathced sucessfully');
    const data = await AsyncStorage.getItem('restaurantDetails');
    // const realData = JSON.parse(data);
    // setCheckOutId(realData?.checkoutId);
    // const {destinationCords} = state;
    setHeaderDetails('DropOff');
    setState({
      ...state,
      destinationCords: {
        latitude: 24.816884,
        longitude: 67.141917,
        //<=======================Real COde is here=======================>
        // latitude: JSON.parse(realData?.latitude),
        // longitude: JSON.parse(realData?.longitude),
        //<=======================Real COde is here=======================>
      },
    });
  };
  // console.log('NOTIFICATION DATA==>', notiData);
  return (
    <>
      <Header onClick={() => navigation.openDrawer()} />
      {showacceptScreen ? (
        <PickupDropoffContainer
          showDetails={showHeaderDetails}
          details={notiData}
        />
      ) : null}

      <View style={styles.container}>
        {/* {distance !== 0 && time !== 0 && (
          <View style={{alignItems: 'center', marginVertical: 16}}>
            <Text>Time left: {time.toFixed(0)}min </Text>
            <Text>Distance left: {distance.toFixed(0)} km</Text>
          </View>
        )} */}
        {/* //Incomming Details pickup and Dropoff */}
        {/* Incomming Details END pickup and Dropoff */}
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
                source={require('../../assets/Icons/CarImg.png')}
                style={{
                  width: 30,
                  height: 30,
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
        {!showacceptScreen ? (
          <BottomSheet
            changeNamefunc={() => getName()}
            personName={name}
            imgrUri={profileImg}
            isEnabled={isEnabled}
            toggleSwitch={async () => {
              setIsEnabled(previousState => !previousState);
              // alert(isEnabled);
              !isEnabled
                ? await AsyncStorage.setItem('mode', 'ON')
                : await AsyncStorage.setItem('mode', 'OFF');
              const res = await onlineOffline({
                userId: 35,
                value: !isEnabled ? 'on' : 'offline',
              });

              !isEnabled
                ? toast.show('you are online', {
                    type: 'success',
                    placement: 'top',
                    duration: 4000,
                    offset: 30,
                    animationType: 'slide-in | zoom-in',
                  })
                : toast.show('your offline', {
                    type: 'danger',
                    placement: 'top',
                    duration: 4000,
                    offset: 30,
                    animationType: 'slide-in | zoom-in',
                  });

              console.log('===>RESPONSEEEEE===>', res);
              // setTimeout(() => {
              //   setAcceptScree(true);
              // }, 4000);
            }}
          />
        ) : (
          <AcceptRejectContainer
            orderDispatched={() => OrderDispatched()}
            distance={distance}
            showHeaderDetails={() => setHeaderDetails('Pickup')}
            // distance={0.03}
            checkOutId={checkOutId}
            showDestination={() => getDestination()}
            finalFunction={() => {
              setState({
                ...state,
                destinationCords: {
                  latitude: 0.0,
                  longitude: 0.0,
                  //<=======================Real COde is here=======================>
                  // latitude: JSON.parse(realData?.latitude),
                  // longitude: JSON.parse(realData?.longitude),
                  //<=======================Real COde is here=======================>
                },
              });
              setAcceptScree(false);
              setHeaderDetails('both');
            }}
            viewOrderScreen={enableAccept => {
              navigation.navigate('OrderDetails', {enableAccept: enableAccept});
              // setAcceptScree(false);
            }}
          />
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        //   Alert.alert('Modal has been closed.');
        //   setModalVisible(!modalVisible);
        // }}
      >
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.62)'}}>
          <View>
            <Image
              style={{height: 50, width: 50}}
              source={require('../../assets/Icons/Group15299.png')}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const AcceptRejectContainer = ({
  viewOrderScreen,
  checkOutId,
  showDestination,
  distance,
  orderDispatched,
  showHeaderDetails,
  finalFunction,
}) => {
  const toast = useToast();
  const [enableAccept, setEnableAccept] = useState(false);
  const [customerHandle, setCustomerHandle] = useState(false);
  const {t} = useTranslation();

  const DispatchedOrder = () => {
    orderDispatched();
    setCustomerHandle(!customerHandle);
  };

  const AcceptOrder = async () => {
    setEnableAccept(true);
    const userID = await AsyncStorage.getItem('userID');
    console.log('CHECKOUT ID====>', checkOutId, userID);

    const res = await approvedOrder('/approved', {
      checkoutId: checkOutId,
      userId: userID,
    });
    showDestination();
    showHeaderDetails();
    console.log('RESPONSE +++', res);
    toast.show(res?.message, {
      type: 'success',
      placement: 'top',
      duration: 4000,
      offset: 30,
      animationType: 'slide-in | zoom-in',
    });
  };

  const RejectOrder = async () => {
    const userID = await AsyncStorage.getItem('userID');
    const res = await approvedOrder('/cancelled', {
      checkoutId: checkOutId,
      userId: userID,
    });
    console.log('RESPONSE +++', res);
    toast.show(res?.message, {
      type: 'danger',
      placement: 'top',
      duration: 4000,
      offset: 30,
      animationType: 'slide-in | zoom-in',
    });
  };

  const DeliveredOrder = async () => {
    const userID = await AsyncStorage.getItem('userID');
    const res = await approvedOrder('/delivered', {
      checkoutId: checkOutId,
      userId: userID,
    });
    setTimeout(() => {
      finalFunction();
    }, 2000);
    console.log('RESPONSE +++', res);

    res?.message == 'Delivered successfully'
      ? setModalVisible(true)
      : alert('their is a problem check again');

    // toast.show(res?.message, {
    //   type: 'success',
    //   placement: 'top',
    //   duration: 4000,
    //   offset: 30,
    //   animationType: 'slide-in | zoom-in',
    // });
  };

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View
      style={{
        //   flex: 1,
        //   backgroundColor: 'yellow',
        flexDirection: 'column-reverse',
      }}>
      {!customerHandle ? (
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
          <Text style={{fontWeight: 'bold', color: 'black'}}>
            {`${distance * 1000}`}m
          </Text>
          <View
            style={{
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 18}}>
              {distance * 1000 == 0 ? t('common:HeaderUp') : null}
              {distance * 1000 > 30 ? 'Order Start' : null}
              {distance * 1000 <= 30 && distance != 0
                ? t('common:Pleasewait')
                : null}
            </Text>
            <Text style={{color: 'black', fontSize: 15, top: 5}}>
              {/* {distance * 1000 == 0 ? t('common:youhavegotaneworder') : null} */}

              {distance * 1000 <= 30 && distance == !0
                ? t('common:Orderisgettingready')
                : t('common:youhavegotaneworder')}
            </Text>
            <TouchableOpacity onPress={() => viewOrderScreen(enableAccept)}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  top: 5,
                  textDecorationLine: 'underline',
                }}>
                {distance * 1000 <= 30 && distance != 0
                  ? t('common:Pleasewaitfewmintues')
                  : null}
                {distance * 1000 == 0 ? t('common:ViewOrder') : null}
                {distance * 1000 > 30 ? 'Order is getting ready' : null}

                {/* {distance * 1000 <= 30 && distance !== 0
                  ? t('common:Pleasewaitfewmintues')
                  : distance == 0
                  ? t('common:ViewOrder')
                  : null} */}
              </Text>
            </TouchableOpacity>
          </View>
          {distance * 1000 <= 30 && distance !== 0 ? (
            <TouchableOpacity
              onPress={DispatchedOrder}
              style={{
                backgroundColor: color.blue,
                padding: 15,
                paddingHorizontal: 50,
                margin: 20,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
              }}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>
                {t('common:OrderDispatched')}
              </Text>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                padding: 10,
                justifyContent: 'space-between',
                marginHorizontal: 10,
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              {/* ACCEPT BUTTON=========> */}
              <TouchableOpacity
                onPress={AcceptOrder}
                style={{
                  backgroundColor: color.blue,
                  padding: 15,
                  paddingHorizontal: 50,
                  borderRadius: 30,
                }}>
                <Text style={{fontWeight: 'bold', color: 'white'}}>
                  {t('common:accept')}
                </Text>
              </TouchableOpacity>
              {/* ACCEPT END=========> */}
              {/* ACCEPT BUTTON=========> */}
              <TouchableOpacity
                onPress={RejectOrder}
                disabled={enableAccept}
                style={{
                  backgroundColor: color.white,
                  padding: 15,
                  paddingHorizontal: 50,
                  borderWidth: 1,
                  borderColor: !enableAccept ? 'black' : 'gray',
                  borderRadius: 30,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: !enableAccept ? 'black' : 'gray',
                  }}>
                  {t('common:reject')}
                </Text>
              </TouchableOpacity>
              {/* ACCEPT END=========> */}
            </View>
          )}
        </View>
      ) : (
        <>
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
              justifyContent: 'center',
              alignItems: 'center',
              // padding: 10,
              paddingVertical: 30,
            }}>
            <Text style={{fontWeight: 'bold', color: 'black', fontSize: 18}}>
              {t('common:OnTheWay')}
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Image
                resizeMode="contain"
                style={{height: 50, width: 50, right: 10}}
                source={require('../../assets/Icons/Group13525.png')}
              />
              <Text style={{color: 'black', fontSize: 18}}>
                {t('common:ContactCustomer')}
              </Text>
            </View>
            <TouchableOpacity onPress={() => viewOrderScreen(enableAccept)}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 15,
                  textDecorationLine: 'underline',
                }}>
                {t('common:details')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                // alert(t('common:orderdeliverd'));
                DeliveredOrder();
              }}
              style={{
                marginVertical: 10,
                backgroundColor: color.blue,
                padding: 15,
                top: 30,
                paddingHorizontal: 100,

                // borderColor:'black',
                borderRadius: 30,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                {t('common:Delivered')}
              </Text>
            </TouchableOpacity>
          </View>

          <Modal
            statusBarTranslucent={true}
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.61)',
                height: Dimensions.get('screen').height,
                width: Dimensions.get('screen').width,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  width: '90%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 30,
                  borderRadius: 20,
                }}>
                <TouchableOpacity
                  style={{alignSelf: 'flex-end'}}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: 'black',
                      fontWeight: 'bold',
                    }}>
                    Close
                  </Text>
                </TouchableOpacity>
                <Image
                  resizeMode="contain"
                  style={{height: 150, width: 150}}
                  source={require('../../assets/Icons/Group15265.png')}
                />
                <Text
                  style={{fontWeight: 'bold', fontSize: 19, color: 'black'}}>
                  Order Delivered
                </Text>
                <Text
                  style={{
                    fontSize: 15,
                    color: 'black',
                    textAlign: 'center',
                    flexWrap: 'wrap',
                  }}>
                  you have sucessfully delivered{'\n'} your order
                </Text>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
};
const BottomSheet = ({
  isEnabled,
  toggleSwitch,
  personName,
  changeNamefunc,
  imgrUri,
}) => {
  // const [isEnabled, setIsEnabled] = useState(false);
  // const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  useEffect(() => {
    changeNamefunc();
  }, []);

  const {t} = useTranslation();
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
              color: !isEnabled ? 'darkred' : 'lightgreen',
            }}>
            {!isEnabled ? t('common:youareoffline') : t('common:youareonline')}
          </Text>
          {/* 2nd Container */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
              {/* <View
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
                  source={{uri: imgrUri}}
                  // source={require('../../assets/Images/men.jpg')}
                />
              </View> */}
              <Text
                style={{
                  fontWeight: 'bold',
                  left: 15,
                  color: 'black',
                  fontSize: 19,
                  // top: 13,
                }}>
                {personName}
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
          {/* <View
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
              <Text style={{fontSize: 15, color: 'gray'}}>
                {t('common:acceptance')}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AntDesign name="closecircle" size={30} color={'#1284f2'} />
              <Text style={{fontWeight: 'bold', color: 'black'}}>2.0%</Text>
              <Text style={{fontSize: 15, color: 'gray'}}>
                {t('common:cancellation')}
              </Text>
            </View>
          </View> */}
        </View>
        {/* End 3rd Container */}
      </View>
    </View>
  );
};

const PickupDropoffContainer = ({details, showDetails}) => {
  console.log('PICKUP CONTAINER====>', details);
  return (
    <>
      <View
        style={{
          backgroundColor: 'white',
          height: '20%',
          position: 'absolute',
          width: '90%',

          // top: '10%',
          borderRadius: 10,
          padding: 10,
          margin: 15,
          zIndex: 1,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
          flexDirection: 'row',

          elevation: 9,
        }}>
        <View>
          {showDetails == 'both' ? (
            <Image
              resizeMode="contain"
              style={{height: '80%'}}
              source={require('../../assets/Icons/Group16945.png')}
            />
          ) : null}
          {/* <Image
            style={{height: 30, width: 30}}
            source={require('../../assets/Icons/Group15266.png')}
          />
          <Image
            style={{height: 30, width: 30}}
            source={require('../../assets/Icons/Group15266.png')}
          /> */}
        </View>
        {showDetails == 'both' ? (
          <View style={{left: 10}}>
            <View style={{flexWrap: 'wrap'}}>
              <Text style={{color: 'black', fontSize: 12}}>
                {/* AI Zumarodn Tower Floor 21,20,m2 */}
                {details?.pickupAddress}
              </Text>
              <Text style={{fontWeight: 'bold', color: 'black'}}>
                Pickeup Location
              </Text>
            </View>
            <View style={{top: 25, width: '95%'}}>
              <Text
                numberOfLines={1}
                style={{color: 'black', fontSize: 12, flexWrap: 'wrap'}}>
                {/* AI Zumarodn Tower Floor 21,20,m2 */}
                {details?.deliveryAddress}
              </Text>
              <Text style={{fontWeight: 'bold', color: 'black'}}>
                Delivery Address
              </Text>
            </View>
          </View>
        ) : null}
        {showDetails == 'Pickup' ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'red',
              width: '100%',
            }}>
            <Text
              style={{fontWeight: 'bold', color: 'black', textAlign: 'center'}}>
              Pickeup Location
            </Text>
            <Text style={{color: 'black', fontSize: 12, top: 10}}>
              {/* AI Zumarodn Tower Floor 21,20,m2 */}
              {details?.pickupAddress}
            </Text>
            {/* <Text style={{fontWeight: 'bold', color: 'black'}}>
              Pickeup Location
            </Text> */}
          </View>
        ) : null}
        {showDetails == 'DropOff' ? (
          <View
            style={{
              width: '100%',
              // backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: 'bold', color: 'black'}}>
              Delivery Address
            </Text>
            <Text
              numberOfLines={1}
              style={{color: 'black', fontSize: 12, flexWrap: 'wrap', top: 10}}>
              {/* AI Zumarodn Tower Floor 21,20,m2 */}
              {details?.deliveryAddress}
            </Text>
            {/* <Text style={{fontWeight: 'bold', color: 'black'}}>
              Delivery Address
            </Text> */}
          </View>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: -1,
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
