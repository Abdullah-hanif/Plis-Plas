import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Modal,
  ScrollView,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import React from 'react';
import Ico from 'react-native-vector-icons/AntDesign';
import Edit from 'react-native-vector-icons/Feather';
import Gender from 'react-native-vector-icons/MaterialCommunityIcons';
import Emial from 'react-native-vector-icons/Fontisto';
import ImagePicker, {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import {color} from '../../theme';

// @transaltion
import {useTranslation} from 'react-i18next';

const ProfileScreen = ({navigation}) => {
  const {t} = useTranslation();
  const dummyImage = require('../../assets/Icons/Group3952.png');
  const [openModal, setopenModal] = React.useState(false);
  const [img, imgUri] = React.useState(null);
  const [frontLicence, setFrontLicence] = React.useState(null);
  const [backtLicence, setBackLicence] = React.useState(null);

  console.log(img, '========>');

  const ImagePicker = () => {
    setopenModal(true);
  };

  const LaunchImageLibrary = type => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      console.log('Image LibraResponse = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = response;
        console.log('===>URL', source.assets[0].uri);
        // imgUri(source.assets[0].uri);
        setFrontLicence(source.assets[0].uri);
      }
    });
    setopenModal(false);
  };

  const LaunchCamera = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, response => {
      console.log('Response = ', response);

      // Permissions for launchng camera
      const requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
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
            console.log('You can use the camera');
          } else {
            console.log('Camera permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      };

      requestCameraPermission();

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = response;
        console.log('===>URL============>', source);
        // imgUri(source.assets[0].uri);
        setBackLicence(source.assets[0].uri);
      }
    });
    setopenModal(false);
  };

  return (
    <View style={styles.container}>
      {/* Header Started */}
      <ScrollView>
        <View style={styles.topHeader}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{paddingLeft: '3%'}}>
              <Image
                source={require('../../assets/Icons/back.png')}
                style={{width: 22, height: 22}}
              />
            </TouchableOpacity>
            <View>
              <Text style={styles.txt}>{t('common:MyProfile')}</Text>
            </View>
            <TouchableOpacity style={{paddingRight: '3%'}}>
              <Image
                source={require('../../assets/Icons/editProfile.png')}
                style={{width: 22, height: 22, marginRight: '2%'}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              top: '15%',
            }}>
            <View
              style={{
                height: 100,
                width: 100,

                borderWidth: 3,
                borderColor: color.black,
                borderRadius: 60,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                resizeMode="contain"
                style={{
                  margin: 10,
                  borderWidth: 0.8,
                  borderColor: 'black',
                  borderRadius: 60,
                  height: 120,
                  width: 120,
                  resizeMode: 'contain',
                }}
                source={require('../../assets/Images/profileimg.jpg')}
              />
            </View>
          </View>
        </View>
        {/* Header Ender */}
        {/* FirstComp Started */}
        <View
          style={{
            margin: 20,
            marginTop: 110,
            backgroundColor: 'white',
            // padding: 10,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,

            elevation: 8,
          }}>
          {/* Informtion area */}
          <View
            style={{
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderColor: 'lightgray',
            }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                margin: 10,
                color: 'black',
                paddingLeft: 5,
              }}>
              {t('common:Information')}
            </Text>
          </View>
          {/* End Informtion area */}
          <InfromationDetails
            icon={
              <Image
                source={require('../../assets/Icons/name.png')}
                style={{height: 25, width: 25}}
              />
            }
            title={t('common:Name')}
            name="Poco Ramos"
          />
          <InfromationDetails
            icon={
              <Image
                source={require('../../assets/Icons/Group10722.png')}
                style={{height: 25, width: 25}}
              />
            }
            title={t('common:Phone')}
            name="+92345628299"
          />
          <InfromationDetails
            icon={
              <Image
                source={require('../../assets/Icons/Group10723.png')}
                style={{height: 25, width: 25}}
              />
            }
            title={t('common:Email')}
            name="PocoRamos@gmail.com"
          />
          <InfromationDetails
            icon={
              <Image
                source={require('../../assets/Icons/Group41.png')}
                style={{height: 25, width: 25}}
              />
            }
            title={t('common:Gender')}
            name="Male"
          />
          <InfromationDetails
            icon={
              <Image
                source={require('../../assets/Icons/calender.png')}
                style={{height: 25, width: 25}}
              />
            }
            title={t('common:DOB')}
            name="8/17/1996"
          />
        </View>
        {/* FirstComp Ended */}
        {/* license Container start */}

        <LicenceContainer
          onClick={ImagePicker}
          icon={<Gender name="gender-female" size={25} color="black" />}
          title="Gender"
          name="Male"
          topHeading={t('common:Licence')}
          imgUri={
            !frontLicence ? (
              <>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: 'lightgray',
                    padding: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{height: 30, width: 30, tintColor: 'black'}}
                    source={dummyImage}
                  />
                  <Text style={{color: 'black'}}>{t('common:upload')}</Text>
                </View>
              </>
            ) : (
              <Image
                style={{height: 150, width: 145}}
                source={{uri: frontLicence}}
              />
            )
          }
        />

        {/* license Container End */}
        {/* CIVIL ID CONTAINER */}
        <LicenceContainer
          onClick={ImagePicker}
          icon={<Gender name="gender-female" size={25} color="black" />}
          title="Gender"
          name="Male"
          topHeading={t('common:CivilId')}
          imgUri={
            !img ? (
              <>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: 'lightgray',
                    padding: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{height: 30, width: 30, tintColor: 'black'}}
                    source={dummyImage}
                  />
                  <Text style={{color: 'black'}}>{t('common:upload')}</Text>
                </View>
              </>
            ) : (
              <Image style={{height: 150, width: 145}} source={{uri: img}} />
            )
          }
        />

        {/* End CIVIL CONTAINER */}

        {/* //Modal View */}
        {openModal ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={openModal}
            onRequestClose={() => {
              alert('Modal has been closed.');
              setopenModal(!openModal);
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.61)',
                flexDirection: 'column-reverse',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 20,
                  margin: 30,
                  borderRadius: 20,
                  justifyContent: 'flex-end',
                }}>
                <TouchableOpacity
                  onPress={LaunchCamera}
                  style={{flexDirection: 'row'}}>
                  <Ico name="camerao" size={30} color="black" />
                  <Text
                    style={{fontSize: 15, color: 'black', top: 5, left: 10}}>
                    {t('common:takeaphoto')}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={LaunchImageLibrary}
                  style={{flexDirection: 'row'}}>
                  <Gender
                    name="view-dashboard-outline"
                    size={30}
                    color="black"
                  />
                  <Text
                    style={{fontSize: 15, color: 'black', top: 5, left: 10}}>
                    {t('common:chosefromGallery')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        ) : null}
        {/* END Modal View */}
      </ScrollView>
    </View>
  );
};

