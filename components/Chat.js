import { 
    StyleSheet, 
    View, 
    Button, 
    Platform, 
    KeyboardAvoidingView, 
    TouchableWithoutFeedback} from 'react-native';
import { useEffect, useState } from 'react';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import {
    collection, query,
    orderBy, onSnapshot, addDoc, } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to customize the appearance of chat bubbles
const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#51A3DF",
          },
          left: {
            backgroundColor: "#E1E5E6",
          },
        }}
      />
    );
  };
  
  // Function to conditionally render the input toolbar based upon a users connection status
  const renderInputToolbar = (isConnected) => (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

// using route and navigation to gather name and color values passed from Start.js
// creates State for messages and setMessages
export default function Chat({ route, navigation, db, isConnected }) {
    const { name, userID } = route.params;
    const [messages, setMessages] = useState([]);

    //sets the title bar and background color to name and color passed by state from Start.js
    useEffect(() => {
        let name = route.params.name;
        let color = route.params.color;

        // Set header title to name value
        navigation.setOptions({ title: name });

        // Set the header background color to the color value
        navigation.setOptions({
            headerStyle: {
                backgroundColor: color,
            },
        });

        // Fetching messages from Firebase if connected, otherwise from local storage
        if (isConnected) {
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            const unsubscribe = onSnapshot(q, async (querySnapshot) => {
                const fetchedMessages = [];
                querySnapshot.forEach((doc) => {
                    const fetchedMessage = doc.data();
                    fetchedMessage.createdAt = new Date(
                        fetchedMessage.createdAt.seconds * 1000
                    );
                    fetchedMessages.push(fetchedMessage);
                });

                try {
                    await AsyncStorage.setItem(
                        "messages",
                        JSON.stringify(fetchedMessages)
                    );
                } catch (error) {
                    console.log(error);
                }

                setMessages(fetchedMessages);
            });

            // Unsubscribe from Firebase listener on component unmount
            return () => {
                unsubscribe();
            };
        } else {
            // Get cached messages from local storage
            AsyncStorage.getItem("messages").then((cachedMessages) => {
                if (cachedMessages !== null) {
                    setMessages(JSON.parse(cachedMessages));
                }
            });
        }
    }, [navigation, route.params.name, route.params.color, db, isConnected]);

    // Function that adds a new message to the "messages" collection in Firestore when the user sends a message
    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), {
            ...newMessages[0],
            createdAt: new Date(),
            user: {
                _id: route.params.userID,
                name: route.params.name,
                avatar: "https://placebear.com/140/140",
            },
        });
    };

    return (
        <TouchableWithoutFeedback>
            <View style={[styles.container, { backgroundColor: route.params.color }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar(isConnected)}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userID,
                    name,
                    avatar: "https://placebear.com/140/140",
                }}
            />

            {/* keeps android and ios keyboards functioning properly */}
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
            { Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null }
            <Button title="Leave Chat" onPress={() => navigation.navigate("Start")} />
        </View>
        </TouchableWithoutFeedback>
        
    );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
 },
});