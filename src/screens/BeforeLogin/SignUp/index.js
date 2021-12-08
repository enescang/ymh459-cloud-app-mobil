import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

import { P, Clickable, Space, HorizontalLayout } from '../../../components';

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        password2: ''
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ marginBottom: 50 }}>
                        <P size={'xxl'} color={'#4c4c4c'} bold>Kayıt Ekranı</P>
                    </View>
                    <TextInput
                        style={styles.input}
                        onChangeText={d => this.setState({ email: d })}
                        value={this.state.email}
                        placeholder="E-Mail"
                        placeholderTextColor={'#959595'}
                        maxLength={35}
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={d => this.setState({ password: d })}
                        value={this.state.password}
                        placeholder="Şifre"
                        placeholderTextColor={'#959595'}
                        maxLength={35}
                    />

                    <TextInput
                        style={styles.input}
                        onChangeText={d => this.setState({ password2: d })}
                        value={this.state.password2}
                        placeholder="Şifre Doğrulama"
                        placeholderTextColor={'#959595'}
                        maxLength={35}
                    />

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                        <Clickable onClick={() => this.props.navigation.navigate('Home')} animSize={0.95}>
                            <View style={[styles.continueButton]}>
                                <P color={'#2e5469'} size={'d'} bold>Kayıt Ol</P>
                            </View>
                        </Clickable>
                    </View>
                </View>
                <View style={{ alignItems: 'center', justifyContent: 'flex-end', bottom: 10, flexDirection: 'row' }}>
                    <P color={'#777c7f'} size={'mm'} bold>Hesabınız var mı?  </P>
                    <Clickable onClick={() => this.props.navigation.navigate('Login')} animSize={0.95}>
                        <P color={'#3967dd'} size={'m'}>Şimdi Giriş Yap</P>
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
        color: '#EFEFEF'
    },

    continueButton: {
        backgroundColor: '#6cd8ff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        height: 50,
        width: 220,
    },
})

export { SignUp }
