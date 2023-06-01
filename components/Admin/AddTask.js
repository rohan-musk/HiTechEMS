import React from 'react'
import { View, Text, Image, SafeAreaView, StyleSheet, TextInput, Pressable, Button, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ImageBackground, ScrollView } from 'react-native'
import User from '../../assets/icons/User.js'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebase.js'
import DateTimePicker from '@react-native-community/datetimepicker'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddTask = () => {

    const [project, setProject] = React.useState(null);
    const [department, setDepartment] = React.useState(null);
    const [due, setDue] = React.useState(new Date());
    const [priority, setPriority] = React.useState(null);
    const [assign, setAssign] = React.useState(null);
    const [dependency, setDependency] = React.useState(null);
    const [tag, setTag] = React.useState(null);
    const [text, setText] = React.useState(null);
    const [funds, setFunds] = React.useState(null);

    const [show, setShow] = React.useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || due;
        setShow(Platform.OS === 'ios');
        setDue(currentDate)
    }

    const showMode = () => {
        setShow(true)
    }

    const AddData = async () => {
        const tasksCol = collection(db, 'Tasks')
        const docRef = await addDoc(tasksCol, {
            project: project,
            assign: assign,
            department: department,
            dependency: dependency,
            due: due,
            funds: parseInt(funds),
            given: new Date(),
            priority: parseInt(priority),
            status: 0,
            tag: tag,
            text: text
        });
        setProject(null)
        setDepartment(null)
        setDue(new Date())
        setPriority(null)
        setAssign(null)
        setDependency(null)
        setTag(null)
        setText(null)
        setFunds(null)
    }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container} >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flexDirection: 'column', flex: 1, }}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerText}>HiTech</Text>
                        <View style={styles.headerLogo}>
                            <User />
                        </View>
                    </View>
                    <Text style={{ fontWeight: '700', fontSize: 16 }}>Create New User</Text>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View styles={{ flex: 1, justifyContent: 'flex-start' }}>
                            <SafeAreaView >

                                <TextInput
                                    style={styles.input}
                                    onChangeText={setProject}
                                    value={project}
                                    placeholder="Project Name"
                                />
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setDepartment}
                                    value={department}
                                    placeholder="Department Name"
                                    keyboardType="text"
                                />
                                <TouchableOpacity style={styles.dateButton} onPress={() => showMode()}>
                                    <Text style={styles.dateText}>Due: {due.toDateString()}</Text>
                                </TouchableOpacity>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setPriority}
                                    value={priority}
                                    placeholder="Priority Level"
                                    keyboardType="text"
                                />
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setAssign}
                                    value={assign}
                                    placeholder="Assign To"
                                    keyboardType="text"
                                />
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setDependency}
                                    value={dependency}
                                    placeholder="Task Dependency on other User"
                                    keyboardType="text"
                                />
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setTag}
                                    value={tag}
                                    placeholder="Task Tag"
                                    keyboardType="text"
                                />
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setText}
                                    value={text}
                                    placeholder="Text"
                                    keyboardType="text"
                                />
                                <TextInput
                                    style={styles.input}
                                    onChangeText={setFunds}
                                    value={funds}
                                    placeholder="Funds Required"
                                    keyboardType="text"
                                />

                            </SafeAreaView>
                        </View>
                        <View style={{
                            marginTop: 10
                        }}>
                            <TouchableOpacity style={styles.loginButton} onPress={AddData}>
                                <Text style={styles.loginText}>Create</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    {show && (
                        <DateTimePicker
                            testID='dateTimePicker'
                            value={due}
                            mode={'date'}
                            is24Hour={true}
                            display='default'
                            onChange={onChange}
                        />
                    )}
                </View>

            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default AddTask

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 24,
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
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
    img: {
        width: 94,
        height: 78,

    },
    image: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: "center"
    },
    input: {
        shadowColor: "#000",
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#F1F1F1',
        marginTop: 15,
        width: 300,
        elevation: 0,
    },
    loginButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 32,
        borderRadius: 10,
        backgroundColor: '#69CF45',
    },
    loginText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
        textAlign: 'center',
        width: 50,
    },
    dateButton: {
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: '#F1F1F1',
        height: 35,
    },
    dateText: {
        fontSize: 14,
        lineHeight: 21,
        letterSpacing: 0.25,
        color: 'gray',
        textAlign: 'left',
        width: '100%',
    },
})