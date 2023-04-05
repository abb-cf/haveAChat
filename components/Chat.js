import { StyleSheet, View, Button, Platform, KeyboardAvoidingView } from 'react-native';
import { useEffect, useState } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

// using route and navigation to gather name and color values passed from Start.js
// creates State for messages and setMessages
export default function Chat({ route, navigation }) {
    const { name, color } = route.params;
    const [messages, setMessages] = useState([]);

    //sets the title bar and background color to name and color passed by state from Start.js
    useEffect(() => {
        navigation.setOptions({ title: name, backgroundColor: color });
    }, []);

    //testing messages by adding the first message as well as a system message
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: "Hello developer",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "React Native",
                    avatar: "https://placeimg.com/140/140/any",
                },
            },
            {
                _id: 2,
                text: 'This is a system message',
                createdAt: new Date(),
                system: true,
            },
        ]);
    }, []);

    //appends new messages to previous messages
    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    }

    //changes the properties of chat bubbles
    const renderBubble = (props) => {
        return <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backroundColor: "#000"
                },
                left: {
                    backgroundColor: "#FFF"
                }
            }}
        />
    }

    return (
        <View style={styles.container}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                    name,
                    avatar: "https://placebear.com/140/140",
                }}
            />

            {/* keeps android and ios keyboards functioning properly */}
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
            { Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null }
            <Button title="Leave Chat" onPress={() => navigation.navigate("Start")} />
        </View>
    );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
 }
});