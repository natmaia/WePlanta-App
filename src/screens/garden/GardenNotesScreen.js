import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function GardenNotesScreen({ route }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGardenNotes = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/gardens/notes/${route.params.id}`);
        setNotes(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGardenNotes();
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
      <Text style={styles.heading}>Garden Notes</Text>
      {notes.map((note) => (
        <View key={note.id} style={styles.noteContainer}>
          <Text style={styles.noteTitle}>{note.title}</Text>
          <Text>{note.content}</Text>
        </View>
      ))}
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
  noteContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
