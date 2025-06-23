import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { API_BASE_URL } from '../api/config';

const UpdateBlogScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/blog`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Image 
        source={{ uri: `${API_BASE_URL}/uploads/${item.imagePath}` }} 
        style={styles.postImage}
      />
      <Text style={styles.postText}>{item.text}</Text>
      <Text style={styles.postAuthor}>Posted by: {item.username}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  list: {
    paddingBottom: 20,
  },
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  postText: {
    fontSize: 16,
    marginBottom: 5,
  },
  postAuthor: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  }
});

export default UpdateBlogScreen;