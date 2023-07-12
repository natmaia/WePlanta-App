import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function GardenEditScreen({ route, navigation }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const handleEditGarden = async () => {
    try {
      await axios.put(`http://localhost:8080/gardens/${route.params.id}`, {
        name,
        location,
      });
      console.log('Garden updated');
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Editar Garden</Text>
      <Text>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <Text>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />
      <Button title="Save" onPress={handleEditGarden} />
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
