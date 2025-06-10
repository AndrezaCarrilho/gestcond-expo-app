// app/(app)/ReservarEspaco.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router'; // Importar o router do Expo Router
import { Ionicons } from '@expo/vector-icons'; // Para o ícone de voltar

export default function ReservarEspacoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela de Reservar Espaço</Text>
      <Text style={styles.subtitle}>Aqui você poderá reservar áreas comuns do condomínio.</Text>
      
      {/* Botão de Voltar */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()} // Volta para a tela anterior (Dashboard)
      >
        <Ionicons name="arrow-back-outline" size={24} color="#007bff" />
        <Text style={styles.backButtonText}>Voltar para a Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8', // Fundo claro, consistente com a Dashboard
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  backButtonText: {
    marginLeft: 5,
    color: '#007bff',
    fontSize: 16,
  },
});