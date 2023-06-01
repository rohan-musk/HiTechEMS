import React from 'react'
import { View, Text, Image, SafeAreaView, StyleSheet, TextInput, Pressable, Button, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native'
import User from '../../assets/icons/User.js'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../../firebase.js'



const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const AddUser = () => {
    const [username, setUsername] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [email, setEmail] = React.useState(null);

    const SignUp = () => {
        console.log('clicked')
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in 
                const user = userCredential.user;
                await updateProfile(user, {
                    displayName: username,
                })
                console.log(userCredential)
                setUsername(null)
                setPassword(null)
                setEmail(null)
                // ...
            })
            .catch((error) => {
                console.log(error)
                // ..
            });
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
                    <View styles={{ flex: 1, justifyContent: 'flex-start' }}>
                        <SafeAreaView >
                            <Text style={{ fontWeight: '700', fontSize: 16 }}>Create New User</Text>
                            <TextInput
                                style={styles.input}
                                onChangeText={setUsername}
                                value={username}
                                placeholder="Username"
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={setPassword}
                                value={password}
                                placeholder="Password"
                                keyboardType="text"
                            />
                            <TextInput
                                style={styles.input}
                                onChangeText={setEmail}
                                value={email}
                                placeholder="Email"
                                keyboardType="text"
                            />

                        </SafeAreaView>
                    </View>
                    <View style={{
                        position: 'absolute',
                        top: windowHeight - 150,
                        width: windowWidth - 60,
                    }}>
                        <Pressable style={styles.loginButton} onPress={
                            // () => navigation.navigate('TabNavigator')
                            SignUp
                        }>
                            <Text style={styles.loginText}>Create</Text>
                        </Pressable>
                    </View>

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default AddUser

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
        paddingHorizontal: 10,
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
        width: 60,
    },
})