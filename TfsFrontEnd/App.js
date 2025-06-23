import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TeacherStack from './src/navigation/TeacherStack';
import StudentStack from './src/navigation/StudentStack';
import SplashScreen from './src/screens/SplashScreen';
import AuthStack from './src/navigation/AuthStack'; 
import { isTeacher } from './src/api/auth';
import { verifyToken } from './src/api/auth';

const RootStack = createStackNavigator(); 

export default function App() {
  const [isTeacherUser, setIsTeacherUser] = useState(null); // Start as null (unknown)
  const [isLoading, setIsLoading] = useState(true); // Track initial check

  // Check authatication state on app load
  useEffect(() => {
  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        // Verify token is still valid
        const isValid = await verifyToken(token); // Add this function
        if (isValid) {
          const teacherFlag = isTeacher(token);
          setIsTeacherUser(teacherFlag);
        } else {
          await AsyncStorage.removeItem('userToken');
          setIsTeacherUser(null);
        }
      } else {
        setIsTeacherUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsTeacherUser(null);
    } finally {
      setIsLoading(false);
    }
  };
  checkAuth();
}, []);

   const handleLoginSuccess = async (token, isTeacherFlag) => {
    await AsyncStorage.setItem('userToken', token);
    //axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setIsTeacherUser(isTeacherFlag);
  };

  if (isLoading) {
    return <SplashScreen />; // Show while checking token
  }

  return (
<NavigationContainer>
      <PaperProvider>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
  {isTeacherUser === null ? (
    <RootStack.Screen name="AuthStack">
      {() => <AuthStack onLoginSuccess={handleLoginSuccess} />}
    </RootStack.Screen>
  ) : isTeacherUser ? (
    <RootStack.Screen name="TeacherStack" component={TeacherStack} />
  ) : (
    <RootStack.Screen name="StudentStack" component={StudentStack} />
  )}
</RootStack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}