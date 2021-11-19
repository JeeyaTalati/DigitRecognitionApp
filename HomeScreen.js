import * as React from 'react';
import { View, Text, StyleSheet, Platform, Button, Alert } from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            image: null
        }
    }
    componentDidMount() {
        this.getPermissions();
    }
    getPermissions = async () => {
        if (Platform.OS !== "web") {
            const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
            if (status !== "granted") {
                Alert.alert("The app requires permission to access the gallery.")
            }
        }
    }
    uploadImage = async(image) => {
        const data = new FormData();
        var filename = uri.split("/")[uri.split("/").length - 1]
        var type = `image/${uri.split(".")[uri.split(".").length - 1]}`
        const filetoupload = {
            uri: uri,
            filename: filename,
            type: type
        }
        data.append("digit", fileToUpload);
        fetch("http://ac77-124-123-174-126.ngrok.io/predict-digit", {
            method: "POST",
            body: data,
            headers: {
                "content-type": "multipart/form-data",
            },
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("Success:", result);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }
    pickImage = async () => {
        try {
            var result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.mediaTypes.ALL,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            });
            if (!result.cancelled) {
                this.setState({ image: result.data })
                this.uploadImage(result.uri)
            }
        } catch (error) {
            console.log(error);
        }
    }
    render() {
        return (
            <View>
                <Button title={"Click here to upload picture"} onPress={this.pickImage}></Button>
            </View>
        )
    }
}