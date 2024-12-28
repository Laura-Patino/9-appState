import { StatusBar } from 'expo-status-bar';
import { AppState, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import Screen1 from './view/Screen1';
import Screen2 from "./view/Screen2";

//Soluzione 1: iscrizione e rimozione dell'evento di cambio stato dell'app con solo useState (con useEffect [currentScreen])
//Soluzione 2: iscrizione e rimozione dell'evento di cambio stato dell'app con useState e useRef (con useEffect [])
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Screen1');
  
  function setScreen(value) {
    setCurrentScreen(value);
  }

	useEffect( () => {
    console.log("----useEffect con currentScreen:", currentScreen, "-----");

    const handleAppStateChange = (nextAppState) => { 
      //eseguito solo al cambio di stato dell'app (active o background) 
      console.log('\tnextAppState:', nextAppState, '- var currentScreen:', currentScreen);
      if (nextAppState === 'active') {
        console.log('\tApp attiva');
      } else if (nextAppState === 'background') {
        console.log('\tApp in background');
      }
    };
    const subscription = AppState.addEventListener('change', handleAppStateChange ); //non al primo avvio

    return () => {
      subscription.remove();
      //console.log("codice return"); //eseguito ad ogni cambio di currentScreen
    };     
  } , [currentScreen]);

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
