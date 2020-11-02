import React, { Component } from 'react';
import {Alert} from "react-native";
import {config} from "./Config";


export async function sendPostRequest(outlet, body) {
    const server_url = config.serverUrl;
    console.log("Server Url going to: " + server_url + outlet);
    return await fetch(server_url + outlet, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: body
    })
        .then((response) => response.json())

        .catch((error) => {
            console.error(error)
            Alert.alert("", "Server Connection Failed.\n" + error);
        })

}


