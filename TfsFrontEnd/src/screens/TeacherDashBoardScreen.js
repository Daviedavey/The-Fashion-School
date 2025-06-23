// screens/TeacherDashboard.js
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { isTeacher } from '../api/auth';
import { View, StyleSheet, Image, TouchableOpacity, Text, ScrollView, ImageBackground } from 'react-native';

const TeacherDashBoardScreen = ({navigation}) => {

  return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.container}>
  
  
        <View style={styles.content}>
          <Text>This is the Teacher content</Text>
        </View>
  
        <View style={styles.buttonContainer}>
  
          <TouchableOpacity style={styles.IconButton} onPress={() => navigation.navigate('UploadAssignments')}>
            <Image source={require('../assets/images/assignments.png')}
              style={styles.iconImage} /> 
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.IconButton} onPress={() => navigation.navigate('UploadBlog')}>
            <Image  source={require('../assets/images/blog.png')}
              style={styles.iconImage} />
          </TouchableOpacity>
  
           <TouchableOpacity style={styles.IconButton} onPress={() => navigation.navigate('ViewPortfolio')}>
            <Image source={require('../assets/images/portfolio.png')}
              style={styles.iconImage} />
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.IconButton}  onPress={() => navigation.navigate('Agenda')}>
            <Image source={require('../assets/images/agenda.png')}
              style={styles.iconImage} />
          </TouchableOpacity>
         
        </View>
          
        </View>
      </ScrollView>
    );
  };

    const styles = StyleSheet.create({
      container: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
      },
      grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      buttonContainer: {
        flexDirection: 'row',             // Align buttons horizontally
        justifyContent: 'space-between',   // Evenly space buttons
        padding: 0,
        borderTopWidth: 0.1,                // Optional: Add a top border
        //borderTopColor: '#ddd',
      },
});

export default TeacherDashBoardScreen;
