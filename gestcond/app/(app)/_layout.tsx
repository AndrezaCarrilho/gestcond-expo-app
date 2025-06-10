// app/(app)/_layout.tsx
import { Stack } from 'expo-router';

export default function AppRoutesLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: false 
    }}>
     
      <Stack.Screen name="Home" /> 
      <Stack.Screen name="Sobre" /> 
      <Stack.Screen name="CadastrarVeiculo" /> 
      <Stack.Screen name="CadastrarMorador" />
      <Stack.Screen name="CadastrarEncomendas" /> 
      <Stack.Screen name="ReservarEspaco" />
      <Stack.Screen name="CadastrarVisitas" /> 
     
    </Stack>
  );
}