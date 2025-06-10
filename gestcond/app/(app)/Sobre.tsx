// app/(app)/Sobre.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router'; 
import { Ionicons } from '@expo/vector-icons'; 

export default function SobreScreen() {
  const teamMembers = [
    { name: 'Andreza Carrilho', role: 'Desenvolvedora' },
    { name: 'Lucas Toledo', role: 'Desenvolvedor' },
    { name: 'Jacileide Karla', role: 'Desenvolvedora' },
    { name: 'Natan Soares', role: 'Desenvolvedor' },
    { name: 'William Cruz', role: 'Desenvolvedor' },
    { name: 'Wellington Aguiar', role: 'Desenvolvedor' },
  ];

  const appInfo = {
    name: 'GestCondo',
    description: 'Um aplicativo para gerenciamento de condomínios, facilitando a comunicação e organização entre moradores e administração.',
    features: [
      'Autenticação de Usuário (Login/Cadastro)',
      'Gerenciamento de Entregas',
      'Reserva de Espaços Comuns',
      'Cadastro de Visitas',
      'Controle de Veículos',
      'Gerenciamento de Moradores (Admin)'
    ],
    tools: [
      'Frontend: React Native, Expo, Expo Router',
      'Gerenciamento de Estado: Zustand',
      'Requisições HTTP: Axios',
      'Ícones: Ionicons (@expo/vector-icons)',
      'Tipagem: TypeScript',
      'Design: Figma',
      'Controle de Versão: Git, GitHub',
      'Ambiente de Desenvolvimento: GitHub Codespaces'
    ],
    backendInfo: 'Backend desenvolvido em Spring Boot com integração a Banco de Dados.',
    databaseInfo: 'Banco de Dados hospedado na nuvem.',
    deploymentInfo: 'Servidor publicado na nuvem.'
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Sobre o Aplicativo GestCondo</Text>
        <Text style={styles.sectionTitle}>Visão Geral</Text>
        <Text style={styles.paragraph}>{appInfo.description}</Text>

        <Text style={styles.sectionTitle}>Funcionalidades Principais</Text>
        {appInfo.features.map((feature, index) => (
          <Text key={index} style={styles.listItem}>• {feature}</Text>
        ))}

        <Text style={styles.sectionTitle}>Tecnologias e Ferramentas</Text>
        {appInfo.tools.map((tool, index) => (
          <Text key={index} style={styles.listItem}>• {tool}</Text>
        ))}
        <Text style={styles.paragraph}>{appInfo.backendInfo}</Text>
        <Text style={styles.paragraph}>{appInfo.databaseInfo}</Text>
        <Text style={styles.paragraph}>{appInfo.deploymentInfo}</Text>

        <Text style={styles.sectionTitle}>Integrantes da Equipe</Text>
        <View style={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <View key={index} style={styles.memberCard}>
              <Ionicons name="person-circle-outline" size={50} color="#007bff" />
              <Text style={styles.memberName}>{member.name}</Text>
              <Text style={styles.memberRole}>{member.role}</Text>
            </View>
          ))}
        </View>
        
        {/* Botão de Voltar */}
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()} // Volta para a tela anterior (Dashboard/Home)
        >
          <Ionicons name="arrow-back-outline" size={24} color="#007bff" />
          <Text style={styles.backButtonText}>Voltar para a Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  scrollContent: {
    paddingBottom: 20, // Espaço no final para rolagem
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  paragraph: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    lineHeight: 24,
  },
  listItem: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
    marginLeft: 10,
  },
  teamGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  memberCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 8,
    width: '45%', // Duas colunas
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
    textAlign: 'center',
  },
  memberRole: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
    alignSelf: 'center', // Centraliza o botão
  },
  backButtonText: {
    marginLeft: 5,
    color: '#007bff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});