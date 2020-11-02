import React, {useState} from 'react'
import {
    Text, StyleSheet, View, Dimensions, TouchableOpacity, Platform, TextInput, StatusBar,
    KeyboardAvoidingView, ActivityIndicator, Alert, Keyboard, TouchableWithoutFeedback
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient';

import Colors from '../constants/Colors'
import { Formik } from "formik";
import * as Yup from "yup";
import {sendPostRequest} from "../helpers/RemoteHelper";


const FormValidationSchema = Yup.object().shape({
    username: Yup.string()
        .required('username is required'),

});

const ForgotPasswordScreen= ({navigation})=>{

    const resetPassword = async ({username}) => {


        const User = {username: username};

        const postBody = JSON.stringify({
            User
        })
        const outlet = 'reset-password'
        await sendPostRequest(outlet, postBody)
            .then((json) => {
                Alert.alert(`${json.returnmessage}`)

            })

    }


    return(

        <Formik initialValues={{username: ''}}
                validationSchema={FormValidationSchema}
                onSubmit={(values,actions)=>resetPassword({ username: values.username })
                }>
            {props =>{
                return(
                    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
                        <View style={styles.container}>
                            <StatusBar backgroundColor={Colors.primary} barStyle="light-content"/>
                            <View style={styles.header}>
                                <Text style={styles.text_header}>Reset Password</Text>
                            </View>
                            <View
                                animation="fadeInUpBig"
                                style={styles.footer}>
                                <Text syle={styles.text_footer}>Username</Text>
                                <View style={styles.action}>

                                    <TextInput placeholder="Enter your username"
                                               style={styles.textInput}
                                               autoCapitalize="none"
                                               onChangeText={props.handleChange('username')}
                                               onBlur={props.handleBlur('username')}
                                               value={props.values.username}/>

                                </View>
                                <Text style={{ color: "red" }}>{props.touched.username && props.errors.username}</Text>



                                {props.isSubmitting?<View>
                                        <ActivityIndicator size="large" color={Colors.primary} />
                                        <Text style={styles.textSubmit}>Resetting...</Text>
                                    </View>:
                                    <View>
                                        <TouchableOpacity onPress={props.handleSubmit}>
                                            <LinearGradient
                                                colors={[Colors.primary, Colors.primary]}
                                                style={styles.signIn}>
                                                <Text style={[styles.textSign, {color: '#fff'}]}>Submit</Text>
                                            </LinearGradient>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={()=>navigation.navigate('LoginScreen')}
                                            style={[styles.signIn, {
                                                marginTop: 15
                                            }]}>
                                            <Text style={[styles.textSign,{color: Colors.primary}]}>Return to Login screen</Text>
                                        </TouchableOpacity>
                                    </View>}
                                {<Text style={{ color: 'red' }}>{props.errors.general}</Text>}

                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )
            }
            }
        </Formik>


    )

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary
    },
    header: {
        alignSelf: 'center',
        // paddingHorizontal: 30,
        marginTop: 50

    },
    footer: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        paddingVertical: 30,
        paddingHorizontal: 30,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 30,
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 15
    },
    action: {
        flexDirection: 'row',
        marginTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a'
    },

    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    button: {
        alignItems: 'center',
    },
    textSubmit: {
        fontSize: 18,
        color: Colors.primary,
        textAlign: 'center'
    },
})
export default ForgotPasswordScreen;
