import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, Button,StatusBar,SafeAreaView,ScrollView} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob'
import Colors from "../constants/Colors";
const options = {
  title: 'Select a photo',
  takePhotoButtonTitle: 'Take photo',
  chooseFromLibraryButtonTitle: 'Choose from gallery',
  quality: 1
};
const Classification = () => {
  const [imageSource, setImageSource] = useState(null);
  const [data, setData] = useState(null);
  const [responseData, setResponseData] = useState([])





  const selectPhoto = ()=>{
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        setImageSource(source);
        setData(response.data)
      }
    });
  }

  const uploadPhoto =()=>{
    RNFetchBlob.fetch('POST', 'http://192.168.43.21/sasula_localgovt/localgovApi/sasula/test', {
      'Content-Type' : 'multipart/form-data',
    }, [

      // custom content type
      { name : 'image', filename : 'image.png', type:'image/png', data: data},

    ]).then((response) => response.json())
        .then((json) => {
          setResponseData(json.returnmessage)

        })
        .catch((error) => console.error(error))
  }

  return (
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor={Colors.primary} barStyle="light-content"/>

          <View style={styles.header}>
            <Text style={styles.text_header}>Image Classification</Text>

          </View>
          <View style={styles.footer}>


<View style={styles.img_container}>
            <Image style={styles.image}
                   source={imageSource !==null ? imageSource : require('../assets/image-not-available-5.png')}/>
            <TouchableOpacity style={styles.button} onPress={()=>{selectPhoto()}}>
              <Text style={styles.text}>Select</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>{uploadPhoto()}}>
              <Text style={styles.text}>Upload</Text>
            </TouchableOpacity>

            <View>
              <Text>{responseData}</Text>
            </View>

</View>
          </View>
        </SafeAreaView>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,

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


  button: {
    width: 250,
    height: 50,
    backgroundColor: Colors.primary,
    borderRadius: 30,
    justifyContent: 'center',
    marginTop: 15
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center'
  },
  image: {
    width: 370,
    height: 370,
    marginTop: 30
  },
  img_container: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});


export default Classification;
