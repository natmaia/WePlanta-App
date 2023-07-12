import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function GardenNoteEditScreen({ route, navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleEditNote = async () => {
    try {
      await axios.put(`http://localhost:8080/gardens/notes/${route.params.id}`, {
        title,
        content,
      });
      console.log('Note updated');
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Editar as anotações </Text>
      <Text>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Text>Contato </Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button title="Save" onPress={handleEditNote} />
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
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
});
