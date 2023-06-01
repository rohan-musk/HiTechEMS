import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import User from '../../assets/icons/User.js'
import TaskWise from '../TaskWise.js'


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AdminHome = ({ route, navigation }) => {
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
          <TaskWise navigation={navigation} filter="Project" request={0} />

        </ScrollView>
      </View>
      <View>
        <View style={{
        }}>
          <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('AddTask')}>
            <Text style={styles.loginText}>Create New Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View >
  )
}
export default AdminHome;


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
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 10,
    borderColor: '#69CF45',
    borderWidth: 2,
    marginBottom: 10
  },
  loginText: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    textAlign: 'center',
  },
})