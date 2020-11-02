import React, {useEffect,useState} from 'react';
import {View, SafeAreaView, StyleSheet, TouchableOpacity, StatusBar, ScrollView} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Text,
    TouchableRipple,Switch
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from "../constants/Colors";
import Communications from 'react-native-communications';
import LinearGradient from "react-native-linear-gradient";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
const Support= ({navigation})=>{


    return(
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={Colors.primary} barStyle="light-content"/>

                <View style={styles.footer}>




                    <View style={styles.menuWrapper}>

                        <TouchableRipple onPress={() => Communications.phonecall('0704363623', true)}>
                            <View style={styles.menuItem}>
                                <Icon name="phone" color={Colors.primary} size={25}/>
                                <Text style={styles.menuItemText}>Call help line</Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple onPress={() => Communications.text('0704363623')}>
                            <View style={styles.menuItem}>
                                <Icon name="message" color={Colors.primary} size={25}/>
                                <Text style={styles.menuItemText}>Send Text Message</Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple onPress={() => Communications.email(['kiizafavour9@gmail.com', 'kiizafavour3@gmail.com'],null,null,'','')}>
                            <View style={styles.menuItem}>
                                <Icon name="email" color={Colors.primary} size={25}/>
                                <Text style={styles.menuItemText}>Report a problem</Text>
                            </View>
                        </TouchableRipple>
                        <TouchableRipple onPress={() => Communications.email(['kiizafavour9@gmail.com', 'kiizafavour3@gmail.com'],null,null,'','')}>
                            <View style={styles.menuItem}>
                                <Icon name="alert" color={Colors.primary} size={25}/>
                                <Text style={styles.menuItemText}>Send feedback</Text>
                            </View>
                        </TouchableRipple>
                    </View>


                </View>
            </SafeAreaView>
        </ScrollView>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 10,
        paddingTop: 10
    },
    footer: {
        flex: 15,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

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
        color: '#fff',
        marginRight: 10
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
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
export default Support;
