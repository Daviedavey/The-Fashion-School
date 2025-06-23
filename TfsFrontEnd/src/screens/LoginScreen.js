import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {StyleSheet, View, KeyboardAvoidingView, Platform} from 'react-native';
import {Button, TextInput, Text, HelperText} from 'react-native-paper';
import axios from 'axios';
import { login } from '../api/auth';
import { jwtDecode } from 'jwt-decode';


let test;
const LoginScreen = ({navigation, onLoginSuccess}) => {
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

    const handleLogin = async () => {
        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError('');
        console.log(navigation.getState());


        try {

            const response = await login(username, password); // API call
            console.log('Login response:', response); // Add this to inspect full object

            if (!response || !response.data || !response.data.token) {
            throw new Error('Invalid response from server');
             }
             const token = response.data.token;
             const isTeacherFlag = response.data.role === 'TEACHER'; // or however you determine the role
 
             axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
             await onLoginSuccess(token, isTeacherFlag); // ✅ Notify App.js
             console.log('Login successful', response.data);
             await AsyncStorage.setItem('userToken', response.data.token);
             await AsyncStorage.setItem('userRole', response.data.role); // Also store role separately
             const decoded = jwtDecode(token);
             console.log('Token expires at:', new Date(decoded.exp * 1000));
             console.log('Current time:', new Date());
             // Debug storage contents
             console.log(await AsyncStorage.getAllKeys());
        } catch (err) {
            console.log('Login error', err);
            if (err.response) {
            console.log('Server responded:', err.response.data);
            setError(err.response.data.message || 'Login failed. Please try again.');
  } else if (err.request) {
             console.log('No response received:', err.request);
             setError('No response from server. Check your network or server status.');
  } else {
             console.log('Other error:', err.message);
             setError('An unexpected error occurred.');
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
                <Text style={styles.title}>The Fashion School</Text>

                <TextInput
                    label="Username"
                    value={username}
                    onChangeText={setUsername}
                    mode="outlined"
                    style={styles.input}
                    autoCapitalize="none"
                />

                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={setPassword}
                    mode="outlined"
                    secureTextEntry
                    style={styles.input}
                />

                {error ? (
                    <HelperText type="error" visible={!!error}>
                        {error}
                    </HelperText>
                ) : null}

                <Button
                    mode="contained"
                    onPress={handleLogin}
                    loading={loading}
                    disabled={loading}
                    style={styles.button}
                >
                    Login
                </Button>

                <Button
                    mode="text"
                    onPress={() => navigation.navigate('Register')}
                    style={styles.secondaryButton}
                >
                    Don't have an account? Register
                </Button>
                
                <Button
                    mode="text"
                    onPress={() => navigation.navigate('ForgotPassword')}
                    style={styles.secondaryButton}
                >
                    Forgot your Password? Reset Password
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
        marginBottom: 15,
    },
    button: {
        marginTop: 10,
        paddingVertical: 5,
    },
    secondaryButton: {
        marginTop: 15,
    },
});

export default LoginScreen;