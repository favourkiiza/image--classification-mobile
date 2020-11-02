import React, {useState} from 'react'
import {
    Text, StyleSheet, View, Dimensions, TouchableOpacity, Platform, TextInput, StatusBar,
    KeyboardAvoidingView, ActivityIndicator, Alert, Keyboard, TouchableWithoutFeedback
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

import Colors from '../constants/Colors'
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {sendPostRequest} from "../helpers/RemoteHelper";


const FormValidationSchema = Yup.object().shape({
    current_password: Yup.string()
        .required('Current password is required'),
    password: Yup.string()
        .min(6, ' New Password should be more than 6 characters')
        .required('New Password is required')
        .test(
            "confirm-password-test",
            "Your new password should not be the same as your old password",
            function (value) {
                return  value != this.parent.current_password
            }
        ),

    confirmPassword: Yup.string()
        .required('Confirm password is required')
        .test(
            "confirm-password-test",
            "New Password and confirm password should match",
            function (value) {
                return  value === this.parent.password
            }
        )

});

const ChangePassword= ({navigation})=>{

    const [secureText, setSecureText] = useState(true)

    const updateSecureTextEntry = () => {
        setSecureText(!secureText)
    }



    const reset = async ({current_password, password}) => {

        let user_id
        user_id = null
        try {
            const ifo = await AsyncStorage.getItem('userData');
            if (ifo) {

                user_id = JSON.parse(ifo).id
                console.log(`${user_id}`)
            }

        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }

        const User = {current_password: current_password, new_password: password, id: user_id};

        const postBody = JSON.stringify({
            User
        })
        const outlet = 'change-password'
        await sendPostRequest(outlet, postBody)
            .then((json) => {
                Alert.alert(`${json.returnmessage}`)

            })

    }


    return(

        <Formik initialValues={{current_password: '', password: '', confirmPassword: ''}}
                validationSchema={FormValidationSchema}
                onSubmit={(values,actions)=>reset({ current_password: values.current_password,password:values.password })
                   }>
            {props =>{
                return(
                    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
                    <View style={styles.container}>
                        <StatusBar backgroundColor={Colors.primary} barStyle="light-content"/>

                        <View
                            animation="fadeInUpBig"
                            style={styles.footer}>
                            <Text syle={styles.text_footer}>Current Password</Text>
                            <View style={styles.action}>
                                <FontAwesome
                                    name="lock"
                                    color="#05375a"
                                    size={20}/>
                                <TextInput placeholder="Enter your current password"
                                           value={props.values.current_password}
                                           style={styles.textInput}
                                           autoCapitalize="none"
                                           secureTextEntry={secureText}
                                           onChangeText={props.handleChange("current_password")}
                                           onBlur={props.handleBlur("current_password")}/>
                                <TouchableOpacity onPress={updateSecureTextEntry}>
                                    {secureText ?
                                        <Feather
                                            name="eye-off"
                                            color="grey"
                                            size={20}
                                        />
                                        :
                                        <Feather
                                            name="eye"
                                            color="grey"
                                            size={20}
                                        />
                                    }
                                </TouchableOpacity>
                            </View>
                            <Text style={{ color: "red" }}>{props.touched.current_password && props.errors.current_password}</Text>
                            <View style={{marginTop: 20}}>
                                <Text syle={[styles.text_footer,{marginTop: 35}]}>New Password</Text>
                                <View style={styles.action}>
                                    <FontAwesome
                                        name="lock"
                                        color="#05375a"
                                        size={20}/>
                                    <TextInput placeholder="Enter your new password"
                                               value={props.values.password}
                                               style={styles.textInput}
                                               autoCapitalize="none"
                                               secureTextEntry={secureText}
                                               onChangeText={props.handleChange("password")}
                                               onBlur={props.handleBlur("password")}/>
                                    <TouchableOpacity onPress={updateSecureTextEntry}>
                                        {secureText ?
                                            <Feather
                                                name="eye-off"
                                                color="grey"
                                                size={20}
                                            />
                                            :
                                            <Feather
                                                name="eye"
                                                color="grey"
                                                size={20}
                                            />
                                        }
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ color: "red" }}>{props.touched.password && props.errors.password}</Text>
                            </View>
                            <View style={{marginTop: 20}}>
                                <Text syle={[styles.text_footer,{marginTop: 35}]}>Confirm Password</Text>
                                <View style={styles.action}>
                                    <FontAwesome
                                        name="lock"
                                        color="#05375a"
                                        size={20}/>
                                    <TextInput placeholder="Confirm new password"
                                               value={props.values.confirmPassword}
                                               style={styles.textInput}
                                               autoCapitalize="none"
                                               secureTextEntry={secureText}
                                               onChangeText={props.handleChange("confirmPassword")}
                                               onBlur={props.handleBlur("confirmPassword")}/>
                                    <TouchableOpacity onPress={updateSecureTextEntry}>
                                        {secureText ?
                                            <Feather
                                                name="eye-off"
                                                color="grey"
                                                size={20}
                                            />
                                            :
                                            <Feather
                                                name="eye"
                                                color="grey"
                                                size={20}
                                            />
                                        }
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ color: "red" }}>{props.touched.confirmPassword && props.errors.confirmPassword}</Text>
                            </View>

                            {props.isSubmitting?<View>
                                    <ActivityIndicator size="large" color={Colors.primary} />
                                    <Text style={styles.textSubmit}>Saving...</Text>
                                </View>:
                                <View>
                                    <TouchableOpacity onPress={props.handleSubmit}>
                                    <LinearGradient
                                        colors={[Colors.primary, Colors.primary]}
                                        style={styles.signIn}>
                                        <Text style={[styles.textSign, {color: '#fff'}]}>Save</Text>
                                    </LinearGradient>
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
export default ChangePassword;
