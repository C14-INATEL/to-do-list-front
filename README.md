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
git clone https://github.com/C14-INATEL/to-do-list-front.git
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

As histórias de usuário abaixo representam as principais funcionalidades que guiaram o desenvolvimento da aplicação. Cada história segue o formato **Como <perfil>, eu quero <ação> para que <benefício>**, contendo critérios de aceitação em **Given/When/Then**, prioridade, status e rastreabilidade.

---

### História 1: Autenticação do usuário

**Prioridade:** Alta  
**Status:** Entregue  
**Rastreabilidade:** História 1 → Implementação em `pages/login.html`, `js/login.js` e `js/scripts.js` → Testes em `tests/login.test.js` / `tests/login.mock.test.js`

**Como** usuário da aplicação, **eu quero** realizar login antes de acessar minhas tarefas **para que** meus dados fiquem vinculados à minha conta e protegidos no sistema.

#### Critérios de aceitação

- **Given** que o usuário ainda não está autenticado na aplicação.
- **When** ele tenta acessar a página principal de tarefas.
- **Then** o sistema deve bloquear o acesso e redirecionar o usuário para a página de login.

- **Given** que o usuário informa credenciais válidas na tela de login.
- **When** ele confirma o login.
- **Then** o sistema deve armazenar o token de acesso e permitir que o usuário acesse a aplicação.

---

### História 2: Carregamento de tarefas pelo backend

**Prioridade:** Alta  
**Status:** Entregue  
**Rastreabilidade:** História 2 → Implementação em `js/scripts.js` → Testes em `tests/scripts.test.js` / `tests/scripts.mock.test.js`

**Como** usuário autenticado, **eu quero** visualizar minhas tarefas salvas no backend **para que** eu consiga acessar minha lista de tarefas de forma vinculada à minha conta.

#### Critérios de aceitação

- **Given** que o usuário está autenticado na aplicação.
- **When** ele acessa a tela principal da lista de tarefas.
- **Then** o frontend deve buscar as tarefas no backend e exibi-las na interface.

- **Given** que o backend retorna uma lista de tarefas.
- **When** a página principal é carregada.
- **Then** cada tarefa recebida deve ser exibida na tela com seu respectivo status.

---

### História 3: Cadastro de nova tarefa

**Prioridade:** Alta  
**Status:** Entregue  
**Rastreabilidade:** História 3 → Implementação em `js/scripts.js` → Testes em `tests/scripts.test.js` / `tests/scripts.mock.test.js`

**Como** usuário autenticado, **eu quero** adicionar novas tarefas à minha lista **para que** eu consiga organizar as atividades que preciso realizar.

#### Critérios de aceitação

- **Given** que o usuário está autenticado e está na tela principal da aplicação.
- **When** ele digita o nome de uma tarefa e confirma o cadastro.
- **Then** a tarefa deve ser enviada para o backend e exibida na lista.

- **Given** que o campo de tarefa está vazio.
- **When** o usuário tenta cadastrar uma nova tarefa.
- **Then** nenhuma tarefa deve ser criada.

---

### História 4: Edição de tarefa existente

**Prioridade:** Alta  
**Status:** Entregue  
**Rastreabilidade:** História 4 → Implementação em `js/scripts.js` → Testes em `tests/scripts.test.js` / `tests/scripts.mock.test.js`

**Como** usuário autenticado, **eu quero** editar uma tarefa já cadastrada **para que** eu consiga corrigir ou atualizar uma atividade da minha lista.

#### Critérios de aceitação

- **Given** que existe uma tarefa cadastrada na lista.
- **When** o usuário seleciona a opção de editar.
- **Then** o sistema deve exibir o formulário de edição com o texto atual da tarefa.

- **Given** que o usuário alterou o texto da tarefa.
- **When** ele confirma a edição.
- **Then** a alteração deve ser enviada para o backend e atualizada na interface.

---

### História 5: Marcar tarefa como concluída

**Prioridade:** Alta  
**Status:** Entregue  
**Rastreabilidade:** História 5 → Implementação em `js/scripts.js` → Testes em `tests/scripts.test.js` / `tests/scripts.mock.test.js`

**Como** usuário autenticado, **eu quero** marcar tarefas como concluídas **para que** eu consiga identificar quais atividades já foram finalizadas.

#### Critérios de aceitação

- **Given** que existe uma tarefa pendente cadastrada.
- **When** o usuário marca a tarefa como concluída.
- **Then** o novo status deve ser enviado para o backend.

- **Given** que a tarefa foi marcada como concluída.
- **When** a atualização é realizada com sucesso.
- **Then** a tarefa deve aparecer visualmente como finalizada na interface.

