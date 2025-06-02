import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { View, StyleSheet, Image, TouchableOpacity, Text, ScrollView, ImageBackground } from 'react-native';
import IconButton from '../components/IconButton';


const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>


      <View style={styles.content}>
        <Text>Main Content goes here</Text>
      </View>

      <View style={styles.buttonContainer}>

        <TouchableOpacity style={styles.IconButton}>
          <Image source={require('../assets/images/assignments.png')}
            style={styles.iconImage} /> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.IconButton}>
          <Image  source={require('../assets/images/blog.png')}
            style={styles.iconImage} />
        </TouchableOpacity>

         <TouchableOpacity style={styles.IconButton}>
          <Image source={require('../assets/images/portfolio.png')}
            style={styles.iconImage} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.IconButton}>
          <Image source={require('../assets/images/favourites.png')}
            style={styles.iconImage} /> 
        </TouchableOpacity>

        <TouchableOpacity style={styles.IconButton}>
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

export default HomeScreen;