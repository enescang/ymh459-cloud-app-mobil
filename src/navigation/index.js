import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from "./navigator";
import { Home, Login, SignUp, RememberPass, Keys } from '../screens';
import { connect } from 'react-redux';

const Stack = createNativeStackNavigator();

class Navigation extends React.Component {

    componentDidMount(){
       
    }
    render() {
        const { auth } = this.props;
        const { login_complate } = auth;
        console.log("AUTH >>>>>>>>", auth)
        return (
            <>
                {
                    login_complate ?
                        <NavigationContainer ref={navigationRef}>
                            <Stack.Navigator screenOptions={{ headerShown: false }}>
                                <Stack.Screen name="Home" component={Home} />
                            </Stack.Navigator>
                        </NavigationContainer>
                        :
                        <NavigationContainer ref={navigationRef}>
                            <Stack.Navigator screenOptions={{ headerShown: false }}>
                                <Stack.Screen name="Login" component={Login} />
                                <Stack.Screen name="SignUp" component={SignUp} />
                                <Stack.Screen name="RememberPass" component={RememberPass} />
                                <Stack.Screen name="Keys" component={Keys} />
                            </Stack.Navigator>
                        </NavigationContainer>
                }

            </>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return { auth };
}

Navigation = connect(mapStateToProps)(Navigation);
export default Navigation;