import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React from 'react';

// @Components
import Header from '../../components/Header';
import Button from '../../components/Button/Button';
import WalletDetails from '../../components/WalletDetails';

const MyWallet = () => {
  const myWallet = [
    {
      id: 1,
      orderNumber: 'Order #  9939339',
      date: '11 jul,22:00',
      amount: '+20',
    },
    {
      id: 2,
      orderNumber: 'Order #  9873',
      date: '11 jul,22:00',
      amount: '+20',
    },
    {
      id: 3,
      orderNumber: 'withdrawerl Ammount',
      date: '11 jul,22:00',
      amount: '-11',
    },
  ];
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Header backarrow={true} />
      <View style={styles.secoundContainer}>
        {/* //First Container */}
        <View style={styles.walletContainer}>
          <Image
            resizeMode="contain"
            style={{height: 80, width: 80}}
            source={require('../../assets/Icons/Group10642.png')}
          />
          <Text style={styles.walletHeading}>Wallet Balance</Text>
          <Text style={styles.walletHeading}>300 EUR</Text>
          <Button text="Withdraw Amount" />
        </View>
        {/* //First Container END*/}
        {myWallet.map((data, index) => {
          return (
            <>
              <WalletDetails
                orderNumber={data.orderNumber}
                date={data.date}
                amount={data.amount}
              />
            </>
          );
        })}
        {/* <WalletDetails />
        <WalletDetails /> */}
      </View>
    </ScrollView>
  );
};

export default MyWallet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  secoundContainer: {
    backgroundColor: 'white',
    margin: 20,
    flex: 1,
  },
  walletContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,

    elevation: 16,
  },
  walletHeading: {
    fontWeight: 'bold',
    top: 10,
    marginVertical: 5,
    fontSize: 19,
    color: 'black',
  },
});
