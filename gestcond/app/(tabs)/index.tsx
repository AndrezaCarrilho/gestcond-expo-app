// app/(auth)/index.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { router } from 'expo-router'; // Importar o router do Expo Router

export default function InitialScreen() {
  return (
    // Fundo azul escuro sólido (ImageBackground e logo comentados)
    <View style={styles.solidBackground}>
      <View style={styles.overlay} />

      <View style={styles.container}>
        {/*
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/condo_logo.png')} style={styles.logo} />
        </View>
        */}

        <Text style={styles.title}>GestCondo</Text>
        <Text style={styles.subtitle}>O seu condomínio na palma da mão</Text>

        <TouchableOpacity style={styles.button} onPress={() => router.replace('/auth/Login')}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.replace('/auth/Register')}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  solidBackground: {
    flex: 1,
    backgroundColor: '#1a202c', // Azul escuro
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)', // Leve opacidade
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  /*
  logoContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  */
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});