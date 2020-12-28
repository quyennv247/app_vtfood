import React from 'react'
import { View, Text, Modal, Dimensions, StyleSheet, Pressable } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS } from './../../../constants';
var { width, height } = Dimensions.get('window');
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView from './MapView'
import { TouchableOpacity } from 'react-native-gesture-handler';

class ChangeAddress extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            location: null,
            showMap: false
        };
    }

    handlePlaces = (data, details) => {
        this.setState({
            location: { address: details.formatted_address,
                lat: details.geometry.location.lat,
                lng: details.geometry.location.lng }
        })

        this.openModal();
    }

    closeModal = () => {
        this.setState({
            showMap: false
        });
    }

    openModal = () => {
        this.setState({
            showMap: !this.state.showMap,
        })
    };

    changeAddress = (location) => {
        this.props.closePopup(location);
        this.closeModal();
    }

    render() {
        const { show, closePopup, haveOutsideTouch } = this.props;

        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={show}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Pressable style={styles.closeBtn} onPress={ () => { closePopup() }}>
                            <AntDesign name="close" style={styles.closeTitle}/>
                        </Pressable>
                        <Text style={styles.title}>Thay đổi địa chỉ</Text>
                    </View>

                    <View style={styles.body}>
                        <View style={styles.inputContainer}>
                            <GooglePlacesAutocomplete
                                placeholder='Nhập địa chỉ'
                                onPress={(data, details = null) => {
                                    this.handlePlaces(data, details);
                                }}
                                query={{
                                    key: 'AIzaSyDDFiGgNkZmeSkp0imL_kX2MfaG1eKdG-s',
                                    language: 'vi', 
                                }}
                                fetchDetails={true}
                                renderLeftButton={() => (	
                                    <FontAwesome name="search" style={styles.searchIcon}/>	
                                )}
                                styles={{
                                    textInputContainer: {
                                      backgroundColor: COLORS.white,
                                      width: width - 20
                                    },
                                    textInput: {
                                      height: 40,
                                      color: COLORS.textGray,
                                      fontSize: 18,
                                      backgroundColor: COLORS.grey,
                                      paddingRight: 10,
                                      borderWidth: 0,
                                      borderTopLeftRadius: 0,
                                      borderBottomLeftRadius: 0
                                    },
                                    listView: {
                                        borderWidth: 1,
                                        borderColor: COLORS.grey,
                                        backgroundColor: COLORS.grey,
                                    },
                                }}
                            />
                        </View>
                        
                    </View>
                    
                    <MapView
                        changeAddress={this.changeAddress}
                        show={this.state.showMap}
                        title={"Map View"}
                        animationType={"fade"}
                        closePopup={this.closeModal}
                        data={this.state.location}
                        haveOutsideTouch={true}
                    />
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        backgroundColor: COLORS.white,
        height: height,
    },

    header: {
        justifyContent: 'center',
        paddingHorizontal: 20,
        flexDirection: 'row',
        width: '100%',
        zIndex: 9999,
        paddingTop: 10,
        height: 40,
    },

    closeTitle: {
        fontSize: 20,
        color: COLORS.black,
        paddingLeft: 10,
    },

    closeBtn: {
        position: 'absolute',
        left: 0,
        paddingTop: 15,
        height: 40,
        width: 50
    },

    title: {
        fontSize: 18,
        fontWeight: '500',
        color: COLORS.title
    },

    body: {
        flexDirection: 'row',
        marginTop: 15,
        backgroundColor: COLORS.bg,
    },

    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: COLORS.white,
        paddingLeft: 10,
        paddingRight: 10
    },

    searchIcon: {
        color: COLORS.textGray,
        width: 28,
        fontSize: 18,
        paddingTop: 11,
        backgroundColor: COLORS.grey,
        borderBottomRightRadius: 0,
        height: 40,
        paddingLeft: 10,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
})

export default ChangeAddress