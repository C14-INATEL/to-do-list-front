const {
  showRegisterScreen,
  showLoginScreen,
  initLogin,
} = require("../js/login");

describe("login.js - testes unitários", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="login-section">
        <form id="login-form">
          <input id="login-username" />
          <input id="login-password" />
          <span id="login-error" class="hide"></span>
          <a id="go-to-register"></a>
        </form>
      </div>

      <div id="register-section" class="hide">
        <form id="register-form">
          <input id="register-username" />
          <input id="register-name" />
          <input id="register-email" />
          <input id="register-password" />
          <span id="register-error" class="hide"></span>
          <a id="go-to-login"></a>
        </form>
      </div>
    `;

    global.fetch = jest.fn();
    global.alert = jest.fn();
  });

  test("deve mostrar a tela de cadastro", () => {
    const loginSection = document.querySelector("#login-section");
    const registerSection = document.querySelector("#register-section");
    const loginError = document.querySelector("#login-error");

    showRegisterScreen(loginSection, registerSection, loginError);

    expect(loginSection.classList.contains("hide")).toBe(true);
    expect(registerSection.classList.contains("hide")).toBe(false);
    expect(loginError.classList.contains("hide")).toBe(true);
  });

  test("deve mostrar a tela de login", () => {
    const loginSection = document.querySelector("#login-section");
    const registerSection = document.querySelector("#register-section");
    const registerError = document.querySelector("#register-error");

    showLoginScreen(loginSection, registerSection, registerError);

    expect(registerSection.classList.contains("hide")).toBe(true);
    expect(loginSection.classList.contains("hide")).toBe(false);
    expect(registerError.classList.contains("hide")).toBe(true);
  });

  test("deve alternar para a tela de cadastro ao clicar em go-to-register", () => {
    initLogin();

    document.querySelector("#go-to-register").dispatchEvent(
      new Event("click", { bubbles: true, cancelable: true })
    );

    expect(
      document.querySelector("#login-section").classList.contains("hide")
    ).toBe(true);

    expect(
      document.querySelector("#register-section").classList.contains("hide")
    ).toBe(false);
  });

  test("deve alternar para a tela de login ao clicar em go-to-login", () => {
    initLogin();

    document.querySelector("#go-to-register").dispatchEvent(
      new Event("click", { bubbles: true, cancelable: true })
    );

    document.querySelector("#go-to-login").dispatchEvent(
      new Event("click", { bubbles: true, cancelable: true })
    );

    expect(
      document.querySelector("#register-section").classList.contains("hide")
    ).toBe(true);

    expect(
      document.querySelector("#login-section").classList.contains("hide")
    ).toBe(false);
  });
});