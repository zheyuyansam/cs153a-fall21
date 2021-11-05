import React, { useState, useEffect } from "react";
import { Button, Text, TextInput, View, FlatList } from "react-native";

const GitHubName = (props) => {
  const [loading,setLoading] = useState(true)
  const [userid, setUserid] = useState('');
  const [text, setText] = useState('');
  const [data,setData] = useState([]);
  const [showReps,setShowReps] = useState(false)
  const [status,setStatus] = useState('false')

  const getData = async (userid) => {
    try{
      let result = await fetch('https://api.github.com/users/'+userid+'/repos')
      let cdata = await result.json()
      cdata = cdata.sort(data_fetch)
      setData(cdata)
      setLoading(false)
    }catch(e){
      console.log(`error in getData: ${JSON.stringify(e)}`)
    }

  }

  function data_fetch(a, b) {
    var keyA = new Date(a.created_at),
      keyB = new Date(b.created_at);
    return 0;
  }

  useEffect(() => {
    getData(userid)
  }, [userid]);


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
          Github Viewer
        </Text>
      </View>
      <View style={{flexDirection:'row'}}>
        <Text style={{fontSize:40}}>github Id </Text>
        <TextInput
          style={{height: 60}}
          placeholder="userid"
          onChangeText={text => {setText(text)}}
        />
      </View>
      <View style={{justifyContent:'start',alignItems:'start'}}>
      <Button
        title={(showReps?'hide':'show')+" repositories" }
        color="blue"
        onPress={() => {
          setUserid(text)
          setShowReps(!showReps)
          setStatus('true')
        }}
      />
      </View>
      {showNone}
      <View style={{justifyContent:'end',alignItems:'end'}}>
         <Text>DEBUGGING</Text>
         <Text>userId: {userid}</Text>
         <Text>showReps: {status}</Text>
      </View>
    </View>
  );
}

export default GitHubName;
