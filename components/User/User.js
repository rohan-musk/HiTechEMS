import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserTasks from './UserTasks.js'
import UserHome from './UserHome.js'
import UserTaskView from './UserTaskView.js'

const Stack = createNativeStackNavigator();

const User = () => {
    return (
            <Stack.Navigator>
            <Stack.Screen name="UserHome" component={UserHome} options={{ headerShown: false }} />
            <Stack.Screen name="UserTasks" component={UserTasks} options={{ headerShown: false }} />
            <Stack.Screen name="UserTaskView" component={UserTaskView} options={{ headerShown: false }} />
            </Stack.Navigator>
    )
}

export default User;
