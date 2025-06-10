// app/(app)/CadastrarVisitas.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router'; // Importar o router do Expo Router
import { Ionicons } from '@expo/vector-icons'; // Importar Ionicons para o ícone
// import api from '../../services/api'; // Ajuste o caminho

export default function CadastrarVisitasScreen() {
  const [visitorName, setVisitorName] = useState('');
  const [visitorCpf, setVisitorCpf] = useState('');
  const [aptBlockVisited, setAptBlockVisited] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegisterVisit = async () => {
    setError('');
    setSuccess('');
    if (!visitorName || !visitorCpf || !aptBlockVisited || !visitDate || !visitTime) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);
    try {
      // --- ENDPOINT DA SUA API DE CADASTRO DE VISITA ---
      // Lógica de API comentada para teste
      // const response = await api.post('/visitas', { 
      //   visitorName, visitorCpf, aptBlockVisited, visitDate, visitTime,
      //   // Inclua outros campos que sua API espera
      // });

      setSuccess('Visita registrada com sucesso!');
      Alert.alert('Sucesso', 'Visita registrada!');
      router.back(); 
    } catch (err: any) {
      console.error('Erro no registro da visita:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Erro ao registrar visita. Tente novamente.');
      Alert.alert('Erro', err.response?.data?.message || 'Erro ao registrar visita.');
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
            <Ionicons name="walk-outline" size={40} color="#20B2AA" /> {/* Ícone de pessoa andando */}
          </View>
          <Text style={styles.gestCondoTitle}>GestCondo</Text>
        </View>

        {/* --- Box Central Branca (Formulário de Cadastro) --- */}
        <View style={styles.cadastrarVisitasBox}> {/* Novo nome para o estilo da caixa central */}
          <Text style={styles.cadastrarVisitasTitle}>Registrar Visita</Text>

          <TextInput style={styles.input} placeholder="Nome do Visitante" placeholderTextColor="#888" value={visitorName} onChangeText={setVisitorName} />
          <TextInput style={styles.input} placeholder="CPF do Visitante" placeholderTextColor="#888" value={visitorCpf} onChangeText={setVisitorCpf} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Apto/Bloco Visitado" placeholderTextColor="#888" value={aptBlockVisited} onChangeText={setAptBlockVisited} />
          <TextInput style={styles.input} placeholder="Data da Visita (DD/MM/AAAA)" placeholderTextColor="#888" value={visitDate} onChangeText={setVisitDate} keyboardType="numbers-and-punctuation" />
          <TextInput style={styles.input} placeholder="Hora da Visita (HH:MM)" placeholderTextColor="#888" value={visitTime} onChangeText={setVisitTime} keyboardType="numbers-and-punctuation" />
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {success ? <Text style={styles.successText}>{success}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleRegisterVisit} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Registrar Visita</Text>
            )}
          </TouchableOpacity>
          
          {/* Botão de Voltar (APENAS ÍCONE) */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backButtonIconOnly}>
            <Ionicons name="arrow-back-outline" size={30} color="#20B2AA" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  solidBackground: {
    flex: 1,
    backgroundColor: '#003366', // Cor exata do protótipo
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  topContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconCircle: {
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 100,
    height: 100,
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
  cadastrarVisitasBox: { // Estilo para a caixa central
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
  cadastrarVisitasTitle: { // Título da tela
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
    borderWidth: 0, 
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
  backButtonIconOnly: {
    marginTop: 15,
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#f0f0f0', 
  },
  errorText: {
    color: '#ff0000',
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 14,
  },
  successText: {
    color: '#28a745',
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 14,
  },
});