const InfromationDetails = ({icon, title, name}) => {
  return (
    <>
      <View style={{flexDirection: 'row', margin: 15}}>
        <View style={{alignItems: 'center'}}>{icon}</View>
        <View
          style={{
            flexDirection: 'row',

            // justifyContent: 'space-between',
            alignItems: 'center',
            // justifyContent: 'space-between',

            width: '70%',
            marginHorizontal: 25,
            // paddingHorizontal: 30,
          }}>
          <View style={{width: '30%', alignItems: 'center'}}>
            <Text
              style={{
                fontWeight: 'bold',
                color: 'black',
                fontSize: 17,
                textAlign: 'left',
                alignSelf: 'flex-start',
              }}>
              {title}
            </Text>
          </View>
          <View style={{width: '90%', alignItems: 'center', top: '1%'}}>
            <Text
              style={{
                color: 'black',
                alignSelf: 'flex-start',

                // textAlign: 'right',
                // marginHorizontal: 20,
                // textAlign: 'left',
                // flexDirection: 'row',
                // alignSelf: 'flex-start',
              }}>
              {name}
            </Text>
          </View>
        </View>
      </View>
      {/* <View
        style={
          {
            // margin: 10,
            // justifyContent: 'space-between',
            // flexDirection: 'row',
          }
        }>
        <View style={{flexDirection: 'row'}}>
          <View>{icon}</View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text
            style={{
              fontWeight: 'bold',
              color: 'black',
              fontSize: 17,
              left: 10,
            }}>
            {title}
          </Text>
          <Text style={{color: 'black', right: 25}}>{name}</Text>
        </View>
      </View> */}
    </>
  );
};

const LicenceContainer = ({icon, title, name, topHeading, onClick, imgUri}) => {
  const {t} = useTranslation();
  return (
    <>
      <View
        style={{
          margin: 20,
          // marginTop: 110,
          backgroundColor: 'white',
          // padding: 10,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4.65,

          elevation: 8,
        }}>
        <View
          style={{
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderColor: 'lightgray',
          }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              margin: 10,
              color: 'black',
              // padding: 10,
            }}>
            {topHeading}
          </Text>
        </View>
        <View
          style={{
            margin: 10,

            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <TouchableOpacity onPress={onClick}>
            <View>
              <Text
                style={{
                  fontWeight: '400',
                  color: 'black',
                  fontSize: 17,
                  margin: 10,
                }}>
                {t('common:front')}
              </Text>
              {/* <Text style={{color: 'black', right: 25}}>{name}</Text> */}
              {/* <Image
                style={{height: 150, width: 145}}
                source={require('../../assets/Images/licese.jpg')}
              /> */}
              {imgUri}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClick}>
            <View>
              <Text
                style={{
                  fontWeight: '400',
                  color: 'black',
                  fontSize: 17,
                  margin: 10,
                }}>
                {t('common:Back')}
              </Text>
              {/* <Text style={{color: 'black', right: 25}}>{name}</Text> */}
              {imgUri}
              {/* <Image
                style={{height: 150, width: 145}}
                source={require('../../assets/Images/licese.jpg')}
              /> */}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topHeader: {
    height: Dimensions.get('screen').height / 4.5,
    padding: 10,

    backgroundColor: color.blue,
  },
  txt: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 25,
    margin: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    padding: 30,

    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
  },
});
