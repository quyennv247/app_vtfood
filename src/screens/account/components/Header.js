import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { COLORS } from './../../../constants';

class Header extends React.Component {
    constructor(props){
        super(props);
    }

    handleLogin(){
        this.props.navigation.navigate('LoginScreen');
    }

    handleLogin2(){
        this.setState({ isShowLogin: true });
    }

    handleRegistry(){
        this.props.navigation.navigate('RegistryScreen');
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.avatar} source={require('../../../assets/images/discover_1.png')}/>
                {
                        this.props.username != null
                        ?   <View style={styles.info}>
                                <Text style={styles.name}>{this.props.username}</Text>
                                <Text style={styles.des}>Ngày tạo: 20-12-2020</Text>
                            </View>
                        :  <View style={styles.button}>
                                <Pressable onPress={() => this.handleLogin()}>
                                    <Text style={styles.btnLogin}>Đăng nhập</Text>
                                </Pressable>
                                <Pressable onPress={() => this.handleRegistry()}>
                                    <Text style={styles.btnRegistry}> / Đăng ký</Text>
                                </Pressable>
                            </View>
                }
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.white,
        height: 150,
        flexDirection: 'row', 
        justifyContent: 'flex-start',
        paddingVertical: 30,
        paddingHorizontal: 20,
        marginBottom: 10
    },

    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45
    },

    info: {
        flexDirection: 'column', 
    },

    name: {
        fontSize: 18,
        fontWeight: '700',
        paddingLeft: 20,
        paddingTop: 10,
    },

    des: {
        color: COLORS.textGray,
        fontSize: 15,
        paddingLeft: 20,
        paddingTop: 10,
    },

    button: {
        flexDirection: 'row', 
        paddingTop: 20
    },

    btnLogin: {
        fontSize: 16,
        fontWeight: '500',
        paddingLeft: 20,
        paddingTop: 10,
        color: COLORS.secondary
    },

    btnRegistry: {
        fontSize: 16,
        fontWeight: '500',
        paddingTop: 10,
        color: COLORS.secondary
    }

})


export default Header;

