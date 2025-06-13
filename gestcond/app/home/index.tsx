// app/(app)/home/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, FlatList, Switch } from 'react-native'; 
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/useAuthStore'; 
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 

interface Delivery { 
  id: string;
  description: string;
  status: string;
}

const DUMMY_DELIVERIES: Delivery[] = [
    { id: '1', description: 'Pacote Amazon', status: 'Em rota' },
    { id: '2', description: 'Documentos', status: 'Pendente' },
    { id: '3', description: 'Eletrônico', status: 'Em Rota' },
];

export default function HomeScreen() { 
  const user = useAuthStore((state) => state.user);
  const clearAuth = useAuthStore((state) => state.clearAuth); 
  const isDarkMode = useAuthStore((state) => state.isDarkMode); 
  const toggleDarkMode = useAuthStore((state) => state.toggleDarkMode); 

  const insets = useSafeAreaInsets(); 

  const [deliveries, setDeliveries] = useState<Delivery[]>(DUMMY_DELIVERIES);
  const [loadingDeliveries, setLoadingDeliveries] = useState(false);
  const [errorDeliveries, setErrorDeliveries] = useState('');

  const handleLogout = () => {
    clearAuth(); 
    router.replace('/(auth)/Login'); 
  };

  useEffect(() => {
    // Lógica para carregar dados (Entregas, etc.)
  }, [user]);

  // --- Estilos Dinâmicos ---
  const dynamicStyles = StyleSheet.create({
    containerBackground: {
      backgroundColor: isDarkMode ? '#1a202c' : '#f8f8f8', // Cor de fundo da tela
    },
    textColor: {
      color: isDarkMode ? '#e0e0e0' : '#333', // Cor geral do texto
    },
    sectionTitleColor: {
      color: isDarkMode ? '#ccc' : '#555',
    },
    gridItemBackground: {
      backgroundColor: isDarkMode ? '#2d3748' : '#fff', // Fundo dos cards da grade
    },
    gridItemTextColor: {
      color: isDarkMode ? '#e0e0e0' : '#333',
    },
    deliveryCardBackground: {
      backgroundColor: isDarkMode ? '#2d3748' : '#fff', // Fundo dos cards de entrega
    },
    deliveryTextColor: {
      color: isDarkMode ? '#e0e0e0' : '#333',
    },
    deliveryStatusColor: {
      color: isDarkMode ? '#ccc' : '#666',
    },
    // Ajuste o logoutButton para ter fundo transparente ou cor diferente
    logoutButtonBackground: {
      backgroundColor: isDarkMode ? '#4a5568' : '#dcdcdc',
    },
    logoutButtonTextColor: {
      color: isDarkMode ? '#fff' : '#20B2AA',
    },
    // Cor dos botões de paginação
    paginationButtonBackground: {
        backgroundColor: isDarkMode ? '#20B2AA' : '#007bff', // Ajuste a cor do botão da paginação para o modo noturno
    },
  });

  return (
    <ScrollView contentContainerStyle={[styles.scrollViewContent, dynamicStyles.containerBackground, { paddingTop: insets.top + 20 }]}> 
      <View style={styles.contentWrapper}> 
        {/* Botão de Sair/Logout */}
        <TouchableOpacity onPress={handleLogout} style={[styles.logoutButton, dynamicStyles.logoutButtonBackground]}>
          <Ionicons name="log-out-outline" size={24} color={dynamicStyles.logoutButtonTextColor.color} />
          <Text style={dynamicStyles.logoutButtonTextColor}>Sair</Text>
        </TouchableOpacity>

        {/* --- NOVO: Switch para Modo Noturno --- */}
        <View style={styles.darkModeToggle}>
          <Ionicons name={isDarkMode ? 'moon-outline' : 'sunny-outline'} size={24} color={isDarkMode ? '#e0e0e0' : '#333'} />
          <Text style={[styles.darkModeText, dynamicStyles.textColor]}>Modo Noturno</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isDarkMode ? "#f4f3f4" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleDarkMode}
            value={isDarkMode}
          />
        </View>
        {/* --- FIM DO NOVO --- */}

        <Text style={[styles.greeting, dynamicStyles.textColor]}>Olá, {user?.name || 'Morador'}!</Text>

        <Text style={[styles.sectionTitle, dynamicStyles.sectionTitleColor]}>Navegação Principal</Text>
        <View style={styles.grid}>
          {/* Botões de navegação (todos com caminhos absolutos) */}
          <TouchableOpacity 
            style={[styles.gridItem, dynamicStyles.gridItemBackground]} 
            onPress={() => router.push('./(main)/listagens/ListaEncomendas')} 
          >
            <Ionicons name="cube-outline" size={40} color={isDarkMode ? '#007bff' : '#20B2AA'} /> {/* Ícone muda de cor */}
            <Text style={[styles.gridItemText, dynamicStyles.gridItemTextColor]}>Encomendas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.gridItem, dynamicStyles.gridItemBackground]} 
            onPress={() => router.push('./(main)/listagens/ListaReservas')} 
          >
            <Ionicons name="calendar-outline" size={40} color={isDarkMode ? '#007bff' : '#20B2AA'} /> 
            <Text style={[styles.gridItemText, dynamicStyles.gridItemTextColor]}>Reservar Espaço</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.gridItem, dynamicStyles.gridItemBackground]} 
            onPress={() => router.push('./(main)/listagens/ListaVisitantes')} 
          >
            <Ionicons name="person-outline" size={40} color={isDarkMode ? '#007bff' : '#20B2AA'} /> 
            <Text style={[styles.gridItemText, dynamicStyles.gridItemTextColor]}>Visitas</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.gridItem, dynamicStyles.gridItemBackground]} 
            onPress={() => router.push('/(main)/listagens/ListaVeiculos')} 
          >
            <Ionicons name="car-outline" size={40} color={isDarkMode ? '#007bff' : '#20B2AA'} />
            <Text style={[styles.gridItemText, dynamicStyles.gridItemTextColor]}>Veículos</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.gridItem, dynamicStyles.gridItemBackground]} 
            onPress={() => router.push('./(main)/listagens/ListaMorador')} 
          >
            <Ionicons name="list-outline" size={40} color={isDarkMode ? '#007bff' : '#20B2AA'} />
            <Text style={[styles.gridItemText, dynamicStyles.gridItemTextColor]}>Moradores</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.gridItem, dynamicStyles.gridItemBackground]} 
            onPress={() => router.push('/sobre/Sobre')} 
          >
            <Ionicons name="people-outline" size={40} color={isDarkMode ? '#007bff' : '#20B2AA'} />
            <Text style={[styles.gridItemText, dynamicStyles.gridItemTextColor]}>Sobre</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.sectionTitle, dynamicStyles.sectionTitleColor]}>Minhas Entregas Recentes</Text>
        {loadingDeliveries ? (
          <ActivityIndicator size="large" color={isDarkMode ? '#e0e0e0' : '#007bff'} />
        ) : errorDeliveries ? (
          <Text style={[styles.errorText, dynamicStyles.textColor]}>{errorDeliveries}</Text>
        ) : deliveries.length === 0 ? (
          <Text style={[styles.noDataText, dynamicStyles.textColor]}>Nenhuma entrega recente.</Text>
        ) : (
          <View style={[styles.deliveryList, dynamicStyles.deliveryCardBackground]}> 
            {deliveries.map((delivery) => (
              <View key={delivery.id} style={[styles.deliveryItem, dynamicStyles.deliveryCardBackground]}>
                <Text style={[styles.deliveryDescription, dynamicStyles.deliveryTextColor]}>{delivery.description}</Text>
                <Text style={[styles.deliveryStatus, dynamicStyles.deliveryStatusColor]}>Status: {delivery.status}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  
  scrollViewContent: { 
    flexGrow: 1, 
    justifyContent: 'flex-start',
    alignItems: 'stretch', 
    paddingHorizontal: 20, 
  },
  contentWrapper: { 
    
  },
  // Estilos do Botão de Logout
  logoutButton: {
    position: 'absolute',
    top: 15, // Mais para cima
    right: 295, // Mais para a direita
    zIndex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5, 
    paddingHorizontal: 10, 
    borderRadius: 5,
  },
  
  darkModeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', 
    width: '100%',
    marginBottom: 20,
    paddingTop: 10, 
  },
  darkModeText: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10, 
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20, 
  },
 
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridItem: {
    width: '46%',
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
    marginTop: 8, 
    fontSize: 15, 
    fontWeight: '500',
    textAlign: 'center',
  },
  
  deliveryList: {
    width: '100%', 
    padding: 15, 
    borderRadius: 8,
  },
  deliveryItem: {
    paddingVertical: 10,
    paddingHorizontal: 5,
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
  },
  deliveryStatus: {
    fontSize: 14,
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
  },
});