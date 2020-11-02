import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from "react-native";


export const config = {

    serverUrl:string = "http://192.168.43.21/basic/index.php/site/",

};

export async function userDistrict() {
    let dist
    dist = null
    try {
        const ifo = await AsyncStorage.getItem('userData');
        if (ifo) {
            dist = JSON.parse(ifo).district_id
            Alert.alert("District is "+dist)
            return dist
        }

    } catch (error) {
        // Error retrieving data
        console.log(error.message);
    }
}

