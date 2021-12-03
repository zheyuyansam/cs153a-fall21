/*
  This is a demo of an app which shows the users favorite books
  but also show all of the favorite books of other users of this app.
  Clearly this is not scalable!
*/
import React,{useState,useEffect} from 'react';
import { SafeAreaView, ScrollView, View, FlatList, StyleSheet, Text, TextInput, Button, StatusBar, Image } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios'
import appKey,{appURL} from './appKey.js'


const Item = ({ title, date, description}) => (
      <View style={styles.item}>
        <Text style={styles.title}>{title.trim()}</Text>
        <Text> {description} </Text>
      </View>
);

const Feedback = () => {
  const [data,setData] = useState([])
  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [userKey,setUserKey] = useState(null)

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    getCloudData()
  },[userKey])



  const getData = async () => {
      try {
        let jsonValue = await AsyncStorage.getItem('@userKey')
        if (jsonValue!=null) {
          let data = JSON.parse(jsonValue)
          console.log('in getData, data=')
          console.dir(data)
          console.log(`data.userKey= ${data.userKey}`)
          setUserKey(data.userKey)
        }
      }catch(e){
        console.dir(e)
      }
    }

  const storeCloudData = async (value) => {
    let data = {appKey:appKey,
                userKey:userKey,
                valueKey:'@books',
                value:value}

    let result =
      await Axios.post(appURL+'/storeData',data)
    console.log(`result=`)
    console.dir(result.data)
  }

  const getCloudData = async () => {
    let data = {appKey:appKey,
                userKey:userKey,
                valueKey:'@books'}
    console.log('in getCloudData, data=')
    console.dir(data)

    let result =
      await Axios.post(appURL+'/getData',data)
    console.log(`result=`)
    console.dir(result.data)
    const books = result.data.map((x) => JSON.parse(x.value))
    setData(books)
  }

  const renderItem = ({ item }) => (
    <View>
      <Item
          title={item.title}
          description={item.description}/>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection:'row',justifyContent:'center', alignitems:'center'}}>
        <Text style={{fontSize:32}}>
           Feedback
        </Text>
      </View>
      <View style={{flexDirection:'row',justifyContent:'center', alignitems:'center'}}>
        <Text style={{fontSize:12}}>
           Your feedback is important to us!
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.title+item.author}
      />
     <View style={{flexDirection:'column', alignitems:'center',margin:"2%"}}>
        <Text style={{fontSize:24}}>
           Enter your feedback
        </Text>
        <TextInput placeholder="title" onChangeText={(text) => setTitle(text)} />
        <TextInput placeholder="description" onChangeText={(text) => setDescription(text)} />
        <Button title="send feedback" color='blue' onPress={() =>{
            const feedback = {title,description}
            storeCloudData(feedback)
          }} />
        <Button title="get cloud data" color='red' onPress={() => getCloudData()} />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor:'lightgreen',
  },
  item: {
    flex:4,
    backgroundColor: 'darkseagreen',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Feedback;
