import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function PostDeleteScreen({ route, navigation }) {
  const deletePost = async () => {
    try {
      await axios.delete(`http://localhost:8080/posts/${route.params.id}/del`);
      console.log('Post deleted');
      // Go back to the previous screen
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Deletar Publicação</Text>
      <Text>Quer deletar o sua publicação? </Text>
      <Button title="Delete" onPress={deletePost} />
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
