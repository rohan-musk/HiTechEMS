import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import User from '../../assets/icons/User.js'
import TaskWise from '../TaskWise.js'
import { CommonActions } from '@react-navigation/native';

const UserHome = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>HiTech</Text>
        <View style={styles.headerLogo}>
          <User />
        </View>
      </View>
      <View style={styles.cardContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TaskWise navigation={navigation} filter="Project" request={1} />
          {/* <TaskWise navigation={navigation} filter="Priority" request={1} />
          <TaskWise navigation={navigation} filter="Department" request={1} />
          <TaskWise navigation={navigation} filter="Special Tag" request={1} /> */}
        </ScrollView>
      </View>
    </View >
  )
}
export default UserHome;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 24,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "700",
  },
  headerLogo: {
    backgroundColor: '#CFEFC3',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'flex-start',

  },
})