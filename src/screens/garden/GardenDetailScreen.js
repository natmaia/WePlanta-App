import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function GardenDetailScreen({ route }) {
  const [garden, setGarden] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGardenDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/gardens/${route.params.id}`);
        setGarden(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGardenDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Garden Detalhes</Text>
      <Text>Name: {garden.name}</Text>
      <Text>Location: {garden.location}</Text>
      {/* Render other garden details */}
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
