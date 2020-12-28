import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { ICONS, COLORS } from './../../../constants';

const Header = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.goBack()} style={styles.back} >
                <Image source={require('../../../assets/icons/back2.png')}/>
            </Pressable>
            
            <Text style={styles.title}>Xác nhận đơn hàng</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 20,
        borderBottomColor: COLORS.grey,
        borderBottomWidth: 0.5 ,
        paddingVertical: 10,
        paddingTop: 30
    },

    back: {
        position: 'absolute',
        left: 10,
        paddingTop: 20
    },

    title: {
        fontSize: 18,
        fontWeight: '700'
    }
})


export default Header;

