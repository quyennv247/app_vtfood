import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Pressable, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants';
import Header from "./components/Header";
var { width, height } = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';

const AccountScreen = ({ navigation }) => {
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
            <Header navigation={navigation} username={userName} />

            <View style={styles.body}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.navItem}>
                    <View style={styles.iconInfo}>
                        <Icon style={styles.icon}  name='key' />
                    </View>
                    <View style={styles.nav}>
                        <Text style={styles.title}>Thông tin tài khoản</Text>
                    </View>
                    <View style={styles.iconArrow}>
                        <Image source={require('../../assets/icons/arrow_left.png')}/>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')} style={styles.navItem}>
                    <View style={styles.iconPassword}>
                        <Icon style={styles.icon}  name='key' />
                    </View>
                    <View style={styles.nav}>
                        <Text style={styles.title}>Đổi mật khẩu</Text>
                    </View>
                    <View style={styles.iconArrow}>
                        <Image source={require('../../assets/icons/arrow_left.png')}/>
                    </View>
                </TouchableOpacity>

                <View style={styles.navItem}>
                    <View style={styles.iconHelp}>
                        <Icon style={styles.icon}  name='headphones-alt' />
                    </View>
                    <View style={styles.nav}>
                        <Text style={styles.title}>Trợ giúp</Text>
                    </View>
                    <View style={styles.iconArrow}>
                        <Image source={require('../../assets/icons/arrow_left.png')}/>
                    </View>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('About')} style={styles.navItem}>
                    <View style={styles.iconAbout}>
                        <Icon style={styles.icon}  name='info' />
                    </View>
                    <View style={styles.nav}>
                        <Text style={styles.title}>Về chúng tôi</Text>
                    </View>
                    <View style={styles.iconArrow}>
                        <Image source={require('../../assets/icons/arrow_left.png')}/>
                    </View>
                </TouchableOpacity>
            </View>

            {
                userName == null || userName == '' ? null 
                :<View style={styles.footer}>
                    <TouchableOpacity style={styles.logoutBtn} onPress={() => logout()}>
                        <Text style={styles.logout}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
            }
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg
    },

    body: {
        flex: 9,
        flexDirection: 'column',
        backgroundColor: COLORS.white,
        paddingVertical: 10,
        paddingHorizontal: 10
    },

    footer: {
        position: 'absolute',
        backgroundColor: COLORS.bg,
        bottom: 0,
        width: width,
        paddingVertical: 10,
        justifyContent: 'center',
        flexDirection: 'row',
    },

    logoutBtn: {
        backgroundColor: COLORS.white,
        borderRadius: 30,
        width: width - 40,
        paddingVertical: 8,
        justifyContent: 'center',
        flexDirection: 'row',
        borderColor: COLORS.secondary,
        borderWidth: 0.5
    },

    logout: {
        color: COLORS.secondary,
        fontSize: 16
    },

    navItem: {
        flexDirection: 'row',
        marginBottom: 15
    },

    iconInfo: {
        backgroundColor: COLORS.purple,
        height: 25,
        width: 25,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.primary,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },

    icon: {
        fontSize: 12,
        color: COLORS.white
    },

    nav: {
        justifyContent: 'center',
        paddingLeft: 10
    },

    title: {
        color: COLORS.black,
        fontSize: 14
    },

    iconArrow: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0
    },

    iconAbout: {
        backgroundColor: COLORS.blue,
        height: 25,
        width: 25,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.primary,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },

    iconHelp: {
        backgroundColor:'#FFCC00',
        height: 25,
        width: 25,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.primary,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },

    iconPassword: {
        backgroundColor: '#4CD964',
        height: 25,
        width: 25,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.primary,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },

})

export default AccountScreen;