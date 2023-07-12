import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function GardenNoteDeleteScreen({ route, navigation }) {
  const deleteNote = async () => {
    try {
      await axios.delete(`http://localhost:8080/gardens/notes/${route.params.id}`);
      console.log('Note deleted');
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Deletar anotação </Text>
      <Text>Deseja excluir as anotações? </Text>
      <Button title="Delete" onPress={deleteNote} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
