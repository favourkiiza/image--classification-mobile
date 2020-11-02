import React, {useState} from 'react'
import {
    Text,
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Platform,
    TextInput,
    StatusBar,Image,
    KeyboardAvoidingView, Alert, ActivityIndicator
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';

import {AuthContext} from '../components/Context'
import Colors from '../constants/Colors'
import { Formik } from "formik";
import * as Yup from "yup";
import {sendPostRequest} from "../helpers/RemoteHelper";


const loginSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required'),
    password: Yup.string()
        .required('Password is required'),
});
const LoginScreen= ({navigation})=>{
    const [secureText, setSecureText] = useState(true)

const {signIn} = React.useContext(AuthContext)


    const updateSecureTextEntry = () => {
        setSecureText(!secureText)
    }


    return(

        <Formik initialValues={{username: '', password: ''}}
                validationSchema={loginSchema}
                onSubmit={(values,actions)=>signIn(  values.username,values.password )

                }>
            {(props)=>(
                <View style={styles.container}>
                    <StatusBar backgroundColor={Colors.primary} barStyle="light-content"/>
                    <View style={styles.top}>
                        <View style={styles.header}>
                            <Image
                                animation="bounceIn"

                                source={require('../assets/g.png')}
                                style={styles.logo}
                                resizeMode="stretch"/>
                        </View>
                    </View>
                    <View style={styles.middle}>




                        <View style={styles.formArea}>
                    <View
                        animation="fadeInUpBig"
                        style={styles.footer}>
                        <Text syle={styles.text_footer}>Username</Text>
                        <View style={styles.action}>
                            <FontAwesome
                                name="user-o"
                                color="#05375a"
                                size={20}/>
                            <TextInput placeholder="Enter your username"
                                       style={styles.textInput}
                                       autoCapitalize="none"
                                       onChangeText={props.handleChange('username')}
                                       onBlur={props.handleBlur('username')}
                                       value={props.values.username}/>
                        </View>

                        <Text style={{ color: "red" }}>{props.touched.username && props.errors.username}</Text>
                        <View style={{marginTop: 20}}>
                            <Text syle={[styles.text_footer,{marginTop: 35}]}>Password</Text>
                            <View style={styles.action}>
                                <FontAwesome
                                    name="lock"
                                    color="#05375a"
                                    size={20}/>
                                <TextInput placeholder="Enter your password"
                                           style={styles.textInput}
                                           autoCapitalize="none"
                                           secureTextEntry={secureText}
                                           onChangeText={props.handleChange('password')}
                                           onBlur={props.handleBlur('password')}
                                           value={props.values.password}/>
                                <TouchableOpacity
                                    onPress={updateSecureTextEntry}
                                >
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
                        {props.isSubmitting?<View>
                                <ActivityIndicator size="large" color={Colors.primary} />
                            </View>:
                            <View style={styles.button}>
                                <TouchableOpacity
                                    style={styles.signIn}
                                    onPress={props.handleSubmit}>
                                    <LinearGradient
                                        colors={[Colors.primary, Colors.primary]}
                                        style={styles.signIn}>
                                        <Text style={[styles.textSign, {color: '#fff'}]}>Login</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=>navigation.navigate('SignupScreen')}
                                    style={[styles.signIn, {
                                        marginTop: 15
                                    }]}>
                                    <Text style={[styles.textSign,{color: Colors.primary}]}>Don't have an account? Click here to signup</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=>navigation.navigate('ForgotPasswordScreen')}
                                    style={[styles.signIn, {
                                        marginTop: 15
                                    }]}>
                                    <Text style={[styles.textSign,{color: Colors.primary}]}>Forgot Password? Click here to reset</Text>
                                </TouchableOpacity>
                                {<Text style={{ color: 'red' }}>{props.errors.general}</Text>}
                            </View>}

                    </View>
                        </View>
                    </View>
                </View>
            )}

        </Formik>

    )

};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.primary

    },
    header: {

        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40

    },
    footer: {
        /*flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,*/
        paddingVertical: 30,
        paddingHorizontal: 20
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

    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    top: {
        position: 'relative',
        backgroundColor: Colors.primary,
        paddingRight: 12.7,
        paddingLeft: 12.7,
        height: 300,
    },
    middle: {
        width: '100%',
        height: '100%',
        flex: 1,
        position: 'absolute',
        zIndex: 2,
        backgroundColor: 'transparent',
        paddingLeft: 26.3,
        paddingRight: 26.3,
    },
    formArea: {
        alignSelf: 'center',
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 5,
        top: '25%',
        // paddingBottom: 20,
    },
    logo: {
        height: 150,
        width: 150
    }
})
export default LoginScreen;
