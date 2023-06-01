import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { auth } from '../firebase.js'
import { signOut } from "firebase/auth";

const SignOut = ({ navigation }) => {
  const sOut = async () => {
    signOut(auth).then(() => {
      navigation.replace("Login")
    }).catch((error) => {
      console.log(error)
    });
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF"
      }}>
      <TouchableOpacity style={styles.horiButton} onPress={sOut}>
        <Text style={{ color: '#FFF', paddingHorizontal: 10, paddingVertical: 5, fontWeight: '500' }}>SignOut</Text>
      </TouchableOpacity>
    </View>
  )
}
export default SignOut;


const styles = StyleSheet.create({
  horiButton: {
    backgroundColor: '#69CF45',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRadius: 5,
    maxWidth: 250
  }
})