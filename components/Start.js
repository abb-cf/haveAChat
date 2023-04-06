import { 
    StyleSheet, 
    View, 
    Text, 
    TextInput, 
    ImageBackground, 
    TouchableOpacity, 
    KeyboardAvoidingView, 
    Alert,
    Keyboard,
    TouchableWithoutFeedback} from 'react-native';
import { useState } from 'react';
import { getAuth, signInAnonymously } from 'firebase/auth';

// set optional background colors for Chat screen
const bgColors = {
    marigold: {backgroundColor: '#fcba03'},
    moss: {backgroundColor: '#23570b'},
    charcoal: {backgroundColor: '#2a2b2a'},
    lavender: {backgroundColor: '#9e90f5'}
}

// A component that displays a transparent overlay when a color is selected
const SelectedColorOverlay = () => <View style={styles.selectedColorOverlay} />;

// using navigation to pass name and color and other State values to Chat.js
const Start = ({ navigation }) => {

    // declaring the state 
    // name and color are to be passed to Chat.js via navigation
    const [name, setName] = useState('');
    const [color, setColor] = useState('');

    // Functon to handle anonymous sign-in with Firebase Auth
    const handleSignIn = () => {
        const auth = getAuth();
        signInAnonymously(auth)
            .then((userCredential) => {
                const user = userCredential.user;
                // Navigate to Chat screen with user's name, color, ID
                navigation.navigate("Chat", {
                    name, color: color || "#FFF", userID: user.uid,
                });
                Alert.alert("Signed in successfully!");
            })
            .catch((error) => {
                Alert.alert("Unable to enter chat. Please try later");
            });
    }; 

    // destructure bg color styles from backgroundColors object
    const { marigold, moss, charcoal, lavender } = bgColors;

    // what will render on the Start screen, 
    return (    
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
        <ImageBackground 
            source={require('../assets/A5-chatapp-assets/bg-image.png')} 
            style={[styles.container, styles.image]}>
        
        <Text style={styles.title}>Have A Chat</Text>
        
            <View style={styles.inputBox}>
                <TextInput 
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                    placeholder='Enter your username'
                    placeholderTextColor={'#d3d3d3'}
                    returnKeyType="done"
                />

            <View>
                <Text style={styles.colorSelector}>Choose chat background color:</Text>
                <View style={styles.colorWrapper}>
                <TouchableOpacity 
                    style={[styles.color, marigold, color === marigold.backgroundColor ? styles.colorSelected : {}]}
                    onPress={() => setColor(marigold.backgroundColor)}
                />
                <TouchableOpacity 
                    style={[styles.color, moss, color === moss.backgroundColor ? styles.colorSelected : {}]}
                    onPress={() => setColor(moss.backgroundColor)}
                />
                <TouchableOpacity 
                    style={[styles.color, charcoal, color === charcoal.backgroundColor ? styles.colorSelected : {}]}
                    onPress={() => setColor(charcoal.backgroundColor)}
                />
                <TouchableOpacity 
                    style={[styles.color, lavender, color === lavender.backgroundColor ? styles.colorSelected : {}]}
                    onPress={() => setColor(lavender.backgroundColor)}
                />
                </View>
                
                {/* keeps keyboards from obstructing the user's view of the screen   */}
                { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
                { Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null }
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              <Text style={styles.buttonText}>Begin Chat</Text>
            </TouchableOpacity>
        </View> 
        </ImageBackground>
    </View>
    </TouchableWithoutFeedback>
    );
    }

// styles used for wrappers and components of Start.js screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 50,
        fontWeight: '600',
        marginTop: 60,
    },
    inputBox: {
        backgroundColor: 'rgba(52, 52, 52, 0.6)',
        opacity: 50,
        height: "44%",
        width: "88%",
        alignItems: "center",
        padding: 15,
        paddingVertical: 20,
        justifyContent: 'space-between',
        marginBottom: 150,
    },
    textInput: {
        height: 50,
        width: '88%',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 2,
        color: '#fff',
        fontSize: 16,
        fontWeight: '300',
        paddingLeft: 10,
        paddingRight: 10,
    },
    colorSelector: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '300',
        color: '#fff',
        opacity: 50,
    },
    colorWrapper: {
        flexDirection: 'row',
    },
    color: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 10,
    },
    colorSelected: {
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#FFF',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(52, 52, 52, 0.6)",
        width: "88%",
        height: 50,
        borderRadius: 2,
      },
      buttonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#FFFFFF",
      },
});

export default Start;
