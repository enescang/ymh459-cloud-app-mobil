import React, { Component } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { connect } from 'react-redux';

import { P, Clickable, Space, HorizontalLayout } from '../../../components';
import { actions } from '../../../state';

class Login extends Component {
    state = {
        email: 'test@gmail.com',
        password: '12345',
        code: null,
        modalVisible: false,
    };

    translate =(...key)=>{
        const {auth} = this.props;
        const translater = auth.translater;
        return translater(key);
    }


    request_login = async () => {
        const { email, password } = this.state;
        const filter =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(filter.test(email) == false){
            return alert(this.translate("please_enter_valid_email"));
        }
        actions.auth.RequestLogin({ email: email.toLowerCase(), password }, ({ data, error }) => {
            if (data) {
                this.setState({ modalVisible: true });
            }
            if (error) {
                if (error == "user_not_found") {
                    return alert(this.translate("email_not_found"));
                }
                if (error == "password_wrong") {
                    return alert(this.translate("password_wrong"));
                }
                alert(this.translate("unexpected_error"));
            }
        });
    }

    request_verify = async () => {
        const { email, code } = this.state;
        if (code.length != 6) {
            alert(this.translate("otp_code_must_be_6_digits"));
            return;
        }
        actions.auth.RequestVerify({ email, code }, ({ data, error }) => {
            if (data) {
                alert("Doğrulandı ana sayfaya yönlendirilmelisiniz.")
            }
            if (error) {
                alert(JSON.stringify(error))
                if (error == "user_not_found") {
                    return alert(this.translate("email_not_found"));
                }
                if (error == "otp_code_not_found") {
                    return alert("OTP kodu isteği gelmemiş!");
                }
                if (error == "otp_code_wrong") {
                    return alert(this.translate("otp_code_wrong"));
                }
                if (error == "otp_expired") {
                    return alert(this.translate("otp_expired"));
                }
            }
        })
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
                    this.setState({ modalVisible: !modalVisible })
                }}
            >
                <TouchableOpacity style={styles.centeredView} onPress={() => this.setState({ modalVisible: false })} activeOpacity={1}>
                    <View style={[styles.modalView, { backgroundColor: '#e8e9eb' }]}>
                        <P size={"l"} color={'#4c4c4c'} type={'b'}>{this.translate("two_fa_authentication")}</P>
                        <Space v={'s'} h={'n'} />
                        <P size={"d"} color={'#4c4c4c'} type={'l'} align={'center'}>{this.translate("please_enter_otp_code")}</P>

                        <TextInput
                            style={styles.input}
                            onChangeText={d => this.setState({ code: d })}
                            value={this.state.code}
                            placeholder={this.translate("verification_code")}
                            placeholderTextColor={'#959595'}
                            maxLength={6}
                        />
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Clickable onClick={this.request_verify} animSize={0.95}>
                                <View style={[styles.continueButton]}>
                                    <P color={'#2e5469'} size={'d'} bold>{this.translate("verify")}</P>
                                </View>
                            </Clickable>
                            <Space v={'m'} h={'m'} />
                            <Clickable onClick={() => this.setState({ modalVisible: !modalVisible })} animSize={0.95}>
                                <View style={{ paddingVertical: 10, alignItems: 'center' }}>
                                    <P size={"d"} color={'#4c4c4c'} type={'sb'}>
                                        {this.translate("cancel")}
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
                        <P size={'xxl'} color={'#4c4c4c'} bold>{this.translate("login")}</P>
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={d => this.setState({ email: d })}
                        value={this.state.email}
                        placeholder={this.translate("email")}
                        placeholderTextColor={'#959595'}
                        maxLength={35}
                        keyboardType={"email-address"}
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={d => this.setState({ password: d })}
                        value={this.state.password}
                        placeholder={this.translate("password")}
                        placeholderTextColor={'#959595'}
                        maxLength={35}
                    />

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                        <Clickable onClick={this.request_login} animSize={0.95}>
                            <View style={[styles.continueButton]}>
                                <P color={'#2e5469'} size={'d'} bold>{this.translate("do_login")}</P>
                            </View>
                        </Clickable>
                        <Space v={'s'} h={'n'} />
                        <Clickable onClick={() => this.props.navigation.navigate('RememberPass')} animSize={0.95}>
                            <P color={'#3967dd'} size={'mm'}>{this.translate("forget_password")}</P>
                        </Clickable>
                    </View>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'flex-end', bottom: 10, flexDirection: 'row' }}>
                    <P color={'#777c7f'} size={'mm'} bold>{this.translate("do_not_have_an_account")}  </P>
                    <Clickable onClick={() => this.props.navigation.navigate('SignUp')} animSize={0.95}>
                        <P color={'#3967dd'} size={'m'}>{this.translate("register_now")}</P>
                    </Clickable>
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
        width: 295,
        margin: 15,
        borderBottomWidth: 1,
        borderColor: '#C6C6C6',
        color: '#000000'
    },

    continueButton: {
        backgroundColor: '#6cd8ff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        height: 50,
        width: 220,
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
});

const mapStateToProps = ({auth})=>{
    return {
        auth
    }
}
Login = connect(mapStateToProps)(Login);
export { Login }
