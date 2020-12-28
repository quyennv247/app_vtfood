import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { COLORS } from '../../constants';
import Header from './components/Header';
import Cart from './components/Cart'


const CartScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
            <Header navigation={navigation}/>

            <Cart navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg
    },
})

export default CartScreen;