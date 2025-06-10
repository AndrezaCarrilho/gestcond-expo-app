// app/auth/Register.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router'; // Importar o router do Expo Router
import { Ionicons } from '@expo/vector-icons'; // Importar Ionicons para o ícone de prédio
//import api from '../../services/api'; // Ajuste o caminho
// api from '../../services/api'; // Ajuste o caminho
import { useAuthStore } from '../../store/useAuthStore'; // Ajuste o caminho

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async () => {
    setError('');
    setSuccess('');
    if (!fullName || !email || !cpf || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    if (password !== confirmPassword) {
      setError('As senhas não coincidem!');
      return;
    }

    setLoading(true);
    try {
      // API de cadastro comentada para teste
      // const response = await api.post('/auth/register', { 
      //   fullName, 
      //   email, 
      //   cpf, 
      //   password,
      // });

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
    // Fundo azul escuro sólido
    <View style={styles.solidBackground}>
      
      
      {/* ScrollView principal para o conteúdo */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* --- Topo (Ícone e GestCondo) --- */}
        <View style={styles.topContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="business-outline" size={40} color="#20B2AA" /> {/* Ícone de prédio */}
          </View>
          <Text style={styles.gestCondoTitle}>GestCondo</Text>
        </View>

        {/* --- Box Central Branca (Formulário de Cadastro) --- */}
        <View style={styles.registerBox}> {/* Novo nome para o estilo da caixa central */}
          <Text style={styles.registerTitle}>Cadastrar Conta</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            placeholderTextColor="#888"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="CPF"
            placeholderTextColor="#888"
            value={cpf}
            onChangeText={setCpf}
            keyboardType="numeric"
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
    flex: 1,
    backgroundColor: '#001f3f', // Azul bem escuro (igual ao Login)
  },
  scrollContainer: {
    flexGrow: 1, // *** ESSENCIAL: Permite que o conteúdo da ScrollView cresça ***
    justifyContent: 'center', // *** MUDANÇA AQUI: Centraliza o conteúdo verticalmente ***
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
    paddingVertical: 40, // Padding para cima e para baixo
    paddingHorizontal: 20,
  },
  topContainer: {
    alignItems: 'center',
    marginBottom: 20, // Espaço entre o topo e a caixa de cadastro
  },
  iconCircle: {
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 80,
    height:80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  gestCondoTitle: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#fff',
  },
  registerBox: { // Sua caixa central de cadastro
    width: '98%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 8,
  },
  registerTitle: {
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
    backgroundColor: '#20B2AA', // Verde (igual ao Login)
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
  loginLinkContainer: {
    marginTop: 30, // Espaço após o botão de cadastro
  },
  loginText: {
    color: '#333', // Cor escura para o texto "Já tem conta?"
    fontSize: 16,
    textAlign: 'center',
  },
  loginLink: {
    color: '#007bff',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: '#ff0000', // Vermelho para erro
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 14,
  },
  successText: {
    color: '#28a745', // Verde para sucesso
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 14,
  },
});