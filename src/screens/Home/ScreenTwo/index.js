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

    translate =(...key)=>{
        const {auth} = this.props;
        const translater = auth.translater;
        return translater(key);
    }

    load_info = async()=>{
        actions.auth.LoadInfo();
    }

    logout = async()=>{
        actions.auth.Logout();
    }

    change_language = (lng)=>{
        actions.auth.GetLanguage({lng_key:lng});
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
                        <P color={'#242424'} size={'d'} bold>{this.translate("total_uploaded_files")}: {info?.totalDoc || 0}</P>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <P color={'#242424'} size={'xl'} bold>A</P>
                        <Space h={'xs'} />
                        <P color={'#242424'} size={'d'} bold>{this.translate("total_device_files")}: {files?.length || 0 }</P>
                    </View>

                    <Space h={'xs'} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center' }}>
                        <Clickable onClick={this.logout} animSize={0.95}>
                            <View style={{ paddingVertical: 10, alignItems: 'center', backgroundColor:"#98c1d9", width:200 }}>
                                <P size={"d"} color={'#ffffff'} type={'sb'}>
                                    {this.translate("exit")}
                                </P>
                            </View>
                        </Clickable>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center', marginTop:5 }}>
                        <Clickable onClick={this.change_language.bind(this,"en")} animSize={0.95}>
                            <View style={{ paddingVertical: 10, alignItems: 'center', backgroundColor:"#98c1d9", width:40, margin:5 }}>
                                <P size={"d"} color={'#ffffff'} type={'sb'}>
                                    EN
                                </P>
                            </View>
                        </Clickable>
                        <Clickable onClick={this.change_language.bind(this,"tr")} animSize={0.95}>
                            <View style={{ paddingVertical: 10, alignItems: 'center', backgroundColor:"#98c1d9", width:40, margin:5 }}>
                                <P size={"d"} color={'#ffffff'} type={'sb'}>
                                    TR
                                </P>
                            </View>
                        </Clickable>
                        <Clickable onClick={this.change_language.bind(this,"ru")} animSize={0.95}>
                            <View style={{ paddingVertical: 10, alignItems: 'center', backgroundColor:"#98c1d9", width:40, margin:5 }}>
                                <P size={"d"} color={'#ffffff'} type={'sb'}>
                                    RU
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