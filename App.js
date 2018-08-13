/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Button, Dimensions, Image} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };
  }

  OpenCamera(){
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false
      }).then(image => {
        console.log('received image', image);
        console.log('received imagePath', image.path);
        this.setState({
          image: {uri: image.path, width: image.width, height: image.height, mime: image.mime}
        });
      }).catch(e => {
        console.log(e);
      });
  }

  renderImage(imagem) {
    console.log('received imagem', imagem);
    if(imagem === null){
      return(
        <View>
          <Text style={styles.teste}>SEM IMAGEM</Text>
        </View>
      );
    }
    return (
      <View>
      <Text style={styles.teste}>IMAGEM:</Text>
        <Image
          source={{ uri: imagem.uri }}
          style={styles.preview}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.OpenCamera()}
            title="Tirar foto"
          />
          {this.renderImage(this.state.image)}
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
  teste:{
    fontWeight:  'bold'
  },
  button: {
    backgroundColor: 'blue',
    marginBottom: 10
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
