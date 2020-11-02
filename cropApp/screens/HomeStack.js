import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home'
import Detail from '../screens/Classification'
import Favourite from '../screens/Favourites'
import Profile from '../screens/Profile'
import {Image} from 'react-native'
import Classification from "./Classification";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Support from "./Support";
import Colors from "../constants/Colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ChangePassword from "./ChangePassword";
import EditUser from "./EditUser";
import LiveLocation from "./LiveLocation";
const Tab = createMaterialBottomTabNavigator();
const BottomTabNavigator = () => {
  return(
      <Tab.Navigator
          initialRouteName="Home"
          activeColor={Colors.primary}
          barStyle={{ backgroundColor: "#fff" }}
      >
        <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel:"Home",
              tabBarIcon:({color, size}) => (
                  <MaterialCommunityIcons name="home" color={color} size={26} />
              )
            }}
        />

        <Tab.Screen
            name="Classification"
            component={Classification}
            options={{
              tabBarLabel:"Classification",
              tabBarIcon:({color, size}) => (
                  <MaterialCommunityIcons name="air-filter" color={color} size={26} />
              )
            }}
        />

          <Tab.Screen
              name="Profile"
              component={Profile}
              options={{
                  tabBarLabel:"Profile",
                  tabBarIcon:({color, size}) => (
                      <MaterialCommunityIcons name="account" color={color} size={26} />
                  )
              }}
          />
      </Tab.Navigator>
  );
};


const Stack = createStackNavigator();


const HomeStackNavigator = () => {
  return(
      <Stack.Navigator  screenOptions={{
          headerStyle: {
              backgroundColor: Colors.primary,
              // shadowColor: colors.background, // iOS
              elevation: 5, // Android
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
              alignSelf: 'center',
          },
      }}>
        <Stack.Screen name="Home" component={BottomTabNavigator}/>
        <Stack.Screen name="Classification" component={Classification} options={({route}) => ({
            title: route.params.title,
        })}/>
          <Stack.Screen name="Support" component={Support} options={({route}) => ({
              title: route.params.title,
          })}/>
          <Stack.Screen name="ChangePassword" component={ChangePassword} options={({route}) => ({
              title: route.params.title,
          })}/>
          <Stack.Screen name="EditUser" component={EditUser} options={({route}) => ({
              title: route.params.title,
          })}/>
          <Stack.Screen name="LiveLocation" component={LiveLocation} options={({route}) => ({
              title: route.params.title,
          })}/>

      </Stack.Navigator>
  )
}

export default HomeStackNavigator;
