import React, { useState, useEffect }  from 'react';
import { View, Button,
         FlatList, StyleSheet,
         Text, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const History = () => {
  const [date,setDate] = useState("")
  const [amount,setAmount] = useState("")
  const [note,setNote] = useState("")
  const [history,setHistory]= useState([])

  useEffect(() => {getData()}
           ,[])

  const getData1 = () => {

          AsyncStorage.getItem('@history')
            .then((jsonValue) => {
              let data = null
              if (jsonValue!=null) {
                data = JSON.parse(jsonValue)
                setHistory(data)
                console.log('just set Info, Name and Email')
              } else {
                console.log('just read a null value from Storage')
                setHistory([])
                setDate("")
                setAmount("")
                setNote("")
              }
            })
           .catch((error)=> {   console.log("error in getData ")})


  }

  const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@history')
          let data = null
          if (jsonValue!=null) {
            data = JSON.parse(jsonValue)
            setHistopry(data)
            console.log('just set Info, Name and Email')
          } else {
            console.log('just read a null value from Storage')
            setHistory([])
            setDate("")
            setAmount("")
            setNote("")
          }
        } catch(e) {
          console.log("error in getData ")
          console.dir(e)
        }
  }

  const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@history', jsonValue)
          console.log('just stored '+jsonValue)
        } catch (e) {
          console.log("error in storeData ")
          console.dir(e)
        }
  }

  const clearAllUGLY = () => {
        try {
          console.log('in clearData')
          AsyncStorage.clear()
             .then(() => {console.log('cleared the data')})
        } catch(e) {
          console.log("error in clearData ")
          console.dir(e)
        }
  }

  const clearAll = async () => {
        try {
          console.log('in clearData')
          await AsyncStorage.clear()
        } catch(e) {
          console.log("error in clearData ")
          console.dir(e)
        }
  }


  const renderHistory = ({item}) => {
    return (
      <View style={styles.history}>
           <Text>{item.date}</Text>
           <Text>{item.amount} </Text>
           <Text>{item.note} </Text>
      </View>
    )
  }


  return (
    <View style={styles.container}>
    <Text style={styles.headerText}>Record Bill Amount</Text>

      <View style={{flexDirection:'row',
                    justifyContent:'center',
                    backgroundColor:'darkseagreen'}}>
        <Text style={{fontSize:20,
                      color:'black',backgroundColor:'darkseagreen'}}>
              History
         </Text>
      </View>
      <FlatList
        backgroundColorcolor="darkseagreen"
        data={history.reverse()}
        renderItem={renderHistory}
        keyExtractor={item => item.date}
      />
      <Text style={{fontSize:18}}>
          Enter your current bill amount below
      </Text>
      <View style={{flexDirection:'row',
                    margin:20,
                    justifyContent:'space-around'}}>
            <TextInput
              style={{fontSize:10}}
              placeholder="Date"
              onChangeText={text => {
                   setDate(text);
                 }}
              value = {date}
            />

            <TextInput
              style={{fontSize:12}}
              placeholder="Amount"
              onChangeText={text => {
                   setAmount(text);
                 }}
              value = {amount}
            />

            <TextInput
              style={{fontSize:12}}
              placeholder="Note"
              onChangeText={text => {
                   setNote(text);
                 }}
              value = {note}
            />
        </View>
        <View style={{flexDirection:'column',
                      justifyContent:'space-around'}}>
        <Button
          title={"Record"}
          color="blue"
          onPress = {() => {
            const newHistory =
              history.concat(
                {'date':date,
                'amount':amount,
                'note':note,
                'completed':new Date()
              })
            setHistory(newHistory)
            storeData(newHistory)
            setDate("")
            setAmount("")
            setNote("")
          }}
        />
        <Button
          title={"Clear"}
          color="red"
          onPress = {() => {
            clearAll()
            setHistory([])
          }}
        />
      </View>
    </View>

  );
}

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
  history:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  headerText: {
    textAlign:'center',
    backgroundColor:'lightgreen',
    fontSize: 32,
    padding:10,
  },
  horizontal: {
    flex:0.5,
    flexDirection:'row',
    width: 200,
    height: 50,
  },

});

export default History;
