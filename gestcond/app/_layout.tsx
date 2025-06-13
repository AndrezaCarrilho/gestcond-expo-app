// app/_layout.tsx
import { Stack } from 'expo-router'; // Removido Redirect, useAuthStore, ActivityIndicator, View, StyleSheet, useEffect, useState

export default function AppLayout() {
  // Este layout NÃO FAZ VERIFICAÇÃO DE AUTENTICAÇÃO INICIAL.
  // A tela 'app/index.tsx' será carregada por padrão.
  // A lógica de autenticação será tratada a partir do Login.
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
