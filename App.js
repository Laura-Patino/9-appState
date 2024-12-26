import { StatusBar } from 'expo-status-bar';
import { AppState, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import Screen1 from './view/Screen1';
import Screen2 from "./view/Screen2";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Screen1');
  //const currentScreenRef = useRef(currentScreen);
  
  function setScreen(value) {
    //currentScreenRef.current = value;
    setCurrentScreen(value);
  }

	useEffect( () => {
    const handleAppStateChange = (nextAppState) => {
      console.log('nextAppState', nextAppState, '\tcurrentScreen', currentScreen);
    };
    AppState.addEventListener('change', handleAppStateChange );
    /** const subscription = AppState.addEventListener('change', handleAppStateChange );
     * return () => {
     *  subscription.remove();
     * };     */
  } , []);

  //Reindirizza la schermata corrente
  return (
    currentScreen === 'Screen1' ? <Screen1 setScreen={setScreen}/> : <Screen2 setScreen={setScreen}/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
