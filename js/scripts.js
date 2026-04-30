// =============================
// IMPORTAÇÃO DO STORAGE
// =============================

let storageService;

if (typeof module !== "undefined" && module.exports) {
    storageService = require("./storage");
} else {
    storageService = window.storage;
}


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

// Guarda o texto antigo da tarefa que está sendo editada
let oldInputValue;


// =============================
// FUNÇÕES DE INTERFACE
// =============================

// Cria uma tarefa visualmente na tela.
// O parâmetro save controla se ela também será salva no localStorage.
// Isso evita duplicação quando carregamos tarefas já salvas.
const saveTodo = (text, done = 0, save = 1) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
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

    if (done) {
        todo.classList.add("done");
    }

    if (save) {
        saveTodoLocalStorage({ text, done: 0 });
    }

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();
};


// Alterna entre o formulário de criação e o formulário de edição.
const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};


// Atualiza o texto da tarefa na tela e também no localStorage.
const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        const todoTitle = todo.querySelector("h3");

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
            updateTodoLocalStorage(oldInputValue, text);
        }
    });
};


// Mostra apenas as tarefas que possuem o texto pesquisado.
const getSearchedTodos = (search) => {
    const todos = document.querySelectorAll(".todo");
    const normalizedSearch = search.toLowerCase();

    todos.forEach((todo) => {
        const todoTitle = todo.querySelector("h3").innerText.toLowerCase();

        todo.style.display = todoTitle.includes(normalizedSearch)
            ? "flex"
            : "none";
    });
};


// Filtra as tarefas de acordo com o status selecionado.
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
// FUNÇÕES DE LOCAL STORAGE
// =============================

// Busca todas as tarefas salvas.
const getTodosLocalStorage = () => {
    return storageService.getStorage("todos");
};


// Carrega as tarefas salvas no localStorage para a tela.
const loadTodos = () => {
    const todos = getTodosLocalStorage();

    todos.forEach((todo) => {
        saveTodo(todo.text, todo.done, 0);
    });
};


// Salva uma nova tarefa no localStorage.
const saveTodoLocalStorage = (todo) => {
    const todos = getTodosLocalStorage();

    todos.push(todo);

    storageService.setStorage("todos", todos);
};


// Remove uma tarefa do localStorage usando o texto como referência.
const removeTodoLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    const filteredTodos = todos.filter((todo) => todo.text !== todoText);

    storageService.setStorage("todos", filteredTodos);
};


// Alterna o status de concluída/não concluída no localStorage.
const updateTodosStatusLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    todos.forEach((todo) => {
        if (todo.text === todoText) {
            todo.done = !todo.done;
        }
    });

    storageService.setStorage("todos", todos);
};


// Atualiza o texto de uma tarefa no localStorage.
const updateTodoLocalStorage = (todoOldText, todoNewText) => {
    const todos = getTodosLocalStorage();

    todos.forEach((todo) => {
        if (todo.text === todoOldText) {
            todo.text = todoNewText;
        }
    });

    storageService.setStorage("todos", todos);
};


// =============================
// EVENTOS DO SISTEMA
// =============================

const registerEvents = () => {
    // Adiciona uma nova tarefa
    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const inputValue = todoInput.value.trim();

        if (inputValue) {
            saveTodo(inputValue);
        }
    });


    // Controla os botões das tarefas: concluir, editar e remover.
    // Como as tarefas são criadas dinamicamente, usamos evento global.
    document.addEventListener("click", (e) => {
        const targetEl = e.target;
        const parentEl = targetEl.closest(".todo");

        if (!parentEl) return;

        const todoTitle = parentEl.querySelector("h3").innerText;

        if (targetEl.classList.contains("finish-todo")) {
            parentEl.classList.toggle("done");
            updateTodosStatusLocalStorage(todoTitle);
        }

        if (targetEl.classList.contains("remove-todo")) {
            parentEl.remove();
            removeTodoLocalStorage(todoTitle);
        }

        if (targetEl.classList.contains("edit-todo")) {
            toggleForms();

            editInput.value = todoTitle;
            oldInputValue = todoTitle;
        }
    });


    // Cancela a edição da tarefa
    cancelEditBtn.addEventListener("click", (e) => {
        e.preventDefault();

        toggleForms();
    });


    // Confirma a edição da tarefa
    editForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const editInputValue = editInput.value.trim();

        if (editInputValue) {
            updateTodo(editInputValue);
        }

        toggleForms();
    });


    // Pesquisa tarefas pelo texto digitado
    searchInput.addEventListener("keyup", (e) => {
        getSearchedTodos(e.target.value);
    });


    // Limpa o campo de pesquisa e mostra todas as tarefas novamente
    eraseBtn.addEventListener("click", (e) => {
        e.preventDefault();

        searchInput.value = "";
        searchInput.dispatchEvent(new Event("keyup"));
    });


    // Filtra as tarefas pelo status selecionado
    filterBtn.addEventListener("change", (e) => {
        filterTodos(e.target.value);
    });
};


// =============================
// INICIALIZAÇÃO
// =============================

const initTodo = () => {
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


// =============================
// EXPORTS PARA TESTES
// =============================

if (typeof module !== "undefined") {
    module.exports = {
        saveTodo,
        toggleForms,
        updateTodo,
        getSearchedTodos,
        filterTodos,
        getTodosLocalStorage,
        loadTodos,
        saveTodoLocalStorage,
        removeTodoLocalStorage,
        updateTodosStatusLocalStorage,
        updateTodoLocalStorage,
        registerEvents,
        initTodo,
    };
}