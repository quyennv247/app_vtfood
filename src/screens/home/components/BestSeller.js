import React from 'react';
import { 
    Text,
    Image,
    StyleSheet,
    Dimensions,
    View,
    ScrollView,
    Pressable
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
var { width, height } = Dimensions.get('window');
import { COLORS } from '../../../constants';
import { Spinner } from './../../../components';
import ProductDetail from "../../product/ProductDetail";
import productService from "../../../api/productService";
import { TouchableOpacity } from 'react-native-gesture-handler';

class BestSeller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 1,
            pageSize: 5,
            data: null,
            product: null,
            isShow: false
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        productService.getBestSeller(this.state.pageIndex, this.state.pageSize, '', '').then((response) => {
            this.setState({ loading: false });
            if(response.statusCode == 200){
                this.setState({ data: response.data.Items, total: response.data.Total });
            }
            else{
                alert(response.error);
            }
            }).finally(() => { this.setState({ loading: false });; 
        });
    }

    closeModal = () => {
        this.setState({
          isShow: false
        });
    }

    handleClicktoProduct(product){
        this.setState({
            product: product,
            isShow: !this.state.isShow,
        })
    }

    render() {
        
        if(this.state.loading){
            return <Spinner size="small" />;
        }
        else if(this.state.total > 0){
            return (
                <View style={ styles.container }>
                    <View style={styles.header}>
                        <Text style={styles.title}>Sản phẩm bán chạy</Text>
                        <TouchableOpacity onPress={() => this.props.navigate('BestSeller')} style={styles.viewAll}><Text>Tất cả</Text></TouchableOpacity>
                    </View>

                    <ScrollView  
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        contentContainerStyle={styles.scrollView}>
                        {
                            this.state.data.map((item)=>{
                                return(
                                    this._renderItem(item)
                                )
                            })
                        }
                    </ScrollView>

                    <ProductDetail
                        show={this.state.isShow}
                        title={"Demo Popup"}
                        animationType={"fade"}
                        closePopup={this.closeModal}
                        data={this.state.product}
                        haveOutsideTouch={true}
                    />
                </View>
              );
        }
        else{
            return null;
        }
    }

    
    _renderItem(item){
        return(
            <Pressable onPress={() => this.handleClicktoProduct(item)}e key={item.Id} style={styles.itemContainer}>
                <Image style={ styles.image } source={{uri:item.Image.FullPath}} />
                 <View style={styles.cardItem}>
                     <Text style={styles.titleItem}>{item.Title}</Text>

                     <View style={styles.footerItem}>
                        <Icon style={styles.map} name='map-marker-alt' />
                        <Text style={styles.footerItemText}>{item.Shop.Address}</Text>
                     </View>
                 </View>
            </Pressable>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        paddingLeft: 10,
        paddingRight: 10,
    }, 
    
    header: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        alignContent: 'space-between',
    },

    title: {
        color: COLORS.black,
        fontSize: 20,
        fontWeight: '600',
        justifyContent:'space-between',
    },

    viewAll:{
        justifyContent:'space-between',
        fontSize: 15,
        height: 20,
        width: 50,
    },

    scrollView: {
        paddingVertical: 10,
    },

    image: {
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: width * 0.65,
        height: width * 0.65,
        resizeMode: 'cover',
    },

    itemContainer: {
        backgroundColor: '#FFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius: 10,
        marginRight: 20,
        width: width * 0.65,
    },

    cardItem: {
        padding: 10,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flex: 1,
    },

    titleItem: {
        fontSize: 17,
        fontWeight: '600',
        flex: 1
    },

    footerItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10
    },

    footerItemText: {
        fontSize: 14,
        color: 'gray',
        marginLeft: 10,
        fontWeight: '500',
    },

    map: {
        color: COLORS.primary
    },
});

export default BestSeller;