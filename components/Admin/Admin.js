import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdminTasks from './AdminTasks.js'
import AdminHome from './AdminHome.js'
import AdminTaskView from './AdminTaskView.js'
import AddTask from './AddTask.js'

const Stack = createNativeStackNavigator();

const Admin = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="AdminHome" component={AdminHome} options={{ headerShown: false }} />
            <Stack.Screen name="AdminTasks" component={AdminTasks} options={{ headerShown: false }} />
            <Stack.Screen name="AdminTaskView" component={AdminTaskView} options={{ headerShown: false }} />
            <Stack.Screen name="AddTask" component={AddTask} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default Admin;
