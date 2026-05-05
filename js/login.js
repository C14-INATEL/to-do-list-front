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
// FUNÇÕES DE LOCAL STORAGE
// =============================

// Busca todos os usuários salvos.
const getUsers = () => {
    return storageService.getStorage("users");
};


// Salva um novo usuário no localStorage.
const saveUser = (user) => {
    const users = getUsers();

    users.push(user);

    storageService.setStorage("users", users);
};


// Salva o usuário que acabou de fazer login.
const saveLoggedUser = (user) => {
    storageService.setStorage("loggedUser", user);
};


// =============================
// FUNÇÕES DE INTERFACE
// =============================

// Mostra a tela de cadastro e esconde a tela de login.
const showRegisterScreen = (loginSection, registerSection, loginError) => {
    loginSection.classList.add("hide");
    registerSection.classList.remove("hide");
    loginError.classList.add("hide");
};


// Mostra a tela de login e esconde a tela de cadastro.
const showLoginScreen = (loginSection, registerSection, registerError) => {
    registerSection.classList.add("hide");
    loginSection.classList.remove("hide");
    registerError.classList.add("hide");
};


// =============================
// INICIALIZAÇÃO DO LOGIN
// =============================

const initLogin = () => {
    // Formulários
    const loginForm = document.querySelector("#login-form");
    const registerForm = document.querySelector("#register-form");

    // Seções
    const loginSection = document.querySelector("#login-section");
    const registerSection = document.querySelector("#register-section");

    // Botões de troca de tela
    const goToRegister = document.querySelector("#go-to-register");
    const goToLogin = document.querySelector("#go-to-login");

    // Mensagens de erro
    const loginError = document.querySelector("#login-error");
    const registerError = document.querySelector("#register-error");

    // Campos do cadastro
    const registerNameInput = document.querySelector("#register-name");
    const registerEmailInput = document.querySelector("#register-email");
    const registerPasswordInput = document.querySelector("#register-password");

    // Campos do login
    const loginEmailInput = document.querySelector("#login-email");
    const loginPasswordInput = document.querySelector("#login-password");


    // =============================
    // EVENTOS DE TROCA DE TELA
    // =============================

    goToRegister.addEventListener("click", (e) => {
        e.preventDefault();

        showRegisterScreen(loginSection, registerSection, loginError);
    });


    goToLogin.addEventListener("click", (e) => {
        e.preventDefault();

        showLoginScreen(loginSection, registerSection, registerError);
    });


    // =============================
    // EVENTO DE CADASTRO
    // =============================

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = registerNameInput.value.trim();
        const email = registerEmailInput.value.trim();
        const password = registerPasswordInput.value.trim();

        const users = getUsers();

        const userAlreadyExists = users.find((user) => user.email === email);

        // Impede o cadastro de dois usuários com o mesmo e-mail.
        if (userAlreadyExists) {
            registerError.classList.remove("hide");
            return;
        }

        saveUser({ name, email, password });

        alert(`Cadastro realizado com sucesso! Bem-vindo(a), ${name}.`);

        showLoginScreen(loginSection, registerSection, registerError);

        registerForm.reset();
    });


    // =============================
    // EVENTO DE LOGIN
    // =============================

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = loginEmailInput.value.trim();
        const password = loginPasswordInput.value.trim();

        const users = getUsers();

        const user = users.find((user) => {
            return user.email === email && user.password === password;
        });

        // Mostra erro caso o e-mail ou senha estejam incorretos.
        if (!user) {
            loginError.classList.remove("hide");
            return;
        }

        saveLoggedUser(user);

        window.location.href = "../index.html";
    });
};


// =============================
// EXECUÇÃO NO NAVEGADOR
// =============================

if (typeof window !== "undefined") {
    window.addEventListener("DOMContentLoaded", initLogin);
}


// =============================
// EXPORTS PARA TESTES
// =============================

if (typeof module !== "undefined") {
    module.exports = {
        getUsers,
        saveUser,
        saveLoggedUser,
        showRegisterScreen,
        showLoginScreen,
        initLogin,
    };
}