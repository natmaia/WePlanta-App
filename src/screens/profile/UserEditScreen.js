import axios from 'axios';
import React, { useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet } from 'react-native';

export default function UserEditScreen({ route }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
  
    const updateUser = async () => {
      try {
        const updatedUser = {
          name,
          email,
          age: parseInt(age),
        };
  
        await axios.put(`http://localhost:8080/users/${route.params.id}`, updatedUser);
        console.log('User updated successfully');
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Edit User</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="Age"
          keyboardType="numeric"
        />
  
        <Button title="Update" onPress={updateUser} />
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
    input: {
      width: '100%',
      height: 40,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: 'gray',
      paddingHorizontal: 10,
    },
  });