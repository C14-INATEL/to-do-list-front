const API_URL = "http://127.0.0.1:8000/api";

// =============================
// VARIÁVEIS GLOBAIS DO DOM
// =============================

let todoForm;
let todoInput;
let todoList;

let editForm;
let editInput;
let cancelEditBtn;

let searchInput;
let eraseBtn;
let filterBtn;

// Guarda o ID da tarefa que está sendo editada
let editingTodoId = null;


// =============================
// FUNÇÕES DE API
// =============================

const getAccessToken = () => {
    return localStorage.getItem("access");
};

const apiRequest = async (url, options = {}) => {
    const token = getAccessToken();

    const response = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            ...options.headers,
        },
    });

    if (response.status === 401) {
        alert("Sua sessão expirou. Faça login novamente.");

        // Ajuste esse caminho se seu login estiver em outro lugar
        window.location.href = "pages/login.html";
        return;
    }

    if (response.status === 204) {
        return null;
    }

    const data = await response.json();

    if (!response.ok) {
        console.log(data);
        throw new Error("Erro na requisição com a API");
    }

    return data;
};

const getTodosApi = async () => {
    return await apiRequest(`${API_URL}/notes/`);
};

const createTodoApi = async (text) => {
    return await apiRequest(`${API_URL}/notes/`, {
        method: "POST",
        body: JSON.stringify({
            title: text,
            done: false,
        }),
    });
};

const updateTodoApi = async (id, text) => {
    return await apiRequest(`${API_URL}/notes/${id}/`, {
        method: "PATCH",
        body: JSON.stringify({
            title: text,
        }),
    });
};

const updateTodoStatusApi = async (id, done) => {
    return await apiRequest(`${API_URL}/notes/${id}/`, {
        method: "PATCH",
        body: JSON.stringify({
            done: done,
        }),
    });
};

const deleteTodoApi = async (id) => {
    return await apiRequest(`${API_URL}/notes/${id}/`, {
        method: "DELETE",
    });
};


// =============================
// FUNÇÕES DE INTERFACE
// =============================

const saveTodo = (todoData) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    // Guarda o ID da tarefa no HTML
    todo.dataset.id = todoData.id;

    const todoTitle = document.createElement("h3");
    todoTitle.textContent = todoData.title;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    if (todoData.done) {
        todo.classList.add("done");
    }

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
};

const clearTodos = () => {
    todoList.innerHTML = "";
};

const loadTodos = async () => {
    try {
        clearTodos();

        const todos = await getTodosApi();

        todos.forEach((todo) => {
            saveTodo(todo);
        });
    } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
        alert("Erro ao carregar tarefas.");
    }
};

const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};

const updateTodoOnScreen = (id, text) => {
    const todo = document.querySelector(`.todo[data-id="${id}"]`);

    if (!todo) return;

    const todoTitle = todo.querySelector("h3");
    todoTitle.textContent = text;
};

const getSearchedTodos = (search) => {
    const todos = document.querySelectorAll(".todo");
    const normalizedSearch = search.toLowerCase();

    todos.forEach((todo) => {
        const todoTitle = todo.querySelector("h3").textContent.toLowerCase();

        todo.style.display = todoTitle.includes(normalizedSearch)
            ? "flex"
            : "none";
    });
};

const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        const isDone = todo.classList.contains("done");

        if (filterValue === "all") {
            todo.style.display = "flex";
        }

        if (filterValue === "done") {
            todo.style.display = isDone ? "flex" : "none";
        }

        if (filterValue === "todo") {
            todo.style.display = !isDone ? "flex" : "none";
        }
    });
};


// =============================
// EVENTOS DO SISTEMA
// =============================

const registerEvents = () => {
    // Adiciona uma nova tarefa
    todoForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const inputValue = todoInput.value.trim();

        if (!inputValue) return;

        try {
            const newTodo = await createTodoApi(inputValue);
            saveTodo(newTodo);
        } catch (error) {
            console.error("Erro ao criar tarefa:", error);
            alert("Erro ao criar tarefa.");
        }
    });


    // Controla os botões das tarefas: concluir, editar e remover
    document.addEventListener("click", async (e) => {
        const button = e.target.closest("button");
        const parentEl = e.target.closest(".todo");

        if (!button || !parentEl) return;

        const todoId = parentEl.dataset.id;
        const todoTitle = parentEl.querySelector("h3").textContent;

        // Marcar como feita / desfazer
        if (button.classList.contains("finish-todo")) {
            try {
                const isDone = parentEl.classList.contains("done");
                const newDoneStatus = !isDone;

                await updateTodoStatusApi(todoId, newDoneStatus);

                parentEl.classList.toggle("done");
            } catch (error) {
                console.error("Erro ao atualizar status:", error);
                alert("Erro ao marcar tarefa como feita.");
            }
        }

        // Remover tarefa
        if (button.classList.contains("remove-todo")) {
            try {
                await deleteTodoApi(todoId);
                parentEl.remove();
            } catch (error) {
                console.error("Erro ao remover tarefa:", error);
                alert("Erro ao remover tarefa.");
            }
        }

        // Editar tarefa
        if (button.classList.contains("edit-todo")) {
            toggleForms();

            editInput.value = todoTitle;
            editingTodoId = todoId;
        }
    });


    // Cancela a edição
    cancelEditBtn.addEventListener("click", (e) => {
        e.preventDefault();

        editingTodoId = null;
        toggleForms();
    });


    // Confirma a edição
    editForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const editInputValue = editInput.value.trim();

        if (!editInputValue || !editingTodoId) return;

        try {
            await updateTodoApi(editingTodoId, editInputValue);

            updateTodoOnScreen(editingTodoId, editInputValue);

            editingTodoId = null;
            toggleForms();
        } catch (error) {
            console.error("Erro ao editar tarefa:", error);
            alert("Erro ao editar tarefa.");
        }
    });


    // Pesquisa tarefas pelo texto digitado
    searchInput.addEventListener("keyup", (e) => {
        getSearchedTodos(e.target.value);
    });


    // Limpa o campo de pesquisa
    eraseBtn.addEventListener("click", (e) => {
        e.preventDefault();

        searchInput.value = "";
        searchInput.dispatchEvent(new Event("keyup"));
    });


    // Filtra as tarefas pelo status
    filterBtn.addEventListener("change", (e) => {
        filterTodos(e.target.value);
    });
};


// =============================
// INICIALIZAÇÃO
// =============================

const initTodo = () => {
    const token = localStorage.getItem("access");

    if (!token) {
        alert("Você precisa fazer login primeiro.");

        // Ajuste esse caminho se necessário
        window.location.href = "pages/login.html";
        return;
    }

    todoForm = document.querySelector("#todo-form");
    todoInput = document.querySelector("#todo-input");
    todoList = document.querySelector("#todo-list");

    editForm = document.querySelector("#edit-form");
    editInput = document.querySelector("#edit-input");
    cancelEditBtn = document.querySelector("#cancel-edit-btn");

    searchInput = document.querySelector("#search-input");
    eraseBtn = document.querySelector("#erase-button");
    filterBtn = document.querySelector("#filter-select");

    registerEvents();
    loadTodos();
};


// =============================
// EXECUÇÃO NO NAVEGADOR
// =============================

if (typeof window !== "undefined") {
    window.addEventListener("DOMContentLoaded", initTodo);
}

if (typeof module !== "undefined") {
    module.exports = {
        initTodo,
        saveTodo,
        clearTodos,
        loadTodos,
        getSearchedTodos,
        filterTodos,
        createTodoApi,
        deleteTodoApi,
        updateTodoApi,
        updateTodoStatusApi,
    };
}