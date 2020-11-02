import React, {useEffect,useState} from 'react';
import {View, SafeAreaView, StyleSheet, TouchableOpacity, StatusBar, ScrollView, ImageBackground} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,Switch
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from "../constants/Colors";
import LinearGradient from "react-native-linear-gradient";
import {AuthContext} from "../components/Context";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Profile= ()=>{
    const [user, setUser] = useState([])
    const navigation = useNavigation();
    const {signOut} = React.useContext(AuthContext)

    useEffect( () => {


        async function fetchDropDownDat() {

            try {
                const ifo =  await AsyncStorage.getItem('userData');
                if (ifo) {
                    setUser(JSON.parse(ifo))
                    console.log('datar',user)
                }

            } catch (error) {
                // Error retrieving data
                console.log(error.message);
            }
        } fetchDropDownDat()

    }, []);





    return(

            <ScrollView>

                <SafeAreaView style={styles.container}>
                    <StatusBar backgroundColor={Colors.primary} barStyle="light-content"/>

                    <View style={styles.footer}>
                        <View style={styles.userInfoSection}>
                            <View style={{marginTop: 15}}>
                                <Avatar.Image
                                    source={{
                                        uri: 'https://api.adorable.io/avatars/80/abott@adorable.png',
                                    }}
                                    size={80}
                                />
                                <View style={{marginLeft: 20}}>
                                    <Title style={[styles.title, {
                                        marginTop:15,
                                        marginBottom: 5,
                                    }]}>{`${user.first_name}  ${user.last_name}`}</Title>

                                </View>
                            </View>
                        </View>

                        <View style={styles.userInfoSection}>
                            <View style={styles.row}>
                                <Icon name="map-marker-radius" color={Colors.primary} size={20}/>
                                <Text style={{color:"#777777", marginLeft: 20}}>{user.district_name}, Uganda</Text>
                            </View>
                            <View style={styles.row}>
                                <Icon name="phone" color={Colors.primary} size={20}/>
                                <Text style={{color:"#777777", marginLeft: 20}}>{user.mobile_number}</Text>
                            </View>
                            <View style={styles.row}>
                                <Icon name="email" color={Colors.primary} size={20}/>
                                <Text style={{color:"#777777", marginLeft: 20}}>{user.email_address}</Text>
                            </View>
                        </View>

                        <View style={styles.infoBoxWrapper}>
                            <View style={[styles.infoBox, {
                                borderRightColor: '#dddddd',
                                borderRightWidth: 1
                            }]}>
                                <Title>{user.username}</Title>
                                <Caption>Username</Caption>
                            </View>
                            <View style={styles.infoBox}>
                                <Title>{user.user_level}</Title>
                                <Caption>User level</Caption>
                            </View>
                        </View>

                        <View style={styles.menuWrapper}>
                            <TouchableRipple onPress={()=>navigation.navigate('Support',{title: 'Help Center'})}>
                                <View style={styles.menuItem}>
                                    <Icon name="account-check-outline" color={Colors.primary} size={25}/>
                                    <Text style={styles.menuItemText}>Support</Text>
                                </View>
                            </TouchableRipple>
                            <TouchableRipple onPress={()=>navigation.navigate('EditUser', {title: 'Edit profile'})}>
                                <View style={styles.menuItem}>
                                    <Icon name="cog" color={Colors.primary} size={25}/>
                                    <Text style={styles.menuItemText}>Edit Profile</Text>
                                </View>
                            </TouchableRipple>
                                <TouchableRipple onPress={()=>navigation.navigate('ChangePassword', {userInfo: user})}>
                                <View style={styles.menuItem}>
                                    <Icon name="cog" color={Colors.primary} size={25}/>
                                    <Text style={styles.menuItemText}>Change Password</Text>
                                </View>
                            </TouchableRipple>
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity onPress={()=>{signOut()}}>
                                <LinearGradient
                                    colors={[Colors.primary, Colors.primary]}
                                    style={styles.signIn}>
                                    <Text style={[styles.textSign, {color: '#fff'}]}>Logout</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                    </View>
                </SafeAreaView>
            </ScrollView>

    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 10,        // backgroundColor: Colors.primary

        paddingTop: 30
    },
    footer: {
        /*flex: 15,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,*/
        paddingHorizontal: 20,
        alignSelf: "center",
        marginTop: 10,
        backgroundColor: "#FFF",
        // height: 182,
        elevation: 0,
        width: '94%',
        borderRadius: 15,
    },
    text_header: {
        color: '#fff',
        fontSize: 30
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,


    },
    menuItemText: {
        color: '#777777',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },

    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    button: {

        flex: 2,
        paddingHorizontal: 30,
        marginTop: 20

    },
    textSign: {
        fontSize: 18,
        // fontWeight: 'bold'
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
})
export default Profile;
