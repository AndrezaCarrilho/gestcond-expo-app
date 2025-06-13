// app/(main)/listagens/Veiculos.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import api from '../../../services/api'; 

interface Veiculo {
  id: string;
  marca: string;
  modelo: string;
  placa: string;
}

const DUMMY_VEICULOS: Veiculo[] = [
  { id: 'VCL1', marca: 'VW', modelo: 'Gol', placa: 'ABC-1234', morador: 'João Silva' },
  { id: 'VCL2', marca: 'Fiat', modelo: 'Palio', placa: 'DEF-5678', morador: 'Maria Santos' },
  { id: 'VCL3', marca: 'GM', modelo: 'Onix', placa: 'GHI-9012', morador: 'Carlos Pereira' },
  { id: 'VCL4', marca: 'Ford', modelo: 'Ka', placa: 'JKL-3456', morador: 'Ana Costa' },
  { id: 'VCL5', marca: 'Honda', modelo: 'Civic', placa: 'MNO-7890', morador: 'Pedro Lima' },
  { id: 'VCL6', marca: 'Toyota', modelo: 'Corolla', placa: 'PQR-1234', morador: 'Sofia Almeida' },
];

export default function VeiculosListScreen() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>(DUMMY_VEICULOS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  useEffect(() => {
  
     const fetchVeiculos = async () => {
      setLoading(true);
      setError('');
    try {
        const response = await api.get('/vehicles'); 
          setVeiculos(response.data);
       } catch (err: any) {
         console.error('Erro ao buscar veículos:', err.response?.data || err.message);
         setError('Não foi possível carregar a lista de veículos.');
       } finally {
         setLoading(false);
      }
     };
     fetchVeiculos();
  }, []);

  const filteredVeiculos = veiculos.filter(veiculo => 
    veiculo.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    veiculo.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    veiculo.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    veiculo.morador.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredVeiculos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVeiculos = filteredVeiculos.slice(startIndex, endIndex);

  const renderItem = ({ item }: { item: Veiculo }) => (
    <View style={styles.listItemCard}>
      <Text style={styles.listItemTitle}>{item.marca} - {item.modelo}</Text>
      <Text style={styles.listItemInfo}>Placa: {item.placa}</Text>
      <Text style={styles.listItemInfo}>Morador: {item.morador}</Text>
    </View>
  );

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

        {/* --- Box Central Branca (Lista de Veículos) --- */}
        <View style={styles.listContainerBox}>
          <Text style={styles.listTitle}>Lista de Veículos</Text>
          
          {/* Barra de Pesquisa com Ícone */}
          <View style={styles.searchInputContainer}>
            <Ionicons name="search-outline" size={20} color="#20B2AA" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar por marca, modelo ou placa"
              placeholderTextColor="#888"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : currentVeiculos.length === 0 && searchTerm ? (
            <Text style={styles.noDataText}>Nenhum veículo encontrado para a pesquisa.</Text>
          ) : currentVeiculos.length === 0 && !searchTerm ? (
            <Text style={styles.noDataText}>Nenhum veículo cadastrado.</Text>
          ) : (
            <FlatList
              data={currentVeiculos}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.flatListContent}
              scrollEnabled={false}
            />
          )}

          {/* Controles de Paginação */}
          {totalPages > 1 && (
            <View style={styles.paginationControls}>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <Ionicons name="chevron-back-outline" size={20} color="#fff" /> {/* Ícone Anterior */}
              </TouchableOpacity>
              <Text style={styles.paginationInfo}>Página {currentPage} de {totalPages}</Text>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <Ionicons name="chevron-forward-outline" size={20} color="#fff" /> {/* Ícone Próxima */}
              </TouchableOpacity>
            </View>
          )}

          {/* Botão para Cadastrar Novo Veículo */}
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={() => router.push('../cadastros/CadastrarVeiculo')} // Navega para a tela de cadastro
          >
            <Ionicons name="add-circle-outline" size={28} color="#fff" />
            <Text style={styles.addButtonText}>Cadastrar Novo Veículo</Text>
          </TouchableOpacity>
          
          {/* Botão de Voltar (APENAS ÍCONE - Bolinha) */}
          <TouchableOpacity onPress={() => router.back()} style={styles.backButtonIconOnly}>
            <Ionicons name="arrow-back-outline" size={30} color="#20B2AA" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  solidBackground: { flex: 1, backgroundColor: '#003366' },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40, paddingHorizontal: 20 },
  topContainer: { alignItems: 'center', marginBottom: 20 },
  iconCircle: { backgroundColor: '#fff', borderRadius: 50, width: 100, height: 100, justifyContent: 'center', alignItems: 'center', marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 6 },
  gestCondoTitle: { fontSize: 38, fontWeight: 'bold', color: '#fff' },
  listContainerBox: {
    width: '95%', maxWidth: 400, backgroundColor: '#fff', borderRadius: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 5, elevation: 8,
  },
  listTitle: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 20, textAlign: 'center' },
  searchInputContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: 10, marginBottom: 20, width: '100%', paddingHorizontal: 10,
  },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 16, color: '#333' },
  searchIcon: { marginRight: 10 },
  flatListContent: { width: '100%' },
  listItemCard: { // Estilo para cada item da lista
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  listItemTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  listItemInfo: { fontSize: 14, color: '#666' },
  addButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#20B2AA', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, marginTop: 20, marginBottom: 10,
  },
  addButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 21 },
  paginationControls: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 10, marginBottom: 20,
  },
  paginationButton: { backgroundColor: '#20B2AA', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 8 },
  paginationButtonText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  paginationInfo: { fontSize: 15, color: '#555', fontWeight: 'bold' },
  backButtonIconOnly: {
    marginTop: 15, padding: 10, borderRadius: 50, backgroundColor: '#f0f0f0', alignItems: 'center'
  },
  errorText: { color: '#ff0000', marginBottom: 10, textAlign: 'center', fontSize: 14 },
  successText: { color: '#28a745', marginBottom: 10, textAlign: 'center', fontSize: 14 },
  noDataText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#777' },
});