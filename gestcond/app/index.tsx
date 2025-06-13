// app/(auth)/index.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

export default function InitialScreen() {
  return (

    <View style={styles.solidBackground}>
     

      <View style={styles.container}>
        {/* --- Topo (Ícone e GestCondo) --- */}
        <View style={styles.topContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="business-outline" size={100} color="#20B2AA" /> {/* Ícone de prédio maior */}
          </View>
          <Text style={styles.gestCondoTitle}>GestCond</Text>
        </View>

        {/* --- Box Central para Botões (Login e Cadastrar) --- */}
        <View style={styles.buttonBox}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.replace('/(auth)/Login')} 
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.registerButton} 
            onPress={() => router.replace('/(auth)/Register')} 
          >
            <Text style={styles.registerButtonText}>Não tem cadastro? Crie uma conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  solidBackground: {
    flex: 1,
    backgroundColor: '#003366', 
  },
  backgroundImage: { 
    position: 'absolute', 
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingVertical: 80, 
    paddingHorizontal: 20,
  },
  // --- Estilos para o Topo (Ícone e GestCondo) ---
  topContainer: {
    alignItems: 'center',
  },
  iconCircle: {
    backgroundColor: '#fff',
    borderRadius: 80, 
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  gestCondoTitle: {
    fontSize: 48, 
    fontWeight: 'bold',
    color: '#fff',
  },
  // --- Estilos para a Caixa de Botões Inferior ---
  buttonBox: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'rgba(255,255,255,0.9)', 
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  button: {
    width: '100%',
    backgroundColor: '#20B2AA', 
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerButton: { 
    width: '100%',
    backgroundColor: 'transparent',
    padding: 1,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 5, 
  },
  registerButtonText: {
    color: '#007bff', 
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});