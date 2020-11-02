import React from 'react'
import {Text, StyleSheet, View} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "./LoginScreen";
import ForgotPasswordScreen from "./ForgotPasswordScreen";
import SignupScreen from "./SignupScreen";

const RootStack = createStackNavigator();

const RootStackScreen= ({navigation})=>{
    return(
        <RootStack.Navigator headerMode='none'>
            <RootStack.Screen name="LoginScreen" component={LoginScreen}/>
            <RootStack.Screen name="SignupScreen" component={SignupScreen}/>
            <RootStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen}/>
        </RootStack.Navigator>
    )

}
const styles = StyleSheet.create({

})
export default RootStackScreen;
