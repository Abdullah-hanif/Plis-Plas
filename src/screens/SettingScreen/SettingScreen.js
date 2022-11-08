import {StyleSheet, Text, View, Switch, TouchableOpacity} from 'react-native';
import React from 'react';
import Ico from 'react-native-vector-icons/AntDesign';

const SettingScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
        }}>
        <Ico name="left" size={25} color="black" />

        <Text
          style={{
            marginHorizontal: 80,
            left: 30,
            // fontWeight: 'bold',
            fontSize: 24,
            color: 'black',
          }}>
          Settings
        </Text>
      </View>
      <View style={{margin: 10, flex: 2, marginTop: 30}}>
        <SettingItems
          name=" Notifications"
          icon={<Switch />}
          onpress={() => navigation.navigate('ProfileScreen')}
        />
        <SettingItems
          name="Change Password"
          icon={<Ico name="right" size={25} color="black" />}
        />
        <SettingItems
          name=" Privacy Policy"
          icon={<Ico name="right" size={25} color="black" />}
        />
        <SettingItems
          name=" Terms & Condition"
          icon={<Ico name="right" size={25} color="black" />}
        />
        <SettingItems
          name=" About Us"
          icon={<Ico name="right" size={25} color="black" />}
        />
        <SettingItems
          name=" Logout"
          icon={<Ico name="right" size={25} color="black" />}
        />
      </View>
    </View>
  );
};

const SettingItems = ({name, icon, onpress}) => {
  return (
    <>
      <TouchableOpacity onPress={onpress}>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: 'black',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 15,
          }}>
          <Text style={{color: 'black'}}>{name}</Text>
          {icon}
        </View>
      </TouchableOpacity>
    </>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
