import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CadastrarEncomendasScreen() {
  const [description, setDescription] = useState('');
  const [sender, setSender] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegisterEncomenda = async () => {
    setError('');
    setSuccess('');
    if (!description || !sender || !arrivalDate || !status) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);
    try {
     

      setSuccess('Encomenda registrada com sucesso!');
      Alert.alert('Sucesso', 'Encomenda registrada!');
      router.back(); 
    } catch (err: any) {
      console.error('Erro no registro da encomenda:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Erro ao registrar encomenda. Tente novamente.');
      Alert.alert('Erro', err.response?.data?.message || 'Erro ao registrar encomenda.');
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
            <Ionicons name="cube-outline" size={40} color="#20B2AA" /> {/* Ícone de cubo/encomenda */}
          </View>
          <Text style={styles.gestCondoTitle}>GestCondo</Text>
        </View>

        <View style={styles.cadastrarEncomendasBox}> {/* Novo nome para o estilo da caixa central */}
          <Text style={styles.cadastrarEncomendasTitle}>Registrar Encomenda</Text>

          <TextInput style={styles.input} placeholder="Descrição da Encomenda" placeholderTextColor="#888" value={description} onChangeText={setDescription} />
          <TextInput style={styles.input} placeholder="Remetente" placeholderTextColor="#888" value={sender} onChangeText={setSender} />
          <TextInput style={styles.input} placeholder="Data de Chegada (DD/MM/AAAA)" placeholderTextColor="#888" value={arrivalDate} onChangeText={setArrivalDate} keyboardType="numbers-and-punctuation" />
          <TextInput style={styles.input} placeholder="Status (Ex: Pendente, Entregue)" placeholderTextColor="#888" value={status} onChangeText={setStatus} />
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {success ? <Text style={styles.successText}>{success}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleRegisterEncomenda} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Registrar Encomenda</Text>
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
    backgroundColor: '#003366',
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
  cadastrarEncomendasBox: {
    width: '95%', 
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
  cadastrarEncomendasTitle: {
    fontSize: 30, 
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
    backgroundColor: '#20B2AA',
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
