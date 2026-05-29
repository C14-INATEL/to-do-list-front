const { initTodo } = require("../js/scripts");

const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));

describe("scripts.js com mock de API", () => {
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
        <option value="done">Feitos</option>
        <option value="todo">A fazer</option>
      </select>

      <div id="todo-list"></div>
    `;

    localStorage.setItem("access", "token-fake");

    window.alert = jest.fn();

    global.fetch = jest.fn();
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("deve carregar tarefas do backend ao iniciar a página", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => [
        {
          id: 1,
          title: "Estudar Jenkins",
          done: false,
        },
      ],
    });

    initTodo();
    await flushPromises();

    expect(fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/api/notes/",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer token-fake",
        }),
      })
    );

    expect(document.querySelector("#todo-list").textContent).toContain(
      "Estudar Jenkins"
    );
  });

  test("deve criar tarefa chamando o backend com POST", async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => [],
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: async () => ({
          id: 2,
          title: "Nova tarefa",
          done: false,
        }),
      });

    initTodo();
    await flushPromises();

    const input = document.querySelector("#todo-input");
    const form = document.querySelector("#todo-form");

    input.value = "Nova tarefa";

    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );

    await flushPromises();

    expect(fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/api/notes/",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          title: "Nova tarefa",
          done: false,
        }),
      })
    );
  });
});