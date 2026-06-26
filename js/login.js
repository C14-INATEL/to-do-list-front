const API_URL = "http://127.0.0.1:8000/api";

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
    const registerUsernameInput = document.querySelector("#register-username");
    const registerNameInput = document.querySelector("#register-name");
    const registerEmailInput = document.querySelector("#register-email");
    const registerPasswordInput = document.querySelector("#register-password");

    // Campos do login
    const loginUsernameInput = document.querySelector("#login-username");
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

    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = registerUsernameInput.value.trim();
        const firstName = registerNameInput.value.trim();
        const email = registerEmailInput.value.trim();
        const password = registerPasswordInput.value.trim();
        

        try {
            const response = await fetch("http://127.0.0.1:8000/api/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    first_name: firstName,
                    password: password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.log(data);
                registerError.classList.remove("hide");
                return;
            }

            alert(`Cadastro realizado com sucesso! Bem-vindo(a), ${username}.`);

            showLoginScreen(loginSection, registerSection, registerError);

            registerForm.reset();

        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            registerError.classList.remove("hide");
        }
    });

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = loginUsernameInput.value.trim();
        const password = loginPasswordInput.value.trim();

        try {
            const response = await fetch(`${API_URL}/login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                console.log(data);
                loginError.classList.remove("hide");
                return;
            }

            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);

            window.location.href = "../index.html";

        } catch (error) {
            console.error("Erro ao fazer login:", error);
            loginError.classList.remove("hide");
        }
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
        showRegisterScreen,
        showLoginScreen,
        initLogin,
    };
}