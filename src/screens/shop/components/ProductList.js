import React from 'react';
import { connect } from 'react-redux';
import { 
    Text,
    Image,
    StyleSheet,
    Dimensions,
    View,
    Pressable,
    FlatList
} from 'react-native';
var { width, height } = Dimensions.get('window');
import { getProductShop } from '../../../redux/actions/ProductShopAction';
import { COLORS } from '../../../constants';
import { Spinner } from './../../../components';
import ProductDetail from './../../product/ProductDetail';

class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 1,
            pageSize: 20,
            isShow: false,
            product: null,
            quantity: 1
        };
    }

    componentDidMount() {
        this.props.getProductShop(this.state.pageIndex, this.state.pageSize, this.props.shopId);
    }

    handleLoadMore = () => {
        console.log('handleLoadMore');
    };

    close = () => {
        this.setState({
          isShow: false
        });
        this.props.checkCart();
    }

    onOpenModal = (product) => {
        this.setState({
            product: product,
            isShow: !this.state.isShow,
        })
    };

    render() {
        const { loading, data, total } = this.props;
        const { isShow } = this.state;

        if(loading){
            return <Spinner size="small" />;
        }
        else if(data != null && total > 0 ){
            return (
                <View style={ styles.container }>
                    <View style={styles.header}>
                        <Text style={styles.title}>Thực đơn</Text>
                    </View>

                    <FlatList
                        ItemSeparatorComponent={this.renderItemSeparator}
                        data={data}
                        keyExtractor={(e, i) => i.toString()}
                        renderItem={({ item }) => this.renderItem(item)}
                        ListFooterComponent={this.renderFooter.bind(this)}
                        onEndReachedThreshold={0}
                        onEndReached={() => this.handleLoadMore()}
                        scrollEnabled={true}
                    />

                    <ProductDetail
                        show={isShow}
                        title={"Product Detail"}
                        animationType={"fade"}
                        closePopup={this.close}
                        data={this.state.product}
                        haveOutsideTouch={true}
                    />
                </View>
              );
        }
        else{
            return (
                <View style={ styles.container }>
                    <View style={styles.header}>
                        <Text style={styles.title}>Thực đơn</Text>
                    </View>

                    <Text style={styles.notFound}>Thực đơn đang cập nhật ...</Text>
                   
                </View>
            );
        }
    }

    renderItem = (item) => {
        return (
            <Pressable onPress={() => this.onOpenModal(item)} key={item.Id} style={styles.itemContainer}>
                <Image
                    style={styles.image}
                    source={{uri : item.Image.FullPath}}
                />
                <View style={styles.body}>
                    <Text style={styles.tỉtleItem}>{item.Title}</Text>
                    
                    <View style={styles.footer}>
                        {item.PriceDiscount !== null && item.PriceDiscount > 0 
                            ? <View style={styles.price}>
                                <Text style={styles.priceText}>{item.PriceDiscountFormat}</Text>
                                <Text style={styles.priceDiscountText}>{item.PriceFormat}</Text> 
                             </View>
                            : <Text style={styles.priceText}>{item.PriceFormat}</Text> 
                        }
                    </View>
                </View>
            </Pressable>
        )
    }

    renderItemSeparator = () => <View style={styles.line}/>

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
        backgroundColor: COLORS.white,
        paddingHorizontal: 10,
    }, 
    
    line: {
        height: 0.5,
        width: '100%',
        backgroundColor: COLORS.grey
    },

    header: {
        paddingVertical: 10,
    },

    itemContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
    },

    image: {
        width: width / 3.8,
        height: width / 3.8,
        borderRadius: 10,
    },
    
    body: {
        flex: 1,
        paddingLeft: 10,
    },

    title: {
        color: COLORS.black,
        fontSize: 16,
        fontWeight: '600',
        justifyContent:'space-between',
    },

    tỉtleItem: {
        fontSize: 20,
        paddingTop: 5,
        fontWeight: '600',
    },

    address: {
        fontSize: 12,
        paddingTop: 5,
        color: COLORS.textGray
    },

    footer: {
        position: 'absolute',
        bottom: 3,
        paddingLeft: 10,
        width: '100%',
    },

    price: {
        flexDirection: 'row',
        flex: 1,
    },

    priceText: {
        color: COLORS.black,
    },

    priceDiscountText: {
        color: COLORS.textGray,
        textDecorationLine: 'line-through',
        paddingLeft: 10
    },

    notFound: {
        color: COLORS.textGray,
        paddingTop: 10,
        paddingBottom: 10,
    },

});
    


const mapStateToProps = state => {
    const { data, loading, error, total, pager } = state.productShopReducer;
    return { data, loading, error, total, pager }
}

const mapDispatchToProps = {
    getProductShop,
}
 
export default connect(
     mapStateToProps,
     mapDispatchToProps
 )(ProductList);