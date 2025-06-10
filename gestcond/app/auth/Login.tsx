
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ImageBackground, Alert } from 'react-native';
import { router } from 'expo-router'; // Importar o router do Expo Router
//import api from '../../../services/api'; // *** AJUSTE O CAMINHO DA API (agora 3 níveis acima) ***
import { useAuthStore } from './../../store/useAuthStore'; // *** AJUSTE O CAMINHO DO STORE (agora 3 níveis acima) ***

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const setAuth = useAuthStore((state) => state.setAuth);

  const handleLogin = async () => {
    setError('');
    // A validação de campos vazios foi removida para teste de fluxo, descomente na versão final
    // if (!email || !password) {
    //   setError('Por favor, preencha todos os campos.');
    //   return;
    // }

    setLoading(true);

    try {
      // --- ENDPOINT DA SUA API DE LOGIN ---
      // Lógica de API comentada para teste de fluxo, descomente e ajuste na versão final
      // const response = await api.post('/auth/login', { email, password }); 
      // const { token, user } = response.data; 
      // setAuth(token, user); 
      
      // Simulação de delay
      await new Promise(resolve => setTimeout(resolve, 1000)); 

      
      router.replace('./app/(app)/Dashboard'); 
 

    } catch (err: any) {
      console.error('Erro no login:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Credenciais inválidas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.solidBackground}>
      <View style={styles.overlay} /> 

      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#ccc" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
        <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#ccc" value={password} onChangeText={setPassword} secureTextEntry />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>
        
      
        <TouchableOpacity onPress={() => router.push('./app/auth/Register')}>
          <Text style={styles.registerText}>Não tem cadastro? Crie uma conta</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({ 
  solidBackground: {
    flex: 1,
    backgroundColor: '#1a202c',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    backgroundColor: '#007bff', 
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#fff',
    marginTop: 20,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  errorText: {
    color: '#ffdddd',
    marginBottom: 10,
    textAlign: 'center',
  },
});