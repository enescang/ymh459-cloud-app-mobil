import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {connect} from 'react-redux'
import ScreenOne from './ScreenOne';
import ScreenTwo from './ScreenTwo';

const Tab = createBottomTabNavigator();

class Home extends Component {

    translate = (...key) => {
        const { auth } = this.props;
        const translater = auth.translater || (() => {}) ;
        return translater(key);
    }

    render() {
        return (
            <View style={styles.container}>
                <Tab.Navigator
                    screenOptions={{
                        headerShown: true,
                        tabBarShowLabel: false,
                        // Bottom Tab Bar Özelleştirmesi
                        tabBarStyle: {
                            position: 'absolute',
                            height: 70,
                            backgroundColor: '#ced4da',
                            borderTopRightRadius: 50,
                            borderTopLeftRadius: 50,
                            borderTopWidth: 0
                        }
                    }}
                >
                    <Tab.Screen name="ScreenOne" component={ScreenOne}
                        options={{
                            title: this.translate("main_page"),
                            tabBarIcon: ({ focused }) => (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    {/* <Image
                                        source={CHATS}
                                        resizeMode="contain"
                                        style={{
                                            width: 20,
                                            height: 20,
                                            tintColor: focused ? text : text2
                                        }}
                                    /> */}
                                    <Text style={{ top: 5, color: focused ? '#0466c8' : '#212529', fontSize: 16, fontWeight: 'bold'}}>
                                        {this.translate("main_page")}
                                    </Text>
                                </View>
                            )
                        }}
                    />
                    <Tab.Screen name="ScreenTwo" component={ScreenTwo}
                        options={{
                            title: this.translate("profile"),
                            tabBarIcon: ({ focused }) => (
                                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    {/* <Image
                                        source={DISCOVERPNG}
                                        resizeMode="contain"
                                        style={{
                                            width: 20,
                                            height: 20,
                                            tintColor: focused ? text : text2
                                        }}
                                    /> */}
                                    <Text style={{ top: 5, color: focused ? '#0466c8' : '#212529', fontSize: 16, fontWeight: 'bold' }}>
                                        {this.translate("profile")}
                                    </Text>
                                </View>
                            )
                        }}
                    />
                </Tab.Navigator>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

const mapStateToProps = ({auth})=>{
    return {auth};
}
Home = connect(mapStateToProps)(Home);
export { Home }