import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../../../constants';

const OrderEmpty = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Image source={require('./../../../assets/icons/cart-2.png')}/>
            </View>
            <Text style={styles.cartText}>Chưa có đơn hàng</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg,
        alignItems: 'center',
        flexDirection: 'column',
    },

    iconContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 200,
        paddingHorizontal: 40,
        paddingVertical: 40,
        marginTop: '30%'
    },

    cartText: {
        paddingTop: 30,
        fontSize: 25,
        color: COLORS.textGray
    }
    
})

export default OrderEmpty;