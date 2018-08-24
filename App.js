/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {
  Component
} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Dimensions,
  Image
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Header  from "./src/components/Header";
import axios from 'axios';

type Props = {};
export default class App extends Component < Props > {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      status: 'offline',
    };
  }

  componentDidMount(){
    axios.get('https://victoriaribeiro.pythonanywhere.com/status/')
    .then((response)=>{
      this.setState({
        status:response.data,
      });
      console.log(this.state.status);
    })
    .catch((error)=>{
      console.log(error);
    });
  }

 
  OpenCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
      compressImageQuality: 0.5
    }).then(image => {
      console.log('received image', image);
      console.log('received imagePath', image.path);
      this.setState({
        image: {
          uri: image.path,
          width: image.width,
          height: image.height,
          mime: image.mime,
          size: image.size,
          filename: image.filename, 
          path: image.uri,
        }
      });
      console.log(image);
    }).catch(e => {
      console.log(e);
    });
  }

  renderImage(imagem) {
    if (imagem === null) {
      return;
    }
    
    let formdata = new FormData();
    formdata.append('image', { uri: imagem.uri, type: 'image/jpeg', name: 'filename' })

    axios.post('https://victoriaribeiro.pythonanywhere.com/upload/'
    , formdata).then(response=>{
      console.log('funcionou'+response);
    });

    return (  
      <View>
        <Text style={styles.teste}>IMAGEM: {imagem.size}</Text>
          <Image
            source={{ uri: imagem.uri }}
            style={styles.preview}
          />
      </View>
    );
  }

  render() {
    console.log("RENDERIZOU");
    return (  
      <View style={styles.container}>
      <Header/>
        <View style={styles.container}>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => this.OpenCamera()}
                  title="Tirar foto"
                />


                {this.renderImage(this.state.image)}
              </View>
        </View>

      </View>

    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  teste: {
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: 'blue',
    marginTop: 200,
    height: 100,
  },
  buttonContainer: {
    margin: 20
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
});