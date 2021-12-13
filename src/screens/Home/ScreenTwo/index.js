import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { P, Space, SFImage, Clickable } from '../../../components'
import { actions } from '../../../state';
import moment from 'moment';
import { Request } from '../../../request';

class ScreenTwo extends Component {


    componentDidMount(){
        this.focus_listener = this.props.navigation.addListener('focus', this.load_info);
    }

    load_info = async()=>{
        actions.auth.LoadInfo();
    }

    logout = async()=>{
        actions.auth.Logout();
    }

    render() {

        const {user, info, files} = this.props.auth;
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <SFImage
                        source={{ uri: 'https://picsum.photos/200' }}
                        width={100}
                        round
                    />
                    <P color={'#242424'} size={'xl'} bold>{user.email}</P>
                    <P color={'#242424'} size={'m'} bold>{moment(user.created_at).format("MM/DD/YYYY")} tarihinde katıldı</P>
                </View>
                <View style={{ flex: 2 }}>
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <P color={'#242424'} size={'xl'} bold>A</P>
                        <Space h={'xs'} />
                        <P color={'#242424'} size={'d'} bold>deneme@gmail.com</P>
                    </View> */}
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <P color={'#242424'} size={'xl'} bold>A</P>
                        <Space h={'xs'} />
                        <P color={'#242424'} size={'d'} bold>055555555</P>
                    </View> */}
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <P color={'#242424'} size={'xl'} bold>A</P>
                        <Space h={'xs'} />
                        <P color={'#242424'} size={'d'} bold>Toplam Yüklenen Dosya: {info?.totalDoc || 0}</P>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <P color={'#242424'} size={'xl'} bold>A</P>
                        <Space h={'xs'} />
                        <P color={'#242424'} size={'d'} bold>Cihazdaki Toplam Dosya: {files?.length || 0 }</P>
                    </View>

                    <Space h={'xs'} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center' }}>
                        <Clickable onClick={this.logout} animSize={0.95}>
                            <View style={{ paddingVertical: 10, alignItems: 'center', backgroundColor:"#98c1d9", width:200 }}>
                                <P size={"d"} color={'#ffffff'} type={'sb'}>
                                    Çıkış
                                </P>
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
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const mapStateToProps = ({auth})=>{
    return {auth};
}

ScreenTwo = connect(mapStateToProps)(ScreenTwo);
export default ScreenTwo;