import React from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';
import { COLORS } from "../../constants";
var { width, height } = Dimensions.get('window');

class Success extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            show: false
        }
    }

    componentDidMount() {
        this.setState({ show: this.props.show });
    }

    gotoLogin = () => {
        this.setState({ show: false });
        
        this.props.navigation.navigate('LoginScreen', {
            screen: "Account"
        });
    }
 
  render() {
    return (
        <Modal transparent={true} animationType={'none'} visible={this.state.show}>
          <View style={styles.modalBackground}>
            <View style={styles.container}>
                <Image style={styles.icon} source={require('../../assets/icons/success.png')}/>
                <Text style={styles.messageText}>Tạo tài khoản thành công</Text>
                <TouchableOpacity onPress={() => this.gotoLogin()} style={styles.button}>
                    <Text style={styles.buttonText}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )
  }
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
	backgroundColor: '#00000040'
  },

  container: {
    backgroundColor: '#FFFFFF',
    width: width * 0.75,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
	justifyContent: 'space-around',
	zIndex: 1011,
	opacity: 1,
	paddingHorizontal: 10,
	paddingVertical: 30
  },

  icon: {
	marginBottom: 15
  },

  messageText:{
	  color: COLORS.title,
	  fontSize: 18,
	  fontWeight: 'bold',
	  marginBottom: 30
  },

  button: {
      paddingTop: 8,
      paddingBottom: 8,
	  width: width * 0.6,
	  backgroundColor: COLORS.primary,
	  borderRadius: 30,
	  justifyContent: 'center',
	  alignItems: 'center'
  },
  buttonText: {
	  color: COLORS.white,
	  fontWeight: '600',
	  fontSize: 16,
  }
});

export default Success;