import { StyleSheet, View, Text, PlatformColor } from 'react-native';
import { useEffect } from 'react';

// using route and navigation to gather name and color values passed from Start.js
const Chat = ({ route, navigation }) => {
    const { name, color } = route.params;

    //sets the title bar and background color to name and color passed by state from Start.js
    useEffect(() => {
        navigation.setOptions({ title: name, backgroundColor: color });
    }, []);
    
    return (
        <View style={[styles.container, { backgroundColor: color}]}>
            <Text>Welcome to Chat</Text>
        </View>
    );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center'
 }
});

export default Chat;