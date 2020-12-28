import React from 'react'
import { View, Text, Modal, Dimensions, Pressable, StyleSheet, Image, Alert } from 'react-native'
import { Spinner } from './../../components/Spinner';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { COLORS } from '../../constants';
var { width, height } = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage'

class ProductDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            quantity: 1
        };
    }

    static defaultProps = {
        haveOutsideTouch: false,
        data: {title: ''}
    }

    handleAddCart = async (product, quantity, price) => {
        const itemcart = {
            shopId: product.ShopId,
            long: product.Shop.Long,
            lat: product.Shop.Lat,
            productId: product.Id,
            productName: product.Title,
            image: product.Image.FullPath,
            quantity:  quantity,
            price: price,
            total: quantity * price,
            totalFormat: (quantity * price).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        }

        try {
            const datacart = await AsyncStorage.getItem('cart');
            if (datacart !== null) {
                var cart = JSON.parse(datacart);
                const item = Object.values(cart).filter(a => a.shopId == itemcart.shopId)
                
                if(item.length > 0){
                    const itemProduct = item.filter(a => a.productId == itemcart.productId);
                    if(itemProduct.length > 0){
                        itemProduct[0].quantity += quantity;
                        itemProduct[0].total =  itemProduct[0].quantity * price;
                        itemProduct[0].totalFormat =  itemProduct[0].total.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
                    }
                    else{
                        cart.push(itemcart);
                    }
                    await AsyncStorage.setItem('cart', JSON.stringify(cart));
                }
                else{
                    await AsyncStorage.removeItem('cart');
                    const newCart  = [];
                    newCart.push(itemcart);
                    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
                }
            }
            else{
                const cart  = []
                cart.push(itemcart)
                await AsyncStorage.setItem('cart', JSON.stringify(cart));
            }

            alert("Đã thêm vào giỏ hàng");

            this.props.closePopup();
        }
        catch (e) {
            console.log(e);
            alert('Có lỗi khi thêm giỏ hàng')
        }
    }

    increaseQuantity = () => {
        this.setState({ quantity: this.state.quantity + 1 })
    }

    decreaseQuantity = () => {
        if(this.state.quantity > 1){
            this.setState({ quantity: this.state.quantity - 1 })
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
                <View style={{ flex: 1}}>
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
        const { data, closePopup } = this.props;
        
        if(data != null){
            return (
                <View style={styles.container}>
                    <Image
                        resizeMode='cover'
                        style={styles.image}
                        source={{uri : data.Image.FullPath}}
                    />
                    <View style={styles.header}>
                        <Pressable onPress={ () => { closePopup() }}>
                            <AntDesign name="close" style={styles.closeBtn}/>
                        </Pressable>
                    </View>

                    <View style={styles.body}>
                        <View style={styles.about}>
                            <Text style={styles.title}>{data.Title}</Text>
                            
                            <Text style={styles.description}>
                                {data.Description}
                            </Text>
                        </View>

                        <View style={styles.priceContainer}>
                            {data.PriceDiscount !== null && data.PriceDiscount > 0 
                                ? <View style={styles.price}>
                                    <Text style={styles.priceText}>{data.PriceDiscountFormat}</Text>
                                    <Text style={styles.priceDiscountText}>{data.PriceFormat}</Text> 
                                </View>
                                : <Text style={styles.priceText}>{data.PriceFormat}</Text> 
                            }
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <Pressable onPress={()=> this.decreaseQuantity()} style={styles.quantityLeft}>
                            <Text style={styles.quantityLeftText}>-</Text>
                        </Pressable>
                            <View style={styles.quantityCount}>
                                <Text style={styles.quantityText}>{this.state.quantity}</Text>
                            </View>

                        <Pressable onPress={()=> this.increaseQuantity()} style={styles.quantityRight}>
                            <Text style={styles.quantityRightText}>+</Text>
                        </Pressable>
                    </View>
                    
                    
                    <View style={styles.order}>
                        <Pressable onPress={()=> this.handleAddCart(data, this.state.quantity, data.Amount)} style={styles.orderBtn}>
                            <Text style={styles.orderText}>Thêm vào giỏ hàng {data.AmountFormat}</Text>
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
        color: COLORS.white
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

    order: {
        position: 'absolute',
        bottom: 0,
        height: 80,
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

    orderBtn: {
        width: width * 0.9,
        padding: 10,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 15
    },

    orderText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: '600'
    }
})

export default ProductDetail