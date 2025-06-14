// app/(main)/listagens/Reservas.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { router } from 'expo-router'; 
import { Ionicons } from '@expo/vector-icons';
// import api from '../../../../services/api'; 

interface Reserva {
  id: string;
  area: string;
  data: string;
  hora: string;
  morador: string;
}

const DUMMY_RESERVAS: Reserva[] = [
  { id: 'R1', area: 'Salão de Festas', data: '15/06/2025', hora: '19:00', morador: 'João Silva' },
  { id: 'R2', area: 'Churrasqueira', data: '20/06/2025', hora: '14:00', morador: 'Maria Santos' },
  { id: 'R3', area: 'Piscina', data: '22/06/2025', hora: '10:00', morador: 'Carlos Pereira' },
  { id: 'R4', area: 'Quadra Esportiva', data: '25/06/2025', hora: '18:00', morador: 'Ana Costa' },
  { id: 'R5', area: 'Salão de Jogos', data: '01/07/2025', hora: '20:00', morador: 'Pedro Lima' },
  { id: 'R6', area: 'Academia', data: '03/07/2025', hora: '08:00', morador: 'Sofia Almeida' },
];

export default function ReservasListScreen() {
  const [reservas, setReservas] = useState<Reserva[]>(DUMMY_RESERVAS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // Parte de conexão com Backend - COMENTADA
  }, []);

  const filteredReservas = reservas.filter((reserva: Reserva) => 
    reserva.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reserva.morador.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reserva.data.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredReservas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReservas = filteredReservas.slice(startIndex, endIndex);

  const renderItem = ({ item }: { item: Reserva }) => (
    <View style={styles.listItemCard}>
      <Text style={styles.listItemTitle}>{item.area}</Text>
      <Text style={styles.listItemInfo}>Data: {item.data} - Hora: {item.hora}</Text>
      <Text style={styles.listItemInfo}>Morador: {item.morador}</Text>
    </View>
  );

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

        {/* --- Box Central Branca (Lista de Reservas) --- */}
        <View style={styles.listContainerBox}>
          <Text style={styles.listTitle}>Lista de Reservas</Text>
          
          {/* Barra de Pesquisa com Ícone */}
          <View style={styles.searchInputContainer}>
            <Ionicons name="search-outline" size={20} color="#20B2AA" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar por área, morador ou data"
              placeholderTextColor="#888"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : currentReservas.length === 0 && searchTerm ? (
            <Text style={styles.noDataText}>Nenhuma reserva encontrada para a pesquisa.</Text>
          ) : currentReservas.length === 0 && !searchTerm ? (
            <Text style={styles.noDataText}>Nenhuma reserva cadastrada.</Text>
          ) : (
            <FlatList
              data={currentReservas}
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

          {/* Botão para Cadastrar Nova Reserva */}
          <TouchableOpacity 
            style={styles.addButton} 
            // <<< CORRIGIDO: Removido comentário de dentro da expressão e usando caminho ABSOLUTO >>>
            onPress={() => router.push('../cadastros/ReservarEspaco')} 
          >
            <Ionicons name="add-circle-outline" size={28} color="#fff" />
            <Text style={styles.addButtonText}>Nova Reserva</Text>
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
    width: '98%', maxWidth: 400, backgroundColor: '#fff', borderRadius: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 5, elevation: 8,
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
    marginBottom: 7,
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
  addButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 55 },
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