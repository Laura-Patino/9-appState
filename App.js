import { StatusBar } from 'expo-status-bar';
import { AppState, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import Screen1 from './view/Screen1';
import Screen2 from "./view/Screen2";
import Screen3 from "./view/Screen3";

//Soluzione 1: iscrizione e rimozione dell'evento di cambio stato dell'app con solo useState (con useEffect [currentScreen])
//Soluzione 2: iscrizione e rimozione dell'evento di cambio stato dell'app con useState e useRef (con useEffect [])
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Screen1');
  const [selectedUser, setSelectedUser] = useState(null);

  function setScreen(value, user = null) {
    setCurrentScreen(value);
    if ( user ) {
      setSelectedUser(user);
    }
  }

  //RECUPERA LA SCHERMATA SALVATA ALL'AVVIO DELL'APP
  useEffect(() => {
    const loadLastScreen = async () => {
      try {
        const savedScreen = await AsyncStorage.getItem('lastScreen');
        const savedUser = await AsyncStorage.getItem('selectedUser'); //AGGIUNTA

        if (savedScreen !== null) {
          setCurrentScreen(savedScreen);
          console.log('Async Storage - Schermata recuperata:', savedScreen);
        } else {
          console.log('AsyncStorage - Nessuna schermata salvata');
        }
        //AGGIUNTA: recupero dello user selezionato all'avvio
        if (savedUser) {
          setSelectedUser(JSON.parse(savedUser));
          console.log('Async Storage - selectedUser recuperato:', JSON.parse(savedUser));
        } //
      } catch (error) {
        console.error('Errore nel recupero della schermata:', error);
      }
    };
    loadLastScreen();
  }, []);

  //GESTISCE IL CAMBIAMENTO DI STATO DELL'APP
	useEffect( () => {
    console.log("----useEffect con currentScreen:", currentScreen, "-----");
    
    const handleAppStateChange = async (nextAppState) => { 
      //eseguito solo al cambio di stato dell'app (active o background) 
      console.log('\tnextAppState:', nextAppState, '- var currentScreen:', currentScreen);
      if (nextAppState === 'background') {
        console.log('\tApp in background. Salvataggio nel AsyncStorage...');
        try {
          await AsyncStorage.setItem('lastScreen', currentScreen);
          //AGGIUNTA: salvataggio dello user selezionato quando si passa in background
          if (currentScreen === 'Screen2') {
            await AsyncStorage.setItem('selectedUser', JSON.stringify(selectedUser));
            console.log('\t\tselectedUser salvato:', selectedUser);
          } //
          console.log('\t\tSalvataggio completato [lastScreen:', currentScreen, ']');
        } catch (e) {
          console.error('Errore nel salvataggio nel AsyncStorage:', e);
        }
      }
    };
    const subscription = AppState.addEventListener('change', handleAppStateChange ); //non al primo avvio

    return () => {
      subscription.remove();
      //console.log("codice return"); //eseguito ad ogni cambio di currentScreen
    };     
  } , [currentScreen]);

  //Reindirizza la schermata corrente
 /* return (
    currentScreen === 'Screen1' ? <Screen1 setScreen={setScreen}/> : <Screen2 setScreen={setScreen}/>
  ); */
  if (currentScreen === 'Screen1') {
    return <Screen1 setScreen={setScreen} />;
  } else if (currentScreen === 'Screen2') {
    return <Screen2 setScreen={setScreen} user={selectedUser} />;
  } else if (currentScreen === 'Screen3') {
    return <Screen3 setScreen={setScreen} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
