import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function FormSection({ generateResponse }) {
  const [newQuestion, setNewQuestion] = useState('');

  const handleSubmit = () => {
    if (newQuestion.trim() !== '') {
      generateResponse(newQuestion, setNewQuestion); 
    }
  };

  return (
    <View style={styles.formSection}>
      <TextInput
        style={styles.textArea}
        multiline={true}
        placeholder="Ask me anything..."
        value={newQuestion}
        onChangeText={(text) => setNewQuestion(text)}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formSection: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  textArea: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonContainer: {
    marginLeft: 10,
    backgroundColor: '#63C71F',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});