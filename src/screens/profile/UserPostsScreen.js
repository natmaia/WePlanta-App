import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function UserPostsScreen({ route }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUserPosts = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/users/${route.params.id}/posts`);
          setPosts(response.data);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchUserPosts();
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
        <Text style={styles.heading}>User Posts</Text>
        {posts.map((post) => (
          <View key={post.id} style={styles.postContainer}>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text>{post.body}</Text>
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
    postContainer: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    postTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
  });