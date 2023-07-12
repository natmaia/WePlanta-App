import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

export default function UserDetailScreen({ route }) {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${route.params.id}`);
        setUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setAge(response.data.age.toString());
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch user data');
        console.error(error);
      }
    };

    fetchUser();
  }, [route.params.id]);

  const handleUpdateUser = async () => {
    try {
      const updatedUser = {
        name: name,
        email: email,
        age: parseInt(age),
      };

      await axios.put(`http://localhost:8080/users/updt/${route.params.id}`, updatedUser);
      Alert.alert('Success', 'User updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update user');
      console.error(error);
    }
  };

  if (!user) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Name:</Text>
      <TextInput
        value={name}
        onChangeText={text => setName(text)}
        placeholder="Enter name"
      />

      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={text => setEmail(text)}
        placeholder="Enter email"
      />

      <Text>Age:</Text>
      <TextInput
        value={age}
        onChangeText={text => setAge(text)}
        placeholder="Enter age"
        keyboardType="numeric"
      />

      <Button title="Update User" onPress={handleUpdateUser} />
    </View>
  );
}
