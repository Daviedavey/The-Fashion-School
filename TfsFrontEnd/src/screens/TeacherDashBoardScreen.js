// screens/TeacherDashboard.js
import React, { useEffect } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { getUserRole } from '../api/auth';

const TeacherDashBoardScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkTeacher = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (getUserRole(token) !== 'TEACHER') {
        navigation.navigate('DashBoard'); // Redirect students
      }
    };
    checkTeacher();
  }, []);

  return <View>{/* Teacher UI */}</View>;
};

export default TeacherDashBoardScreen;
