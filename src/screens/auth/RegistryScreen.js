import React from 'react';
import { 
    View,
    Text, 
    TouchableOpacity,
    TextInput,
    StyleSheet,
    StatusBar,
    Image,
    SafeAreaView,
    Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants';
import Loading from "../../components/Loading";
import Success from "./Success";
import accountService from "../../api/accountService";
import AsyncStorage from '@react-native-async-storage/async-storage';
var { width, height } = Dimensions.get('window');

class RegistryScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            loading: false,
            securePasswordEntry: true,
            secureConfirmPasswordEntry: true,
            isValidUser: true,
            isPhoneNumber: true,
            isRequireUser: true,
            isRequirePassword: true,
            lengthPassword: true,
            isValidPassword: true,
            isValidConfirmPassword: true,
            isRequireConfirmPassword: true,
            comparePassword: true,
            success: false
        }
    }

    isPhoneNumber = (number) => {
        return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
    }

    updateSecurePasswordEntry = () => {
        this.setState({securePasswordEntry: !this.state.securePasswordEntry});
    }

    updateSecureConfirmPasswordEntry = () => {
        this.setState({secureConfirmPasswordEntry: !this.state.secureConfirmPasswordEntry});
    }

    handlePasswordChange = (val) => {
        if(val == '') {
            this.setState({
                password: val,
                isValidPassword: false,
                isRequirePassword: true,
                lengthPassword: true
            });
            return false;
        } 
        else if(val.trim().length < 4) {
            this.setState({
                password: val,
                isValidPassword: false,
                isRequirePassword: false,
                lengthPassword: false
            });
            return false;
        } 
        else {
            this.setState({
                password: val,
                isValidPassword: true,
                isRequirePassword: false,
                lengthPassword: true
            });
            return true;
        }
    }

    handleConfirmPasswordChange = (password, val) => {
        if( val !== '' ) {
            if( password === val ) {
                this.setState({
                    confirmPassword: val,
                    isValidConfirmPassword: true
                });

                return true;
            } 
            else {
                this.setState({
                    confirmPassword: val,
                    isValidConfirmPassword: false,
                    isRequireConfirmPassword: false,
                    comparePassword: false
                });
            }
        }
        else{
            this.setState({
                confirmPassword: val,
                isValidConfirmPassword: false,
                isRequireConfirmPassword: true,
                comparePassword: true
            });
        }
        return false;
    }

    handleUserChange = (val) => {
        if(val == '') {
            this.setState({
                username: val,
                isValidUser: false,
                isPhoneNumber: true,
                isRequireUser: true
            });
            return false;
        } 
        else if (this.isPhoneNumber(val.trim()) == false) {
            this.setState({
                username: val,
                isValidUser: false,
                isPhoneNumber: false,
                isRequireUser: false
            });
            return false;
        }
        else{
            this.setState({
                username: val,
                isValidUser: true,
                isPhoneNumber: true,
                isRequireUser: false
            });
            return true;
        }
    }

    handleRegistry = (userName, password, confirmPassword) => {
        let valid = false;
        if(this.handleUserChange(userName)){
            valid = this.handlePasswordChange(password);
        }
        if(valid){
            valid = this.handleConfirmPasswordChange(password, confirmPassword);
        }

        if(valid){
            this.setState({loading: true});

            const entity = {
                UserName: userName,
                Password: password,
                Phone: userName
            };
        
            accountService.registry(entity).then((response) => {
                this.setState({loading: false});
                if(response.statusCode == 200){
                    this.setState({success: true});
                }
                else{
                    alert(response.error);
                }
            }).finally(() => { this.setState({loading: false}); });
        }
    }

    setLoginInfo = async (data) => {
        await AsyncStorage.setItem('access_token', data.AccessToken);
        await AsyncStorage.setItem('login_id', data.UserInfo.Id.toString());
        await AsyncStorage.setItem('user_name', data.UserInfo.UserName);
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" />
                <Image style={styles.headerImage} source={require('./../../assets/images/bg_login.png')} />
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.closeBtn} >
                    <Image source={require('./../../assets/icons/close.png')} />
                </TouchableOpacity>
                
                <View style={styles.body}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>Tạo tài khoản</Text>
                    </View>
                    <View style={styles.form}>
                        { 
                            this.state.isValidUser ? null : 
                            <Animatable.View animation="fadeInLeft" duration={500} style={styles.invalid}>
                                {
                                    this.state.isRequireUser == false ? null : <Text style={styles.errorMsg}>Vui lòng nhập số điện thoại.</Text>
                                }
                                {
                                   this.state.isPhoneNumber == true ? null : <Text style={styles.errorMsg}>Số điện thoại không đúng.</Text>
                                }
                            </Animatable.View>
                        }

                        <View style={styles.formGroup}>
                            <FontAwesome name="user-o" style={styles.iconInput}/>
                            <TextInput onChangeText={(val) => this.handleUserChange(val)} style={styles.input} placeholder="Số điện thoại" placeholderTextColor={COLORS.textGray} autoCapitalize="none" />
                        </View>
                        
                        { 
                            this.state.isValidPassword ? null : 
                            <Animatable.View animation="fadeInLeft" duration={500} style={styles.invalid}>
                                {
                                    this.state.isRequirePassword == false ? null : <Text style={styles.errorMsg}>Vui lòng nhập mật khẩu.</Text>
                                }
                                {
                                    this.state.lengthPassword == true ? null : <Text style={styles.errorMsg}>Mật khẩu tối thiểu 4 ký tự.</Text>
                                }
                            </Animatable.View>
                        }

                        <View style={styles.formGroup}>
                            <Feather name="lock" style={styles.iconInput}/>
                            <TextInput onChangeText={(val) => this.handlePasswordChange(val)} secureTextEntry={this.state.securePasswordEntry ? true : false} style={styles.input} placeholder="Mật khẩu" placeholderTextColor={COLORS.textGray} autoCapitalize="none" />
                            <TouchableOpacity style={styles.btnShowPass} onPress={ () => this.updateSecurePasswordEntry()} >
                                {this.state.securePasswordEntry 
                                ?  <Feather name="eye-off" style={styles.iconPass} />
                                : <Feather name="eye" style={styles.iconPass} />
                                }
                            </TouchableOpacity>
                        </View>

                        { 
                            this.state.isValidConfirmPassword ? null : 
                            <Animatable.View animation="fadeInLeft" duration={500} style={styles.invalid}>
                                {
                                    this.state.isRequireConfirmPassword == false ? null : <Text style={styles.errorMsg}>Vui lòng nhập lại mật khẩu.</Text>
                                }
                                {
                                    this.state.comparePassword == true ? null : <Text style={styles.errorMsg}>Nhập lại mật khẩu không đúng.</Text>
                                }
                            </Animatable.View>
                        }

                        <View style={styles.formGroup}>
                            <Feather name="lock" style={styles.iconInput}/>
                            <TextInput onChangeText={(val) => this.handleConfirmPasswordChange(this.state.password, val)} secureTextEntry={this.state.secureConfirmPasswordEntry ? true : false} style={styles.input} placeholder="Nhập lại mật khẩu" placeholderTextColor={COLORS.textGray} autoCapitalize="none" />
                            <TouchableOpacity style={styles.btnShowPass} onPress={ () => this.updateSecureConfirmPasswordEntry()} >
                                {this.state.secureConfirmPasswordEntry 
                                ?  <Feather name="eye-off" style={styles.iconPass} />
                                : <Feather name="eye" style={styles.iconPass} />
                                }
                            </TouchableOpacity>
                        </View>

                        <View style={styles.action}>
                            <TouchableOpacity onPress={() => this.handleRegistry(this.state.username, this.state.password, this.state.confirmPassword) } style={styles.signIn}>
                                <Text style={styles.signInText}>Đăng ký</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <Loading show={this.state.loading} />

                <Success navigation={ this.props.navigation } show={this.state.success} />
            </SafeAreaView>
        )
    }
};

