// app/app/(app)/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router } from 'expo-router'; 
import { Ionicons } from '@expo/vector-icons'; 
import { useAuthStore } from './../../store/useAuthStore'; 
// import api from '../../../../services/api'; 


interface Delivery {
  id: string;
  description: string;
  status: string;
}

export default function DashboardScreen() {
  const user = useAuthStore((state) => state.user); // Pega os dados do usuário do Zustand
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loadingDeliveries, setLoadingDeliveries] = useState(false);
  const [errorDeliveries, setErrorDeliveries] = useState('');

  // Exemplo de como carregar dados da API (descomente e ajuste quando for integrar)
  useEffect(() => {
    // const fetchDeliveries = async () => {
    //   setLoadingDeliveries(true);
    //   setErrorDeliveries('');
    //   try {
    //     // const response = await api.get(`/deliveries?moradorId=${user?.id}`); 
    //     // setDeliveries(response.data);
    //     await new Promise(resolve => setTimeout(resolve, 1500)); // Simular delay
    //     setDeliveries([
    //         { id: '1', description: 'Pacote Amazon', status: 'Entregue' },
    //         { id: '2', description: 'Correspondência', status: 'Pendente' },
    //     ]); // Dados de simulação
    //   } catch (err: any) {
    //     console.error('Erro ao buscar entregas:', err.response?.data || err.message);
    //     setErrorDeliveries('Não foi possível carregar as entregas.');
    //   } finally {
    //     setLoadingDeliveries(false);
    //   }
    // };
    // fetchDeliveries();
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Olá, {user?.name || 'Morador'}!</Text>
      
      <Text style={styles.sectionTitle}>Navegação Rápida</Text>
      <View style={styles.grid}>
      
        {/* Botão para Cadastro de Bloco/Torre */}
        <TouchableOpacity 
          style={styles.gridItem} 
          onPress={() => router.push('../app/(app)/CadastrarBloco')} // *** ROTA AJUSTADA ***
        >
          <Ionicons name="business-outline" size={40} color="#007bff" />
          <Text style={styles.gridItemText}>Cad. Bloco</Text>
        </TouchableOpacity>

        {/* Botão para Cadastro de Condomínio */}
        <TouchableOpacity 
          style={styles.gridItem} 
          onPress={() => router.push('../app/(app)/CadastrarCondominio')} 
        >
          <Ionicons name="building-outline" size={40} color="#007bff" />
          <Text style={styles.gridItemText}>Cad. Condomínio</Text>
        </TouchableOpacity>

        {/* Botão para Cadastro de Veículo */}
        <TouchableOpacity 
          style={styles.gridItem} 
          onPress={() => router.push('../app/(app)/CadastrarVeiculo')} 
        >
          <Ionicons name="car-outline" size={40} color="#007bff" />
          <Text style={styles.gridItemText}>Cad. Veículo</Text>
        </TouchableOpacity>

        {/* Botão para Cadastro de Morador (Admin) */}
        <TouchableOpacity 
          style={styles.gridItem} 
          onPress={() => router.push('../app/(app)/CadastrarMorador')} // *** ROTA AJUSTADA ***
        >
          <Ionicons name="person-add-outline" size={40} color="#007bff" />
          <Text style={styles.gridItemText}>Cad. Morador</Text>
        </TouchableOpacity>

        {/* Botão para Sobre a Equipe */}
        <TouchableOpacity 
          style={styles.gridItem} 
          onPress={() => router.push('../app/(app)/Sobre')} // *** ROTA AJUSTADA ***
        >
          <Ionicons name="people-outline" size={40} color="#007bff" />
          <Text style={styles.gridItemText}>Sobre</Text>
        </TouchableOpacity>
      </View>

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
    backgroundColor: '#f8f8f8', // Fundo claro para a dashboard
    paddingTop: 50,
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
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
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