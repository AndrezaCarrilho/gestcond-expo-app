// app/(main)/listagens/Moradores.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// import api from '../../../../services/api'; // Mantenha este caminho (comentado)

interface Morador {
  id: string;
  nome: string;
  apartamento: string;
  bloco: string;
  telefone?: string; 
}

const DUMMY_MORADORES: Morador[] = [
  { id: '1', nome: 'João Silva', apartamento: '101', bloco: 'A', telefone: '(11) 98765-4321' },
  { id: '2', nome: 'Maria Santos', apartamento: '203', bloco: 'B', telefone: '(21) 99876-5432' },
  { id: '3', nome: 'Carlos Pereira', apartamento: '305', bloco: 'A', telefone: '(31) 97654-3210' },
  { id: '4', nome: 'Ana Costa', apartamento: '401', bloco: 'C', telefone: '(41) 96543-2109' },
  { id: '5', nome: 'Pedro Lima', apartamento: '502', bloco: 'B', telefone: '(51) 95432-1098' },
  { id: '6', nome: 'Sofia Almeida', apartamento: '601', bloco: 'A', telefone: '(61) 94321-0987' },
  { id: '7', nome: 'Lucas Rocha', apartamento: '702', bloco: 'C', telefone: '(71) 93210-9876' },
  { id: '8', nome: 'Isabela Soares', apartamento: '803', bloco: 'B', telefone: '(81) 92109-8765' },
  { id: '9', nome: 'Fernando Diniz', apartamento: '901', bloco: 'A', telefone: '(91) 91098-7654' },
  { id: '10', nome: 'Laura Martins', apartamento: '1002', bloco: 'C', telefone: '(11) 90987-6543' },
  { id: '11', nome: 'Gustavo Ribeiro', apartamento: '1101', bloco: 'B', telefone: '(21) 98765-4321' },
  { id: '12', nome: 'Julia Fernandes', apartamento: '1203', bloco: 'A', telefone: '(31) 97654-3210' },
];

export default function MoradoresListScreen() {
  const [moradores, setMoradores] = useState<Morador[]>(DUMMY_MORADORES);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // Parte de conexão com Backend - COMENTADA
  }, []);

  const filteredMoradores = moradores.filter(morador => 
    morador.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    morador.apartamento.toLowerCase().includes(searchTerm.toLowerCase()) ||
    morador.bloco.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (morador.telefone && morador.telefone.includes(searchTerm))
  );

  const totalPages = Math.ceil(filteredMoradores.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMoradores = filteredMoradores.slice(startIndex, endIndex);

  const renderItem = ({ item }: { item: Morador }) => (
    <View style={styles.moradorCard}>
      <Text style={styles.moradorName}>{item.nome}</Text>
      <Text style={styles.moradorInfo}>Apto: {item.apartamento} - Bloco: {item.bloco}</Text>
      {item.telefone && <Text style={styles.moradorInfo}>Tel: {item.telefone}</Text>}
    </View>
  );

  return (
    <View style={styles.solidBackground}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* --- Topo (Ícone e GestCondo) --- */}
        <View style={styles.topContainer}>
          <View style={styles.iconCircle}>
            <Ionicons name="people-outline" size={40} color="#20B2AA" />
          </View>
          <Text style={styles.gestCondoTitle}>GestCondo</Text>
        </View>

        {/* --- Box Central Branca (Lista de Moradores) --- */}
        <View style={styles.listContainerBox}> 
          <Text style={styles.listTitle}>Lista de Moradores</Text>
          
          {/* Barra de Pesquisa com Ícone */}
          <View style={styles.searchInputContainer}>
            <Ionicons name="search-outline" size={20} color="#20B2AA" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar por nome, apto, bloco ou telefone"
              placeholderTextColor="#888"
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : currentMoradores.length === 0 && searchTerm ? (
            <Text style={styles.noDataText}>Nenhum morador encontrado para a pesquisa.</Text>
          ) : currentMoradores.length === 0 && !searchTerm ? (
            <Text style={styles.noDataText}>Nenhum morador cadastrado.</Text>
          ) : (
            <FlatList
              data={currentMoradores}
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
                <Ionicons name="chevron-back-outline" size={20} color="#fff" /> {/* Seta para Anterior */}
              </TouchableOpacity>
              <Text style={styles.paginationInfo}>Página {currentPage} de {totalPages}</Text>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                <Ionicons name="chevron-forward-outline" size={20} color="#fff" /> {/* Seta para Próxima */}
              </TouchableOpacity>
            </View>
          )}

          {/* Botão para Cadastrar Novo Morador */}
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={() => router.push('../cadastros/CadastrarMorador')}
          >
            <Ionicons name="person-add-outline" size={28} color="#fff" />
            <Text style={styles.addButtonText}>Cadastrar Novo Morador</Text>
          </TouchableOpacity>
          
          {/* Botão de Voltar (APENAS TEXTO CLICÁVEL) */}
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
    width: '100%', // Ocupa a largura total do paddingHorizontal do scrollContainer
    maxWidth: 4000, // REMOVIDO PARA PERMITIR MAIOR LARGURA
    backgroundColor: '#fff', borderRadius: 20, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 5, elevation: 8,
  },
  listTitle: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 20, textAlign: 'center' },
  searchInputContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: 10, marginBottom: 20, width: '100%', paddingHorizontal: 10,
  },
  searchInput: { flex: 1, paddingVertical: 12, fontSize: 16, color: '#333' },
  searchIcon: { marginRight: 10 },
  flatListContent: { width: '100%' },
  moradorCard: { 
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%', // Ocupa 100% da largura do listContainerBox
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  moradorName: { fontSize: 18, fontWeight: 'bold', color: '#333', textAlign: 'left' },
  moradorInfo: { fontSize: 14, color: '#666', marginTop: 5, textAlign: 'left' },
  addButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#20B2AA', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, marginTop: 20, marginBottom: 10,
  },
  addButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginLeft: 20 },
  paginationControls: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 10, marginBottom: 20,
  },
  paginationButton: { backgroundColor: '#20B2AA', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 8 },
  paginationButtonText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  paginationInfo: { fontSize: 15, color: '#555', fontWeight: 'bold' },
  backButtonIconOnly: {
    marginTop: 15, padding: 10, borderRadius: 50, backgroundColor: '#f0f0f0', alignItems: 'center'
  },
  backButtonText: { color: '#007bff', fontSize: 16, textDecorationLine: 'underline' },
  errorText: { color: '#ff0000', marginBottom: 10, textAlign: 'center', fontSize: 14 },
  successText: { color: '#28a745', marginBottom: 10, textAlign: 'center', fontSize: 14 },
  noDataText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#777' },
});