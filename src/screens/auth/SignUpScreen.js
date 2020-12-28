import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants';
import { useTheme } from 'react-native-paper';
import accountService from "../../api/accountService";
import Alert from "../account/components/Alert";
import Loading from "../../components/Loading";

const SignUpScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        rePassword: '',
        check_textInputChange: false,
        secureTextEntry: true,
        secureConfirmPassword: true,
        isRequireUser: true,
        isPhoneNumber: true,
        isValidUser: true,
        isRequirePassword: true,
        lengthPassword: true,
        isValidPassword: true,
        isValidRePassword: true,
        isRequireRePassword: true,
        comparePassword: true
    });

    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const { colors } = useTheme();

    const isPhoneNumber = (number) => {
        return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
    }

    const handleValidUser = (val) => {
        if( val !== undefined && val !== '' ) {
            if( isPhoneNumber(val.trim()) ) {
                setData({
                    ...data,
                    username: val,
                    check_textInputChange: true,
                    isValidUser: true,
                });

                return true;
            }
            else{
                setData({
                    ...data,
                    username: val,
                    check_textInputChange: false,
                    isValidUser: false,
                    isPhoneNumber: true,
                    isRequireUser: false
                });
            }
            
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false,
                isPhoneNumber: false,
                isRequireUser: true
            });
        }

        return false;
    }

    const handleValidPassword = (val) => {
        if( val !== '' ) {
            if(val.trim().length >= 4 ) {
                setData({
                    ...data,
                    password: val,
                    isValidPassword: true
                });
                return true;
            }
            else{
                setData({
                    ...data,
                    password: val,
                    isValidPassword: false,
                    lengthPassword: true,
                    isRequirePassword: false
                });
            }
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false,
                lengthPassword: false,
                isRequirePassword: true
            });
        }

        return false;
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateSecureConfirmPassword = () => {
        setData({
            ...data,
            secureConfirmPassword: !data.secureConfirmPassword
        });
    }

    const handleValidRePassword = (password, val) => {
        if( val !== '' ) {
            if( password === val ) {
                setData({
                    ...data,
                    rePassword: val,
                    isValidRePassword: true
                });

                return true;
            } 
            else {
                setData({
                    ...data,
                    rePassword: val,
                    isValidRePassword: false,
                    isRequireRePassword: false,
                    comparePassword: true
                });
            }
        }
        else{
            setData({
                ...data,
                rePassword: val,
                isValidRePassword: false,
                isRequireRePassword: true,
                comparePassword: false
            });
        }
        return false;
    }

    const signUpHandle = (userName, password, rePassword) => {
        let valid = false;
        if(handleValidUser(userName)){
            valid = handleValidPassword(password);
        }
        if(valid){
            valid = handleValidRePassword(password, rePassword);
        }
        if(valid){
            setLoading(true);
        
            const entity = {
                UserName: userName,
                Password: password,
                Phone: userName
            };

            accountService.registry(entity).then((response) => {
                setLoading(false);
                if(response.statusCode == 200){
                    setSuccess(true);
                }
                else{
                    alert(response.error);
                }
            }).finally(() => { setLoading(false); });
        }
    }

    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor='transparent'/>
        <View style={styles.header}>
            <Image style={styles.headerImage}
                source={require('./../../assets/images/bg_login.png')}
            />
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {
                backgroundColor: COLORS.white
            }]}
        >
            
            <View style={styles.title}>
                <Text style={styles.titleText}>Tạo tài khoản</Text>
            </View>

            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Số điện thoại</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Nhập số điện thoại"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handleValidUser(val)}
                    maxLength={10}
                    keyboardType={'numeric'}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { 
                data.isValidUser ? null : 
                <Animatable.View animation="fadeInLeft" duration={500}>
                    {
                        data.isRequireUser == false ? null : <Text style={styles.errorMsg}>Vui lòng nhập số điện thoại.</Text>
                    }
                    {
                        data.isPhoneNumber == false ? null : <Text style={styles.errorMsg}>Số điện thoại không đúng.</Text>
                    }
                </Animatable.View>
            }

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 15
            }]}>Mật khẩu</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Nhập mật khẩu"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handleValidPassword(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { 
                data.isValidPassword ? null : 
                <Animatable.View animation="fadeInLeft" duration={500}>
                    {
                        data.isRequirePassword == false ? null : <Text style={styles.errorMsg}>Vui lòng nhập mật khẩu.</Text>
                    }
                    {
                        data.lengthPassword == false ? null : <Text style={styles.errorMsg}>Mật khẩu tối thiểu 4 ký tự.</Text>
                    }
                </Animatable.View>
            }

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 15
            }]}>Nhập lại mật khẩu</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Nhập lại mật khẩu"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureConfirmPassword ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handleValidRePassword(data.password, val)}
                />
                <TouchableOpacity
                    onPress={updateSecureConfirmPassword}
                >
                    {data.secureConfirmPassword ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { 
                data.isValidRePassword ? null : 
                <Animatable.View animation="fadeInLeft" duration={500}>
                    {
                        data.isRequireRePassword == false ? null : <Text style={styles.errorMsg}>Vui lòng nhập lại mật khẩu.</Text>
                    }
                    {
                        data.comparePassword == false ? null : <Text style={styles.errorMsg}>Nhập lại mật khẩu không đúng.</Text>
                    }
                </Animatable.View>
            }
            
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {signUpHandle( data.username, data.password, data.rePassword )}}
                >
                <LinearGradient
                    colors={[COLORS.primary, COLORS.primary]}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Đăng ký</Text>
                </LinearGradient>
                </TouchableOpacity>
            </View>
        </Animatable.View>

        <Loading show={loading} />

        <Alert navigation={navigation} show={success} />
      </View>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: COLORS.white,
    },
    header: {
        width: '100%',
        justifyContent: 'center',
    },
    headerImage: {
        width: '100%',
        justifyContent: 'center',
    },
    footer: {
        flex: 3,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 30,
        position: 'absolute',
        width: '100%',
        bottom: 0
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 30
    },
    forgot: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    forgotText: {
        color: COLORS.primary,
        fontSize: 17,
        paddingTop: 10
    },

    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    signUp: {
        flexDirection: 'row',
        paddingTop: 10
    },

    signUpText: {
        color: COLORS.textGray,
        fontSize: 17
    },

    signUpBtn: {
        color: COLORS.primary,
        paddingLeft: 10,
        fontSize: 17
    },

    title: {
        justifyContent: 'center',
        width: '100%',
        flexDirection: 'row',
        marginBottom: 20
    },

    titleText:{
        color: COLORS.title,
        fontSize: 34,
        fontWeight: 'bold'
    }
  });