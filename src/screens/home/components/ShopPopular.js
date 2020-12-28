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
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
var { width, height } = Dimensions.get('window');
import shopService from "../../../api/shopService";
import { COLORS } from '../../../constants';
import { Spinner } from './../../../components';

class ShopPopular extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pageIndex: 1,
            pageSize: 5,
            data: null,
            total: 0
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        shopService.getHome(this.state.pageIndex, this.state.pageSize, '', '').then((response) => {
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

    handleClicktoShop(shopId){
        this.props.navigate('Shop', {
            shopId: shopId
        });
    }

    handleClickToPage(){
        this.props.navigate('ShopPopular');
    }

    render() {
        
        if(this.state.loading){
            return <Spinner size="small" />;
        }
        else if(this.state.total > 0){
            
            return (
                <View style={ styles.container }>
                    <View style={styles.header}>
                        <Text style={styles.title}>Quán ngon</Text>
                        <TouchableOpacity onPress={() => this.handleClickToPage()} style={styles.viewAll}><Text>Tất cả</Text></TouchableOpacity>
                    </View>

                    <ScrollView  
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        contentContainerStyle={styles.scrollView}>
                        {
                            this.state.data.map((item)=>{
                                return(
                                    this.renderItem(item)
                                )
                            })
                        }
                    </ScrollView>
                </View>
              );
        }
        else{
            return null;
        }
    }

    
    renderItem(item){
        return(
            <Pressable onPress={() => this.handleClicktoShop(item.Id)} key={item.Id} style={styles.itemContainer}>
                <Image style={ styles.image } source={{uri:item.Image.FullPath}} />
                 <View style={styles.cardItem}>
                     <Text style={styles.titleItem}>{item.ShopName}</Text>

                     <View style={styles.footerItem}>
                        <Icon style={styles.map} name='map-marker-alt' />
                        <Text style={styles.footerItemText}>{item.Address}</Text>
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
        height: 30,
        width: 50
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
        width: width * 0.65
    },

    cardItem: {
        padding: 10,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flex: 1
    },

    titleItem: {
        fontSize: 17,
        fontWeight: '600',
        flex: 1
    },

    footerItem: {
        flexDirection: 'row',
        alignItems: 'center',
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


export default ShopPopular;