import React, { useEffect, useState, useRef } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function CameraScreen({ navigation }) {
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [camRef, setCamRef] = useState(null);
  const [foto, setFoto] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    requestCameraPermission();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text> Acesso negado! </Text>;
  }

  async function takePicture() {
    if (camRef) {
      const data = await camRef.takePictureAsync();
      setFoto(data.uri);
      setOpen(true);
      console.log(data);
    }
  }

  const login  = (_) => {

    navigation.navigate("Login");
  }


  return (
    <SafeAreaView style={styles.container}>
      <Camera style={{ flex: 1, width: '100%', height: '90%', borderRadius: 20, }} type={type} ref={(ref) => setCamRef(ref)}>
        <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
        </View>
        <TouchableOpacity
          style={styles.buttonFlip}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <MaterialIcons name="flip-camera-android" size={40} color={'#8F8A8A'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonCamera} onPress={takePicture}>
          <MaterialIcons name="camera" size={50} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonClose} onPress={login}>
          <MaterialIcons name="close" size={40} color={'#8F8A8A'} />
        </TouchableOpacity>

      </Camera>

      {foto && (
        <Modal animationType="slide" transparent={false} visible={open}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }}>
            <Image style={{ width: '100%', height: '90%', borderRadius: 20 }} source={{ uri: foto }} />
            <TouchableOpacity onPress={() => setOpen(false)}>
              <MaterialIcons name="cancel" size={50} color={'#8F8A8A'} />
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //bac: "visible",
  },
  buttonFlip: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    left: 40,
    top: 10,
  },
  buttonCamera: {
    justifyContent: 'center',
    alignItems: 'center',
    top: -50,
    borderRadius: 50,
    height: 50,
    backgroundColor: '#63C71F',
    alignSelf: 'center',

  },
  buttonClose: {
    position: 'absolute',
  top: 50,
  right: 50,
  },
  buttonCancelar: {
    //margin: 10,
    //justifyContent: 'center',
    //alignItems: 'center',
    //top: -80,
    //right: 40,
    borderRadius: 50,
    backgroundColor: '#63C71F',
  },
});

