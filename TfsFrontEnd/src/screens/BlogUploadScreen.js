import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Button, TextInput, Text } from 'react-native-paper';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { API_BASE_URL } from '../api/config';

const BlogUploadScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && !response.error) {
        setImage(response.assets[0]);
      }
    });
  };

  const uploadPost = async () => {
  const token = await AsyncStorage.getItem('userToken');
  
  // token validation
  if (!token) {
    Alert.alert('Error', 'Not authenticated');
    navigation.navigate('Login');
    return;
  }

  const formData = new FormData();
  formData.append('text', text);
  formData.append('image', {
    uri: image.uri,
    type: image.type || 'image/jpeg',
    name: image.fileName || `post_${Date.now()}.jpg`,
  });

  try {
    const response = await axios.post(`${API_BASE_URL}/api/blog`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
      transformRequest: (data, headers) => {
        return data;
      }
    });
    Alert.alert('Success', 'Post created!');
    navigation.navigate('CreatedBlogs');
  } catch (error) {
    console.log('Full error:', error.response?.data || error.message);
    Alert.alert('Error', error.response?.data?.message || 'Upload failed');
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Blog Post</Text>
      
      <Button 
        mode="contained" 
        onPress={selectImage}
        style={styles.button}
      >
        {image ? 'Change Image' : 'Select Image'}
      </Button>
      
      {image && (
        <Text style={styles.imageText}>
          Selected: {image.fileName || 'image'}
        </Text>
      )}
      
      <TextInput
        label="Post Text"
        value={text}
        onChangeText={setText}
        multiline
        numberOfLines={4}
        style={styles.input}
      />
      
      <Button 
        mode="contained" 
        onPress={uploadPost}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        {loading ? <ActivityIndicator color="#fff" /> : 'Upload Post'}
      </Button>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginVertical: 10,
  },
  imageText: {
    marginBottom: 15,
    textAlign: 'center',
  }
});

export default BlogUploadScreen;