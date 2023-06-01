import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import User from '../../assets/icons/User.js'
import Star from '../../assets/icons/Star.js'
import { db } from '../../firebase.js'
import { doc, updateDoc } from "firebase/firestore"

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UserTaskView = ({ route, navigation }) => {
    const { project, department, given, assign, dependency, due, funds, tag, text, priority, id, status } = route.params;

    const starFunction = () => {
        let content = []
        for (let i = 0; i < priority; i++) {
            content.push(<Star key={i} />)
        }
        return content
    }

    const tasksRef = doc(db, "Tasks", id);

    const Started = async () => {
        await updateDoc(tasksRef, {
            status: 1
        });
        navigation.goBack()
    }
    const Done = async () => {
        await updateDoc(tasksRef, {
            status: 2
        });
        navigation.goBack()
    }
    const Shift = async () => {
        await updateDoc(tasksRef, {
            assign: dependency,
            dependency: assign,
            status: 0
        });
        navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>HiTech</Text>
                <View style={styles.headerLogo}>
                    <User />
                </View>
            </View>
            <View style={styles.textContainer}>
                <View style={styles.textTitle}>
                    <Text style={{ fontSize: 18, fontWeight: "600", flex: 2 }}>{project}</Text>
                    <View style={{ flexDirection: 'row', flex: 1.3, justifyContent: 'flex-end' }}>
                        {starFunction()}
                    </View>
                </View>
                <Text style={{ fontSize: 12, paddingVertical: 2 }} >
                    {department}
                </Text>
                <Text style={{ fontSize: 12, paddingVertical: 2 }}>
                    {given.toDate().toDateString()}
                </Text>
                <Text style={{ fontSize: 12, paddingVertical: 2, color: "#FF0000" }}>
                    {due.toDate().toDateString()}
                </Text>
                <Text style={{ color: '#69CF45' }}>
                    {tag}
                </Text>
                <Text >
                    Funds: Rs {funds}
                </Text>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text>
                        {text}
                    </Text>
                </ScrollView >
            </View>
            <View style={styles.signupLink}>
                {status < 1 && <TouchableOpacity style={styles.horiButton} onPress={Started}>
                    <Text style={{ color: '#FFF' }}>Started</Text>
                </TouchableOpacity>}
                {status < 2 && <TouchableOpacity style={styles.horiButton} onPress={Done}>
                    <Text style={{ color: '#FFF' }}>Done</Text>
                </TouchableOpacity>}
            </View>
            <View style={styles.signupLink}>
                {status < 2 && <TouchableOpacity style={styles.horiButton} onPress={Shift}>
                    <Text style={{ color: '#FFF' }}>Request to shift to {dependency}</Text>
                </TouchableOpacity>}
            </View>
        </View >
    )
}

export default UserTaskView


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
    textContainer: {
        flex: 1,
        justifyContent: 'flex-start',

    },
    textTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    signupLink: {
        flexDirection: 'row',
        height: 35,
        left: 0,
        justifyContent: 'space-around',
        backgroundColor: '#FFF',
        paddingVertical: 5,
    },
    horiButton: {
        backgroundColor: '#69CF45',
        flex: 1,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        borderRadius: 5,
        maxWidth: 250
    }
})