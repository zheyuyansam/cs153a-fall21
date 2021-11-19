import React, { useState, useEffect } from "react";
import { Button, Text, TextInput, View, FlatList } from "react-native";

const BBviewer = (props) => {
  const appURL = 'https://glacial-hamlet-05511.herokuapp.com'
  const [select, setSelect] = useState('');
  const [data,setData] = useState([]);
  const [showReps,setShowReps] = useState(false)
  const [length,setLength] = useState('')
  const [status,setStatus] = useState('false')

  const getData = async (select) => {
    try{
      let result = await fetch(appURL)
      let cdata = await result.json()
      cdata = cdata.sort(data_fetch)
      setData(cdata)
    }catch(e){
      console.log(`error in getCovidData: ${JSON.stringify(e)}`)
    }

  }

  function data_fetch(a, b) {
    var keyA = new Date(a.created_at),
      keyB = new Date(b.created_at);
    return 0;
  }

  useEffect(() => {
    getData(select)
  }, [select]);


  const renderItem = ({item}) => {
    return (
      <View style={{flexDirection:'row'}}>
        <Text style={{backgroundColor:'#aaa',fontSize:25, margin:'3%',width:'90%'}}>{item['name']}</Text>
     </View>
  )}

  let showNone = ""
  if (!showReps) {
    showNone =
    <View style={{flexDirection:'row'}}>
      <Text style={{backgroundColor:'#aaa',fontSize:25, margin:'3%',width:'90%'}}>NONE</Text>
   </View>
 }else{
   showNone =
   <FlatList
     data={data.slice(0,30)}
     renderItem={renderItem}
   />
 }

  return (
    <View>
      <View style ={{justifyContent: 'center',textAlign:'center'}}>
        <Text style={{fontSize:40,color:'red',backgroundColor:'black'}}>
          BBViewer
        </Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <Button
        title = 'REFRESH BBOARDS'
        color = 'blue'
        onPress={() => {
          setLength('6')
        }}/>
        <Button
        title = 'bb1'
        color = 'black'
        onPress={() => {
          setSelect('bb1')
        }}/>
        <Button
        title = 'bb2'
        color = 'black'
        onPress={() => {
          setSelect('bb2')
        }}/>
        <Button
        title = 'bb3'
        color = 'black'
        onPress={() => {
          setSelect('bb3')
        }}/>
        <Button
        title = 'bb4'
        color = 'black'
        onPress={() => {
          setSelect('bb4')
        }}/>
        <Button
        title = 'qwe'
        color = 'black'
        onPress={() => {
          setSelect('qwe')
        }}/>
        <Button
        title = 'sdfd'
        color = 'black'
        onPress={() => {
          setSelect('sdfd')
        }}/>


      </View>
      <View style={{flexDirection:'row', justifyContent:'start',alignItems:'start'}}>
        <Text style={{fontSize:25,color:'black'}}>
          Selected bboard
        </Text>
        <Text style={{fontSize:25,color:'red',backgroundColor:'black'}}>
          {select}
        </Text>
      </View>
      {showNone}
      <View style={{justifyContent:'end',alignItems:'end'}}>
         <Text>DEBUGGING</Text>
         <Text>bb: {select}</Text>
         <Text>show: {status}</Text>
         <Text>bbs.length: {length}</Text>
      </View>
    </View>
  );
}

export default BBviewer;
