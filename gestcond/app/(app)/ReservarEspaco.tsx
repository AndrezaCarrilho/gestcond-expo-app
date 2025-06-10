import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router'; 
import { Ionicons } from '@expo/vector-icons'; 

export default function ReservarEspacoScreen() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [area, setArea] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleReserveSpace = async () => {
    setError('');
    setSuccess('');
    if (!date || !time || !area) {
      setError('Por favor, preencha a data, hora e área.');
      return;
    }

    setLoading(true);
    try {

      setSuccess('Reserva realizada com sucesso!');
      Alert.alert('Sucesso', 'Seu espaço foi reservado!');
      router.back(); 
    } catch (err: any) {
      console.error('Erro na reserva:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Erro ao reservar espaço. Tente novamente.');
      Alert.alert('Erro', err.response?.data?.message || 'Erro ao reservar espaço.');
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
            <Ionicons name="calendar-outline" size={40} color="#20B2AA" /> 
          </View>
          <Text style={styles.gestCondoTitle}>GestCondo</Text>
        </View>

        {/* --- Box Central Branca (Formulário de Reserva) --- */}
        <View style={styles.reserveSpaceBox}> 
          <Text style={styles.reserveSpaceTitle}>Reservar Espaço</Text>

          <TextInput
            style={styles.input}
            placeholder="Data (DD/MM/AAAA)"
            placeholderTextColor="#888"
            value={date}
            onChangeText={setDate}
            keyboardType="numbers-and-punctuation"
          />
          <TextInput
            style={styles.input}
            placeholder="Hora (HH:MM)"
            placeholderTextColor="#888"
            value={time}
            onChangeText={setTime}
            keyboardType="numbers-and-punctuation"
          />
          <TextInput
            style={styles.input}
            placeholder="Área a Reservar (Ex: Salão de Festas)"
            placeholderTextColor="#888"
            value={area}
            onChangeText={setArea}
          />
          <TextInput
            style={[styles.input, { height: 100, textAlignVertical: 'top' }]} 
            placeholder="Observações (Opcional)"
            placeholderTextColor="#888"
            value={description}
            onChangeText={setDescription}
            multiline={true}
          />
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {success ? <Text style={styles.successText}>{success}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleReserveSpace} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Confirmar Reserva</Text>
            )}
          </TouchableOpacity>
          
          {/* Botão de Voltar (COM CORREÇÃO PARA O TEXTO) */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backButtonIconOnly}>
            <Ionicons name="arrow-back-outline" size={30} color="#20B2AA" /> {/* Ícone maior */}
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
  reserveSpaceBox: { 
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
   backButtonIconOnly: {
    marginTop: 15,
    padding: 10,
    borderRadius: 50, // Faz o fundo ser um círculo se quiser
    backgroundColor: '#f0f0f0', // Opcional: para ter um fundo no ícone
  },
  reserveSpaceTitle: { 
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
  backLinkContainer: { 
    marginTop: 30,
  },
  backLinkText: {
    color: '#007bff',
    fontSize: 16,
    textDecorationLine: 'underline',
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
