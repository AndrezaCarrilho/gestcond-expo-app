import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 


export default function CadastrarMoradorScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [apartment, setApartment] = useState('');
  const [block, setBlock] = useState('');
  const [initialPassword, setInitialPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegisterResident = async () => {
    setError('');
    setSuccess('');
    if (!fullName || !email || !cpf || !apartment || !block || !initialPassword) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setLoading(true);
    try {
      // ENDPOINT API DE CADASTRO DE MORADOR (ADMIN)


      setSuccess('Morador cadastrado com sucesso!');
      Alert.alert('Sucesso', 'Novo morador registrado!');
      router.back(); 
    } catch (err: any) {
      console.error('Erro no cadastro do morador:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Erro ao cadastrar morador. Tente novamente.');
      Alert.alert('Erro', err.response?.data?.message || 'Erro ao cadastrar morador.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.solidBackground}>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
       
        <View style={styles.topContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="person-add-outline" size={40} color="#20B2AA" />
          </View>
          <Text style={styles.gestCondoTitle}>GestCondo</Text>
        </View>

       
        <View style={styles.cadastrarMoradorBox}> 
          <Text style={styles.cadastrarMoradorTitle}>Cadastrar Morador</Text>

          <TextInput style={styles.input} placeholder="Nome Completo" placeholderTextColor="#888" value={fullName} onChangeText={setFullName} />
          <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#888" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <TextInput style={styles.input} placeholder="CPF" placeholderTextColor="#888" value={cpf} onChangeText={setCpf} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Telefone (Opcional)" placeholderTextColor="#888" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <TextInput style={styles.input} placeholder="Apartamento" placeholderTextColor="#888" value={apartment} onChangeText={setApartment} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Bloco/Torre" placeholderTextColor="#888" value={block} onChangeText={setBlock} />
          <TextInput style={styles.input} placeholder="Senha Inicial" placeholderTextColor="#888" value={initialPassword} onChangeText={setInitialPassword} secureTextEntry />
          
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {success ? <Text style={styles.successText}>{success}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleRegisterResident} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Cadastrar Morador</Text>
            )}
          </TouchableOpacity>
          
       
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
  cadastrarMoradorBox: { 
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
  cadastrarMoradorTitle: { 
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
