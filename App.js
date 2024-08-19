import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.containerCubo1}>
        <Text>¡Bienvenidos Jugadores!</Text>
      </View>
      <View style={styles.containerCubo2}>
        <Text>Transmisión en vivo</Text>
      </View>
      <View style={styles.containerCubo3}>
        <Text>¡Suscribete!</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'plum',
    padding: 10,
  },

  containerCubo1: {
    height: 100,
    backgroundColor: 'burlywood',
    marginBottom: 10,
    
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerCubo2: {
    flex: 1,
    height: 100,
    backgroundColor: 'aqua',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerCubo3: {
    flexDirection: "column-reverse",
    height: 100,
    backgroundColor: 'burlywood',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
