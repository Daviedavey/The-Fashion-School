import React, {useState} from 'react';
import {StyleSheet, View, KeyboardAvoidingView, Platform} from 'react-native';
import {Button, TextInput, Text, HelperText} from 'react-native-paper';
import axios from 'axios';
import {API_BASE_URL} from '../api/config';
import { login } from '../api/auth';

let test;
const LoginScreen = ({navigation}) => {
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

        try {

            const response = await login(username, password);
            // Handle successful login
            console.log('Login successful', response.data);
             navigation.navigate('Home')
            // Store the token securely
           await AsyncStorage.setItem('userToken', response.data.token);
           // Use in subsequent requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
         

        } catch (err) {
            console.log('Login error', err.response?.data);
            console.log(test)
            setError(err.response?.data?.message || 'Login failed. Please try again.');
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