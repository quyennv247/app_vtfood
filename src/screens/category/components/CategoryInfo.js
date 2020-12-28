import React from 'react';
import { 
    Text,
    Image,
    StyleSheet,
    Dimensions,
    View,
    TouchableOpacity
} from 'react-native';
var { width, height } = Dimensions.get('window');
import { COLORS } from '../../../constants';
import { Spinner } from './../../../components';
import categoryService from "./../../../api/categoryService";

class CategoryInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            categoryId: 0,
            loading: false,
            data: null
        };
    }

    componentDidMount() {
        this.getCategory();
    }

    getCategory = () => {
        this.setState({ loading: true });
        categoryService.getById(this.props.categoryId).then((response) => {
        this.setState({ loading: false });
        if(response.statusCode == 200){
            this.setState({ data: response.data });
        }
        else{
            alert(response.error);
        }
        }).finally(() => { this.setState({ loading: false });; });
    }

    render() {
        const { navigation } = this.props;

        if(this.state.loading){
            return <View style={ styles.loading }><Spinner size="small" /></View>;
        }
        else if(this.state.data != null){
            return (
                <View style={ styles.container }>
                    <Image style={ styles.image } resizeMode="cover" source={{ uri:this.state.data.Image.FullPath }} />
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.btnClose} onPress={() => navigation.goBack()}>
                            <Image source={require('./../../../assets/icons/back.png')} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.headerTitle}>
                        <Text style={styles.title}>{this.state.data.CategoryName}</Text>
                    </View>
                </View>
            );
        }
        else{
            return (
                <Text style={styles.notFound}>Không tìm thấy kết quả</Text>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.bg
    }, 
    
    loading: {
        height: height * 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    notFound: {
        color: COLORS.textGray,
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        paddingTop: height * 0.3,
    },

    image: {
        width: width,
        height: height * 0.3,
    },

    header: {
        position: 'absolute',
        top: 30,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        flexDirection: 'row',
        width: width,
        zIndex: 9999,
    },

    btnClose: {
        width: 40,
        height: 30
    },

    headerTitle: {
        position: 'absolute',
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        height: height * 0.3,
    },
    
    title: {
        fontSize: 30,
        fontWeight: '400',
        color: COLORS.white,
    },

});


export default CategoryInfo;