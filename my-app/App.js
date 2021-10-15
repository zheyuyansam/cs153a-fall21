import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";


const App = (props) => {
  const [x, setX] = useState(Math.floor(Math.random()*13) + 0);
  const [y, setY] = useState(Math.floor(Math.random()*13) + 0);
  const [number, setNumber]= useState(0);
  const [correct, setCorrect]= useState(0);
  const [result,setResult] = useState(props.result)
  const [status,setStatus] = useState("waiting")
  const [debugging,setDebugging] = useState(false)
  const [show,setShow] =useState(true)

  let debugView = ""
  if (debugging) {
    debugView =
      <View>
          <Text> x: {x} </Text>
          <Text> y: {y} </Text>
          <Text> answer: {result} </Text>
          <Text> correct: {(x*y)} </Text>
          <Text> answered: {number} </Text>
          <Text> result: {status} </Text>
      </View>
  }

  let showResult= ""
  if(show){
    if (result==(x*y)){
    showResult=
    <View>
      <Text style={{fontSize:40,fontWeight: 60, flexDirection:'row'}}>
         {x} * {y} =

      <TextInput
          style={styles.textinput}
          placeholder='???'
          onChangeText={text => {setResult(text)}}
      />
      </Text>
      <View style={{width:'25%',}}>
      <Button
          color='red' title='CHECK ANSWER'
          onPress = {() =>
               setCorrect(correct+1)&
               setNumber(number+1)&
               setShow(false)&
               setStatus("correct")
       }
      />
      </View>
      </View>
    }else{
    showResult=
    <View>
      <Text style={{fontSize:40,fontWeight: 60,flexDirection:'row'}}>
         {x} * {y} =

      <TextInput
          style={styles.textinput}
          placeholder='???'
          onChangeText={text => {setResult(text)}}
      />
      </Text>
    <View style={{width:'25%',}}>
    <Button
          color='red' title='CHECK ANSWER' width='145px'
          onPress = {() =>
               setNumber(number+1)&
               setShow(false)&
               setStatus("incorrect")
       }
    />
    </View>
    </View>
    }
  }else{
    if (result==(x*y)){
    showResult=
     <View>
     <Text style={{fontSize:40,fontWeight: 60,flexDirection:'row'}}>
         {x} * {y} = {result}
     </Text>
     <Text style={{color:'red',fontSize:24}}> Correct!!</Text>
     <View style={{justifyContent:'center',alignItems:"start"}}>
     <Button
          color='green' title='NEXT QUESTION'
          onPress = {() =>
              setX(Math.floor(Math.random()*13) + 0)&
              setY(Math.floor(Math.random()*13) + 0)&
              setShow(true)&
              setStatus("waiting")&
              setResult(null)
       }
      />
     </View>
     </View>

    }else{
      showResult=
      <View>
      <Text style={{fontSize:40,fontWeight: 60,flexDirection:'row'}}>
         {x} * {y} = {result}
      </Text>
      <Text style={{color:'red',fontSize:24}}>
      Sorry, the answer was {(x*y)}, try again!
      </Text>
      <View style={{width:'45%', justifyContent:'center',alignItems:"start"}}>
      <Button
          color='green' title='NEXT QUESTION'
          onPress = {() =>
              setX(Math.floor(Math.random()*13) + 0)&
              setY(Math.floor(Math.random()*13) + 0)&
              setNumber(number+1)&
              setShow(true)&
              setStatus("waiting")&
              setResult(null)

          }
      />
      </View>
      </View>
    }

  }

      return (
  <View style={styles.container}>
    <Text style={styles.header}>
       Math Quiz for numbers betwen 0 and 12
    </Text>
    <Text style={{color:'black',fontSize:24}}>
      Calculate the product of the following two numbers:
    </Text>

    <View>
    {showResult}
    </View>


    <Text>correct={correct}</Text>
    <Text>number={number}</Text>
    <Text>percent correct = {Math.round(100*(correct/number))/100}</Text>

    <Button
        title={(debugging?'hide':'show')+" debug info" }
        color="green"
        onPress = {() => setDebugging(!debugging)}
        />
        {debugView}
  </View>
      );
    }


  const styles = StyleSheet.create ({
    container: {
      flex: 1,
      flexDirection:'column',
      backgroundColor: '#fff',
      alignItems: 'start',
      justifyContent: 'start',
      margin:"20px",
      padding:"20px",
    },
    textinput:{
      margin:20,
      fontSize:40,
      fontWeight:60,
    },
    header: {
      fontSize:40,
      color:'blue',
    },
    rowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

export default App;
