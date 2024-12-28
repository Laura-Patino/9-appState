import { Button, StyleSheet, Text, View } from "react-native";

const Screen3 = ({setScreen}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Shermata numero 3 (Tre)</Text>
            <Button title="Indietros" onPress={() => setScreen('Screen1')}></Button>
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

export default Screen3;