import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StyleSheet, Text, View, Button } from 'react-native';
import Calculator from './calculator'
import History from './history'
import Feedback from './feedback'

const Stack = createNativeStackNavigator();

const MyStack = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Welcome to MyBill"
          component={HomeScreen}
          //options={{ title: 'Welcome' }}
        />

        <Stack.Screen name="Calculator" component={Calculator} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Feedback" component={Feedback} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};


const HomeScreen = ({ navigation }) => {
  return (
       <View style={{ flexDirection: 'column',
                     margin:"5%",
                     padding:'5%',
                     justifyContent: 'space-around',
                     backgroundColor:'lightgreen' }}>
        <Button
         title="Bill Splitter!!"
         onPress={() =>
           navigation.navigate('Calculator')
         }
       />

       <Button
        title="Record bill amount!!"
        onPress={() =>
          navigation.navigate('History')
        }
      />
      <Button
       title="Enter your feedback!!"
       onPress={() =>
         navigation.navigate('Feedback')
       }
     />

    </View>
  );
};

// ProfileScreen function is called with a JSON object
//  {navigation:..., route:...,  otherstuff}
const ProfileScreen = ({ navigation, route }) => {
  return <Text>{route.params.greeting}, this is {route.params.name}'s profile</Text>;
       // we're using the parameter name passed in from the HomeScreen
};

export default MyStack;
