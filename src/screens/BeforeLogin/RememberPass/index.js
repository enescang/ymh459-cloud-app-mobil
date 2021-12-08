import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Modal, TouchableOpacity } from 'react-native';

import { P, Clickable, Space } from '../../../components';

class RememberPass extends Component {
    state = {
        email: '',
        code: '',
        modalVisible: false
    };

    setModalVisible(modalVisible) {
        this.setState({ modalVisible })
    }

    modal() {
        const { modalVisible } = this.state;
        return (
            <Modal
                statusBarTranslucent
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    console.log("Modal has been closed.");
                    this.setModalVisible(!modalVisible);
                }}
            >
                <TouchableOpacity style={styles.centeredView} onPress={() => this.setModalVisible(false)} activeOpacity={1}>
                    <View style={[styles.modalView, { backgroundColor: '#e8e9eb' }]}>
                        <P size={"l"} color={'#4c4c4c'} type={'b'}>İki adımlı doğrulama</P>
                        <Space v={'s'} h={'n'} />
                        <P size={"d"} color={'#4c4c4c'} type={'l'} align={'center'}>Lütfen mail adresinize gönderilmiş olan 6 haneli kodu giriniz</P>

                        <TextInput
                            style={styles.input}
                            onChangeText={d => this.setState({ code: d })}
                            value={this.state.code}
                            placeholder="Doğrulama Kodu"
                            placeholderTextColor={'#959595'}
                            maxLength={6}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Clickable onClick={() => alert('Doğrula')} animSize={0.95}>
                                <View style={[styles.continueButton]}>
                                    <P color={'#2e5469'} size={'d'} bold>Doğrula</P>
                                </View>
                            </Clickable>
                            <Space v={'m'} h={'m'} />
                            <Clickable onClick={() => this.setModalVisible(!modalVisible)} animSize={0.95}>
                                <View style={{ paddingVertical: 10, alignItems: 'center' }}>
                                    <P size={"d"} color={'#4c4c4c'} type={'sb'}>
                                        İptal
                                    </P>
                                </View>
                            </Clickable>
                        </View>
                        <Space v={'s'} h={'m'} />
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.modal()}
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ marginBottom: 50 }}>
                        <P size={'xxl'} color={'#4c4c4c'} bold>Şifremi Unuttum</P>
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <P size={'l'} color={'#4c4c4c'} bold align={'center'}>Lütfen unutmuş olduğunuz hesabın{'\n'}email adresini giriniz.</P>
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={d => this.setState({ email: d })}
                        value={this.state.email}
                        placeholder="E-Mail"
                        placeholderTextColor={'#959595'}
                        maxLength={35}
                    />

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50, flexDirection: 'row' }}>
                        <Clickable onClick={() => this.setState({ modalVisible: true })} animSize={0.95}>
                            <View style={[styles.continueButton]}>
                                <P color={'#2e5469'} size={'d'} bold>Gönder</P>
                            </View>
                        </Clickable>
                        <Space v={'s'} h={'m'} />
                        <Clickable onClick={() => this.props.navigation.goBack()} animSize={0.95}>
                            <View style={[styles.continueButton, { backgroundColor: '#2e5469' }]}>
                                <P color={'#6cd8ff'} size={'d'} bold>İptal</P>
                            </View>
                        </Clickable>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f9fa',
        justifyContent: 'center',
        alignItems: 'center',
    },

    card: {
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 20,
        borderRadius: 30,
        backgroundColor: '#98c1d9'
    },

    input: {
        width: 150,
        margin: 15,
        borderBottomWidth: 1,
        borderColor: '#C6C6C6',
        color: '#000',
        alignSelf: 'center',
    },

    continueButton: {
        backgroundColor: '#6cd8ff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: 50,
        width: 100,
    },

    // Modal Styles START
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(0,0,0, 0.4)',
    },

    modalView: {
        width: '90%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        paddingBottom: 0,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    parentHr: {
        alignSelf: 'center',
        width: '90%',
        height: 1,
    },
    // Modal Styles END
})

export { RememberPass }
