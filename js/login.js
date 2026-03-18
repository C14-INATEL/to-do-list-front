// seleção de elementos
const loginForm = document.querySelector("#login-form");
const registerForm = document.querySelector("#register-form");
const loginSection = document.querySelector("#login-section");
const registerSection = document.querySelector("#register-section");
const goToRegister = document.querySelector("#go-to-register");
const goToLogin = document.querySelector("#go-to-login");
const loginError = document.querySelector("#login-error");
const registerError = document.querySelector("#register-error");

// alternar entre login e cadastro
goToRegister.addEventListener("click", (e) => {
    e.preventDefault();
    loginSection.classList.add("hide");
    registerSection.classList.remove("hide");
    loginError.classList.add("hide");
});

goToLogin.addEventListener("click", (e) => {
    e.preventDefault();
    registerSection.classList.add("hide");
    loginSection.classList.remove("hide");
    registerError.classList.add("hide");
});

// funções de localStorage
const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];

const saveUser = (user) => {
    const users = getUsers();
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
};

// cadastro
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.querySelector("#register-name").value;
    const email = document.querySelector("#register-email").value;
    const password = document.querySelector("#register-password").value;

    const users = getUsers();
    const exists = users.find((u) => u.email === email);

    if (exists) {
        registerError.classList.remove("hide");
        return;
    }

    saveUser({ name, email, password });
    alert(`Cadastro realizado com sucesso! Bem-vindo(a), ${name}.`);

    registerSection.classList.add("hide");
    loginSection.classList.remove("hide");
    registerError.classList.add("hide");
    registerForm.reset();
});

// login
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.querySelector("#login-email").value;
    const password = document.querySelector("#login-password").value;

    const users = getUsers();
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
        loginError.classList.remove("hide");
        return;
    }

    localStorage.setItem("loggedUser", JSON.stringify(user));
    window.location.href = "index.html";
});