---

### História 6: Exclusão de tarefa

**Prioridade:** Alta  
**Status:** Entregue  
**Rastreabilidade:** História 6 → Implementação em `js/scripts.js` → Testes em `tests/scripts.test.js` / `tests/scripts.mock.test.js`

**Como** usuário autenticado, **eu quero** excluir tarefas da minha lista **para que** eu consiga remover atividades que não são mais necessárias.

#### Critérios de aceitação

- **Given** que existe uma tarefa cadastrada na lista.
- **When** o usuário seleciona a opção de excluir.
- **Then** a solicitação de exclusão deve ser enviada para o backend.

- **Given** que a tarefa foi excluída com sucesso no backend.
- **When** a resposta da API é recebida.
- **Then** a tarefa deve ser removida da interface.

---

### História 7: Pesquisa de tarefas

**Prioridade:** Média  
**Status:** Entregue  
**Rastreabilidade:** História 7 → Implementação em `js/scripts.js` → Testes em `tests/scripts.test.js`

**Como** usuário autenticado, **eu quero** pesquisar tarefas pelo texto **para que** eu consiga encontrar rapidamente uma atividade específica na minha lista.

#### Critérios de aceitação

- **Given** que existem tarefas cadastradas na lista.
- **When** o usuário digita um texto no campo de pesquisa.
- **Then** apenas as tarefas que contêm o texto pesquisado devem permanecer visíveis.

- **Given** que o usuário limpa o campo de pesquisa.
- **When** a pesquisa é apagada.
- **Then** todas as tarefas devem voltar a ser exibidas.

---

### História 8: Filtragem de tarefas por status

**Prioridade:** Média  
**Status:** Entregue  
**Rastreabilidade:** História 8 → Implementação em `js/scripts.js` → Testes em `tests/scripts.test.js`

**Como** usuário autenticado, **eu quero** filtrar minhas tarefas por status **para que** eu consiga visualizar apenas tarefas concluídas, pendentes ou todas as tarefas.

#### Critérios de aceitação

- **Given** que existem tarefas concluídas e pendentes na lista.
- **When** o usuário seleciona o filtro de tarefas concluídas.
- **Then** apenas as tarefas concluídas devem ser exibidas.

- **Given** que existem tarefas concluídas e pendentes na lista.
- **When** o usuário seleciona o filtro de tarefas pendentes.
- **Then** apenas as tarefas pendentes devem ser exibidas.

- **Given** que o usuário seleciona o filtro de todas as tarefas.
- **When** o filtro é aplicado.
- **Then** todas as tarefas devem ser exibidas novamente.

---

### História 9: Validação da aplicação por testes automatizados

**Prioridade:** Média  
**Status:** Entregue  
**Rastreabilidade:** História 9 → Implementação em `tests/*.test.js` → Configuração em `jest.config.js` e `package.json`

**Como** desenvolvedor do projeto, **eu quero** validar as funcionalidades principais com testes automatizados **para que** alterações futuras não quebrem comportamentos já implementados.

#### Critérios de aceitação

- **Given** que existem testes automatizados configurados no projeto.
- **When** o comando `npm test` é executado.
- **Then** os testes devem ser executados com sucesso.

- **Given** que alguma funcionalidade principal seja alterada incorretamente.
- **When** os testes forem executados.
- **Then** ao menos um teste relacionado deve falhar, indicando o problema.

---

### História 10: Validação do frontend por pipeline

**Prioridade:** Média  
**Status:** Entregue parcialmente  
**Rastreabilidade:** História 10 → Implementação em `Jenkinsfile`, `docker-compose.yml` e `jenkins/Dockerfile`

**Como** desenvolvedor do projeto, **eu quero** executar uma pipeline automatizada no Jenkins **para que** o frontend seja validado automaticamente durante o processo de integração.

#### Critérios de aceitação

- **Given** que o Jenkins está configurado com Docker.
- **When** a pipeline é executada.
- **Then** o Jenkins deve realizar o checkout do repositório.

- **Given** que o projeto foi baixado pelo Jenkins.
- **When** a pipeline chega na etapa de instalação.
- **Then** as dependências devem ser instaladas com `npm ci`.

- **Given** que as dependências foram instaladas.
- **When** a pipeline executa os testes.
- **Then** os testes com Jest devem ser executados com sucesso.

- **Given** que os testes passaram.
- **When** a pipeline chega na etapa de empacotamento.
- **Then** os arquivos do frontend devem ser empacotados em um arquivo `.zip`.
