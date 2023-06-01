import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Login from './components/Login.js'
import colors from './assets/colors/colors'
import AdminLogin from './components/AdminLogin.js'
import SignOut from './components/SignOut.js'
import User from './components/User/User.js'
import Admin from './components/Admin/Admin.js'
import AddUser from './components/Admin/AddUser.js'
import GenerateReport from './components/Admin/GenerateReport.js'
import Home from './assets/icons/Home.js'
import SignOutIcon from './assets/icons/SignOutIcon.js'
import AddUserIcon from './assets/icons/AddUserIcon.js'
import Report from './assets/icons/Report.js'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'User') {
            return <Home />;
          }
          else {
            return <SignOutIcon />;
          }
        },
        tabBarStyle: {
          backgroundColor: colors.white,
          elevation: 0,
        },
        tabBarActiveTintColor: '#69CF45',
        tabBarInactiveTintColor: 'black',
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="User" component={User} />
      <Tab.Screen name="SignOut" component={SignOut} />
    </Tab.Navigator>
  );
};

const TabAdminNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Admin') {
            return <Home />;
          }
          else if (route.name === 'AddUser') {
            return <AddUserIcon />;
          }
          else if (route.name === 'GenerateReport') {
            return <Report />;
          }
          else {
            return <SignOutIcon />;
          }
        },
        tabBarStyle: {
          backgroundColor: colors.white,
          elevation: 0,
        },
        tabBarActiveTintColor: '#69CF45',
        tabBarInactiveTintColor: 'black',
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen name="Admin" component={Admin} />
      <Tab.Screen name="AddUser" component={AddUser} />
      <Tab.Screen name="GenerateReport" component={GenerateReport} />
      <Tab.Screen name="SignOut" component={SignOut} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="AdminLogin" component={AdminLogin} options={{ headerShown: false }} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="TabAdminNavigator" component={TabAdminNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
