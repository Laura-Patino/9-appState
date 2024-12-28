import { Button, StyleSheet, Text, View } from "react-native";

const Screen1 = ({setScreen}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Questa è la schermata 1 (Uno)</Text>
            <Button title="Vai alla schermata 2" onPress={() => setScreen('Screen2')}></Button>
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