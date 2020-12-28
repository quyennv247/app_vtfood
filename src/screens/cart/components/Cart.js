import React from 'react';
import { connect } from 'react-redux';
import { 
    Text,
    Image,
    StyleSheet,
    Dimensions,
    View,
    Pressable,
    ScrollView,
    FlatList
} from 'react-native';
var { width, height } = Dimensions.get('window');
import { COLORS } from '../../../constants';
import Loading from './../../../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getFee } from '../../../redux/actions/ShippingFeeAction';
import { addOrder } from '../../../redux/actions/OrderAddAction';
import { getPreciseDistance } from 'geolib';
import ChangeAddress from './ChangeAddress'
import UpdateCart from './UpdateCart'
import Note from './Note'
import orderService from './../../../api/orderService'
import OrderSuccess from "./OrderSuccess";
import { TouchableOpacity } from 'react-native-gesture-handler';

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: 0,
            success: false,
            loading: false,
            cart: null,
            carts: null,
            isShowShipping: false,
            isShowUpdateCart: false,
            isShowNote: false,
            shopLocation: { latitude: '', longitude: '' },
            shippingLocation: { latitude: '', longitude: '' },
            shippingAddress: '',
            note: '',
            total: 0,
            distance: 0,
            totalOrder: 0
        };
    }

    async componentDidMount() {
        await this.getLoginInfo();
        await this.getCarts();
        await this.getShippingInfo();
        this.getDistance(this.state.shopLocation, this.state.shippingLocation);
    }

    getLoginInfo = async () => {
        const loginId = await AsyncStorage.getItem('login_id');
        if(loginId != '' && loginId != undefined && loginId != '0'){
            this.setState({ userId: Number.parseInt(loginId) });
        }
    }

    getShippingInfo = async () => {
        const userAddress = await AsyncStorage.getItem('user_address');
        const userLong = await AsyncStorage.getItem('user_long');
        const userLat = await AsyncStorage.getItem('user_lat');

        if(userAddress != null){
            this.setState({ shippingAddress: userAddress });

            const shippingLocation =
            {
                latitude: userLat, 
                longitude: userLong
            };

            this.setState({
                shippingLocation: shippingLocation
            });
        }
        else{
            alert("Không xác định đươc địa chỉ của bạn");
        }
    }

    getCarts = async () => {
        const dataCart = await AsyncStorage.getItem('cart');
        if(dataCart != null){
            const carts = JSON.parse(dataCart);
            this.setState({ carts: carts });

            let amount = 0;
            let total = 0;
            for (let i = 0; i < carts.length; i++) {
                total += carts[i].price * carts[i].quantity;
                amount += carts[i].quantity;
            }
            
            this.setState({
                total: total
            });

            if(carts.length > 0){
                const shopLocation =
                {
                    latitude: carts[0].lat.toString(), 
                    longitude: carts[0].long.toString()
                };

                this.setState({
                    shopLocation: shopLocation
                });
            }
        }
        else{
            this.navigation.navigate('Home');
        }
    }

    getDistance = (from, to) => {
        const result =  getPreciseDistance(from, to);
        this.setState({
            distance: (result/1000).toFixed(1)
        });

        if(!isNaN(this.state.distance)){
            this.props.getFee((result/1000).toFixed(1));
        }
    }

    openModalShipping = () => {
        this.setState({
            isShowShipping: true
        });
    }

    closeModalShipping = (location)  => {
        if(location != null){
            if(location.addressPlus != null && location.addressPlus != ''){
                this.setState({ shippingAddress: location.addressPlus + " - " + location.location.address });
            }
            else{
                this.setState({ shippingAddress: location.location.address });
            }
           
            const shippingLocation =
            {
                latitude: location.location.lat.toString(), 
                longitude: location.location.lng.toString()
            };

            this.setState({
                shippingLocation: shippingLocation
            });

            this.getDistance(this.state.shopLocation, shippingLocation);
        }

        this.setState({
            isShowShipping: false
        });
    }

    openModalUpdateCart = (cart) => {
        this.setState({
            isShowUpdateCart: true,
            cart: cart
        });
    }

    closeModalUpdateCart = () => {
        this.getCarts();
        this.setState({
            isShowUpdateCart: false
        });
    }

    openModalNote = () => {
        this.setState({
            isShowNote: true
        });
    }

    closeModalNote = (note, submitted) => {
        if(submitted){
            this.setState({ note: note });
        }
        
        this.setState({
            isShowNote: false
        });
    }

    addOrder = async () => {
        await this.getLoginInfo();

        if(this.state.userId == 0){
            this.props.navigation.navigate('LoginScreen', {
                screen: 'Cart'
            });
        }
        else{
            this.setState({ loading: true });
            const order = {
                UserId: parseInt(this.state.userId),
                ShopId: 0,
                PaymentId: 1,
                Note: this.state.note,
                ShippingAddress: this.state.shippingAddress,
                DistanceShip: this.state.distance,
                ShippingFree: this.props.shippingFee.Price
            };

            order.Items = [];
    
            this.state.carts.forEach(function(item){
                const orderItem = {
                    OrderId: 0,
                    ProductId: item.productId,
                    Price: item.price,
                    Quantity: item.quantity
                };
    
                order.ShopId = item.shopId;
                order.Items.push(orderItem);
            })
    
            orderService.add(order).then((response) => {
                this.setState({ loading: false });
                if(response.statusCode == 200){
                    this.clearCart();
                    this.setState({ success: true });
                }
                else{
                    alert(response.error);
                }
            }).finally(() => { this.setState({ loading: false });});
        }
    }

    async clearCart() {
        try {
            await AsyncStorage.removeItem('cart');
            return true;
        }
        catch(exception) {
            return false;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                
                <ScrollView style={styles.body}>
                    <View style={styles.address}>
                        <View style={styles.headerAddress}>
                            <Text style={styles.addressTitle}>Giao hàng đến</Text>
                            <TouchableOpacity style={styles.addressBtn} onPress={() => this.openModalShipping()}>
                                <Text style={styles.addressBtnText}>Thay đổi</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <View style={styles.addressInfo}>
                            <Icon style={styles.map} name='map-marker-alt' />
                            <Text>{  this.state.shippingAddress }</Text>
                        </View>
                    </View>

                    <View style={styles.cartContainer}>
                        <Text style={styles.cartTitle}>Đơn hàng</Text>
                        <FlatList
                            ItemSeparatorComponent={this.renderItemSeparator}
                            data={this.state.carts}
                            keyExtractor={(e, i) => i.toString()}
                            renderItem={({ item }) => this.renderItem(item)}
                            scrollEnabled={true}
                        />
                    </View>

                    <Pressable onPress={() => this.openModalNote()} style={styles.note}>
                        <Text style={styles.noteTitle}>Ghi chú: </Text>
                        <Text style={styles.noteValue}>{this.state.note}</Text>
                    </Pressable>

                    <View style={ styles.priceContainer }>
                        <View style={styles.amount}>
                            <Text style={styles.amountText}>Tổng</Text>
                            <Text style={styles.amountPrice}>{ this.state.total.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') }đ</Text>
                        </View>
                        <View style={styles.shipping}>
                            <Text style={styles.shippingText}>Phí giao hàng ({this.state.distance}km)</Text>
                            {this.props.shippingFee != null && this.props.shippingFee.Price >= 0
                                ? <Text style={styles.shippingPrice}>{this.props.shippingFee.Price.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}đ</Text>
                                : <Text style={styles.shippingPrice}>0</Text>
                            }
                        </View>
                        <View style={styles.total}>
                            <Text style={styles.totalText}>Tổng</Text>
                            {this.props.shippingFee != null && this.props.shippingFee.Price >= 0
                                ? <Text style={styles.totalPrice}>{(this.state.total + this.props.shippingFee.Price).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}đ</Text>
                                : <Text style={styles.totalPrice}>0</Text>
                            }
                        </View>
                    </View>

                </ScrollView>

                <View style={styles.order}>
                    <View style={styles.paymentMethod}>
                        <View>
                            <Text style={styles.paymentTitle}>Tiền mặt</Text>
                        </View>
                        <Text>|</Text>
                        <View>
                            <Text style={styles.paymentChange}>Thay đổi phương thức thanh toán</Text>
                        </View>
                    </View>
                    <View style={styles.button}>
                        <Pressable onPress={() => this.addOrder()} style={styles.orderBtn}>
                            <Text style={styles.orderText}>Đặt hàng - </Text>
                            {this.props.shippingFee != null && this.props.shippingFee.Price >= 0
                                ? <Text style={styles.orderText}>{(this.state.total + this.props.shippingFee.Price).toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}đ</Text>
                                : <Text style={styles.orderText}>0</Text>
                            }
                        </Pressable>    
                    </View>
                </View>
                
                <Loading 
                    show={this.state.loading}
                />

                <ChangeAddress
                    show={this.state.isShowShipping}
                    title={"Thay đổi địa chỉ"}
                    animationType={"fade"}
                    closePopup={this.closeModalShipping}
                    data={this.state.shippingAddress}
                    haveOutsideTouch={true}
                />

                <Note 
                    show={this.state.isShowNote}
                    title={"Ghi chú"}
                    animationType={"fade"}
                    closePopup={this.closeModalNote}
                    data={this.state.note}
                    haveOutsideTouch={true}
                />

                <UpdateCart
                    show={this.state.isShowUpdateCart}
                    title={"Update Cart"}
                    animationType={"fade"}
                    closePopup={this.closeModalUpdateCart}
                    data={this.state.cart}
                    haveOutsideTouch={true}
                />

                <OrderSuccess navigation={this.props.navigation} show={this.state.success} />
            </View>
        );
    }

    renderItem = (item) => {
        return (
            <Pressable onPress={ () => { this.openModalUpdateCart(item) }} key={item.Id} style={styles.itemCartContainer}>
                <View>
                    <Image
                        style={styles.image}
                        source={{uri : item.image}}
                    />
                </View>
                <View style={styles.bodyCart}>
                    <View style={styles.cartInfo}>
                        <Text style={styles.quantity}>{item.quantity}x </Text>
                        <Text style={styles.productName}>{item.productName}</Text>
                    </View>
                    <Text style={styles.priceText}>{item.totalFormat}đ</Text> 
                </View>
            </Pressable>
        )
    }

    renderItemSeparator = () => <View style={styles.line}/>
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg
    },

    body: {
        marginBottom: 140
    },

    address: {
        padding: 10,
        backgroundColor: COLORS.white,
        paddingBottom: 20
    },
    
    headerAddress:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    addressTitle: {
        fontSize: 16,
        fontWeight: '700'
    },

    addressBtn: {
        height: 22,
        width: 60
    },

    addressBtnText: {
        color: COLORS.primary,
        fontWeight: 'bold'
    },

    addressInfo: {
        paddingTop: 10,
        fontSize: 14,
        flexDirection: 'row',
    },

    map: {
        paddingTop: 2,
        paddingRight: 8,
        color: COLORS.secondary
    },

    cartContainer: {
        marginTop: 10,
        padding: 10,
        backgroundColor: COLORS.white
    },

    cartTitle: {
        fontSize: 16,
        fontWeight: '700',
        paddingBottom: 10
    },
    
    line: {
        height: 0.5,
        width: '100%',
        backgroundColor: COLORS.grey
    },

    itemCartContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        flex: 1
    },

    image: {
        width: width / 7,
        height: width / 7,
        borderColor: COLORS.grey,
        borderWidth: 0.5
    },
    
    bodyCart: {
        flex: 1,
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    productName: {
        fontSize: 16,
        paddingTop: 5,
        fontWeight: '600',
        color: COLORS.primary
    },

    priceText: {
        paddingTop: 5,
        fontWeight: 'bold'
    },

    quantity: {
        fontSize: 16,
        paddingTop: 5,
    },

    cartInfo: {
        flexDirection: 'row'
    },

    note: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginTop: 10,
        backgroundColor: COLORS.white,
        flexDirection: 'row'
    },

    noteTitle: {
        fontSize: 16,
        color: COLORS.secondary
    },

    noteValue: {
        fontSize: 16,
        paddingLeft: 10
    },

    order: {
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
        paddingTop: 15
    },
    
    button: {
        alignItems: 'center',
    },

    orderBtn: {
        width: width * 0.9,
        padding: 9,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom:10,
        alignItems: 'center',
    },

    orderText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: '500'
    },

    paymentMethod: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15
    },

    paymentTitle:{
        fontSize: 16,
        fontWeight: 'bold'
    },

    paymentChange: {
        color: COLORS.primary
    },
    
    priceContainer: {
        backgroundColor: COLORS.white,
        marginTop: 10,
        padding: 10,
    }, 
    
    amount: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: COLORS.grey,
        borderBottomWidth: 0.5,
        paddingTop: 10,
        paddingBottom: 10,
    },

    shipping: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: COLORS.grey,
        borderBottomWidth: 0.5,
        paddingTop: 10,
        paddingBottom: 10,
    },

    total: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 5,
    },

    amountText: {
        fontSize: 16,
        fontWeight: '600'
    },

    amountPrice: {
        fontSize: 16,
        fontWeight: '600'
    },

    shippingText: {
        fontSize: 16,
        fontWeight: '600'
    },

    shippingPrice: {
        fontSize: 16,
        fontWeight: '600'
    },

    totalText: {
        fontSize: 20,
        fontWeight: '700'
    },

    totalPrice: {
        fontSize: 20,
        fontWeight: '700'
    },
});
    

const mapStateToProps = state => ({
    shippingFee: state.shippingFeeReducer.data,
    response: state.orderAddReducer.data,
    loading: state.orderAddReducer.loading,
    error: state.orderAddReducer.error
})

const mapDispatchToProps = {
    getFee,
    addOrder
}
 
export default connect(
    mapStateToProps,
    mapDispatchToProps
 )(Cart);
