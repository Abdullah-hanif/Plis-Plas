import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {color} from '../../theme';
import Back from 'react-native-vector-icons/AntDesign';
import Bell from 'react-native-vector-icons/FontAwesome';

// @APi
import {approvedOrder} from '../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// @transaltion
import {useTranslation} from 'react-i18next';
const OrderDetails = ({navigation, route}) => {
  const [shopeDetails, setShopeDetails] = React.useState();

  const {enableAccept} = route.params;
  console.log('CONDITION=====>', enableAccept);

  useEffect(() => {
    getRestDetails();
  }, []);

  const getRestDetails = async () => {
    const data = await AsyncStorage.getItem('restaurantDetails');
    const realData = JSON.parse(data);
    setShopeDetails(realData);
    console.log('RESTAURANT DETAILS======>', realData?.shopName);
  };

  const {t} = useTranslation();
  const AcceptOrder = async () => {
    const res = await approvedOrder('/approved', {
      checkoutId: shopeDetails?.checkoutId,
      userId: 35,
    });
    console.log('RESPONSE +++', res);
  };
  return (
    <View style={styles.container}>
      <Header onClick={() => navigation.goBack()} />
      <ScrollView style={{marginBottom: 30}}>
        {/* first Container */}
        <View style={styles.secoundContainer}>
          <Text style={styles.restStyle}>{t('common:restaurant')}</Text>
          <Text style={styles.restNameStyle}>{shopeDetails?.shopName}</Text>
        </View>
        {/* secoundContainer */}
        {shopeDetails?.items.map((item, index) => {
          return (
            <>
              <View style={styles.secoundContainer}>
                <Text style={styles.restStyle}>{t('common:orderdetail')}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        height: 20,
                        width: 20,
                        borderColor: 'black',
                        borderWidth: 1,
                        alignItems: 'center',
                        borderRadius: 30,
                        justifyContent: 'center',
                      }}>
                      <Text style={{color: 'black'}}>{item?.quantity}</Text>
                    </View>
                    <View style={{left: 10}}>
                      {/* <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 18,
                          color: 'black',
                        }}>
                        {t('common:deal')} 5
                      </Text> */}
                      <Text style={{color: 'gray', fontSize: 14}}>
                        {item?.itemName}
                      </Text>
                    </View>
                  </View>
                  <Text style={{fontWeight: '900', top: 20, color: 'black'}}>
                    {` Rs${item?.itemPrice}`}
                  </Text>
                </View>
              </View>
            </>
          );
        })}
        {/* 3rd Container */}
        {/* <View
          style={[
            styles.secoundContainer,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
          ]}>
          <View>
            <Text style={styles.restStyle}>{t('common:subtotal')}</Text>
            <Text style={styles.restNameStyle}>{t('common:deliveryfee')}</Text>
          </View>
          <View>
            <Text style={styles.restStyle}> Rs 1,510.00</Text>
            <Text style={[styles.restNameStyle, {textAlign: 'right'}]}>
              Rs 49.00
            </Text>
          </View>
        </View> */}
        {/* 4th container */}
        <View
          style={[
            styles.secoundContainer,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
            },
          ]}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.restStyle}>{t('common:total')}</Text>
            <Text style={{color: 'gray', top: 3, left: 10}}>
              (incl. {t('common:tax')})
            </Text>
          </View>
          <Text
            style={[
              styles.restNameStyle,
              {fontWeight: 'bold', color: 'black'},
            ]}>
            {`Rs${shopeDetails?.totalPrice}`}
          </Text>
        </View>
        {/* 4th container */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: 10,
          }}>
          <Text style={{fontWeight: '700', fontSize: 18, color: 'black'}}>
            {t('common:paymentType')}
          </Text>
          <Text style={{fontWeight: '700', fontSize: 18, color: 'black'}}>
            {t('common:cashondelivery')}
          </Text>
        </View>
        {/* End 4th container */}
        {!enableAccept ? (
          <View
            style={{
              margin: 50,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={AcceptOrder} style={styles.acceptStyle}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>ACCEPT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rejectStyle}>
              <Text style={{fontWeight: 'bold', color: 'black'}}>Reject</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
};

const Header = ({onClick}) => {
  return (
    <>
      <View onPress={onClick} style={styles.headerContainer}>
        <TouchableOpacity onPress={onClick}>
          <Back name="left" size={30} color="white" />
        </TouchableOpacity>
        <Image
          style={styles.imgStyle}
          source={require('../../assets/Icons/Group15265.png')}
        />
        <Bell name="bell-o" size={25} color="white" />
      </View>
    </>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    backgroundColor: color.blue,
    padding: 20,
    justifyContent: 'space-between',
  },
  imgStyle: {
    height: 50,
    width: 50,
    tintColor: 'white',
  },
  secoundContainer: {
    borderBottomWidth: 1,
    padding: 30,
    borderBottomColor: 'lightgray',
  },
  restStyle: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 19,
  },
  restNameStyle: {
    color: 'gray',
    fontSize: 14,
  },
  acceptStyle: {
    backgroundColor: color.blue,
    padding: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  rejectStyle: {
    backgroundColor: color.white,
    padding: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'black',
  },
});
