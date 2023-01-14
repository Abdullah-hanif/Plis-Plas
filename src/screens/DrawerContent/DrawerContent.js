import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import Ico from 'react-native-vector-icons/Entypo';
import LogOut from 'react-native-vector-icons/MaterialIcons';
import Home from 'react-native-vector-icons/Feather';
import Order from 'react-native-vector-icons/FontAwesome';
import Profile from 'react-native-vector-icons/MaterialCommunityIcons';
import Cross from 'react-native-vector-icons/EvilIcons';
import {color} from '../../theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

// @redux
import {useDispatch, useSelector} from 'react-redux';

// @translation
import {useTranslation} from 'react-i18next';
import {useIsFocused} from '@react-navigation/native';

export const DrawerContent = ({navigation}) => {
  const [name, setName] = useState('Poco Ramos');
  // const [profileImg, setProfileImg] = useState(
  //   'http://projects.websetters.in/digg-seos/digg/wp-content/themes/twentytwenty-child-theme/img/demo-prof.jpg',
  // );
  const [img, SetImgUri] = useState(
    'http://projects.websetters.in/digg-seos/digg/wp-content/themes/twentytwenty-child-theme/img/demo-prof.jpg',
  );
  const focused = useIsFocused();
  const reduData = useSelector(state => state.profileDetail);

  const getUsername = async () => {
    const userName = await AsyncStorage.getItem('userName');
    console.log('userNAAAAAAAAAAAAAAMMMMMMMMMMME==>', userName);
    setName(userName);
  };

  React.useEffect(() => {
    getUsername();
    reduData?.profileDetail.map((data, index) => {
      return setName(data?.name), SetImgUri(data?.profilePicture);
    });
  }, [focused == true]);
  // console.log('PROFILE IMAGE===>', profileImg);
  const {t} = useTranslation();
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
                style={{
                  height: 80,
                  width: 80,
                  borderRadius: 70,
                  tintColor: 'white',
                }}
                // source={require('../../assets/Images/men.jpg')}
                // source={{uri: img}}
                source={require('../../assets/Icons/Group15299.png')}

                //   <Image
                //   style={{height: 50, width: 50}}
                // />
              />
            </View>
            <Text
              style={{
                fontWeight: '700',
                color: 'black',
                fontSize: 18,
                marginTop: 10,
              }}>
              {name}
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
              <Text style={{margin: 10, left: 10, color: 'black'}}>
                {t('common:home')}
              </Text>
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
                {t('common:profile')}
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
              <Text style={{margin: 10, left: 10, color: 'black'}}>
                {t('common:orders')}
              </Text>
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
                {t('common:settings')}
              </Text>
            }
          />
          {/* <DrawerItemContainer
            onpress={() => navigation.navigate('MyWallet')}
            ico={
              <Image
                source={require('../../assets/Icons/Group10642.png')}
                style={{height: 25, width: 25, tintColor: 'gray'}}
              />
            }
            name={
              <Text
                style={{
                  margin: 10,
                  left: 10,
                  color: 'black',

                  width: '100%',
                }}>
                My Wallet
              </Text>
            }
          /> */}
          <DrawerItemContainer
            onpress={() => {
              AsyncStorage.clear(), navigation.navigate('Login');
            }}
            ico={
              <Image
                source={require('../../assets/Icons/Group4090.png')}
                style={{height: 25, width: 25}}
              />
            }
            name={
              <Text style={{margin: 10, left: 10, color: 'black'}}>
                {t('common:logout')}
              </Text>
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
