import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

export default function AnswerSection({ messages }) {
  const copyText = async (text) => {
    await Clipboard.setString(text);
    const copiedText = await Clipboard.getString();
    console.log('Texto copiado:', copiedText);
  };

  return (
    <View style={styles.answerContainer}>
      {messages.map((message, index) => (
        <View style={styles.answerSection} key={index}>
          <Text style={styles.question}>{message.question}</Text>
          <Text style={styles.answer}>{message.answer}</Text>
          <TouchableOpacity style={styles.copyIcon} onPress={() => copyText(message.answer)}>
            <MaterialIcons name="content-copy" size={24} color={'#63C71F'} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  answerContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginTop: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  answerSection: {
    marginBottom: 10,
  },
  question: {
    fontWeight: 'bold',
  },
  answer: {
    marginTop: 5,
  },
  copyIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});