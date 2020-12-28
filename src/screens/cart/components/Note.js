import React from 'react'
import { View, Text, Modal, Dimensions, Pressable, StyleSheet, TextInput } from 'react-native'
import { COLORS } from './../../../constants';
var { width, height } = Dimensions.get('window');

class Note extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            note: ''
        };
    }

    onChangeText = (text) => {
        this.setState({
            note: text
        });
    }

    submit = () => {
        this.props.closePopup(this.state.note, true);
    }

    render() {
        const { show, closePopup, haveOutsideTouch, data } = this.props;

        return(
            <Modal
                animationType="fade"
                transparent={true}
                visible={show}
            >
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Pressable style={styles.cancel} onPress={ () => { closePopup('', false) }}>
                            <Text style={styles.cancelText}>Hủy</Text>
                        </Pressable>
                        <Text style={styles.title}>Thêm ghi chú</Text>
                        <Pressable style={styles.submit} onPress={ () => { this.submit() }}>
                            <Text style={styles.submitText}>Xong</Text>
                        </Pressable>
                    </View>

                    <View style={styles.body}>
                        <TextInput
                            multiline
                            numberOfLines={4}
                            style={styles.input}
                            placeholder="Nhập ghi chú"
                            defaultValue={data}
                            onChangeText={text => this.onChangeText(text)}
                        />
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        bottom: 0,
        position: 'absolute',
        width: width,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        height: height * 0.6,
        flex: 1,
    },

    header: {
        position: 'absolute',
        top: 10,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        flexDirection: 'row',
        width: '100%',
        zIndex: 9999,
        borderBottomColor: COLORS.grey,
        borderBottomWidth: 0.5,
        paddingBottom: 10
    },

    title: {
        fontSize: 18,
    },

    cancelText: {
        fontSize: 16,
        color: COLORS.black
    },

    submitText: {
        fontSize: 16,
        color: COLORS.secondary
    },

    body: {
        position: 'absolute',
        top: 50,
        width: width,
    },

    input: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingVertical: 10,
        width: '100%',
        backgroundColor: COLORS.white,
        borderColor: COLORS.white,
        borderWidth: 0.5,
    }
})

export default Note