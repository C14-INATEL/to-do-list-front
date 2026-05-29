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
```

Caso a pipeline esteja em outra branch, substitua `*/main` pelo nome da branch utilizada.

Exemplo:

```text
*/nome-da-branch
```

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
