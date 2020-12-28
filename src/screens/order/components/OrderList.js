import React from 'react';
import { connect } from 'react-redux';
import { 
    Text,
    Image,
    StyleSheet,
    Dimensions,
    View,
    Pressable,
    FlatList,
    SafeAreaView
} from 'react-native';
var { width, height } = Dimensions.get('window');
import { COLORS } from '../../../constants';
import { Spinner } from './../../../components';
import Icon from 'react-native-vector-icons/FontAwesome5';

class OrderList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    handleLoadMore = () => {
        console.log('handleLoadMore');
    };

    render() {
        const { navigation, data, total, pager } = this.props;
        
        return (
            <SafeAreaView style={ styles.container }>
                <FlatList
                    data={data}
                    keyExtractor={(e, i) => i.toString()}
                    renderItem={({ item }) => this.renderItem(item)}
                    ListFooterComponent={this.renderFooter.bind(this)}
                    onEndReachedThreshold={0}
                    onEndReached={() => this.handleLoadMore()}
                    scrollEnabled={true}
                />
            </SafeAreaView>
        );
    }

    renderItem = (item) => {
        return (
            <Pressable key={item.Id} style={styles.itemContainer}>
                <View style={styles.item}>
                    <View style={styles.headerItem}>
                        <Text style={styles.orderDate}>Đơn hàng {item.OrderDateFormat}</Text>
                        <Text style={styles.quantity}>{item.Quantity} món</Text>
                    </View>
                    <View style={styles.bodyItem}>
                        <Image style={styles.image} source={{uri : item.Shop.Image.FullPath}} />
                        <View style={styles.orderInfo}>
                            <Text style={styles.shopName}>{item.Shop.ShopName}</Text>
                            <Text style={styles.address}><Icon style={styles.iconMap} name='map-marker-alt' /> {item.Shop.Address}</Text>
                        </View>
                    </View>
                    <View style={styles.footerItem}>
                        <Text style={styles.status}>{item.StatusTitle}</Text>
                        <Text style={styles.amount}>{item.AmountFormat}đ</Text>
                    </View>
                </View>
            </Pressable>
        )
    }

    renderFooter = () => {
        if (!this.props.loading) return null;
        return (
            <Spinner size="small" />
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 20,
        backgroundColor: COLORS.bg,
        paddingHorizontal: 10,
    }, 

    notFoundContainer: {
        justifyContent: 'center',
        flexDirection: 'row'
    },

    notFound: {
        color: COLORS.textGray,
        paddingTop: 20,
        paddingBottom: 10,
        fontSize: 16
    },

    header: {
        paddingVertical: 10
    },
    
    title: {
        color: COLORS.textGray,
        fontSize: 18,
        fontWeight: '600',
        justifyContent:'space-between',
        paddingBottom: 15,
        paddingTop: 15,
    },

    body: {

    },

    itemContainer: {
        backgroundColor: COLORS.white,
        marginBottom: 20,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 10,
    },

    image: {
        width: width / 3.8,
        height: width / 3.8,
    },

    item: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    headerItem: {
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    orderDate:{
        fontSize: 17,
        color: COLORS.textGray,
    },

    quantity:{
        fontSize: 17,
        color: COLORS.textGray,
    },

    bodyItem: {
        width: width - 40,
        borderBottomColor: COLORS.grey,
        borderBottomWidth: 0.5,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

    orderInfo: {
        width: width - 145,
        flexDirection: 'column',
    },

    shopName: {
        fontSize: 16,
        color: COLORS.black,
        fontWeight: 'bold',
        paddingLeft: 10,
    },

    address: {
        fontSize: 16,
        color: COLORS.textGray,
        paddingLeft: 10,
        paddingTop: 10,
    },

    footerItem: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    status: {
        fontSize: 16,
        color: COLORS.black,
        fontWeight: 'bold'
    },

    amount: {
        fontSize: 16,
        color: COLORS.secondary,
        fontWeight: 'bold'
    }

});


export default OrderList;