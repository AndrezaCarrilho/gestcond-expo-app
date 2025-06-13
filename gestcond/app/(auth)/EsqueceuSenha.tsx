// app/(auth)/EsqueceuSenha.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// import api from '../../services/api'; // Ajuste o caminho

export default function EsqueceuSenhaScreen() {
  const [emailOrCpf, setEmailOrCpf] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRecoverPassword = async () => {
    setError('');
    setSuccess('');
    if (!emailOrCpf) {
      setError('Por favor, preencha seu e-mail ou CPF.');
      return;
    }

    setLoading(true);
    try {
      // --- ENDPOINT DA SUA API DE RECUPERAÇÃO DE SENHA ---
      // Lógica de API comentada para teste.
      // await api.post('/auth/recover-password', { emailOrCpf });

      setSuccess('Instruções enviadas para seu e-mail/celular!');
      Alert.alert('Sucesso', 'Verifique seu e-mail ou celular para as instruções de recuperação.');
      router.replace('/(auth)/Login'); // Volta para a tela de login após enviar
    } catch (err: any) {
      console.error('Erro na recuperação de senha:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Erro ao recuperar senha. Tente novamente.');
      Alert.alert('Erro', err.response?.data?.message || 'Erro ao recuperar senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.solidBackground}>
    
      
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* --- Topo (Ícone e GestCondo) --- */}
        <View style={styles.topContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="key-outline" size={40} color="#20B2AA" /> {/* Ícone de chave */}
          </View>
          <Text style={styles.gestCondoTitle}>GestCondo</Text>
        </View>

        {/* --- Box Central Branca (Formulário) --- */}
        <View style={styles.passwordRecoveryBox}>
          <Text style={styles.passwordRecoveryTitle}>Esqueceu a Senha?</Text>
          <Text style={styles.instructionText}>
            Informe seu e-mail ou CPF para receber instruções de recuperação.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="E-mail ou CPF"
            placeholderTextColor="#888"
            value={emailOrCpf}
            onChangeText={setEmailOrCpf}
            autoCapitalize="none"
          />
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {success ? <Text style={styles.successText}>{success}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleRecoverPassword} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Recuperar Senha</Text>
            )}
          </TouchableOpacity>
          
          {/* Botão de Voltar */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backLinkContainer}>
            <Text style={styles.backLinkText}>Voltar ao Login</Text>
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
  passwordRecoveryBox: { // Estilo para a caixa central
    width: '98%', maxWidth: 400, backgroundColor: '#fff', borderRadius: 20, padding: 30, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 5, elevation: 8,
  },
  passwordRecoveryTitle: { fontSize: 30, fontWeight: 'bold', color: '#333', marginBottom: 20, textAlign: 'center' },
  instructionText: { fontSize: 16, color: '#666', marginBottom: 30, textAlign: 'center' },
  input: { width: '100%', backgroundColor: '#f0f0f0', padding: 15, borderRadius: 10, marginBottom: 20, fontSize: 16, color: '#333', borderWidth: 0 },
  button: { width: '100%', backgroundColor: '#20B2AA', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  backLinkContainer: { marginTop: 30 },
  backLinkText: { color: '#007bff', fontSize: 16, textDecorationLine: 'underline' },
  errorText: { color: '#ff0000', marginBottom: 10, textAlign: 'center', fontSize: 14 },
  successText: { color: '#28a745', marginBottom: 10, textAlign: 'center', fontSize: 14 },
});