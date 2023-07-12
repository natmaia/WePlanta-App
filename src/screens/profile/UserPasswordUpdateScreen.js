import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

export default function UserPasswordUpdateScreen({ route }) {
  const [password, setPassword] = useState('');

  const handleUpdatePassword = async () => {
    try {
      const updatedUser = {
        password: password,
      };

      await axios.put(`http://localhost:8080/users/updt/${route.params.id}`, updatedUser);
      console.log('Password updated successfully');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Text>New Password:</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />

      <Button title="Update Password" onPress={handleUpdatePassword} />
    </View>
  );
}
