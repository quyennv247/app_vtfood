import React from 'react'
import { View, Text, Modal, Dimensions, Pressable, StyleSheet, Image, Alert } from 'react-native'
import { Spinner } from './../../../components/Spinner';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../../../constants';
var { width, height } = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage'

class UpdateCart extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount () {
        
    }

    handleUpdateCart = async () => {
        const datacart = await AsyncStorage.getItem('cart');
        if (datacart !== null) {
            const carts = JSON.parse(datacart);
            const index = Object.values(carts).findIndex((obj => obj.productId == this.props.data.productId));
            carts[index].quantity = this.props.data.quantity;
            carts[index].total =  this.props.data.total;
            carts[index].totalFormat =  this.props.data.totalFormat;

            await AsyncStorage.setItem('cart', JSON.stringify(carts));
        }

        this.setState({
            cart: null
        });
        
        this.props.closePopup();
    }

    increaseQuantity = () => {
        const cart = this.props.data;
        cart.quantity += 1;
        cart.total = cart.quantity * cart.price;
        cart.totalFormat = cart.total.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        this.setState({ cart: cart })
    }

    decreaseQuantity = () => {
        const cart = this.props.data;
        if(cart.quantity > 1){
            cart.quantity -= 1;
            cart.total = cart.quantity * cart.price;
            cart.totalFormat = cart.total.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
            this.setState({ cart: cart })
        }
    }
    
    render() {
        const { show, closePopup, haveOutsideTouch } = this.props;

        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={show}
            >
                <View style={{ flex: 1, backgroundColor: '#000000AA' }}>
                    <Pressable
                        onPress={() => {
                        if (!haveOutsideTouch) return;
                        closePopup()
                        }}
                        style={{ flex: 1 }}>

                    </Pressable>
                    {this.renderContent()}
                </View>
            </Modal>
        )
    }

    renderContent = () => {
        const { closePopup } = this.props;
        if(this.props.data != null){
            return (
                <View style={styles.container}>
                    <Image
                        resizeMode='cover'
                        style={styles.image}
                        source={{uri : this.props.data.image}}
                    />
                    <View style={styles.header}>
                        <Pressable onPress={ () => { closePopup() }}>
                            <AntDesign name="close" style={styles.closeBtn}/>
                        </Pressable>
                    </View>

                    <View style={styles.body}>
                        <View style={styles.about}>
                            <Text style={styles.title}>{this.props.data.productName}</Text>
                        </View>

                        <View style={styles.priceContainer}>
                            <Text style={styles.priceText}>{this.props.data.price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}đ</Text> 
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <Pressable onPress={()=> this.decreaseQuantity()} style={styles.quantityLeft}>
                            <Text style={styles.quantityLeftText}>-</Text>
                        </Pressable>
                            <View style={styles.quantityCount}>
                                <Text style={styles.quantityText}>{this.props.data.quantity}</Text>
                            </View>

                        <Pressable onPress={()=> this.increaseQuantity()} style={styles.quantityRight}>
                            <Text style={styles.quantityRightText}>+</Text>
                        </Pressable>
                    </View>
                    
                    
                    <View style={styles.cart}>
                        <Pressable onPress={()=> this.handleUpdateCart()} style={styles.cartBtn}>
                            <Text style={styles.cartText}>{this.props.data.quantity} Món</Text>
                            <Text style={styles.cartText}>Cập nhật</Text>
                            <Text style={styles.cartText}>{this.props.data.totalFormat}đ</Text>
                        </Pressable>
                    </View>
                </View>
            )
        }
        else{
            return (
                <Spinner size="small" />
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        bottom: 0,
        position: 'absolute',
        width: '100%',
        backgroundColor: COLORS.bg,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        height: Dimensions.get('window').height * 0.9
    },

    image: {
        width: '100%',
        height: 300,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: COLORS.white,
    },

    header: {
        position: 'absolute',
        top: 20,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        flexDirection: 'row',
        width: '100%',
        zIndex: 9999,
    },

    closeBtn: {
        fontSize: 24,
        color: COLORS.grey,
        height: 40,
        width: 50
    },

    body: {
        flexDirection: 'row',
        paddingTop: 5,
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 20,
        backgroundColor: COLORS.white,
        paddingBottom: 15,
    },

    about: {
        backgroundColor: COLORS.white,
    },
    
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.back,
        marginVertical: 8
    },

    description: {
        color: COLORS.textGray,
        fontSize: 14
    },

    priceContainer: {
        paddingTop: 10,
    },

    priceText: {
        color: COLORS.black,
        fontWeight: 'bold',
        fontSize: 16,
    },

    priceDiscountText: {
        color: COLORS.textGray,
        textDecorationLine: 'line-through',
        fontSize: 16,
    },

    footer: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        flexDirection: 'row'
    },

    quantityLeft: {
        width: 70,
        height: 50,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25
    },

    quantityLeftText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: COLORS.primary
    },

    quantityRight: {
        width: 70,
        height: 50,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25
    },

    quantityRightText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: COLORS.primary
    },

    quantityCount: {
        width: 50,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
    },

    quantityText:{
        fontSize: 18,
        fontWeight: 'bold',
    },

    cart: {
        position: 'absolute',
        bottom: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: COLORS.white,
        width: '100%',
        alignItems: 'center'
    },

    cartBtn: {
        width: width * 0.9,
        padding: 10,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom:10,
    },

    cartText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '500'
    }
})

export default UpdateCart