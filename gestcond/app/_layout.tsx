// app/_layout.tsx
import { Stack } from 'expo-router'; 

export default function AppLayout() {
  
  // A tela 'app/index.tsx' será carregada por padrão.
  
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* A tela app/index.tsx será a primeira a carregar aqui */}
      <Stack.Screen name="index" options={{ headerShown: false }} /> 
      {/* Definimos os grupos (auth) e (main) para que existam no mapa de rotas */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} /> 
      <Stack.Screen name="(main)" options={{ headerShown: false }} />
    </Stack>
  );
}
