// app/(main)/listagens/Visitas.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

interface Visitante {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface ApiResponse {
  content: Visitante[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export default function VisitasListScreen() {
  const [visitantes, setVisitantes] = useState<Visitante[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0); // API usa base 0
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const itemsPerPage = 10;

  // Variáveis de ambiente para configuração da API
  const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'url';
  const API_USERNAME = process.env.EXPO_PUBLIC_API_USERNAME || 'username';
  const API_PASSWORD = process.env.EXPO_PUBLIC_API_PASSWORD || 'password';

   // Validação das variáveis de ambiente
  useEffect(() => {
    if (!process.env.EXPO_PUBLIC_API_BASE_URL) {
      console.warn('EXPO_PUBLIC_API_BASE_URL não está definida, usando valor padrão');
    }
    if (!process.env.EXPO_PUBLIC_API_USERNAME) {
      console.warn('EXPO_PUBLIC_API_USERNAME não está definida, usando valor padrão');
    }
    if (!process.env.EXPO_PUBLIC_API_PASSWORD) {
      console.warn('EXPO_PUBLIC_API_PASSWORD não está definida, usando valor padrão');
    }
  }, []);

  const fetchVisitantes = async (page: number = 0, search: string = '') => {
    setLoading(true);
    setError('');
    
    try {

      const auth = {
        username: API_USERNAME,
        password: API_PASSWORD
      };

      const params: any = {
        page: page,
        size: itemsPerPage,
        sort: 'name,asc'
      };

      if (search.trim()) {
        params.name = search.trim();
      }

      const response = await axios.get<ApiResponse>(`${API_BASE_URL}/visitors`, {
        auth,
        params,
        timeout: 10000
      });

      const data = response.data;
      setVisitantes(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
      setCurrentPage(data.number);
      
    } catch (err: any) {
      console.error('Erro ao buscar visitantes:', err);
      
      if (err.code === 'ECONNABORTED') {
        setError('Timeout na conexão. Tente novamente.');
      } else if (err.response?.status === 401) {
        setError('Erro de autenticação. Verifique as credenciais.');
      } else if (err.response?.status === 403) {
        setError('Acesso negado. Você não tem permissão para acessar este recurso.');
      } else if (err.response?.status >= 500) {
        setError('Erro interno do servidor. Tente novamente mais tarde.');
      } else if (err.message === 'Network Error') {
        setError('Erro de conexão. Verifique sua internet.');
      } else {
        setError('Não foi possível carregar a lista de visitantes.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitantes(0, searchTerm);
  }, []);

  const handleSearch = () => {
    setCurrentPage(0);
    fetchVisitantes(0, searchTerm);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      fetchVisitantes(newPage, searchTerm);
    }
  };

  const handleRefresh = () => {
    fetchVisitantes(currentPage, searchTerm);
  };

  const renderItem = ({ item }: { item: Visitante }) => (
    <View style={styles.listItemCard}>
      <Text style={styles.listItemTitle}>{item.name}</Text>
      <Text style={styles.listItemInfo}>Email: {item.email}</Text>
      <Text style={styles.listItemInfo}>Telefone: {item.phone}</Text>
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

        {/* --- Box Central Branca (Lista de Visitantes) --- */}
        <View style={styles.listContainerBox}>
          <Text style={styles.listTitle}>Lista de Visitantes</Text>
          
          {/* Barra de Pesquisa com Ícone */}
          <View style={styles.searchInputContainer}>
            <Ionicons name="search-outline" size={20} color="#20B2AA" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquisar por nome"
              placeholderTextColor="#888"
              value={searchTerm}
              onChangeText={setSearchTerm}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
              <Ionicons name="search-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Botão de Atualizar */}
          <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
            <Ionicons name="refresh-outline" size={20} color="#20B2AA" />
            <Text style={styles.refreshButtonText}>Atualizar</Text>
          </TouchableOpacity>

          {/* Contador de resultados */}
          {!loading && !error && (
            <Text style={styles.resultsCount}>
              {totalElements > 0 
                ? `${totalElements} visitante${totalElements !== 1 ? 's' : ''} encontrado${totalElements !== 1 ? 's' : ''}`
                : 'Nenhum visitante encontrado'
              }
            </Text>
          )}

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#20B2AA" />
              <Text style={styles.loadingText}>Carregando visitantes...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle-outline" size={50} color="#ff6b6b" />
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
                <Text style={styles.retryButtonText}>Tentar novamente</Text>
              </TouchableOpacity>
            </View>
          ) : visitantes.length === 0 ? (
            <View style={styles.noDataContainer}>
              <Ionicons name="people-outline" size={50} color="#ccc" />
              <Text style={styles.noDataText}>
                {searchTerm ? 'Nenhum visitante encontrado para a pesquisa.' : 'Nenhum visitante cadastrado.'}
              </Text>
            </View>
          ) : (
            <FlatList
              data={visitantes}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.flatListContent}
              scrollEnabled={false}
            />
          )}

          {/* Controles de Paginação */}
          {totalPages > 1 && !loading && !error && (
            <View style={styles.paginationControls}>
              <TouchableOpacity
                style={[styles.paginationButton, currentPage === 0 && styles.paginationButtonDisabled]}
                onPress={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
              >
                <Ionicons name="chevron-back-outline" size={20} color={currentPage === 0 ? "#ccc" : "#fff"} />
              </TouchableOpacity>
              
              <Text style={styles.paginationInfo}>
                Página {currentPage + 1} de {totalPages}
              </Text>
              
              <TouchableOpacity
                style={[styles.paginationButton, currentPage === totalPages - 1 && styles.paginationButtonDisabled]}
                onPress={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
              >
                <Ionicons name="chevron-forward-outline" size={20} color={currentPage === totalPages - 1 ? "#ccc" : "#fff"} />
              </TouchableOpacity>
            </View>
          )}

          {/* Botão para Cadastrar Novo Visitante */}
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={() => router.push('../cadastros/CadastrarVisitas')}
          >
            <Ionicons name="add-circle-outline" size={28} color="#fff" />
            <Text style={styles.addButtonText}>Novo Visitante</Text>
          </TouchableOpacity>
          
          {/* Botão de Voltar */}
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
    backgroundColor: '#003366' 
  },
  scrollContainer: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingVertical: 40, 
    paddingHorizontal: 20 
  },
  topContainer: { 
    alignItems: 'center', 
    marginBottom: 20 
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
    shadowOpacity: 0.25, 
    shadowRadius: 5, 
    elevation: 8 
  },
  gestCondoTitle: { 
    fontSize: 38, 
    fontWeight: 'bold', 
    color: '#fff' 
  },
  listContainerBox: {
    width: '95%', 
    maxWidth: 400, 
    backgroundColor: '#fff', 
    borderRadius: 20, 
    padding: 20, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.25, 
    shadowRadius: 5, 
    elevation: 8,
  },
  listTitle: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  searchInputContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#f0f0f0', 
    borderRadius: 10, 
    marginBottom: 15, 
    paddingHorizontal: 10,
  },
  searchInput: { 
    flex: 1, 
    paddingVertical: 12, 
    fontSize: 16, 
    color: '#333' 
  },
  searchIcon: { 
    marginRight: 10 
  },
  searchButton: {
    backgroundColor: '#20B2AA',
    padding: 8,
    borderRadius: 8,
    marginLeft: 5,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  refreshButtonText: {
    color: '#20B2AA',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  resultsCount: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  flatListContent: { 
    width: '100%' 
  },
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
  listItemTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 5 
  },
  listItemInfo: { 
    fontSize: 14, 
    color: '#666',
    marginBottom: 2 
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  errorText: { 
    color: '#ff6b6b', 
    marginTop: 10,
    textAlign: 'center', 
    fontSize: 16,
    lineHeight: 22 
  },
  retryButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noDataText: { 
    textAlign: 'center', 
    marginTop: 15, 
    fontSize: 16, 
    color: '#777',
    lineHeight: 22 
  },
  addButton: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#20B2AA', 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    borderRadius: 10, 
    marginTop: 20, 
    marginBottom: 10,
  },
  addButtonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginLeft: 10 
  },
  paginationControls: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    width: '100%', 
    marginTop: 15, 
    marginBottom: 20,
  },
  paginationButton: { 
    backgroundColor: '#20B2AA', 
    paddingVertical: 10, 
    paddingHorizontal: 15, 
    borderRadius: 8 
  },
  paginationButtonDisabled: {
    backgroundColor: '#ccc',
  },
  paginationInfo: { 
    fontSize: 15, 
    color: '#555', 
    fontWeight: 'bold' 
  },
  backButtonIconOnly: {
    marginTop: 15, 
    padding: 10, 
    borderRadius: 50, 
    backgroundColor: '#f0f0f0', 
    alignItems: 'center'
  },
});