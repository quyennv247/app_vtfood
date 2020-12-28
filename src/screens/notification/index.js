import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import ListNotification from './components/ListNotification'
import { COLORS } from './../../constants';

const NotificationScreen = ({ navigation }) => {
    return (
        <View style={style.container}>
            <StatusBar backgroundColor={COLORS.white} barStyle="dark-content"/>
            <View style={style.header}>
                <Text style={style.title}>Thông báo</Text>
            </View>
            <ListNotification navigation={navigation} />
        </View>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg
    },
    header: {
        backgroundColor: COLORS.white,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: COLORS.grey,
        borderBottomWidth: 0.5
    },
    title: {
        color: COLORS.title,
        fontSize: 18
    },
})

export default NotificationScreen;