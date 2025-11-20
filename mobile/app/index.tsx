import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TestScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Epiko Shows</Text>
      <Text style={styles.subtitle}>Movie Booking App</Text>
      <Text style={styles.text}>If you can see this, the app is working!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: '#a8a8a8',
    textAlign: 'center',
  },
});
