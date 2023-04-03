import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
import { useState } from 'react';

// set optional background colors
const bgColors = {
    marigold: {backgroundColor: '#fcba03'},
    moss: {backgroundColor: '#23570b'},
    charcoal: {backgroundColor: '#2a2b2a'},
    lavender: {backgroundColor: '#9e90f5'}
}

// using navigation to pass name and color and other State values to Chat.js
const Start = ({ navigation }) => {

    // setting the state 
    // name and color are to be passed to Chat.js via navigation
    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const { marigold, moss, charcoal, lavender } = bgColors;

    // what will render on the Start screen, 
    return (    
    <View style={styles.container}>
        <ImageBackground source={require('../assets/A5-chatapp-assets/bg-image.png')} style={[styles.container, styles.image]}>
        
        <Text style={styles.title}>Have A Chat</Text>
        
        <View>
            <View style={styles.inputBox}>
                <TextInput 
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                    placeholder='Type username here'
                    placeholderTextColor={'#d3d3d3'}
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
            </View>
            </View>

            <Button
            title="Begin Chat"
            onPress={() => navigation.navigate('Chat', { name: name, color: color })}
            />
        </View> 
        </ImageBackground>
    </View>
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
        marginBottom: 15,
        justifyContent: 'space-between',
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
        borderColor: '#5f5f5f',
    },
});

export default Start;
