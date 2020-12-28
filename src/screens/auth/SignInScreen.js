import React from 'react';
import { 
    View,
    Text, 
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { COLORS } from '../../constants';
import { useTheme } from 'react-native-paper';
import Loading from "../../components/Loading";
import accountService from "../../api/accountService";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignInScreen = ({ route, navigation }) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const [loading, setLoading] = React.useState(false);

    const { colors } = useTheme();

    const textInputChange = (val) => {
        if( val !== undefined && val !== '' ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val !== '' ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
            return true;
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
            return false;
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val !== '' ) {
            setData({
                ...data,
                isValidUser: true
            });
            return true;
        } else {
            setData({
                ...data,
                isValidUser: false
            });

            return false;
        }
    }

    async function loginHandle (userName, password) {
        let valid = false;
        if(handleValidUser(userName)){
            valid = handlePasswordChange(password);
        }

        if(valid){
            setLoading(true);
        
            const entity = {
                UserName: userName,
                Password: password
            };

            accountService.login(entity).then((response) => {
                setLoading(false);
                if(response.statusCode == 200){
                    setLoginInfo(response.data);
                    const { screen } = route.params;
                    if(screen !== '' && screen != undefined){
                        //navigation.navigate(screen);
                        navigation.replace(screen);
                    }
                    else{
                        navigation.navigate('Account');
                    }
                }
                else{
                    alert(response.error);
                }
            }).finally(() => { setLoading(false); });
        }
    }

    async function setLoginInfo(data){
        await AsyncStorage.setItem('access_token', data.AccessToken);
        await AsyncStorage.setItem('login_id', data.UserInfo.Id.toString());
        await AsyncStorage.setItem('user_name', data.UserInfo.UserName);
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
                <Text style={styles.titleText}>Welcome</Text>
            </View>

            <Text style={[styles.text_footer, {
                color: colors.text
            }]}>Tên đăng nhập</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Số điện thoại"
                    placeholderTextColor="#666666"
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
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
            { data.isValidUser ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Vui lòng nhập số điện thoại.</Text>
            </Animatable.View>
            }
            

            <Text style={[styles.text_footer, {
                color: colors.text,
                marginTop: 15
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Mật khẩu"
                    placeholderTextColor="#666666"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
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
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Vui lòng nhập mật khẩu.</Text>
            </Animatable.View>
            }
            
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {loginHandle( data.username, data.password )}}
                >
                <LinearGradient
                    colors={[COLORS.primary, COLORS.primary]}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Đăng nhập</Text>
                </LinearGradient>
                </TouchableOpacity>

                <View style={styles.forgot}>
                    <TouchableOpacity>
                        <Text style={styles.forgotText}>Quên mật khẩu</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.signUp}>
                    <Text style={styles.signUpText}>Bạn chưa có tài khoản?</Text>
                    <TouchableOpacity  onPress={() => navigation.navigate('Registry')}>
                        <Text style={styles.signUpBtn}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Animatable.View>

        <Loading show={loading} />
      </View>
    );
};

export default SignInScreen;

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