import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { View, Text, StyleSheet, Pressable, } from 'react-native';
import Dropdown from '../assets/icons/Dropdown.js'



const TaskWise = ({ navigation, filter, request }) => {

  const [content, setContent] = useState(false)

  return (
    <View style={styles.cardDropdownContainer}>
      <TouchableOpacity style={styles.cards} activeOpacity={1} onPress={request ? (() => navigation.navigate('User', { screen: 'UserTasks' })) : (() => navigation.navigate('Admin', { screen: 'AdminTasks' }))}>
        <Text style={styles.cardsText}> Navigate to All Tasks</Text>
        {/* <Dropdown /> */}
      </TouchableOpacity>
    </View>
  )
}

export default TaskWise

const styles = StyleSheet.create({

  cards: {
    flexDirection: 'row',
    backgroundColor: '#69CF45',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  cardsText: {
    fontWeight: "700",
    color: '#FFF',
  },
  cardDropdownContainer: {
    marginBottom: 10,
  },
  cardDropdown: {
    flexDirection: 'row',
    backgroundColor: '#E7FFDF',
    height: 32,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
})