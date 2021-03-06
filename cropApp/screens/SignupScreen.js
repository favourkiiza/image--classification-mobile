import React, {useEffect, useState} from 'react'
import {
    Text,
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Platform,
    TextInput,
    StatusBar,
    KeyboardAvoidingView,
    ActivityIndicator,
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
    ScrollView,
    Button,
    ImageBackground
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient';

import Colors from '../constants/Colors'
import { Formik } from "formik";
import * as Yup from "yup";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {sendPostRequest} from "../helpers/RemoteHelper";

const FormValidationSchema = Yup.object().shape({
    first_name: Yup.string()
        .required('First name is required'),
    last_name: Yup.string()
        .required('Last name is required'),
    email_address: Yup.string()
        .email('Invalid email'),
    password: Yup.string()
        .min(6, 'Password should be more than 6 characters')
        .required('Password is required'),
    confirm_password: Yup.string()
        .required('Confirm password is required')
        .test(
            "confirm-password-test",
            "Password and confirm password should match",
            function (value) {
                return  value === this.parent.password
            }
        )

});

const Signup= ({navigation})=>{
    const [region, setRegion] = useState([]);
    const [district, setDistrict] = useState([]);
    const [businessType, setBusinessType] = useState([]);
    const [street, setStreet] = useState([]);
    const [authority, setAuthority] = useState([]);
    const [county, setCounty] = useState([])
    const [sub_county, setSubCounty] = useState([])




    const sendRequest = async ( {first_name, last_name,middle_name,email_address, username,
                                    contact_phone, password} ) => {



        const User = {first_name: first_name, last_name: last_name,middle_name: middle_name,username: username,
            email_address: email_address, contact_phone: contact_phone, password: password, user_level: 'farmer'};

        const postBody = JSON.stringify({
            User
        })
        const outlet = 'create-farmer'
        await sendPostRequest(outlet,postBody)
            .then((json)=>{

                    Alert.alert(`${json.returnmessage}`)

            })



    };










    return(

        <Formik initialValues={{first_name: '', last_name: '',middle_name: '', username: '',
             contact_phone: '', email_address: '',
            password: '', confirm_password: ''}}
                validationSchema={FormValidationSchema}
                onSubmit={(values,actions)=>sendRequest({ first_name: values.last_name, last_name: values.last_name
                    ,middle_name: values.middle_name, username: values.username, contact_phone: values.contact_phone,
                    email_address: values.email_address, password: values.password})
                    /*.then(() => {
                        Alert.alert('User Registered Succesfully.');
                    })
                    .catch(error => {
                        actions.setFieldError('general', error.message);
                    })
                    .finally(() => {
                        actions.setSubmitting(false);
                    })*/}>
            {props =>{
                return(

                        <ScrollView>

                            <View style={styles.container}>
                                <StatusBar backgroundColor={Colors.primary} barStyle="light-content"/>

                                <View
                                    animation="fadeInUpBig"
                                    style={styles.footer}>
                                    <Text></Text>
                                    <Text syle={styles.text_footer}>First name</Text>
                                    <View style={styles.action}>

                                        <TextInput style={styles.input}
                                                   autoCorrect={false}  placeholder="Enter first name"
                                                   value={props.values.first_name}
                                                   autoCapitalize="none"
                                                   onChangeText={props.handleChange("first_name")}
                                                   onBlur={props.handleBlur("first_name")}>

                                        </TextInput>

                                    </View>
                                    <Text style={{ color: "red" }}>{props.touched.first_name && props.errors.first_name}</Text>
                                    <Text syle={styles.text_footer}>Middle Name</Text>
                                    <View style={styles.action}>

                                        <TextInput style={styles.input}
                                                   autoCorrect={false}  placeholder="Enter middle name"
                                                   value={props.values.middle_name}
                                                   autoCapitalize="none"
                                                   onChangeText={props.handleChange("middle_name")}
                                                   onBlur={props.handleBlur("middle_name")}>

                                        </TextInput>
                                    </View>


                                    <Text syle={styles.text_footer}>Last name</Text>
                                    <Text></Text>

                                    <TextInput style={styles.input}
                                               autoCorrect={false}  placeholder="Enter last name"
                                               value={props.values.last_name}
                                               autoCapitalize="none"
                                               onChangeText={props.handleChange("last_name")}
                                               onBlur={props.handleBlur("last_name")}>

                                    </TextInput>
                                    <Text style={{ color: "red" }}>{props.touched.last_name && props.errors.last_name}</Text>

                                    <Text syle={styles.text_footer}>Phone number</Text>
                                    <Text></Text>

                                    <TextInput style={styles.input}
                                               autoCorrect={false}  placeholder="Enter phone number"
                                               value={props.values.contact_phone}
                                               autoCapitalize="none"
                                               onChangeText={props.handleChange("contact_phone")}
                                               onBlur={props.handleBlur("contact_phone")}>

                                    </TextInput>
                                    <Text style={{ color: "red" }}>{props.touched.sub_county && props.errors.sub_county0}</Text>

                                    <Text syle={styles.text_footer}>Email</Text>
                                    <Text></Text>

                                    <TextInput style={styles.input}
                                               autoCorrect={false}  placeholder="Enter email"
                                               value={props.values.email_address}
                                               autoCapitalize="none"
                                               onChangeText={props.handleChange("email_address")}
                                               onBlur={props.handleBlur("email_address")}>

                                    </TextInput>
                                    <Text style={{ color: "red" }}>{props.touched.email_address && props.errors.email_address}</Text>

                                    <Text style={styles.text_footer}>Username</Text>
                                    <View style={styles.action}>

                                        <TextInput style={styles.input}
                                                   autoCorrect={false}  placeholder="Enter username"
                                                   value={props.values.username}
                                                   autoCapitalize="none"
                                                   onChangeText={props.handleChange("username")}
                                                   onBlur={props.handleBlur("username")}>

                                        </TextInput>
                                    </View>
                                    <Text></Text>

                                    <Text syle={styles.text_footer}>Password</Text>
                                    <View style={styles.action}>

                                        <TextInput style={styles.input}
                                                   autoCorrect={false}  placeholder="Enter password"
                                                   value={props.values.password}
                                                   autoCapitalize="none"
                                                   onChangeText={props.handleChange("password")}
                                                   onBlur={props.handleBlur("password")}>

                                        </TextInput>

                                    </View>
                                    <Text style={{ color: "red" }}>{props.touched.password && props.errors.password}</Text>
                                    <Text syle={styles.text_footer}>Confirm password</Text>
                                    <View style={styles.action1}>

                                        <TextInput style={styles.input}
                                                   autoCorrect={false}  placeholder="Re-enter password"
                                                   value={props.values.confirm_password}
                                                   autoCapitalize="none"
                                                   onChangeText={props.handleChange("confirm_password")}
                                                   onBlur={props.handleBlur("confirm_password")}>

                                        </TextInput>
                                    </View>
                                    <Text style={{ color: "red" }}>{props.touched.confirm_password && props.errors.confirm_password}</Text>


                                    {props.isSubmitting?<View>
                                            <ActivityIndicator size="large" color={Colors.primary} />
                                            <Text style={styles.textSubmit}>Saving...</Text>
                                        </View>:
                                        <View style={styles.buttonContainer}>
                                            <View style={styles.button}>
                                                <TouchableOpacity onPress={props.handleSubmit}>
                                                    <LinearGradient
                                                        colors={[Colors.primary, Colors.primary]}
                                                        style={styles.signIn}>
                                                        <Text style={[styles.textSign, {color: '#fff'}]}>Save</Text>
                                                    </LinearGradient>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.button}>
                                                <TouchableOpacity onPress={props.resetForm}>
                                                    <LinearGradient
                                                        colors={['#f5fafa', '#e6f7f7']}
                                                        style={styles.signIn}>
                                                        <Text style={[styles.textSign, {color: Colors.primary}]}>Reset</Text>
                                                    </LinearGradient>
                                                </TouchableOpacity>
                                            </View>
                                        </View>}


                                    {<Text style={{ color: 'red' }}>{props.errors.general}</Text>}

                                </View>
                            </View>
                        </ScrollView>

                )
            }
            }
        </Formik>


    )

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.primary
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 10,
        paddingTop: 10
    },
    footer: {
        /* flex: 15,
         backgroundColor: '#fff',
         borderTopLeftRadius: 30,
         borderTopRightRadius: 30,
         paddingVertical: 30,
         paddingHorizontal: 20*/
        paddingHorizontal: 20,
        alignSelf: "center",
        marginTop: 10,
        backgroundColor: "#FFF",
        // height: 182,
        elevation: 0.8,
        width: '90%',
        borderRadius: 15,
    },
    text_header: {
        color: '#fff',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 15
    },
    action: {

        marginTop: 15,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        paddingBottom: 5
    },
    action1: {

        marginTop: 15,

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
        color: '#fff',
        marginRight: 10
    },
    textSubmit: {
        fontSize: 18,
        color: Colors.primary,
        textAlign: 'center'
    },
    button: {
        marginTop: 25,
        flex: 2,
        paddingHorizontal: 10,
    },
    input: {

        borderColor: '#f2f2f2',
        borderWidth: 1,
        width: '100%',
        // borderRadius: 8
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },

    buttonTop: {
        alignItems: 'center',
        marginRight: 10
    },

    buttonTopContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 25
    },
})
export default Signup;
