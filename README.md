## My Pokédex

Aplicativo mobile em React Native com Expo, usado em aulas práticas de desenvolvimento mobile, no formato de uma Pokédex.

Atualmente o projeto contém:

- **Tela de Login** (`src/pages/Login`)
- **Tela de Listagem de Pokémon** (`src/pages/PokemonList`) com dados mockados
- **Tela de Detalhe de Pokémon** (`src/pages/PokemonDetail`) com dados mockados
- **Sistema de navegação** usando React Navigation (stack entre Login → Listagem → Detalhe)
- **Serviço de API** (`src/services/pokeapi.ts`) já estruturado para consumir a [PokéAPI](https://pokeapi.co)
- **Sistema de temas** (`src/global/themes.tsx`) com paleta inspirada na Pokédex e suporte a modo claro/escuro

> Atenção: os dados exibidos ainda são **simulados (mock)** e várias ações (login, carregamento de lista/detalhe) usam `setTimeout` para **simular chamadas assíncronas**. A integração real com a PokéAPI será feita nas próximas aulas.

---

## Pré-requisitos

- **Node.js** (versão LTS recomendada)
- **npm** (vem junto com o Node.js)
- **Expo Go** instalado no celular  
  - Android: disponível na Google Play Store  
  - iOS: disponível na App Store

Opcional (para emuladores):

- Android Studio (emulador Android)
- Xcode (emulador iOS, apenas em macOS)

---

## Como rodar o projeto localmente

1. **Clonar o repositório**

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd my-pokedex
   ```

2. **Instalar as dependências**

   ```bash
   npm install
   ```

3. **Iniciar o servidor do Expo**

   ```bash
   npx expo start
   ```

   Isso irá abrir a interface do Expo no navegador e/ou no terminal.

4. **Rodar no celular (recomendado)**

   - Conecte o celular e o computador **na mesma rede Wi‑Fi**.
   - Abra o aplicativo **Expo Go** no celular.
   - No navegador/terminal, leia o **QR Code** com o aplicativo Expo Go.
   - Aguarde o bundle carregar e o app será aberto.

5. **Rodar em emulador (opcional)**

   Com o servidor Expo rodando (`npx expo start`):

   - Para Android:

     ```bash
     npx expo start --android
     ```

   - Para iOS (apenas macOS):

     ```bash
     npx expo start --ios
     ```

---

## Estrutura básica do projeto

```text
my-pokedex/
  App.tsx                  # Ponto de entrada, hoje exibindo a tela de Login
  src/
    global/
      themes.tsx           # Definição de temas (claro/escuro) no padrão Pokédex
    pages/
      Login/
        index.tsx          # Página de login
        styles.ts          # Estilos da página de login
      PokemonList/
        index.tsx          # Página de listagem (mock)
        styles.ts          # Estilos da página de listagem
      PokemonDetail/
        index.tsx          # Página de detalhes (mock)
        styles.ts          # Estilos da página de detalhes
    services/
      pokeapi.ts           # Funções para consumir a PokéAPI (ainda não usadas nas páginas)
    @types/
      png.d.ts             # Tipagem para import de imagens PNG
```

---

## Componentes principais do React Native usados no projeto

Este projeto serve como referência dos componentes mais usados em aplicações React Native. Abaixo um resumo do papel de cada um.

- **`View`**: contêiner genérico para agrupar outros componentes.
  - Equivalente à `div` no HTML.
  - Usado para estruturar layout (linhas, colunas, caixas).

- **`Text`**: exibe textos na tela.
  - Usado para títulos, rótulos, mensagens, botões simples etc.
  - Aceita estilos de fonte, cor, alinhamento etc.

- **`Image`**: exibe imagens.
  - No projeto é usada para o **logo** e para os **sprites dos Pokémon**.
  - A fonte pode ser um arquivo local (`assets/`) ou uma URL remota.

- **`TextInput`**: campo de entrada de texto.
  - Usado na tela de **Login** para digitar e-mail e senha.
  - Trabalha em conjunto com `useState` para guardar o que o usuário digitou.

- **`TouchableOpacity`**: área clicável com efeito de opacidade.
  - Usado para botões (“Entrar”, “Voltar”) e para os **cards da lista**.
  - Aceita um `onPress` que é chamado quando o usuário toca no componente.

- **`ScrollView`**: área rolável de conteúdo.
  - Usado na tela de **Detalhe** para permitir rolar informações quando o conteúdo é maior que a tela.
  - Deve ser usado quando a quantidade de elementos é relativamente pequena.

- **`FlatList`**: lista performática de itens.
  - Usada na tela de **Listagem de Pokémon**.
  - Recebe uma `data` (array de itens) e uma função `renderItem` para desenhar cada card.
  - Indicada para listas médias/grandes (melhor performance que um `ScrollView` com `.map`).

- **`ActivityIndicator`**: indicador de carregamento (spinner).
  - Usado para mostrar **estado de carregamento** durante simulações de login e carregamento de dados.
  - Ajuda a visualizar quando uma ação assíncrona está em andamento.

---

## Hooks e navegação usados

Além dos componentes visuais, o projeto usa alguns **hooks** importantes:

- **`useState`**:
  - Guarda valores que mudam ao longo do tempo (e-mail, senha, lista de Pokémon, loading, erro, etc.).
  - Quando o estado muda, o componente é renderizado novamente com o novo valor.

- **`useEffect`**:
  - Executa efeitos colaterais em momentos específicos do ciclo de vida do componente.
  - No projeto é usado para **simular buscas assíncronas** (com `setTimeout`) quando a tela é montada ou quando um parâmetro muda.

- **`useNavigation`** (React Navigation):
  - Dá acesso ao objeto `navigation`.
  - Permite navegar entre telas (`navigate`, `replace`, `goBack`).
  - Ex.: sair do Login para a Listagem ou ir da Listagem para o Detalhe.

- **`useRoute`** (React Navigation):
  - Acessa os **parâmetros** enviados para a tela.
  - No projeto, é usado para ler o `id` enviado da Listagem para a tela de Detalhe.

Esses conceitos (componentes, hooks e navegação) formam a base que depois será usada para integrar o app com a **PokéAPI** e outros serviços externos.

---

## Próximos passos (para as aulas)

- Consolidar o uso de **estado** (`useState`) e **ciclo de vida** (`useEffect`) com mais exercícios.
- Substituir os dados mockados pela resposta real da **PokéAPI**:
  - Listagem de Pokémon com paginação.
  - Detalhamento de um Pokémon (stats, tipos, altura, peso etc.).
- Evoluir o layout e a experiência de uso.

