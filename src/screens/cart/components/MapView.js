import React from 'react'
import { View, Text, Modal, Dimensions, Pressable, StyleSheet, Image, TextInput } from 'react-native'
import { COLORS } from './../../../constants';
var { width, height } = Dimensions.get('window');

class MapView extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            addressPlus: '',
            location: null
        };
    }

    submitAddress = () => {
        const location = {
            addressPlus: this.state.addressPlus,
            location: this.props.data
        };

        this.props.changeAddress(location);
        this.props.closePopup();
    }

    _handleChangeText = ({ nativeEvent: { text } }) => {
        this.setState({ addressPlus: text });
    };

    render() {
        const { show, closePopup, data } = this.props;

        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={show}
            >
                {
                    data != null 
                    ?<View style={styles.container}>
                        <View style={styles.header}>
                            <Pressable style={styles.closeBtn} onPress={ () => { closePopup() }}>
                                <Image source={require('../../../assets/icons/back2.png')}/>
                            </Pressable>
                            <Text style={styles.title}>Nhập địa chỉ</Text>
                        </View>

                        <View style={styles.body}>
                            
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.addressTitle}>Giao đến</Text>
                            <Text style={styles.addressText}>{data.address}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder={'Thêm vào số nhà, tòa nhà...'}
                                placeholderTextColor="#FF2D55"
                                onChange={this._handleChangeText}
                                value={this.state.addressPlus} 
                            />
                            <Pressable onPress={()=> this.submitAddress()} style={styles.btnConfirm}>
                                <Text style={styles.btnText}>Xác nhận</Text>
                            </Pressable>
                        </View>
                        
                    </View>
                    : <View></View>
                }
                
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        backgroundColor: COLORS.bg,
        height: height,
    },

    header: {
        justifyContent: 'center',
        paddingHorizontal: 20,
        flexDirection: 'row',
        width: '100%',
        zIndex: 9999,
        paddingTop: 10,
        paddingBottom: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.grey,
        backgroundColor: COLORS.white,
    },

    closeTitle: {
        fontSize: 20,
        color: COLORS.black,
    },

    closeBtn: {
        position: 'absolute',
        left: 10,
        paddingTop: 15,
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    body: {
        flexDirection: 'row',
        marginTop: 15,
        backgroundColor: COLORS.secondary,
    },

    footer: {
        position: 'absolute',
        flexDirection: 'column',
        bottom: 0,
        backgroundColor: COLORS.white,
        borderTopWidth: 0.5,
        borderTopColor: COLORS.grey,
        width: width,
        paddingRight: 10,
        height: 215
    },

    addressTitle: {
        paddingBottom: 5,
        paddingTop: 10,
        paddingLeft: 12
    },

    addressText: {
        fontSize: 16,
        color: COLORS.black,
        fontWeight: 'bold',
        paddingLeft: 12
    },

    btnConfirm: {
        backgroundColor: COLORS.primary,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 0,
        position: 'absolute',
        bottom: 40,
        width: width,
    },

    btnText: {
        color: COLORS.white,
        fontSize: 16
    },

    input: {
        marginTop: 10,
        height: 40, 
        borderColor: COLORS.secondary, 
        borderWidth: 0,
        color: COLORS.secondary,
        paddingLeft: 12,
        fontSize: 14
    }
})

export default MapView