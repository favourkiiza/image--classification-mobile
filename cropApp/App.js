import React, {useEffect} from 'react'
import {
    Text, StyleSheet, View, Dimensions, TouchableOpacity, Platform, TextInput, StatusBar,
    KeyboardAvoidingView, ActivityIndicator, Alert, Keyboard, TouchableWithoutFeedback,Image
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import HomeStackNavigator from "./screens/HomeStack";
import {AuthContext} from './components/Context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RootStackScreen from "./screens/RootStackScreen";
import Colors from "./constants/Colors";
import {sendPostRequest} from "./helpers/RemoteHelper";
const App = () => {
    const initialLoginState = {
        isLoading: true,
        userName: null,
        userToken: null,
    };
    const loginReducer = (prevState, action) => {
        switch( action.type ) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGIN':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userName: null,
                    userToken: null,
                    isLoading: false,
                };
            case 'REGISTER':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
        }
    };

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
    const authContext = React.useMemo(()=>({

        signIn: async (username, password) => {
            const postBody = JSON.stringify({
                username: username,
                password: password
            })
            const outlet = 'login'
            await sendPostRequest(outlet,postBody)
                .then(async (json) => {
                    if (json.returncode === 0) {
                        const userToken = String(json.userInfo.auth_key);
                        const userName = json.userInfo.username;
                        const dist = json.userInfo.district_id;
                        const reg = json.userInfo.region_id;
                        try {


                            // Alert.alert(`LOADING ${userToken}`)
                            // await AsyncStorage.setItem('userData', JSON.stringify(json.userInfo))
                            // console.log(userToken)
                            await AsyncStorage.setItem('userToken', userToken);
                            await AsyncStorage.setItem('userData', JSON.stringify(json.userInfo))

                        } catch (e) {
                            console.log(e)
                        }
                        console.log('user token: ', userToken);
                        console.log('region: ', reg);
                        dispatch({ type: 'LOGIN', id: userName, token: userToken });
                    } else if (json.returncode === 909) {
                        Alert.alert(`${json.returnmessage}`)
                    }

                })
                .catch(error => {
                    console.log(error)
                })


        },
        signOut: async () => {
            try {
                // await AsyncStorage.removeItem('userData')
                /* setIsLoading(false)
                 setUserToken(null)*/
                await AsyncStorage.removeItem('userToken');
                await AsyncStorage.removeItem('userData');
            } catch (e) {
                console.log(e)
            }
            dispatch({ type: 'LOGOUT' });
        }
    }),[])

    useEffect(() => {
        setTimeout(async() => {
            // setIsLoading(false);
            let userToken;
            userToken = null;
            try {
                userToken = await AsyncStorage.getItem('userToken');

            } catch(e) {
                console.log(e);
            }
            // console.log('user token: ', userToken);
            dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
        }, 1000);
    }, []);

    if (loginState.isLoading){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.primary}}>
                <View style={styles.header}>
                    <Image
                        animation="bounceIn"
                        source={require('./assets/g.png')}
                        style={styles.logo}
                        resizeMode="stretch"/>

                </View>

                <View>

                </View>
            </View>

        )
    }



    return (

        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {loginState.userToken !== null? (

                    <HomeStackNavigator/>

                ):   <RootStackScreen/>
                }




            </NavigationContainer>
        </AuthContext.Provider>

    );
}
export default App;
const styles = StyleSheet.create({
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        height: 100,
        width: 100
    }
});
