# ✅ To-Do List Frontend

O **To-Do List Frontend** é uma aplicação web de lista de tarefas feita com **HTML, CSS e JavaScript puro**. O projeto permite que o usuário cadastre tarefas, edite o conteúdo delas, marque como concluídas e também exclua tarefas que não são mais necessárias.

---

## 📌 Descrição do Projeto

Este projeto tem como objetivo criar uma aplicação simples para organização de tarefas. Através da interface, o usuário consegue controlar melhor suas atividades, adicionando novas tarefas e acompanhando quais já foram finalizadas.

Além das funcionalidades da aplicação, o projeto também conta com testes automatizados usando **Jest** e uma pipeline configurada no **Jenkins**, responsável por validar o frontend durante o processo de integração.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** estrutura das páginas da aplicação.
- **CSS3:** estilização e organização visual da interface.
- **JavaScript:** implementação das funcionalidades da lista de tarefas, como adicionar, editar, concluir e excluir tarefas.
- **Jest:** criação e execução dos testes automatizados.
- **Jenkins:** configuração da pipeline de integração contínua.
- **Docker:** padronização do ambiente do Jenkins e suporte para execução da pipeline.
- **Git & GitHub:** versionamento do código e integração com o repositório remoto.

---

## ⚡ Como Executar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/C14-INATEL/to-do-list-front
```

### 2. Acesse a pasta do projeto

```bash
cd to-do-list-front
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute o projeto

Como o projeto foi desenvolvido com **HTML, CSS e JavaScript puro**, não é necessário iniciar um servidor com `npm`.

Para executar a aplicação, basta abrir o arquivo `index.html` diretamente no navegador.

Outra opção é utilizar a extensão **Live Server** no VS Code:

```text
Clique com o botão direito no arquivo index.html
↓
Open with Live Server
```

---

## 🧪 Como Executar os Testes

O projeto utiliza **Jest** para execução dos testes automatizados.

Para rodar os testes, execute:

```bash
npm test
```

---

## 🔁 Como Executar a Pipeline Localmente

A pipeline foi configurada utilizando **Jenkins com Docker**.  
Para executar a pipeline localmente, é necessário ter o **Docker Desktop** instalado e em execução.

### 1. Suba o Jenkins com Docker Compose

```bash
docker compose up -d --build
```

### 2. Acesse o Jenkins no navegador

```text
http://localhost:8080
```

Caso a porta `8080` esteja ocupada, altere a porta no arquivo `docker-compose.yml`.

Exemplo:

```yaml
ports:
  - "8082:8080"
```

Nesse caso, o Jenkins deverá ser acessado em:

```text
http://localhost:8082
```

### 3. Pegue a senha inicial do Jenkins

```bash
docker exec jenkins-front cat /var/jenkins_home/secrets/initialAdminPassword
```

### 4. Crie uma nova tarefa no Jenkins

No painel inicial do Jenkins, clique em **Nova tarefa**.

Configure a tarefa com as seguintes informações:

```text
Nome: to-do-list-front-pipeline
Tipo: Pipeline
```

### 5. Configure a pipeline

Na seção **Pipeline**, configure:

