import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


interface Encomenda {
  id: string;
  descricao: string;
  remetente: string;
  dataChegada: string; 
  status: string;
  hora?: string; 
}

const DUMMY_ENCOMENDAS: Encomenda[] = [
  { id: 'E1', descricao: 'Pacote Amazon', remetente: 'Amazon', dataChegada: '05/06/2025', status: 'Entregue', hora: '10:00' },
  { id: 'E2', descricao: 'Documentos', remetente: 'Correios', dataChegada: '08/06/2025', status: 'Pendente', hora: '14:00' },
  { id: 'E3', descricao: 'Eletrônico', remetente: 'Magalu', dataChegada: '10/06/2025', status: 'Em Rota' },
  { id: 'E4', descricao: 'Roupas', remetente: 'Shein', dataChegada: '12/06/2025', status: 'Disponível' },
  { id: 'E5', descricao: 'Livro', remetente: 'Saraiva', dataChegada: '13/06/2025', status: 'Pendente' },
  { id: 'E6', descricao: 'Alimento', remetente: 'iFood', dataChegada: '14/06/2025', status: 'Entregue' },
];

export default function EncomendasListScreen() {
  const [encomendas, setEncomendas] = useState<Encomenda[]>(DUMMY_ENCOMENDAS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
   

  const filteredEncomendas = encomendas.filter((encomenda: Encomenda) => 
    encomenda.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
    encomenda.remetente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    encomenda.dataChegada.includes(searchTerm) 
  );

  const totalPages = Math.ceil(filteredEncomendas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEncomendas = filteredEncomendas.slice(startIndex, endIndex);

  const renderItem = ({ item }: { item: Encomenda }) => (
    <View style={styles.listItemCard}>
      <Text style={styles.listItemTitle}>{item.descricao}</Text>
      <Text style={styles.listItemInfo}>Remetente: {item.remetente}</Text>
      <Text style={styles.listItemInfo}>Chegada: {item.dataChegada} - Status: {item.status} {item.hora ? `(${item.hora})` : ''}</Text>
    </View>
  );

  return (
    <View style={styles.solidBackground}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
    
        <View style={styles.topContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="cube-outline" size={40} color="#20B2AA" />
          </View>
          <Text style={styles.gestCondoTitle}>GestCondo</Text>
        </View>

    
        <View style={styles.listContainerBox}> {/* Este é o container da lista */}
          <Text style={styles.listTitle}>Lista de Encomendas</Text>
          
         
          <View style={styles.searchInputContainer}>
            <Ionicons name="search-outline" size={20} color="#20B2AA" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar por descrição ou remetente"
              placeholderTextColor="#888"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : currentEncomendas.length === 0 && searchTerm ? (
            <Text style={styles.noDataText}>Nenhuma encomenda encontrada para a pesquisa.</Text>
          ) : currentEncomendas.length === 0 && !searchTerm ? (
            <Text style={styles.noDataText}>Nenhuma encomenda cadastrada.</Text>
          ) : (
            <FlatList
              data={currentEncomendas}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.flatListContent}
              scrollEnabled={false}
            />
          )}

        
          {totalPages > 1 && (
            <View style={styles.paginationControls}>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <Ionicons name="chevron-back-outline" size={20} color="#fff" />
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

         
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={() => router.push('../cadastros/CadastrarEncomendas')}
          >
            <Ionicons name="add-circle-outline" size={28} color="#fff" />
            <Text style={styles.addButtonText}>Nova Encomenda</Text>
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
  solidBackground: { flex: 1, backgroundColor: '#003366' },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 40, paddingHorizontal: 20 },
  topContainer: { alignItems: 'center', marginBottom: 20 },
  iconCircle: { backgroundColor: '#fff', borderRadius: 50, width: 100, height: 100, justifyContent: 'center', alignItems: 'center', marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5, elevation: 6 },
  gestCondoTitle: { fontSize: 38, fontWeight: 'bold', color: '#fff' },
  listContainerBox: { 
    width: '95%', 
    maxWidth: 400,
    backgroundColor: '#fff', borderRadius: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 5, elevation: 8,
  },
  listTitle: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 20, textAlign: 'center' },
  searchInputContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: 10, marginBottom: 20, width: '100%', paddingHorizontal: 10,
  },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 16, color: '#333' },
  searchIcon: { marginRight: 10 },
  flatListContent: { width: '100%' },
  listItemCard: {
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
  addButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 38 },
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
