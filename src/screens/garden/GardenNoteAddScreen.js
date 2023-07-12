import React, { useState } from 'react';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

import { Button, ScrollView, Text, TextInput, StyleSheet, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';


import Botao from "../../components/ButtonDefault";

export default function UserGardenAddScreen({ navigation }) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [plant, setPlant] = useState('');
  const [type, setType] = useState('');
  const [note, setNote] = useState('');

  const types = [
    { key: 'V', value: 'Vertical' },
    { key: 'H', value: 'Horizontal' }
  ];

  const statusList = [
    { key: 'PLANTAR', value: 'PLANTAR' },
    { key: 'REGAR', value: 'REGAR' },
    { key: 'CRESCIMENTO', value: 'CRESCIMENTO' },
    { key: 'COLHER', value: 'COLHER' }
  ];

  const handleAddGarden = () => {
    const garden = {
      name: name,
      status: status,
      plant: plant,
      type: type,
      //note: note
    };

    const gardenJson = JSON.stringify(garden, null, 2);
    console.log('Garden:', gardenJson);

    setName('');
    setStatus('');
    setPlant('');
    setType('');
    //setNote('');
  };

  const addGarden = async () => {
    try {
      const dataToStore = await SecureStore.getItemAsync('dataToStoreString');

      const loginToken = JSON.parse(dataToStore);

      console.log(loginToken.token);

      const config = {
        headers: {
          Authorization: `${loginToken.token}`
        }
      };


      console.log(config)

      const url = `http://localhost:8080/users/${loginToken.id}/garden/add`;
      console.log(url)

      const garden = {
        name: name,
        status: status,
        plant: plant,
        type: type
      };

      console.log(garden)


      const response = await axios.post(url, garden, config);

      if (response.status === 201) {
        // Tratar o sucesso da solicitação
        mostrarToast('Cadastro realizado com sucesso!');
        navigation.navigate('Menu');
        console.log("Jardim adicionado com sucesso");
      } else {
        // Tratar erro de solicitação
        console.log("Erro ao adicionar o jardim");
      }
    } catch (error) {
      // Tratar erro de requisição
      console.error(error);
    }
  };

  const addNote = async (gardenId) => {
    try {
      const noteData = {
        body: note,
        date: new Date().toISOString()
      };

      const noteJson = JSON.stringify(noteData, null, 2);
      console.log('Note:', noteJson);

      const noteUrl = `http://localhost:8080/gardens/${gardenId}/notes/add`;

      const noteResponse = await axios.post(noteUrl, noteData);

      if (noteResponse.status === 201) {
        console.log('Anotações adicionadas com sucesso');
      } else {
        console.log('Erro ao adicionar as anotações');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.titulo}>Nome do Garden:</Text>
        <TextInput
          style={styles.textoInput}
          value={name}
          onChangeText={setName}
          placeholder="Digite o nome do Garden"
        />

        <Text style={styles.titulo}>Orientação:</Text>
        <SelectList
          boxStyles={styles.textoInput}
          setSelected={setType}
          data={types}
          placeholder={'Selecione o tipo de horta: '}
        />

        <Text style={styles.titulo}>O que foi plantado:</Text>
        <TextInput
          style={styles.textoInput}
          value={plant}
          onChangeText={setPlant}
          placeholder="Digite o nome da planta"
        />

        <Text style={styles.titulo}>Status:</Text>
        <SelectList
          boxStyles={styles.textoInput}
          setSelected={setStatus}
          data={statusList}
          placeholder={'Selecione o tipo de horta: '}
        />

        <View>
          <Text style={styles.titulo} >Anotações:</Text>
          <TextInput
            style={styles.textoAnot}
            value={note}
            onChangeText={setNote}
            placeholder="Digite suas anotações"
            multiline={true}
            numberOfLines={4}
          />
        </View>

      </View>
      <View style={styles.formButton}>
        <Botao texto="Adicionar Garden " funcao={addGarden} />
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
    padding: 10,
    //top: 20,
  },
  form: {
    alignItems: "flex-start",
    //backgroundColor: "#c01313",
  },
  formButton: {
    alignItems: "center",
    //marginBottom: 80,
  },
  titulo: {
    color: "#63C71F",
    marginTop: 10,
    fontSize: 20,
    letterSpacing: 1,
  },
  textoInput: {
    color: "#63C71F",
    marginTop: 10,
    backgroundColor: "#e5e0e0",
    fontSize: 20,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginTop: 15,
    height: 45,
    width: 320,
    borderRadius: 50,
    borderColor: "#e5e0e0",
    fontSize: 18,
  }, textoAnot: {
    color: "#63C71F",
    marginTop: 10,
    fontSize: 20,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginTop: 15,
    width: 320,
    borderRadius: 10,
    borderColor: '#63C71F',
    fontSize: 18,
    alignItems: "flex-start",
    backgroundColor: "#e5e0e0",
  },
});
