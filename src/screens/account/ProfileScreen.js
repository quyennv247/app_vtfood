import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS } from '../../constants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import accountService from "../../api/accountService";
import Loading from "../../components/Loading";
import ChangePasswordSuccess from "./components/ChangePasswordSuccess";
import AlertModal from "../../components/AlertModal";

class ProfileScreen extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            loading: false,
            id: 0,
            firstName: '',
            lastName: '',
            address: '',
            email: '',
            gender: '',
            birthday: '',
        }
    }

    componentDidMount() {
        this.getInfo();
    }

    closeAlert = () => {
        this.setState({showAlert: false});
    }
    

    getInfo = () => {
        this.setState({loading: true});
        accountService.getInfo().then((response) => {
            this.setState({loading: false});
            if(response.statusCode == 200){
                this.setState({
                    id: response.data.Id,
                    firstName: response.data.FirstName,
                    lastName: response.data.LastName,
                    address: response.data.Address,
                    email: response.data.Email,
                    gender: response.data.Gender,
                    birthday: response.data.Birthday
                });
            }
        }).finally(() => { this.setState({loading: false}); });
    }

    handleSubmit = (oldPassword, password, confirmPassword) => {
        let valid = false;
        if(this.handleOldPasswordChange(oldPassword)){
            valid = this.handlePasswordChange(password);
        }
        if(valid){
            valid = this.handleConfirmPasswordChange(password, confirmPassword);
        }

        if(valid){
            this.setState({loading: true});

            accountService.changePassword(oldPassword, password).then((response) => {
                this.setState({loading: false});
                if(response.statusCode == 200){
                    this.setState({success: true});
                }
                else{
                    this.setState({showAlert: true, message: response.error});
                }
            }).finally(() => { this.setState({loading: false}); });
        }
    }

    setFirstName = (val) => {
        this.setState({ firstName : val});
    }

    setLastName = (val) => {
        this.setState({ lastName : val});
    }

    setAddress = (val) => {
        this.setState({ address : val});
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.navigation}>
                    <TouchableOpacity style={styles.btnBack} onPress={() => this.props.navigation.goBack()}>
                        <Image source={require('../../assets/icons/back2.png')} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Thông tin tài khoản</Text>
                    <Pressable style={styles.btnSave} onPress={() => this.handleSubmit(this.state.oldPassword, this.state.password, this.state.confirmPassword)}>
                        <Text style={styles.btnSaveText}>Lưu</Text>
                    </Pressable>
                </View>
                <View style={styles.body}>

                    <View style={styles.avatarContainer}>
                        <Image style={styles.avatar} source={require('../../assets/images/discover_1.png')} />
                    </View>

                    <View style={styles.editAvatar}>
                        <TouchableOpacity><AntDesign style={styles.iconEditAvatar} name="camerao" /></TouchableOpacity>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Họ và tên đệm</Text>
                        <TextInput onChangeText={text => this.setFirstName(text)} defaultValue={this.state.firstName} style={styles.input} placeholderTextColor={COLORS.textGray} autoCapitalize="none" />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Tên</Text>
                        <TextInput onChangeText={text => this.setLastName(text)} defaultValue={this.state.lastName} style={styles.input} placeholderTextColor={COLORS.textGray} autoCapitalize="none" />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Địa chỉ</Text>
                        <TextInput  onChangeText={text => this.setAddress(text)} defaultValue={this.state.address} style={styles.input} placeholderTextColor={COLORS.textGray} autoCapitalize="none" />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput value='0966047575' style={styles.input} placeholderTextColor={COLORS.textGray} autoCapitalize="none" />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Giới tính</Text>
                        <TextInput value='0966047575' style={styles.input} placeholderTextColor={COLORS.textGray} autoCapitalize="none" />
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Ngày sinh</Text>
                        <TextInput value='0966047575' style={styles.input} placeholderTextColor={COLORS.textGray} autoCapitalize="none" />
                    </View>
                </View>

                <Loading show={this.state.loading} />
            </View>
        );
    }

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white
    },

    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        borderBottomColor: COLORS.grey,
        borderBottomWidth: 0.5,
        backgroundColor: COLORS.white
    },

    btnBack: {
        width: 50,
        paddingLeft: 15,
        paddingTop: 15,
        height: 45,
    },

    title: {
        color: COLORS.title,
        fontSize: 16
    },

    btnSave: {
        paddingRight: 15,
        paddingTop: 13,
        height: 45,
    },

    btnSaveText: {
        color: COLORS.primary,
        fontSize: 16
    },

    body: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 15,
        paddingTop: 20,
        width: '100%',
    },

    avatarContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        paddingBottom: 20,
    },

    avatar: {
        height: 120,
        width: 120,
        borderRadius: 60
    },

    editAvatar: {
        position: 'absolute',
        backgroundColor: COLORS.secondary,
        height: 35,
        width: 35,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        top: 105,
        left: '64%'
    },

    iconEditAvatar: {
        fontSize: 16,
        color: COLORS.white
    },

    formGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        borderBottomColor: COLORS.grey,
        borderBottomWidth:0.5,
        height: 45
    },

    label: {
        color: COLORS.textGray,
        width: '30%'
    },

    input: {
        width: '50%',
        textAlign: 'right'
    },

})

export default ProfileScreen;