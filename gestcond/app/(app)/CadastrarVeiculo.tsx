// app/(app)/CadastrarVeiculo.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router'; // Importar o router do Expo Router
import { Ionicons } from '@expo/vector-icons'; // Importar Ionicons para o ícone

export default function CadastrarVeiculoScreen() {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [plate, setPlate] = useState('');
  const [color, setColor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegisterVehicle = async () => {
    setError('');
    setSuccess('');
    if (!brand || !model || !plate || !color) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);
    try {
      // --- ENDPOINT DA SUA API DE CADASTRO DE VEÍCULO ---
      // Lógica de API comentada para teste, descomente e ajuste na versão final
      // const response = await api.post('/veiculos', { 
      //   brand, model, plate, color,
      //   // Inclua outros campos que sua API espera (ex: idMorador)
      // });

      setSuccess('Veículo cadastrado com sucesso!');
      Alert.alert('Sucesso', 'Veículo registrado!');
      router.back(); // Volta para a tela anterior (Dashboard/Home)
    } catch (err: any) {
      console.error('Erro no cadastro do veículo:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Erro ao cadastrar veículo. Tente novamente.');
      Alert.alert('Erro', err.response?.data?.message || 'Erro ao cadastrar veículo.');
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
            <Ionicons name="car-outline" size={40} color="#20B2AA" /> {/* Ícone de carro */}
          </View>
          <Text style={styles.gestCondoTitle}>GestCondo</Text>
        </View>

        {/* --- Box Central Branca (Formulário de Cadastro) --- */}
        <View style={styles.cadastrarVeiculoBox}> {/* Novo nome para o estilo da caixa central */}
          <Text style={styles.cadastrarVeiculoTitle}>Cadastrar Veículo</Text>

          <TextInput
            style={styles.input}
            placeholder="Marca"
            placeholderTextColor="#888"
            value={brand}
            onChangeText={setBrand}
          />
          <TextInput
            style={styles.input}
            placeholder="Modelo"
            placeholderTextColor="#888"
            value={model}
            onChangeText={setModel}
          />
          <TextInput
            style={styles.input}
            placeholder="Placa"
            placeholderTextColor="#888"
            value={plate}
            onChangeText={setPlate}
            autoCapitalize="characters" // Placa geralmente em maiúsculas
          />
          <TextInput
            style={styles.input}
            placeholder="Cor"
            placeholderTextColor="#888"
            value={color}
            onChangeText={setColor}
          />
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {success ? <Text style={styles.successText}>{success}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleRegisterVehicle} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Cadastrar Veículo</Text>
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
  cadastrarVeiculoBox: { // Estilo para a caixa central
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
  cadastrarVeiculoTitle: { // Título da tela
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