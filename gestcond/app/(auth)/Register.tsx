// app/auth/Register.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import api from '../../services/api'; // <<< AQUI: DESCOMENTADO O IMPORT DA API >>>

export default function RegisterScreen() {
  const [username, setUsername] = useState(''); // <<< ALTERADO: Campo para 'username' >>>
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async () => {
    setError('');
    setSuccess('');
    if (!username || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem!');
      return;
    }

    setLoading(true);
    try {
      // *** AQUI: CHAMADA REAL À API PARA CADASTRO DE USUÁRIO ***
      // Endpoint: /api/users (POST)
      // Payload: { username, password, roles }
      const response = await api.post('/api/users', { // <<< ENDPOINT /api/users PARA CADASTRO >>>
        username: username,
        password: password,
        roles: ["ROLE_USER"] // <<< HARDCODED: Exemplo de papel padrão >>>
      });

      setSuccess('Cadastro realizado com sucesso! Faça login.');
      Alert.alert('Sucesso', 'Sua conta foi criada! Agora você pode fazer login.');
      router.replace('/(auth)/Login'); // Redireciona para a tela de login após o cadastro
    } catch (err: any) {
      console.error('Erro no cadastro:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Erro ao cadastrar. Tente novamente.');
      Alert.alert('Erro', err.response?.data?.message || 'Erro ao cadastrar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.solidBackground}>
      <View style={styles.overlay} />
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* --- Topo (Ícone e GestCondo) --- */}
        <View style={styles.topContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="person-add-outline" size={40} color="#20B2AA" /> {/* Ícone de adicionar pessoa */}
          </View>
          <Text style={styles.gestCondoTitle}>GestCondo</Text>
        </View>

        {/* --- Box Central Branca (Formulário de Cadastro) --- */}
        <View style={styles.registerBox}> 
          <Text style={styles.registerTitle}>Cadastrar Conta</Text>

          <TextInput
            style={styles.input}
            placeholder="Usuário" // <<< ALTERADO: Placeholder para 'Usuário' >>>
            placeholderTextColor="#888"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmar Senha"
            placeholderTextColor="#888"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {success ? <Text style={styles.successText}>{success}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Cadastrar</Text>
            )}
          </TouchableOpacity>
          
          {/* --- Link "Já tem conta?" --- */}
          <TouchableOpacity onPress={() => router.replace('/(auth)/Login')} style={styles.loginLinkContainer}>
            <Text style={styles.loginText}>Já tem conta? <Text style={styles.loginLink}>Faça login</Text></Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  solidBackground: {
    flex: 1, backgroundColor: '#003366',
  },

  scrollContainer: {
    flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40, paddingHorizontal: 20,
  },
  topContainer: { alignItems: 'center', marginBottom: 20 },
  iconCircle: { backgroundColor: '#fff', borderRadius: 50, width: 100, height: 100, justifyContent: 'center', alignItems: 'center', marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 6 },
  gestCondoTitle: { fontSize: 38, fontWeight: 'bold', color: '#fff' },
  registerBox: { 
    width: '90%', maxWidth: 400, backgroundColor: '#fff', borderRadius: 20, padding: 30, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 5, elevation: 8,
  },
  registerTitle: { 
    fontSize: 32, fontWeight: 'bold', color: '#333', marginBottom: 30,
  },
  input: {
    width: '100%', backgroundColor: '#f0f0f0', padding: 15, borderRadius: 10, marginBottom: 20, fontSize: 16, color: '#333', borderWidth: 0, 
  },
  button: {
    width: '100%', backgroundColor: '#20B2AA', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10,
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  loginLinkContainer: { marginTop: 30 },
  loginText: { color: '#333', fontSize: 16, textAlign: 'center' },
  loginLink: { color: '#007bff', fontWeight: 'bold', textDecorationLine: 'underline' },
  errorText: { color: '#ff0000', marginBottom: 10, textAlign: 'center', fontSize: 14 },
  successText: { color: '#28a745', marginBottom: 10, textAlign: 'center', fontSize: 14 },
});