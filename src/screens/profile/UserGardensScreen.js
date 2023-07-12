import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function UserGardensScreen({ route }) {
    const [gardens, setGardens] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUserGardens = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/users/${route.params.id}/gardens`);
          setGardens(response.data);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchUserGardens();
    }, []);
  
    if (loading) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>User Gardens</Text>
        {gardens.map((garden) => (
          <View key={garden.id} style={styles.gardenContainer}>
            <Text style={styles.gardenName}>{garden.name}</Text>
            <Text>{garden.location}</Text>
          </View>
        ))}
      </View>
    );
  };
  
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
    gardenContainer: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    gardenName: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
  });