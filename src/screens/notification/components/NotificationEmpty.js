import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../../../constants';
import Icon from "react-native-vector-icons/Ionicons";

const NotificationEmpty = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon style={styles.icon} name='notifications-circle-outline'/>
            </View>
            <Text style={styles.cartText}>Không có thông báo</Text>
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
    },

    icon: {
        fontSize: 100,
        color: COLORS.primary
    }
    
})

export default NotificationEmpty;