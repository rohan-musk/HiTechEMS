import React, { useEffect } from 'react'
import { View, Text, Image, SafeAreaView, StyleSheet, TextInput, Pressable, Dimensions, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ImageBackground } from 'react-native'
import { auth } from '../firebase.js'
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Login = ({ route, navigation }) => {
    const [emailID, setEmailID] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [userSignIn, setUserSignIn] = React.useState(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                // ...
            } else {
                // User is signed out
                // ...
            }
        })
        return unsub
    }, [])

    const SignInUser = () => {
        signInWithEmailAndPassword(auth, emailID, password)
            .then((userCredential) => {
                navigation.navigate('TabNavigator')
            })
            .catch((error) => {
                console.log(error)
            });
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container} >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" style={styles.container}>
                    <Image
                        style={styles.img}
                        source={require('../assets/logo.png')}
                    />
                    <SafeAreaView>
                        <TextInput
                            style={styles.input}
                            onChangeText={setEmailID}
                            value={emailID}
                            placeholder="Enter Email ID"
                            keyboardType="text"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setPassword}
                            value={password}
                            placeholder="Enter Password"
                            keyboardType="default"
                            secureTextEntry={true}
                            password={true}
                        />
                    </SafeAreaView>
                    <Pressable style={styles.loginButton} onPress={
                        // () => navigation.navigate('TabNavigator')
                        SignInUser
                    }>
                        <Text style={styles.loginText}>Login</Text>
                    </Pressable>
                    <View style={styles.signupLink}>
                        <Pressable style={styles.signupBox} onPress={() => navigation.navigate('AdminLogin')}>
                            <Text style={styles.signupText}>Admin Login</Text>
                        </Pressable>
                    </View>

                </ImageBackground>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >
    )
}

export default Login

const styles = StyleSheet.create({
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
    container: {
        flex: 1,
        height: windowHeight,
        width: windowWidth,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        shadowColor: "#000",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#FFF',
        marginTop: 15,
        width: 300,
        elevation: 0,
    },
    loginButton: {
        elevation: 0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#69CF45',
        marginTop: 10,
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
    signupLink: {
        flexDirection: 'row',
        marginTop: 10,
        position: 'absolute',
        height: 40,
        left: 0,
        top: windowHeight - 70,
        width: windowWidth,
        justifyContent: 'center',
    },
    signupText: {
        color: 'purple',
        fontSize: 12,
    }
})