export default RegistryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: COLORS.white
    },

    headerImage: {
        width: '100%',
        justifyContent: 'center',
        resizeMode: 'cover',
        height: height * 0.4
    },

    closeBtn: {
        position: 'absolute',
        top: 30,
        paddingLeft: 15,
        zIndex: 9999,
        width: 50,
        height: 40
    },

    
    body: {
        flex: 3,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        position: 'absolute',
        width: '100%',
        bottom: 0,
        top: height * 0.38
    },

    title: {
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'row',
        marginBottom: 20
    },

    titleText:{
        color: COLORS.title,
        fontSize: 24,
        fontWeight: 'bold'
    },

    form:{

    },

    formGroup: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.bg,
        borderRadius: 100,
        marginBottom: 15
    },

    iconInput: {
        width: 30,
        paddingLeft: 15,
        position: 'relative',
        color: COLORS.textGray,
        fontSize: 14
    },

    btnShowPass: {
        position: 'absolute',
        right: 0
    },

    iconPass: {
        width: 30,
        right: 0,
        color: COLORS.textGray,
        fontSize: 14,
    },

    input: {
        backgroundColor: COLORS.bg,
        borderRadius: 100,
        height: 40,
        width: '90%'
    },

    action: {
        flexDirection: 'column'
    },

    signIn: {
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        borderRadius: 30
    },

    signInText: {
        color: COLORS.white,
        fontSize: 16
    },

    forgot: {
        flexDirection: 'row',
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },

    forgotText: {

    },

    signUp: {
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    signUpText: {
        color: COLORS.textGray
    },

    signUpBtn: {
        color: COLORS.primary,
        paddingLeft: 10,
    },

    invalid: {
        position: 'relative',
        paddingLeft: 12,
        paddingTop: 0
    },

    errorMsg: {
        color: COLORS.secondary,
        fontSize: 12
    }
    
  });