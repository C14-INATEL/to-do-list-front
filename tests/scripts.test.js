const {
  initTodo,
  getSearchedTodos,
  filterTodos,
} = require("../js/scripts");

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

describe("scripts.js - testes unitários simples", () => {
  beforeEach(async () => {
    document.body.innerHTML = `
      <form id="todo-form">
        <input id="todo-input" />
      </form>

      <form id="edit-form" class="hide">
        <input id="edit-input" />
        <button id="cancel-edit-btn"></button>
      </form>

      <input id="search-input" />
      <button id="erase-button"></button>

      <select id="filter-select">
        <option value="all">Todos</option>
        <option value="done">Feitos</option>
        <option value="todo">A fazer</option>
      </select>

      <div id="todo-list"></div>
    `;

    localStorage.setItem("access", "token-fake");

    window.alert = jest.fn();

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => [],
    });

    initTodo();
    await flushPromises();
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("não deve adicionar tarefa vazia ao submeter o formulário", async () => {
    const input = document.querySelector("#todo-input");
    const form = document.querySelector("#todo-form");

    input.value = "";

    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );

    await flushPromises();

    const chamadasPost = fetch.mock.calls.filter(
      (call) => call[1] && call[1].method === "POST"
    );

    expect(chamadasPost.length).toBe(0);
  });

  test("deve limpar o campo de busca ao clicar no botão apagar", () => {
    const searchInput = document.querySelector("#search-input");
    const eraseButton = document.querySelector("#erase-button");

    searchInput.value = "Estudar";

    eraseButton.dispatchEvent(
      new Event("click", { bubbles: true, cancelable: true })
    );

    expect(searchInput.value).toBe("");
  });

  test("deve esconder tarefas que não correspondem à busca", () => {
    const todoList = document.querySelector("#todo-list");

    todoList.innerHTML = `
      <div class="todo">
        <h3>Estudar</h3>
      </div>

      <div class="todo">
        <h3>Trabalhar</h3>
      </div>
    `;

    getSearchedTodos("Estudar");

    const todos = document.querySelectorAll(".todo");

    expect(todos[0].style.display).toBe("flex");
    expect(todos[1].style.display).toBe("none");
  });

  test("deve filtrar somente tarefas pendentes", () => {
    const todoList = document.querySelector("#todo-list");

    todoList.innerHTML = `
      <div class="todo done">
        <h3>Finalizada</h3>
      </div>

      <div class="todo">
        <h3>Pendente</h3>
      </div>
    `;

    filterTodos("todo");

    const todos = document.querySelectorAll(".todo");

    expect(todos[0].style.display).toBe("none");
    expect(todos[1].style.display).toBe("flex");
  });
});