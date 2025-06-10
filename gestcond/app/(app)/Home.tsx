// app/(app)/index.tsx (se for sua nova Home principal)
// OU app/(app)/Home.tsx (se for uma Home separada do index)

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/useAuthStore'; // *** AJUSTADO: CAMINHO SIMPLIFICADO para a estrutura corrigida ***
// import api from '../../services/api'; // *** AJUSTADO: CAMINHO SIMPLIFICADO (descomente quando usar) ***

interface Delivery { // Adapte esta interface ou remova se não for usar entregas aqui
  id: string;
  description: string;
  status: string;
}

export default function HomeScreen() { // Renomeado para HomeScreen se for Home.tsx
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth); 
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loadingDeliveries, setLoadingDeliveries] = useState(false);
  const [errorDeliveries, setErrorDeliveries] = useState('');

  const handleLogout = () => {
    clearAuth(); 
    router.replace('../(auth)/Login'); // *** AJUSTADO: Caminho simplificado para o Login ***
  };

  useEffect(() => {
    // Lógica para carregar dados (Entregas, etc.)
  }, [user]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={28} color="#20B2AA" />
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>

      <Text style={styles.greeting}>Olá, {user?.name || 'Morador'}!</Text>

      <Text style={styles.sectionTitle}>Navegação Principal</Text>
      <View style={styles.grid}>
        {/* EXEMLOS DE BOTÕES DE NAVEGAÇÃO, AGORA COM CAMINHOS SIMPLIFICADOS */}
        {/* Botão para Entregas (CadastrarEncomendas.tsx) */}
        <TouchableOpacity 
          style={styles.gridItem} 
          onPress={() => router.push('./CadastrarEncomendas')} 
        >
          <Ionicons name="cube-outline" size={40} color="#20B2AA" />
          <Text style={styles.gridItemText}>Encomendas</Text>
        </TouchableOpacity>

        {/* Botão para Reservar Espaço (ReservarEspaco.tsx) */}
        <TouchableOpacity 
          style={styles.gridItem} 
          onPress={() => router.push('./ReservarEspaco')} 
        >
          <Ionicons name="calendar-outline" size={40} color="#20B2AA" /> 
          <Text style={styles.gridItemText}>Reservar Espaço</Text>
        </TouchableOpacity>

        {/* Botão para Cadastrar Visitas (CadastrarVisitas.tsx) */}
        <TouchableOpacity 
          style={styles.gridItem} 
          onPress={() => router.push('./CadastrarVisitas')} 
        >
          <Ionicons name="person-outline" size={40} color="#20B2AA" /> 
          <Text style={styles.gridItemText}>Cad. Visitas</Text>
        </TouchableOpacity>

        {/* Botão para Cadastro de Veículo (CadastrarVeiculo.tsx) */}
        <TouchableOpacity 
          style={styles.gridItem} 
          onPress={() => router.push('./CadastrarVeiculo')} 
        >
          <Ionicons name="car-outline" size={40} color="#20B2AA" />
          <Text style={styles.gridItemText}>Cad. Veículo</Text>
        </TouchableOpacity>

        {/* Botão para Cadastro de Morador (CadastrarMorador.tsx) */}
        <TouchableOpacity 
          style={styles.gridItem} 
          onPress={() => router.push('./CadastrarMorador')} 
        >
          <Ionicons name="person-add-outline" size={40} color="#20B2AA" />
          <Text style={styles.gridItemText}>Cad. Morador</Text>
        </TouchableOpacity>

        {/* Botão para Sobre a Equipe (Sobre.tsx) */}
        <TouchableOpacity 
          style={styles.gridItem} 
          onPress={() => router.push('.//Sobre')} 
        >
          <Ionicons name="people-outline" size={40} color="#20B2AA" />
          <Text style={styles.gridItemText}>Sobre</Text>
        </TouchableOpacity>
      </View>

      {/* Seção de Entregas Recentes ou outro conteúdo */}
      <Text style={styles.sectionTitle}>Minhas Entregas Recentes</Text>
      {loadingDeliveries ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : errorDeliveries ? (
        <Text style={styles.errorText}>{errorDeliveries}</Text>
      ) : deliveries.length === 0 ? (
        <Text style={styles.noDataText}>Nenhuma entrega recente.</Text>
      ) : (
        <ScrollView style={styles.deliveryList}>
          {deliveries.map((delivery) => (
            <View key={delivery.id} style={styles.deliveryItem}>
              <Text style={styles.deliveryDescription}>{delivery.description}</Text>
              <Text style={styles.deliveryStatus}>Status: {delivery.status}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
    paddingTop: 80,
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcdcdc',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  logoutButtonText: {
    marginLeft: 5,
    color: '#20B2AA',
    fontWeight: 'bold',
  },
  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 20,
    marginBottom: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridItem: {
    width: '45%',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gridItemText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  deliveryList: {
    maxHeight: 200,
  },
  deliveryItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#007bff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  deliveryDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  deliveryStatus: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#777',
  },
});