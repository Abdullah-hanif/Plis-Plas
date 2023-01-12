import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const WalletDetails = ({orderNumber, date, amount}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 20,
        }}>
        <View style={{height: '150%'}}>
          <Text
            style={{
              bottom: 20,
              fontWeight: 'bold',
              color: 'black',
              fontSize: 18,
            }}>
            {orderNumber}
          </Text>
          <Text
            style={{
              color: 'gray',
              fontSize: 12,
              top: 20,
            }}>
            {date}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: 'green',
            padding: 10,
            borderRadius: 20,
            paddingHorizontal: 20,
          }}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>{amount} Eur</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WalletDetails;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginVertical: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.8,
    borderColor: 'lightgray',
  },
});
