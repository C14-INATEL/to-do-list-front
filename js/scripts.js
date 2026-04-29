// =========================
// VARIÁVEIS GLOBAIS DO DOM
// =========================
// Antes elas eram preenchidas logo ao carregar o arquivo.
// Para testes, isso é ruim, porque o HTML pode ainda não existir.
// Então deixamos declaradas aqui e só atribuímos dentro do initTodo().

let todoForm;
let todoInput;
let todoList;
let editForm;
let editInput;
let searchInput;
let eraseBtn;
let cancelEditBtn;
let filterBtn;

let oldInputValue;


// =========================
// FUNÇÕES PRINCIPAIS
// =========================

// Cria uma tarefa na tela
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

    // Se vier do localStorage já marcada como concluída
    if (done) {
        todo.classList.add("done");
    }

    // Se save = 1, salva no localStorage.
    // Quando carrega tarefas antigas, usamos save = 0 para não duplicar.
    if (save) {
        saveTodoLocalStorage({ text, done: 0 });
    }

    todoList.appendChild(todo);

    // Limpa o input depois de adicionar
    todoInput.value = "";
    todoInput.focus();
};


// Alterna entre tela normal e tela de edição
const toggleForms = () => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
};


// Atualiza o texto da tarefa na tela e no localStorage
const updateTodo = (text) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;
            updateTodoLocalStorage(oldInputValue, text);
        }
    });
};


// Pesquisa tarefas pelo texto digitado
const getSearchedTodos = (search) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3").innerText.toLowerCase();
        const normalizeSearch = search.toLowerCase();

        todo.style.display = "flex";

        if (!todoTitle.includes(normalizeSearch)) {
            todo.style.display = "none";
        }
    });
};


// Filtra tarefas: todas, feitas ou a fazer
const filterTodos = (filterValue) => {
    const todos = document.querySelectorAll(".todo");

    switch (filterValue) {
        case "all":
            todos.forEach((todo) => (todo.style.display = "flex"));
            break;

        case "done":
            todos.forEach((todo) =>
                todo.classList.contains("done")
                    ? (todo.style.display = "flex")
                    : (todo.style.display = "none")
            );
            break;

        case "todo":
            todos.forEach((todo) =>
                !todo.classList.contains("done")
                    ? (todo.style.display = "flex")
                    : (todo.style.display = "none")
            );
            break;
    }
};


// =========================
// LOCAL STORAGE
// =========================

const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    return todos;
};


// Carrega tarefas já salvas no localStorage para a tela
const loadTodos = () => {
    const todos = getTodosLocalStorage();

    todos.forEach((todo) => {
        saveTodo(todo.text, todo.done, 0);
    });
};


// Salva uma nova tarefa no localStorage
const saveTodoLocalStorage = (todo) => {
    const todos = getTodosLocalStorage();
    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));
};


// Remove tarefa do localStorage pelo texto
const removeTodoLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    const filteredTodos = todos.filter((todo) => todo.text !== todoText);

    localStorage.setItem("todos", JSON.stringify(filteredTodos));
};


// Alterna o status done da tarefa no localStorage
const updateTodosStatusLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    todos.map((todo) =>
        todo.text === todoText ? (todo.done = !todo.done) : null
    );

    localStorage.setItem("todos", JSON.stringify(todos));
};


// Atualiza o texto da tarefa no localStorage
const updateTodoLocalStorage = (todoOldText, todoNewText) => {
    const todos = getTodosLocalStorage();

    todos.map((todo) =>
        todo.text === todoOldText ? (todo.text = todoNewText) : null
    );

    localStorage.setItem("todos", JSON.stringify(todos));
};


// =========================
// INICIALIZAÇÃO DO SISTEMA
// =========================
// Tudo que depende do HTML fica aqui dentro.
// Isso resolve o problema de testes, porque no Jest a gente monta o HTML primeiro
// e só depois chama initTodo().

const initTodo = () => {
    // Seleção dos elementos do DOM
    todoForm = document.querySelector("#todo-form");
    todoInput = document.querySelector("#todo-input");
    todoList = document.querySelector("#todo-list");
    editForm = document.querySelector("#edit-form");
    editInput = document.querySelector("#edit-input");
    searchInput = document.querySelector("#search-input");
    eraseBtn = document.querySelector("#erase-button");
    cancelEditBtn = document.querySelector("#cancel-edit-btn");
    filterBtn = document.querySelector("#filter-select");

    // Evento de adicionar tarefa
    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const inputValue = todoInput.value;

        if (inputValue) {
            saveTodo(inputValue);
        }
    });

    // Evento global de clique para editar, remover e marcar como concluído
    document.addEventListener("click", (e) => {
        const targetEl = e.target;
        const parentEl = targetEl.closest("div");
        let todoTitle;

        if (parentEl && parentEl.querySelector("h3")) {
            todoTitle = parentEl.querySelector("h3").innerText;
        }

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

    // Cancela edição
    cancelEditBtn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleForms();
    });

    // Confirma edição
    editForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const editInputValue = editInput.value;

        if (editInputValue) {
            updateTodo(editInputValue);
        }

        toggleForms();
    });

    // Pesquisa
    searchInput.addEventListener("keyup", (e) => {
        const search = e.target.value;
        getSearchedTodos(search);
    });

    // Limpa pesquisa
    eraseBtn.addEventListener("click", (e) => {
        e.preventDefault();

        searchInput.value = "";
        searchInput.dispatchEvent(new Event("keyup"));
    });

    // Filtro
    filterBtn.addEventListener("change", (e) => {
        const filterValue = e.target.value;
        filterTodos(filterValue);
    });

    // Carrega tarefas já salvas
    loadTodos();
};


// =========================
// EXECUÇÃO NO NAVEGADOR
// =========================
// Isso mantém o sistema funcionando normalmente no browser.
// Quando abrir index.html, ele inicializa sozinho.

if (typeof window !== "undefined") {
    window.addEventListener("DOMContentLoaded", initTodo);
}


// =========================
// EXPORTS PARA TESTES
// =========================
// Isso permite importar as funções no Jest.

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
        initTodo,
    };
}