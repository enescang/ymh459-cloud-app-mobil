import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import { P, Space, SFImage } from '../../../components'

class ScreenTwo extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <SFImage
                        source={{uri: 'https://picsum.photos/200'}}
                        width={100}
                        round
                    />
                    <P color={'#242424'} size={'xxl'} bold>Falan Filan</P>
                    <P color={'#242424'} size={'m'} bold>28 Ekim 2020 tarihinde katıldı</P>
                </View>
                <View style={{ flex: 2 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <P color={'#242424'} size={'xl'} bold>A</P>
                        <Space h={'xs'} />
                        <P color={'#242424'} size={'d'} bold>deneme@gmail.com</P>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <P color={'#242424'} size={'xl'} bold>A</P>
                        <Space h={'xs'} />
                        <P color={'#242424'} size={'d'} bold>055555555</P>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <P color={'#242424'} size={'xl'} bold>A</P>
                        <Space h={'xs'} />
                        <P color={'#242424'} size={'d'} bold>80 GB Alan Kullanıldı</P>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <P color={'#242424'} size={'xl'} bold>A</P>
                        <Space h={'xs'} />
                        <P color={'#242424'} size={'d'} bold>17 GB Kullanılabilir</P>
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

export default ScreenTwo;