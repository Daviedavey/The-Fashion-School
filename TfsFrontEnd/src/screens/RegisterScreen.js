import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Button, TextInput, Text, HelperText } from 'react-native-paper';
import { register } from '../api/auth';

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) {
    newErrors.password = 'Password is required';
  } else {
    const password = formData.password;
    let errorMessages = [];
    
    if (password.length < 6) {
      errorMessages.push('at least 6 characters');
    }
    if (!/\d/.test(password)) {
      errorMessages.push('at least one digit');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errorMessages.push('at least one special character');
    }
    
    if (errorMessages.length > 0) {
      newErrors.password = `Password must contain: ${errorMessages.join(', ')}`;
    }
  }

  if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match';
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const response = await register(
        formData.username,
        formData.name,
        formData.surname,
        formData.email,
        formData.password
      );
      
      Alert.alert(
        'Registration Successful',
        'You can now log in with your credentials',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      console.error('Registration error:', error);
      
      // Handle backend validation errors
      if (error.response?.data) {
        const apiErrors = error.response.data;
        if (apiErrors.message) {
          Alert.alert('Registration Failed', apiErrors.message);
        }
        // Map backend errors to form fields if available
        if (apiErrors.errors) {
          setErrors(apiErrors.errors);
        }
      } else {
        Alert.alert('Error', 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Create Account</Text>
        
        <TextInput
          label="Username"
          value={formData.username}
          onChangeText={(text) => handleChange('username', text)}
          mode="outlined"
          style={styles.input}
          error={!!errors.username}
          autoCapitalize="none"
        />
        <HelperText type="error" visible={!!errors.username}>
          {errors.username}
        </HelperText>
        
        <TextInput
          label="Name"
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
          mode="outlined"
          style={styles.input}
          error={!!errors.name}
        />
        <HelperText type="error" visible={!!errors.name}>
          {errors.name}
        </HelperText>
        
        <TextInput
          label="Surname"
          value={formData.surname}
          onChangeText={(text) => handleChange('surname', text)}
          mode="outlined"
          style={styles.input}
        />
        
        <TextInput
          label="Email"
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
          mode="outlined"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          error={!!errors.email}
        />
        <HelperText type="error" visible={!!errors.email}>
          {errors.email}
        </HelperText>
        
        <TextInput
          label="Password"
          value={formData.password}
          onChangeText={(text) => handleChange('password', text)}
          mode="outlined"
          secureTextEntry
          style={styles.input}
          error={!!errors.password}
        />
        <HelperText type="error" visible={!!errors.password}>
          {errors.password}
        </HelperText>
        
        <TextInput
          label="Confirm Password"
          value={formData.confirmPassword}
          onChangeText={(text) => handleChange('confirmPassword', text)}
          mode="outlined"
          secureTextEntry
          style={styles.input}
          error={!!errors.confirmPassword}
        />
        <HelperText type="error" visible={!!errors.confirmPassword}>
          {errors.confirmPassword}
        </HelperText>
        
        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={loading}
          disabled={loading}
          style={styles.button}
        >
          Register
        </Button>
        
        <Button
          mode="text"
          onPress={() => navigation.navigate('Login')}
          style={styles.secondaryButton}
        >
          Already have an account? Login
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    marginBottom: 5,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
  },
  secondaryButton: {
    marginTop: 15,
  },
});

export default RegisterScreen;