// import libraries and components
import Start from './components/Start';
import Chat from './components/Chat';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import { useEffect } from 'react';
import { LogBox, Alert } from 'react-native';
import { useNetInfo } from "@react-native-community/netinfo";

// Ignore expo warning messages
LogBox.ignoreLogs([
  "AsyncStorage has been extracted from",
  "Cannot connect to Metro",
]);

// Create the navigator
const Stack = createNativeStackNavigator();

// Define the main component of the app
const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyB2WogD45vcusv_kmrsXD4p9hvD5tDCqZg",
    authDomain: "haveachat-app.firebaseapp.com",
    projectId: "haveachat-app",
    storageBucket: "haveachat-app.appspot.com",
    messagingSenderId: "86329945001",
    appId: "1:86329945001:web:e81a9ea74b46be4a13f2b8"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  const connectionStatus = useNetInfo();

  // Monitor changes in the network connection status
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  // render the App
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen name="Chat"> 
        {(props) => (
          <Chat 
            isConnected={connectionStatus.isConnected}
            db={db}
            storage={storage}
            {...props}
          />
        )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
