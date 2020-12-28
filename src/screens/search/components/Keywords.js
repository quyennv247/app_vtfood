import React from 'react';
import { 
    Text,
    StyleSheet,
    Dimensions,
    View,
    Pressable,
    SafeAreaView
} from 'react-native';
var { width, height } = Dimensions.get('window');
import { COLORS } from '../../../constants';
import keywordService from '../../../api/keywordService';

class Keywords extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: null
        }
    }

    componentDidMount() {
        this.getData();
    }

    handleClickSearch = (keyword) => {
        this.props.handleSearch(keyword);
    }

    getData = () => {
        this.setState({loading: true});

        keywordService.getAll().then((response) => {
            this.setState({loading: false});
            if(response.statusCode == 200){
                this.setState({data: response.data});
            }
            else{
                alert(response.error);
            }
        }).finally(() => {this.setState({loading: false}); });
    }

    render() {
        
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Món gì đang hot?</Text>
                </View>
                <View style={styles.body}>
                    {
                        this.state.data != null
                        ?
                        this.state.data.map((item)=>{
                            return(
                                this.renderItem(item)
                            )
                        })
                        : null
                    }
                </View>
                
            </SafeAreaView>
        );
    }

    renderItem(item){
        return(
            <Pressable onPress={() => this.handleClickSearch(item.Title)} style={styles.item}>
                <Text style={styles.itemText}>{item.Title}</Text>
            </Pressable>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    }, 

    header: {
        width: width,
        paddingBottom: 20,
        paddingTop: 15,
    },

    headerText: {
        color: COLORS.black,
        fontSize: 18
    },

    body: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap'
    },

    item: {
        marginRight: 15,
        marginBottom: 15,
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 100,
        backgroundColor: COLORS.grey,
    },

    itemText: {
        fontSize: 16,
        color: COLORS.gray1
    }
});


export default Keywords;