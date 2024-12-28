import { Button, StyleSheet, Text, View } from "react-native";

const Screen1 = ({setScreen}) => {
    const persone = [
        {nome: 'Mario', cognome: 'Rossi', eta: 30},
        {nome: 'Luigi', cognome: 'Verdi', eta: 25},
        {nome: 'Giovanni', cognome: 'Bianchi', eta: 40},
        {nome: 'Paolo', cognome: 'Neri', eta: 35},
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Questa è la schermata 1 (Uno)</Text>
            <Button 
                title="Vai alla schermata 2 - Dettagli" 
                onPress={() => setScreen('Screen2', persone[0])}
                color={'green'}
            ></Button>
            <Button title="Vai alla schermata 3" onPress={() => setScreen('Screen3')} color={'red'}></Button>
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

export default Screen1;