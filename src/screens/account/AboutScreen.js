import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Pressable, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants';
var { width, height } = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';

const AboutScreen = ({ navigation }) => {
    const [accessToken, setAccessToken] = React.useState('');
    const [loginId, setUserId] = React.useState('0');
    const [userName, setUserName] = React.useState('');

    useEffect(() => {
        navigation.addListener('focus', () => {
            getLoginInfo();
        });
    })

    const getLoginInfo = async () => {
        const accessToken = await AsyncStorage.getItem('access_token');
        const loginId = await AsyncStorage.getItem('login_id');
        const userName = await AsyncStorage.getItem('user_name');

        setAccessToken(accessToken);
        setUserId(loginId);
        setUserName(userName);
    }
    
    const logout = async () => {
        try {
            await AsyncStorage.removeItem('access_token');
            await AsyncStorage.removeItem('login_id');
            await AsyncStorage.removeItem('user_name');

            alert('Logout thành công');
            
            navigation.navigate('Home');
        }
        catch(exception) {
            return false;
        }
    }

    const handleAccountInfo = () => {
        if(userName == null || loginId == null){
            navigation.navigate('Login', {
                screen: 'Account'
            });
        }
        else{
            navigation.navigate('Home');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.navBtn}>
                <TouchableOpacity style={styles.btnBack} onPress={() => navigation.goBack()}>
                    <Image source={require('../../assets/icons/back2.png')} />
                </TouchableOpacity>
            </View>
            
            <View style={styles.navigation}>
                <Text style={styles.title}>Về chúng tôi</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.name}>
                    <Text style={styles.nameText}>VTFOOD</Text>
                </View>
            </View>

            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg
    },

    navigation: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomColor: COLORS.grey,
        borderBottomWidth: 0.5,
        paddingVertical: 10,
        backgroundColor: COLORS.white,
    },

    navBtn: {
        position: 'absolute',
        left: 15,
        top: 0,
        zIndex: 9999
    },

    btnBack: {
        height: 40,
        width: 50,
        paddingTop: 13
    },

    title: {
        color: COLORS.title,
        fontSize: 16
    },

    body: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },

    name: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },

    nameText: {
        color: COLORS.primary,
        fontSize: 24
    }
    
})

export default AboutScreen;