import React, { useState } from "react";
import {View, StyleSheet, Text, TextInput, Button, ImageBackground} from "react-native";
import Note from'./components/Note'



const App = (props) => {
  const [amount, setAmount] = useState("0");
  const [num, setNum] = useState(0);
  const [result,setResult] = useState(props.result)
  const image = { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxfrKsMWhx68D3bg5cVJTdgjUD63dAC73_bA&usqp=CAU" };

  return (
  <View style={styles.container}>
    <ImageBackground source={image} resizeMode="fill" style={styles.image}>
      <View style={{alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:36}}>Bill Splitting </Text>
          <Text style={{fontSize:36}}>Calculator</Text>
      </View>
      <View style={{alignItems:'center',justifyContent:'center'}}>
          <Text style={styles.header}>
               Enter the Amount
          </Text>
      </View>
      <TextInput
          style={styles.input}
          placeholder="Amount"
          onChangeText={text => {setResult(parseFloat(text))}}
      />
      <TextInput
          style={styles.input}
          placeholder="Number of People"
          onChangeText={text => {setAmount(text)}}
      />
      <Button
          color='red'
          title='Calculate Result'
          onPress = {() =>setNum(result/parseFloat(amount))}
      />
      <View style={{alignItems:'center',justifyContent:'center'}}>
          <Text> {num} dollar(s) per person</Text>
      </View>
      <Note/>
    </ImageBackground>
  </View>
   );
  }
  const styles = StyleSheet.create ({
    container: {
      border: "thick solid black",
      flexDirection:'column',
      margin:"20px",
      padding:"35px",
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      flex: 1,
      justifyContent: "center"
    },
    header: {
      margin:20,
      fontSize:24,
      color:'red',
      fontWeight: 'bold',
    },
    input:{
      margin:20,
      fontSize:16,
      fontWeight: 'bold',
      borderWidth: 0.5,
      padding: 5,
      color:'red'
    },
  });

export default App;
