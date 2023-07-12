import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

export default function PostCommentAddScreen({ route }) {
  const [comment, setComment] = useState('');

  const addComment = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/posts/${route.params.id}/comments/add`, {
        content: comment,
      });
      console.log('Comment added:', response.data);
      setComment('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={comment}
        onChangeText={setComment}
        placeholder="Add a comment..."
        multiline
      />
      <Button title="Add Comment" onPress={addComment} />
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
  input: {
    height: 100,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
