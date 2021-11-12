import React, { useState,useEffect } from "react";
import {View, StyleSheet, Text, TextInput, Button, ImageBackground} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from './Note'


const CA = (props) => {
  const [amount, setAmount] = useState("0");
  const [num, setNum] = useState(0);
  const [temp, setTemp] = useState(0);
  const [result,setResult] = useState(props.result)
  const [showPeople,setShowPeople] =useState(true)
  const [showAmount,setShowAmount] =useState(false)
  const [showResult,setShowResult] =useState(false)
  const [debugging,setDebugging] = useState(false)
  const image = { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxfrKsMWhx68D3bg5cVJTdgjUD63dAC73_bA&usqp=CAU" };

  useEffect(() => {getData()}
             ,[])

  useEffect(() => {
    storeData({num})
  },[num])

let debugView = ""
  if (debugging) {
    debugView =
      <View>
          <Text> num: {num} </Text>
          <Text> amount: {amount} </Text>
          <Text> temp: {temp} </Text>
          <Text> result: {result} </Text>
          <Button title="clear memory"
              onPress={()=> clearAll()}/>
      </View>
  }
  let showView = ""
    if (showPeople) {
      showView =
        <View>
        <View style={{alignItems:'center',justifyContent:'center'}}>
            <Text style={styles.header}>
                 Enter the Number of People:
            </Text>
        </View>
        <TextInput
            style={styles.input}
            placeholder="Number of People"
            onChangeText={text => {setNum(text)}}
        />
        <View style={{alignItems:'center',justifyContent:'center'}}>
        <Button
            color='red'
            title='Next Step'
            onPress = {() =>{setShowPeople(false)
                            setShowAmount(true)
                      }}
        />
        </View>
        </View>

    }
  let showView1 = ""
    if (showAmount) {
      showView =
        <View>
        <View style={{alignItems:'center',justifyContent:'center'}}>
            <Text style={styles.header}>
                 Enter the Amount of Bill:
            </Text>
        </View>
        <TextInput
            style={styles.input}
            placeholder="Amount of Bill ($)"
            onChangeText={text => {setTemp(text)}}
        />
        <View style={{alignItems:'center',justifyContent:'center'}}>
        <Button
            color='green'
            title='Add Another Bill'
            onPress = {() =>setAmount(parseFloat(temp)+parseFloat(amount))}
        />
        </View>
        <View style={{alignItems:'center',justifyContent:'center'}}>
        <Button
            color='red'
            title='Next Step'
            onPress = {() =>{setAmount(parseFloat(temp)+parseFloat(amount))
                            setTemp(0)
                            setShowAmount(false)
                            setShowResult(true)
                      }}
        />
        </View>
        </View>

    }

    let showView2 = ""
      if (showResult) {
        showView =
        <View>
          <Text style={{color:"red"}}>The number of people is:{num}</Text>
          <Text style={{color:"red"}}>The total amount of bill is:{amount}</Text>
          <View style={{alignItems:'center',justifyContent:'center'}}>
            <Button
              color='red'
              title='Calculate Result'
              onPress = {() =>setResult(amount/parseFloat(num))}
            />
          </View>
          <View style={{alignItems:'center',justifyContent:'center'}}>
              <Text style={{color:"red"}}>{result} dollar(s) per person</Text>
          </View>
        </View>

      }

const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@ca', jsonValue)
          } catch (e) {
            console.dir(e)
          }
}
const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@ca')
            let data = null
            if (jsonValue!=null) {
              data = JSON.parse(jsonValue)
              setNum(data.num)
            } else {
              setNum(0)
            }
          } catch(e) {
            console.dir(e)
          }
}
const clearAll = async () => {
          try {
              await AsyncStorage.clear()
          } catch(e) {
              console.dir(e)
          }
}

return (
  <View style={styles.container}>
    <ImageBackground source={image} resizeMode="fill" style={styles.image}>
      <View style={{alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:36}}>Bill Splitting </Text>
          <Text style={{fontSize:36}}>Calculator</Text>
      </View>
      {showView}
      {showView1}
      {showView2}
      <View style={{alignItems:'center',justifyContent:'center',margin:'10px'}}>
      <Button
        title={(debugging?'hide':'show')+" debug info" }
        color="green"
        onPress = {() => setDebugging(!debugging)}
        />
      </View>
        {debugView}
      <Note/>
    </ImageBackground>
  </View>
   );
  }
  const styles = StyleSheet.create ({
    container: {
      borderColor: "black",
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
      fontSize:20,
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

export default CA;
