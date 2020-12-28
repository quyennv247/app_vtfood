import React from 'react';
import { connect } from 'react-redux';
import { 
    Text,
    Image,
    StyleSheet,
    Dimensions,
    View,
    FlatList,
    TouchableOpacity
  } from 'react-native';

var { height } = Dimensions.get('window');
import { fetchCategories } from '../../../redux/actions/CategoryAction'
import { COLORS } from '../../../constants';
import { Spinner } from './../../../components';

class Category extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchCategories();
    }

    handleClickCategory(categoryId){
        this.props.navigate('Category', {
            categoryId: categoryId
        });
    }

    render() {
        const { category } = this.props;
        let categories = category.data.data;

        if(category.loading){
            return <Spinner size="small" />;
        }
        else if(categories != null){
            return (
                <View style={ styles.container }>
                    <Text style={styles.titleCategory}>Khám phá danh mục</Text>
                    <FlatList
                        horizontal={false}
                        data={categories}
                        renderItem={({ item }) => this._renderItem(item)}
                        keyExtractor = { (item, index) => index.toString() }
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        numColumns={4}
                    />
                </View>
              );
        }
        else{
            return (
                <View>
                    <Text style={styles.notFound}>Không tìm thấy kết quả</Text>
                </View>
            );
        }
    }

    _renderItem(item){
        return(
          <TouchableOpacity key={item.Id} style={ styles.categoryItem } onPress={() => this.handleClickCategory(item.Id)}>
            <Image
              style={ styles.image }
              source={{uri : item.Image.FullPath}} />
            <Text style={ styles.title }>{item.CategoryName}</Text>
          </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5
    }, 

    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    
    categoryItem:{
        backgroundColor:'#FFFFFF',
        margin: 9, 
        alignItems:'center',
    },

    titleCategory: {
        fontSize: 18,
        paddingLeft: 5
    },

    image: {
        width: height * 0.1,
        height: height * 0.1,
        borderRadius: (height * 0.1) / 2,
        resizeMode: 'cover',
    },

    title:{
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 10,
        color: COLORS.black,
        marginTop: 5
    },

    notFound: {
        color: COLORS.textGray
    }
});


const mapStateToProps = state => {
   return { category: state.categoryReducer }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchCategories: () => dispatch(fetchCategories())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Category);