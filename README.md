# 🏡 GestCondo - Seu Condomínio na Palma da Mão

## 👥 Integrantes da Equipe

Este projeto foi desenvolvido com dedicação pela seguinte equipe:

* **Andreza Carrilho** - Desenvolvedor
* **Lucas Toledo** - Desenvolvedor
* **Jacileide Karla** - Desenvolvedor
* **Natan Soares** - Desenvolvedor
* **William Cruz** - Desenvolvedor
* **Wellington Aguiar** - Desenvolvedor

## ✨ Visão Geral

O **GestCondo** é um aplicativo móvel inovador, desenvolvido com **React Native**, que transforma a experiência de morar em condomínio. Nosso objetivo é simplificar a gestão e a comunicação, conectando moradores, visitantes e a administração de forma eficiente e intuitiva. Com o GestCondo, o seu condomínio estará literalmente na palma da sua mão!

## 🚀 Funcionalidades Principais

Nosso aplicativo oferece uma gama de funcionalidades para otimizar o dia a dia no condomínio:

* **Autenticação Segura:** Sistema completo de Login e Cadastro de usuários/moradores.
* **Gerenciamento de Entregas:** Acompanhe o status de pacotes e correspondências.
* **Reserva de Espaços:** Agende e gerencie a reserva de áreas comuns (salão de festas, churrasqueira, etc.).
* **Cadastro de Visitas:** Registre e controle o acesso de visitantes ao condomínio.
* **Controle de Veículos:** Cadastre e gerencie informações sobre veículos de moradores.
* **Gerenciamento de Moradores (Admin):** Módulo para a administração registrar novos moradores.
* **Navegação Intuitiva:** Interface de usuário clara e fácil de usar.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando um stack de tecnologias robustas e modernas para garantir performance e escalabilidade:

### Frontend (Aplicativo Mobile)
* **Framework:** [React Native](https://reactnative.dev/)
* **Ambiente de Desenvolvimento:** [Expo](https://expo.dev/) (SDK 50)
* **Roteamento:** [Expo Router](https://expo.github.io/router/) (v5.x.x)
* **Gerenciamento de Estado:** [Zustand](https://zustand-bear.github.io/zustand/)
* **Requisições HTTP:** [Axios](https://axios-http.com/)
* **Ícones:** [Ionicons](https://ionic.io/ionicons) (`@expo/vector-icons`)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **Armazenamento Local:** `@react-native-async-storage/async-storage`

### Backend (API REST)
* **Framework:** [Spring Boot](https://spring.io/projects/spring-boot) (Java)
* **Banco de Dados:** Exemplos: [PostgreSQL](https://www.postgresql.org/) 
* **Hospedagem:** Serviço de nuvem como [Vercel](https://vercel.com/) .

### Ferramentas e Outros
* **Design:** [Figma](https://www.figma.com/)
* **Controle de Versão:** [Git](https://git-scm.com/), [GitHub](https://github.com/)
* **Ambiente de Desenvolvimento Remoto:** [GitHub Codespaces](https://github.com/features/codespaces)

## ⚙️ Como Rodar o Projeto

Siga os passos abaixo para configurar e rodar o GestCondo em seu ambiente de desenvolvimento.

### Pré-requisitos
Certifique-se de ter instalado em sua máquina:
* [Node.js](https://nodejs.org/en/) (versão LTS recomendada)
* [npm](https://www.npmjs.com/) (gerenciador de pacotes, atualizado)
* [Expo Go app](https://expo.dev/client) no seu celular (Android ou iOS)

### Instalação
1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/AndrezaCarrilho/gestcond-expo-app.git]
    cd gestcond-expo-app
    ```
2.  **Instale as dependências:**
    ```bash
    npm install --legacy-peer-deps
    ```
    *`--legacy-peer-deps` é usado para resolver possíveis conflitos de dependências entre versões.*
3.  **Configure o Backend (Se aplicável):**
    * Garanta que a API do backend está rodando e acessível.
    * No arquivo `services/api.ts` (ou `services/api.js`), atualize a `API_BASE_URL` para o endereço do seu backend (ex: `http://SEU_IP_DA_MAQUINA:8080` para desenvolvimento local, ou a URL publicada).

### Rodando o Aplicativo
1.  **Inicie o servidor de desenvolvimento do Expo:**
    ```bash
    npx expo start --tunnel
    ```
2.  **Abra no celular:**
    * Com o aplicativo **Expo Go** no seu celular, escaneie o código QR que aparecerá no seu terminal ou na página do Expo Dev Tools no navegador.
    * O aplicativo será carregado no seu dispositivo.
