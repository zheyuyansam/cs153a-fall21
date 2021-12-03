import React, { useState } from "react";
import {View, StyleSheet, Text} from "react-native";

export default function Note(){
  return(
    <View style={{alignItems:'end',justifyContent:'end',backgroundColor:"yellow",margin:"2.5%"}}>
        <Text style={styles.style}>
            Please note: the calculator assumes that you split the money evenly!
        </Text>
    </View>
);
}
const styles = StyleSheet.create ({
  style:{
    color:'black',
    borderColor:"black",
    padding:"2%",
  },
});
