import React, { useState,useEffect } from "react";
import {View, StyleSheet, Text, TextInput, Button} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Note from './Note'

const Calculator= (props) => {
  const [amount, setAmount] = useState("0");
  const [num, setNum] = useState(0);
  const [temp, setTemp] = useState(0);
  const [result,setResult] = useState(props.result)
  const [showPeople,setShowPeople] =useState(true)
  const [showAmount,setShowAmount] =useState(false)
  const [showResult,setShowResult] =useState(false)
  const [debugging,setDebugging] = useState(false)

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
            await AsyncStorage.setItem('@calculator', jsonValue)
          } catch (e) {
            console.dir(e)
          }
}
const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@calculator')
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


return (
  <View style={styles.container}>
      <View style={{alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontSize:36}}>Bill Splitting </Text>
          <Text style={{fontSize:36}}>Calculator</Text>
      </View>
      <Text>
        {showView}
        {showView1}
        {showView2}
      </Text>
      <View style={{alignItems:'center',justifyContent:'center',margin:'5%'}}>
        <Button
          title={(debugging?'hide':'show')+" debug info" }
          color="green"
          onPress = {() => setDebugging(!debugging)}
        />
      </View>
      <Text>
        {debugView}
      </Text>
     <Note>
     </Note>
  </View>
   );
  }
  const styles = StyleSheet.create ({
    container: {
      backgroundColor:'lightgreen',
      borderColor: "black",
      flexDirection:'column',
      alignItems: 'center',
      justifyContent: 'center',
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

export default Calculator;