```text
Definition: Pipeline script from SCM
SCM: Git
Repository URL: https://github.com/C14-INATEL/to-do-list-front.git
Branch Specifier: */main
Script Path: Jenkinsfile
````

### 6. Execute a pipeline

Depois de salvar a configuração, clique em:

```text
Build Now
```

A pipeline executará as etapas configuradas no `Jenkinsfile`, incluindo:

```text
Checkout do repositório
Verificação do ambiente
Instalação das dependências
Execução dos testes com Jest
Empacotamento dos arquivos do frontend em .zip
```

---

## 📖 Histórias de Usuário

As histórias de usuário abaixo representam as principais funcionalidades que guiaram o desenvolvimento da aplicação. Cada história segue o formato **Como <perfil>, eu quero <ação> para que <benefício>**, contendo prioridade, status, rastreabilidade e critérios de aceitação em **Given/When/Then**.

---

### História 1: Autenticação do usuário

**Prioridade:** Alta  
**Status:** Entregue  
**Rastreabilidade:** História 1 → `pages/login.html`, `js/login.js` e `js/scripts.js` → `tests/login.test.js` / `tests/login.mock.test.js`

**Como** usuário da aplicação, **eu quero** realizar login antes de acessar minhas tarefas **para que** meus dados fiquem vinculados à minha conta.

#### Critérios de aceitação

**Cenário: Login e acesso à aplicação**

- **Given** que o usuário acessa a aplicação.
- **When** ele informa credenciais válidas.
- **Then** o sistema deve armazenar o token de acesso e permitir a entrada na tela principal.

**Cenário: Bloqueio de acesso sem autenticação**

- **Given** que o usuário não está autenticado.
- **When** ele tenta acessar a página principal.
- **Then** o sistema deve redirecioná-lo para a tela de login.

---

### História 2: Visualização de tarefas pelo backend

**Prioridade:** Alta  
**Status:** Entregue  
**Rastreabilidade:** História 2 → `js/scripts.js` → `tests/scripts.test.js` / `tests/scripts.mock.test.js`

**Como** usuário autenticado, **eu quero** visualizar minhas tarefas salvas no backend **para que** eu consiga acessar minha lista vinculada à minha conta.

#### Critérios de aceitação

**Cenário: Carregamento das tarefas**

- **Given** que o usuário está autenticado.
- **When** ele acessa a tela principal.
- **Then** o frontend deve buscar as tarefas no backend e exibi-las na interface.

---

### História 3: Gerenciamento de tarefas

**Prioridade:** Alta  
**Status:** Entregue  
**Rastreabilidade:** História 3 → `js/scripts.js` → `tests/scripts.test.js` / `tests/scripts.mock.test.js`

**Como** usuário autenticado, **eu quero** adicionar, editar e excluir tarefas **para que** eu consiga manter minha lista sempre atualizada.

#### Critérios de aceitação

**Cenário: Cadastro de tarefa**

- **Given** que o usuário está na tela principal.
- **When** ele informa o texto de uma nova tarefa.
- **Then** a tarefa deve ser enviada ao backend e exibida na lista.

**Cenário: Edição ou exclusão de tarefa**

- **Given** que existe uma tarefa cadastrada.
- **When** o usuário edita ou exclui essa tarefa.
- **Then** a alteração deve ser enviada ao backend e refletida na interface.

---

### História 4: Conclusão e organização das tarefas

**Prioridade:** Alta  
**Status:** Entregue  
**Rastreabilidade:** História 4 → `js/scripts.js` → `tests/scripts.test.js` / `tests/scripts.mock.test.js`

**Como** usuário autenticado, **eu quero** marcar tarefas como concluídas e filtrar minha lista **para que** eu consiga acompanhar melhor minhas atividades.

#### Critérios de aceitação

**Cenário: Marcar tarefa como concluída**

- **Given** que existe uma tarefa pendente.
- **When** o usuário marca a tarefa como concluída.
- **Then** o novo status deve ser enviado ao backend e atualizado na interface.

**Cenário: Filtrar tarefas**

- **Given** que existem tarefas concluídas e pendentes.
- **When** o usuário seleciona um filtro de status.
- **Then** apenas as tarefas correspondentes devem ser exibidas.

---

### História 5: Pesquisa de tarefas

**Prioridade:** Média  
**Status:** Entregue  
**Rastreabilidade:** História 5 → `js/scripts.js` → `tests/scripts.test.js`

**Como** usuário autenticado, **eu quero** pesquisar tarefas pelo texto **para que** eu consiga encontrar rapidamente uma atividade específica.

#### Critérios de aceitação

**Cenário: Pesquisa por texto**

- **Given** que existem tarefas cadastradas.
- **When** o usuário digita um termo no campo de pesquisa.
- **Then** apenas as tarefas que contêm o texto pesquisado devem permanecer visíveis.

---

### História 6: Validação automatizada do projeto

**Prioridade:** Média  
**Status:** Entregue parcialmente  
**Rastreabilidade:** História 6 → `tests/*.test.js`, `jest.config.js`, `package.json`, `Jenkinsfile`, `docker-compose.yml` e `jenkins/Dockerfile`

**Como** desenvolvedor do projeto, **eu quero** validar o frontend com testes automatizados e pipeline **para que** alterações futuras possam ser verificadas com mais segurança.

#### Critérios de aceitação

**Cenário: Execução dos testes**

- **Given** que os testes estão configurados no projeto.
- **When** o comando `npm test` é executado.
- **Then** os testes automatizados devem rodar com sucesso.

**Cenário: Execução da pipeline**

- **Given** que o Jenkins está configurado com Docker.
- **When** a pipeline é executada.
- **Then** o projeto deve instalar dependências, executar testes e empacotar os arquivos do frontend.

---

## 🗂️ Metodologia de Desenvolvimento

Para organizar o desenvolvimento, o grupo utilizou o **GitHub Projects** como um quadro de acompanhamento das tarefas, seguindo uma lógica próxima ao Kanban. Na prática, o método foi aplicado de forma simples, sem regras rígidas, apenas para ajudar a visualizar o que precisava ser feito, o que estava em andamento e o que já havia sido concluído.

Não foram realizadas reuniões fixas ou cerimônias como daily, planning e review. Os alinhamentos aconteceram por meio de conversas informais sempre que surgiam dúvidas, ajustes ou novas demandas no projeto.

---

### Papéis e responsabilidades

O grupo não definiu papéis fixos como Product Owner, Scrum Master ou QA. Como muitas atividades da disciplina eram comuns para todos, as responsabilidades foram compartilhadas entre os integrantes.

De forma geral, todos participaram de atividades como:

```text
Desenvolvimento do frontend
Integração com o backend
Criação e ajuste dos testes
Configuração da pipeline
Atualização da documentação
Organização das tarefas no GitHub Projects
```

---

### Definição de pronto

Uma tarefa era considerada pronta quando a alteração estava implementada, funcionando corretamente, registrada no GitHub e, quando necessário, com testes e documentação atualizados.

---

### Acompanhamento

O acompanhamento do projeto foi feito principalmente pelos cards no **GitHub Projects**, commits no repositório, execução dos testes com **Jest** e validação da pipeline no **Jenkins**.

---

## 🔄 Dinâmica de Desenvolvimento

O trabalho aconteceu de forma gradual, conforme as funcionalidades e ajustes eram necessários. Como não havia uma divisão rígida de tarefas, o grupo atuou de maneira colaborativa, principalmente nas partes de código, testes, pipeline e README.

As decisões técnicas foram tomadas de forma informal, considerando o que fazia mais sentido para o projeto e para as entregas da disciplina. Uma mudança importante foi a evolução da aplicação, que antes utilizava `localStorage` para salvar tarefas e depois passou a usar integração com backend e autenticação.

---

### Fluxo de trabalho

O fluxo geral seguido pelo grupo foi:

```text
Escolha ou criação da tarefa
Desenvolvimento da alteração
Commit no repositório
Teste da funcionalidade
Atualização da documentação, quando necessário
Conclusão da tarefa no GitHub Projects
```

---

### Bloqueios e ajustes

Os principais bloqueios aconteceram na integração com o backend e na configuração da pipeline com **Jenkins e Docker**. Essas mudanças exigiram ajustes no código, nos testes e na documentação do projeto.

Quando algum problema surgia, o grupo resolvia por meio de discussões informais e pequenas correções incrementais.

---

### Lições aprendidas

Em um próximo projeto, o grupo poderia melhorar a organização inicial das tarefas, padronizar melhor os commits e registrar as decisões técnicas com mais clareza desde o começo.

Também ficou claro que atualizar a documentação junto com as mudanças do código evita retrabalho e deixa o projeto mais fácil de entender.

---

## 🤖 Uso de IA

Durante o desenvolvimento, o grupo utilizou o **ChatGPT** como ferramenta de apoio para tirar dúvidas, entender erros e buscar sugestões de melhoria. A IA foi usada principalmente em momentos de estudo, testes e configuração da pipeline, mas nenhuma resposta foi aplicada diretamente sem revisão.

As sugestões foram analisadas pelo grupo, adaptadas ao código real do projeto e testadas antes de serem adicionadas ao repositório.

---

### Ferramenta utilizada

```text
ChatGPT
```

---

### Principais usos

A IA foi utilizada para apoiar atividades como:

```text
Criação de testes unitários com Jest
Entendimento de testes em frontend puro
Correção de erros em JavaScript
Configuração da pipeline com Jenkins e Docker
Análise de problemas no smoke test
Ajustes e melhorias no README
```

---

### Exemplos de prompts utilizados

| Prompt utilizado | Resposta da IA | Como o grupo utilizou |
|---|---|---|
| "Dá pra fazer teste unitário em frontend puro?" | A IA explicou que projetos com HTML, CSS e JavaScript puro também podem ter testes unitários, usando ferramentas como Jest e jsdom. | O grupo usou a explicação para configurar os testes e criar cenários ligados às funções reais do projeto, como login e manipulação de tarefas. |
| "O que eu preciso saber pra começar a fazer uma pipeline no Jenkins usando Docker de um frontend em HTML, CSS e JS puro?" | A IA apresentou os principais arquivos, ferramentas e etapas necessárias para montar a pipeline. | O grupo usou a resposta como ponto de partida para configurar o Jenkins com Docker e adaptar os comandos ao projeto. |
| "Por que minha pipeline Jenkins não consegue acessar `localhost:8081` no smoke test?" | A IA explicou que, como o Jenkins estava dentro de um container, o `localhost` apontava para o próprio container do Jenkins. | O grupo validou o problema, criou uma rede Docker fixa e ajustou o teste para acessar o frontend pelo nome do container. |

---

### Como a IA foi usada pelo grupo

A IA foi usada como apoio individual durante dúvidas e problemas específicos. Em vez de copiar as respostas diretamente, o grupo revisou as sugestões, testou no ambiente local e fez as adaptações necessárias.

Um exemplo foi a correção do **Smoke Test** da pipeline. A IA ajudou a entender o problema de rede entre containers, mas a solução final foi testada e validada pelo grupo no Jenkins.

---

### Partes feitas pelo grupo

As decisões finais e a implementação do projeto ficaram sob responsabilidade do grupo, incluindo:

```text
Definição do escopo do projeto
Implementação das funcionalidades
Integração com o backend
Criação e organização dos commits
Execução dos testes
Validação da pipeline
Ajustes finais no código e na documentação
```

A IA foi utilizada apenas como ferramenta de apoio para acelerar dúvidas, revisar ideias e auxiliar no entendimento de problemas técnicos.
