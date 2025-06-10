// app/auth/Login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ImageBackground, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Para o ícone de prédio
//import api from '../../services/api'; // Mantenha este caminho ou ajuste
import { useAuthStore } from '../../store/useAuthStore'; // Mantenha este caminho ou ajuste

export default function LoginScreen() {
  const [cpf, setCpf] = useState(''); // Campo para CPF
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async () => {
    setError(''); // Limpa mensagens de erro anteriores

    // --- VALIDAÇÃO LOCAL DAS CREDENCIAIS ESPECÍFICAS ---
    if (cpf === '1234567899' && password === '123123') {
      setLoading(true);
      try {
        // Simulação de delay
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        // Define o usuário como autenticado (com dados fictícios para a simulação)
        setAuth('valid-token-simulado-123', { id: '1', name: 'Usuário GestCondo', email: 'user@gestcondo.com' }); 
        
        // Redireciona para a tela Home (Dashboard)
        router.replace('/(app)/Home'); // Caminho ABSOLUTO para app/(app)/Home.tsx

      } catch (err: any) {
        // Isso não deve acontecer com a validação local, mas é bom ter
        console.error('Erro inesperado no login simulado:', err.message);
        setError('Ocorreu um erro inesperado.');
      } finally {
        setLoading(false);
      }
    } else {
      // Credenciais inválidas, exibe mensagem de erro
      setError('CPF ou Senha inválidos. Tente: 1234567899 / 123123');
    }
  };

  return (
    <View style={styles.solidBackground}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="business-outline" size={40} color="#20B2AA" />
          </View>
          <Text style={styles.gestCondoTitle}>GestCondo</Text>
        </View>

        <View style={styles.loginBox}>
          <Text style={styles.loginTitle}>Login</Text>

          <TextInput
            style={styles.input}
            placeholder="CPF"
            placeholderTextColor="#888"
            value={cpf}
            onChangeText={setCpf}
            keyboardType="numeric" // Mantém teclado numérico para CPF
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          
          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Entrar</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => {/* Lógica para "Esqueceu a senha?" */}}>
            <Text style={styles.forgotPasswordText}>Esqueceu a senha? (Clique aqui)</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity onPress={() => router.push('/(auth)/Register')} style={styles.registerLinkContainer}>
          <Text style={styles.registerText}>Não tem cadastro? <Text style={styles.registerLink}>Crie uma conta</Text></Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  solidBackground: {
    flex: 1,
    backgroundColor: '#003366', // Fundo azul escuro
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
  },
  topContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
  },
  gestCondoTitle: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#fff',
  },
  loginBox: {
    width: '98%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  loginTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  button: {
    width: '100%',
    backgroundColor: '#20B2AA', // Verde mar
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#007bff',
    marginTop: 20,
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  registerLinkContainer: {
    marginTop: 30,
  },
  registerText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  registerLink: {
    color: '#007bff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: '#ffdddd',
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 14,
  },
});