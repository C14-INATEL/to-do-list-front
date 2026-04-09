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
});