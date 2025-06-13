
import { Stack, router } from 'expo-router'; 
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/useAuthStore'; 

export default function AppRoutesLayout() {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = () => {
    clearAuth();
    router.replace('/(auth)/Login'); 
  };
  
  return (
    <Stack screenOptions={{ 
      headerShown: false 
    }}>
      
      <Stack.Screen name="home" /> 
      <Stack.Screen name="Sobre" />
      
      {/* As telas de cadastro agora têm o prefixo 'cadastro/' */}
      <Stack.Screen name="cadastros/CadastrarVeiculo" options={{ title: 'Cadastrar Veículo' }} />
      <Stack.Screen name="cadastros/CadastrarMorador" options={{ title: 'Cadastrar Morador' }} />
      <Stack.Screen name="cadastros/CadastrarEncomendas" options={{ title: 'Minhas Encomendas' }} />
      <Stack.Screen name="cadastros/ReservarEspaco" options={{ title: 'Reservar Espaço' }} />
      <Stack.Screen name="cadastros/CadastrarVisitas" options={{ title: 'Cadastrar Visitas' }} />
      
      {/* Telas que são subpastas de (main) */}
      <Stack.Screen name="listagens/ListaEncomendas" options={{ title: 'Lista de Encomendas' }} />
      <Stack.Screen name="listagens/ListaMorador" options={{ title: 'Lista de Moradores' }} />
      <Stack.Screen name="listagens/ListaReservas" options={{ title: 'Lista de Reservas' }} />
      <Stack.Screen name="listagens/ListaVeiculos" options={{ title: 'Lista de Veiculos' }} />
      <Stack.Screen name="listagens/ListaVisitantes" options={{ title: 'Lista de Visitantes' }} />
      
    
    </Stack>
  );
}


const styles = StyleSheet.create({
  headerLogoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 5,
  },
  headerLogoutButtonText: {
    marginLeft: 5,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});