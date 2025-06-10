// app/app/(app)/TestDashboard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router'; // Importar o router do Expo Router

export default function TestDashboardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-Vindo ao Dashboard de Teste!</Text>
      <Text style={styles.subtitle}>Sua navegação para o app/app/ está funcionando!</Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.replace('./app/(app)')} // Voltar para o index da pasta app/app/(app)
      >
        <Text style={styles.buttonText}>Ir para Dashboard Principal</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.buttonSecondary} 
        onPress={() => router.back()} // Voltar (se houver tela anterior na pilha)
      >
        <Text style={styles.buttonTextSecondary}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34495e', // Um azul escuro diferente para contraste
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#eee',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#28a745', // Verde
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width: '80%',
  },
  buttonSecondary: {
    backgroundColor: '#007bff', // Azul
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextSecondary: {
    color: '#fff',
    fontSize: 16,
  },
});