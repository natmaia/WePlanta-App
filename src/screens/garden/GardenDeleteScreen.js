import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function GardenDeleteScreen({ route, navigation }) {
  const deleteGarden = async () => {
    try {
      await axios.delete(`http://localhost:8080/gardens/${route.params.id}`);
      console.log('Garden deleted');
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Deletar Garden</Text>
      <Text>Quer mesmo excluir o jardim? </Text>
      <Button title="Delete" onPress={deleteGarden} />
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
