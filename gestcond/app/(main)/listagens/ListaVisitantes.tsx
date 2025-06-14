// app/(main)/listagens/Visitas.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// import api from '../../../../services/api'; // Mantenha este caminho (comentado)

interface Visita {
  id: string;
  nomeVisitante: string;
  aptoBloco: string;
  data: string;
  hora: string;
}

const DUMMY_VISITAS: Visita[] = [
  { id: 'V1', nomeVisitante: 'Amigo do Apto 101', aptoBloco: '101A', data: '10/06/2025', hora: '15:30' },
  { id: 'V2', nomeVisitante: 'Primo da Maria', aptoBloco: '203B', data: '10/06/2025', hora: '16:00' },
  { id: 'V3', nomeVisitante: 'Entregador', aptoBloco: 'Portaria', data: '11/06/2025', hora: '09:00' },
  { id: 'V4', nomeVisitante: 'Irmã do Pedro', aptoBloco: '502B', data: '11/06/2025', hora: '11:45' },
  { id: 'V5', nomeVisitante: 'Tia da Ana', aptoBloco: '401C', data: '12/06/2025', hora: '13:00' },
];

export default function VisitasListScreen() {
  const [visitas, setVisitas] = useState<Visita[]>(DUMMY_VISITAS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Mantendo 5 itens por página

  useEffect(() => {
    // *** PARTE DE CONEXÃO COM BACKEND - COMENTADA ***
    // const fetchVisitas = async () => {
    //   setLoading(true);
    //   setError('');
    //   try {
    //     // const response = await api.get('/visitas'); // Endpoint da sua API
    //     // setVisitas(response.data);
    //   } catch (err: any) {
    //     console.error('Erro ao buscar visitas:', err.response?.data || err.message);
    //     setError('Não foi possível carregar a lista de visitas.');
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchVisitas();
  }, []);

  const filteredVisitas = visitas.filter(visita => 
    visita.nomeVisitante.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visita.aptoBloco.toLowerCase().includes(searchTerm.toLowerCase()) ||
    visita.data.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredVisitas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVisitas = filteredVisitas.slice(startIndex, endIndex);

  const renderItem = ({ item }: { item: Visita }) => (
    <View style={styles.listItemCard}>
      <Text style={styles.listItemTitle}>{item.nomeVisitante}</Text>
      <Text style={styles.listItemInfo}>Apto/Bloco: {item.aptoBloco}</Text>
      <Text style={styles.listItemInfo}>Data: {item.data} - Hora: {item.hora}</Text>
    </View>
  );

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

        {/* --- Box Central Branca (Lista de Visitas) --- */}
        <View style={styles.listContainerBox}>
          <Text style={styles.listTitle}>Lista de Visitas</Text>
          
          {/* Barra de Pesquisa com Ícone */}
          <View style={styles.searchInputContainer}>
            <Ionicons name="search-outline" size={20} color="#20B2AA" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar por nome, apto ou data"
              placeholderTextColor="#888"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : currentVisitas.length === 0 && searchTerm ? (
            <Text style={styles.noDataText}>Nenhuma visita encontrada para a pesquisa.</Text>
          ) : currentVisitas.length === 0 && !searchTerm ? (
            <Text style={styles.noDataText}>Nenhuma visita cadastrada.</Text>
          ) : (
            <FlatList
              data={currentVisitas}
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

          {/* Botão para Cadastrar Nova Visita */}
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={() => router.push('../cadastros/CadastrarVisitas')}
          >
            <Ionicons name="add-circle-outline" size={28} color="#fff" />
            <Text style={styles.addButtonText}>Nova Visita</Text>
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
  addButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 60, alignItems: 'center' },
  paginationControls: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 10, marginBottom: 20,
  },
  paginationButton: { backgroundColor: '#007bff', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 8 },
  paginationButtonText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  paginationInfo: { fontSize: 15, color: '#555', fontWeight: 'bold' },
  backButtonIconOnly: {
    marginTop: 15, padding: 10, borderRadius: 50, backgroundColor: '#f0f0f0', alignItems: 'center'
  },
  errorText: { color: '#ff0000', marginBottom: 10, textAlign: 'center', fontSize: 14 },
  successText: { color: '#28a745', marginBottom: 10, textAlign: 'center', fontSize: 14 },
  noDataText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#777' },
});