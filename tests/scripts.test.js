const {
  initTodo,
  getTodosLocalStorage,
  saveTodoLocalStorage,
  removeTodoLocalStorage,
} = require("../js/scripts");

describe("scripts.js", () => {
  beforeEach(() => {
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
      </select>

      <div id="todo-list"></div>
    `;

    localStorage.clear();

    initTodo();
  });

  test("deve salvar tarefa no localStorage", () => {
    saveTodoLocalStorage({ text: "Estudar", done: 0 });

    const todos = getTodosLocalStorage();

    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe("Estudar");
  });

  test("deve remover tarefa", () => {
    localStorage.setItem(
      "todos",
      JSON.stringify([
        { text: "Estudar", done: 0 },
        { text: "Trabalhar", done: 0 }
      ])
    );

    removeTodoLocalStorage("Estudar");

    const todos = getTodosLocalStorage();

    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe("Trabalhar");
  });

  test("deve esconder tarefas que não correspondem à busca", () => {
    saveTodoLocalStorage({ text: "Estudar", done: 0 });
    saveTodoLocalStorage({ text: "Trabalhar", done: 0 });

    initTodo();

    const searchInput = document.querySelector("#search-input");
    searchInput.value = "Estudar";
    searchInput.dispatchEvent(new Event("keyup"));

    const todos = document.querySelectorAll(".todo");
    const visiveis = [...todos].filter((todo) => todo.style.display !== "none");
    const ocultos = [...todos].filter((todo) => todo.style.display === "none");

    expect(visiveis.length).toBe(1);
    expect(visiveis[0].querySelector("h3").innerText).toBe("Estudar");
    expect(ocultos.length).toBe(1);
    expect(ocultos[0].querySelector("h3").innerText).toBe("Trabalhar");
  });

  test("não deve adicionar tarefa vazia ao submeter o formulário sem texto", () => {
    document.querySelector("#todo-input").value = "";

    document.querySelector("#todo-form").dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );

    const todos = document.querySelectorAll(".todo");
    expect(todos.length).toBe(0);
  });
});