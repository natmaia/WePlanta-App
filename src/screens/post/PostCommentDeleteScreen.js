import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function PostCommentDeleteScreen({ route, navigation }) {
  const deleteComment = async () => {
    try {
      await axios.delete(`http://localhost:8080/posts/${route.params.id}/comments/${route.params.commentId}/del`);
      console.log('Comment deleted');
      // Go back to the previous screen
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Deletar Comentario</Text>
      <Text>Tem certeza que deseja deletar o comentario? </Text>
      <Button title="Delete" onPress={deleteComment} />
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
