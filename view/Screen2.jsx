import { useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const Screen2 = ({setScreen, user}) => {
    useEffect(() => {
        console.log('Screen2 - useEffect con user:', user);
    });

    if (!user) {
        return (
          <View style={styles.container}>
            <Text>Nessun utente selezionato.</Text>
            <Button title="Torna a Screen1" onPress={() => setScreen('Screen1')} />
          </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Questa è la schermata 2 (Dettagli)</Text>
            <Button title="Vai alla schermata 1" onPress={() => setScreen('Screen1')}></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }, 
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default Screen2;