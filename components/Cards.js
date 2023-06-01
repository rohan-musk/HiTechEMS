import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Star from '../assets/icons/Star.js'


const Cards = ({ navigation, project, department, given, assign, dependency, due, funds, tag, text, priority, request, id, status }) => {

    const starFunction = () => {
        let content = []
        for (let i = 0; i < priority; i++) {
            content.push(<Star key={i} />)
        }
        return content
    }
    return (
        <TouchableOpacity style={styles.cardBox}
            onPress=
            {request ? (() => navigation.navigate('Admin', { screen: 'AdminTaskView', params: { project, department, given, assign, dependency, due, funds, tag, text, priority, id, status }, },)) : (() => navigation.navigate('User', { screen: 'UserTaskView', params: { project, department, given, assign, dependency, due, funds, tag, text, priority, id, status }, },))}
        >
            <View style={styles.cardTitle}>
                <Text style={{ fontSize: 18, flex: 2 }}>{project}</Text>
                <View style={{ flexDirection: 'row', flex: 1.3, justifyContent: 'flex-end' }}>
                    {/* <Star />
                    <Star />
                    <Star />
                    <Star /> */}
                    {starFunction()}
                </View>
            </View>
            <Text style={{ fontSize: 12, paddingVertical: 2 }} >
                {department}
            </Text>
            <Text style={{ fontSize: 12, paddingVertical: 2 }}>
                {given.toDate().toDateString()}
            </Text>
        </TouchableOpacity>
    )
}

export default Cards


const styles = StyleSheet.create({
    cardBox: {
        padding: 20,
        paddingVertical: 10,
        backgroundColor: '#F5F5F5',
        borderRadius: 10,
        marginVertical: 7,

    },
    cardTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})