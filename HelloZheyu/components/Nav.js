import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StyleSheet, Text, View, Button,Image } from 'react-native';
import Calculator from './calculator'
import History from './history'
import Feedback from './feedback'

const Stack = createNativeStackNavigator();

const MyStack = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="MyBill"
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
      <View style={styles.container}>
       <Text style={styles.headerText}>Welcome to MyBill!</Text>
       <View style={{ flexDirection: 'column',
                     margin:"5%",
                     padding:'5%',
                     justifyContent: 'space-around',
                     backgroundColor:'lightgreen' }}>
      <View style={{flexDirection:'row',justifyContent: 'center'}}>
        <View>
              <Image
                  style={styles.horizontal}
                  source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-e1NAOMyXT4kqLxrctlCyWS08V1AO-2ozqg&usqp=CAU'}}
              />
        </View>
        <Button
         title="Bill Calculator"
         onPress={() =>
           navigation.navigate('Calculator')
         }
       />
       </View>

       <View style={{flexDirection:'row', justifyContent: 'center',padding:"5%"}}>
         <View>
               <Image
                   style={styles.horizontal}
                   source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4F5C1k6-Ase8T92wikAjdLA-3Yb69j872Nw&usqp=CAU'}}
               />
         </View>
       <Button
        title="Record Bill Amount"
        onPress={() =>
          navigation.navigate('History')
        }
      />
      </View>

      <View style={{flexDirection:'row',justifyContent: 'center'}}>
        <View>
              <Image
                  style={styles.horizontal}
                  source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzTyTfyl09ZnXvmWEoA1RGz0u7OuYE0iJZZw&usqp=CAU'}}
              />
        </View>
      <Button
       title="Enter Your Feedback"
       onPress={() =>
         navigation.navigate('Feedback')
       }
     />
     </View>

    </View>
    </View>
  );
};

// ProfileScreen function is called with a JSON object
//  {navigation:..., route:...,  otherstuff}
const ProfileScreen = ({ navigation, route }) => {
  return <Text>{route.params.greeting}, this is {route.params.name}'s profile</Text>;
       // we're using the parameter name passed in from the HomeScreen
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: 'lightgreen',
    justifyContent: 'center',
    textAlign:'left',
    marginTop:20,
    padding:20,
  },
  headerText: {
    textAlign:'center',
    backgroundColor:'lightgreen',
    fontSize: 36,
    padding:10,
  },
  horizontal: {
    flex:1,
    flexDirection:'row',
    width:40,
    height:50,

  },
});

export default MyStack;
