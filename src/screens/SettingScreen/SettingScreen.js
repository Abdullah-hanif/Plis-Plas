import {StyleSheet, Text, View, Switch, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Ico from 'react-native-vector-icons/AntDesign';
import {color} from '../../theme';

const SettingScreen = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 20,
          // marginRight: 20,
          left: 25,
          alignItems:"center"
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ico name="left" size={20} color="black" />
        </TouchableOpacity>

        <Text
          style={{
            marginHorizontal: 80,
            left: 30,
            // fontWeight: 'bold',
            fontWeight: 'bold',
            fontSize: 24,
            color: 'black',
          }}>
          Settings
        </Text>
      </View>
      <View style={{margin: 10, flex: 2, marginTop: 50}}>
        <SettingItems
          name=" Notifications"
          icon={
            <Switch
              trackColor={{false: '#767577', true: color.blue}}
              thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          }
        />
        <SettingItems
          name="Change Password"
          icon={<Ico name="right" size={22} color="black" />}
        />
        <SettingItems
          name=" Privacy Policy"
          icon={<Ico name="right" size={22} color="black" />}
        />
        <SettingItems
          name=" Terms & Condition"
          icon={<Ico name="right" size={22} color="black" />}
        />
        <SettingItems
          name=" About Us"
          icon={<Ico name="right" size={22} color="black" />}
        />
        <SettingItems
        onPress={()=>(navigation.navigate('Login'))}
          name=" Logout"
          icon={<Ico name="right" size={22} color="black" />}
        />
      </View>
    </View>
  );
};

const SettingItems = ({name, icon, onPress}) => {
  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: 'black',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 15,
            alignItems:'center'
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
