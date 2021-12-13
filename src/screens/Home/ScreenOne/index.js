import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Button } from 'react-native';

import { P, Clickable } from '../../../components'
import { pickFile } from '../../../Ops/FilePicker';

class ScreenOne extends Component {


    renderItem() {
        return (
            <Clickable onClick={() => alert('A')} animSize={0.98}>
                <View style={styles.renderItem}>
                    <P color={'#242424'} size={'l'} bold>Falan Filan</P>
                </View>
            </Clickable >
        )
    }

    select_file =async()=>{
        console.log("File starter")
        const file = await pickFile();
        console.log({ file });
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={this.select_file}
                    title='Select File'
                />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
                    renderItem={d => this.renderItem(d.item)}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={{ bottom: 80 }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f3f4'
    },

    renderItem: {
        flex: 1,
        backgroundColor: '#f5f3f4',
        padding: 10
    }
})

export default ScreenOne;