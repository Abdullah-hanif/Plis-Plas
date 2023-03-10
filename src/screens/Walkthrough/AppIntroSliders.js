import React from 'react';
// import Icon from 'react-native-vector-icons/Ionicons';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Button,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {color} from '../../theme';

// @Translation
import {useTranslation} from 'react-i18next';

const styles = StyleSheet.create({
  buttonCircle: {
    width: 340,
    height: '55%',
    right: '3.5%',
    marginBottom: 50,
    backgroundColor: color.blue,
    borderRadius: 360,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    display: 'flex',
  },
  buttonCirclet: {
    width: 340,
    height: '50%',
    right: '3.5%',
    marginBottom: 50,
    backgroundColor: color.blue,
    borderRadius: 360,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    display: 'flex',
  },
  slide: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  title: {},
  text: {},

  //[...]
});

// slides = [...]
const slides = [
  {
    key: 1,
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: require('../../assets/Icons/2ndonboarding.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Title 2',
    text: 'Other cool stuff',
    image: require('../../assets/Icons/3rdonboardig.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'Rocket guy',
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require('../../assets/Icons/1stonboarding.png'),
    backgroundColor: '#22bcb5',
  },
];

const AppIntroSliders = ({navigation}) => {
  const {t} = useTranslation();

  const renderItem = ({item}) => {
    return (
      <>
        <StatusBar hidden />
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            //  padding: 10,
            marginTop: 10,
            marginBottom: 190,
          }}>
          <View style={{paddingLeft: '5%', paddingTop: '15%'}}>
            <Text
              style={{
                fontSize: 15,
                color: 'black',
                fontWeight: '400',
                fontFamily: 'sofiapro-light',
              }}>
              {/* Hello nice to meet you! */}
              {t('common:Hellonicetomeetyou')}
            </Text>
            <Text
              style={{
                fontSize: 27,
                color: 'black',
                fontWeight: 'bold',
                fontFamily: 'sofiapro-light',
              }}>
              {t('common:Getanewexperience')}
            </Text>
          </View>
          <Image
            resizeMode="contain"
            style={{
              // marginTop: 30,
              // backgroundColor: 'blue',
              height: '100%',
              width: '100%',
              // width: Dimensions.get('screen').width,
            }}
            source={item.image}
          />
        </View>
      </>
    );
  };
  renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Text style={{fontWeight: 'bold', color: 'white'}}>
          {t('common:CONTINUE')}
        </Text>
      </View>
    );
  };
  renderDoneButton = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <View style={styles.buttonCirclet}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>
            {t('common:CONTINUE')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <AppIntroSlider
        style={{backgroundColor: 'white'}}
        data={slides}
        renderItem={renderItem}
        renderDoneButton={renderDoneButton}
        renderNextButton={renderNextButton}
        dotStyle={{backgroundColor: 'white'}}

        // ya dots ko chupa dyta ha
        // renderPagination={() => null}
      />
    </>
  );
};

export default AppIntroSliders;
