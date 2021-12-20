import React from 'react';
import { Button, View, Text, ToastAndroid, } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { connect } from 'react-redux';


class Keys extends React.Component {


    copy_private_key = () => {
        const { private_key } = this.props.auth;
        Clipboard.setString(private_key);
        ToastAndroid.showWithGravityAndOffset(
            "Private Key Kopyalandı. Giriş Kısmına Yönlendirileceksiniz",
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
        this.props.navigation.navigate('Login');
    }

    render() {
        const keys = this.props.auth;
        if (!keys.public_key && !keys.private_key) {
            return (
                <View>
                    <Text>Lütfen Biraz Bekleyin Private Key Oluşturuluyor.</Text>
                </View>
            )
        }

        return (
            <View>
                <Text>Aşağıdaki butona basarak Size ait Private Key'i kopyalayabilirsiniz</Text>
                <Text>Bunu bir daha göremeyeceksiniz. Lütfen dikkatli saklayınız.</Text>
                <Button
                    title='Kopyala'
                    onPress={this.copy_private_key}
                />
            </View>
        );
    }

}

const mapStateToProps = ({ auth }) => {
    return { auth };
};

Keys = connect(mapStateToProps)(Keys);

export { Keys };