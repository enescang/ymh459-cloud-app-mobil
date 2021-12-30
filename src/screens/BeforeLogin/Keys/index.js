import React from 'react';
import { Button, View, Text, ToastAndroid, } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { connect } from 'react-redux';


class Keys extends React.Component {

    translate =(...key)=>{
        const {auth} = this.props;
        const translater = auth.translater;
        return translater(key);
    }

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
                    <Text>{this.translate("creating_private_key")}</Text>
                </View>
            )
        }

        return (
            <View>
                <Text>{this.translate("you_can_copy_private_key")}</Text>
                <Text>{this.translate("you_will_not_see_it_again")}</Text>
                <Button
                    title={this.translate("copy")}
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