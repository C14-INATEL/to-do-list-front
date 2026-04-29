// =========================
// FUNÇÕES DE LOCAL STORAGE
// =========================

// Busca a lista de usuários salva no localStorage.
// Se não existir nada salvo ainda, retorna um array vazio.
const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];

// Salva um novo usuário no localStorage.
const saveUser = (user) => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
};


// =========================
// INICIALIZAÇÃO DO LOGIN
// =========================
// Tudo que depende do HTML fica aqui dentro.
// Isso evita erro nos testes, porque no Jest o HTML só vai existir
// depois que a gente montar o document.body.

const initLogin = () => {
    // Seleção dos elementos do DOM
    const loginForm = document.querySelector("#login-form");
    const registerForm = document.querySelector("#register-form");
    const loginSection = document.querySelector("#login-section");
    const registerSection = document.querySelector("#register-section");
    const goToRegister = document.querySelector("#go-to-register");
    const goToLogin = document.querySelector("#go-to-login");
    const loginError = document.querySelector("#login-error");
    const registerError = document.querySelector("#register-error");

    // Alterna da tela de login para a de cadastro
    goToRegister.addEventListener("click", (e) => {
        e.preventDefault();

        loginSection.classList.add("hide");
        registerSection.classList.remove("hide");
        loginError.classList.add("hide");
    });

    // Alterna da tela de cadastro para a de login
    goToLogin.addEventListener("click", (e) => {
        e.preventDefault();

        registerSection.classList.add("hide");
        loginSection.classList.remove("hide");
        registerError.classList.add("hide");
    });

    // Evento de cadastro
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.querySelector("#register-name").value;
        const email = document.querySelector("#register-email").value;
        const password = document.querySelector("#register-password").value;

        const users = getUsers();
        const exists = users.find((u) => u.email === email);

        // Se já existir usuário com esse e-mail, mostra erro
        if (exists) {
            registerError.classList.remove("hide");
            return;
        }

        // Salva novo usuário
        saveUser({ name, email, password });

        // Mostra mensagem de sucesso
        alert(`Cadastro realizado com sucesso! Bem-vindo(a), ${name}.`);

        // Volta para tela de login
        registerSection.classList.add("hide");
        loginSection.classList.remove("hide");
        registerError.classList.add("hide");
        registerForm.reset();
    });

    // Evento de login
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.querySelector("#login-email").value;
        const password = document.querySelector("#login-password").value;

        const users = getUsers();
        const user = users.find((u) => u.email === email && u.password === password);

        // Se não encontrar usuário, mostra erro
        if (!user) {
            loginError.classList.remove("hide");
            return;
        }

        // Se encontrar, salva como usuário logado
        localStorage.setItem("loggedUser", JSON.stringify(user));

        // Redireciona para a página principal
        window.location.href = "index.html";
    });
};


// =========================
// EXECUÇÃO NO NAVEGADOR
// =========================
// Faz o sistema continuar funcionando normalmente
// quando abrir o login.html no browser.

if (typeof window !== "undefined") {
    window.addEventListener("DOMContentLoaded", initLogin);
}


// =========================
// EXPORTS PARA TESTES
// =========================
// Permite importar no Jest.

if (typeof module !== "undefined") {
    module.exports = {
        getUsers,
        saveUser,
        initLogin,
    };
}