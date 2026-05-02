const { getUsers, saveUser, initLogin } = require("../js/login");

describe("login.js", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="login-section">
        <form id="login-form">
          <input id="login-email" />
          <input id="login-password" />
          <span id="login-error" class="hide"></span>
          <a id="go-to-register"></a>
        </form>
      </div>

      <div id="register-section" class="hide">
        <form id="register-form">
          <input id="register-name" />
          <input id="register-email" />
          <input id="register-password" />
          <span id="register-error" class="hide"></span>
          <a id="go-to-login"></a>
        </form>
      </div>
    `;

    localStorage.clear();
    global.alert = jest.fn();

    initLogin();
  });

  test("deve salvar usuário no localStorage", () => {
    saveUser({ name: "Marcelo", email: "a@a.com", password: "123" });

    const users = getUsers();

    expect(users.length).toBe(1);
    expect(users[0].email).toBe("a@a.com");
  });

  test("deve mostrar erro ao cadastrar email duplicado", () => {
    localStorage.setItem(
      "users",
      JSON.stringify([{ name: "Marcelo", email: "a@a.com", password: "123" }])
    );

    document.querySelector("#register-name").value = "Outro";
    document.querySelector("#register-email").value = "a@a.com";
    document.querySelector("#register-password").value = "456";

    document.querySelector("#register-form").dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );

    expect(
      document.querySelector("#register-error").classList.contains("hide")
    ).toBe(false);
  });

  test("deve chamar alert com mensagem de boas-vindas ao cadastrar usuário", () => {
    document.querySelector("#register-name").value = "Julia";
    document.querySelector("#register-email").value = "julia@email.com";
    document.querySelector("#register-password").value = "123";

    document.querySelector("#register-form").dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );

    expect(global.alert).toHaveBeenCalledWith(
      "Cadastro realizado com sucesso! Bem-vindo(a), Julia."
    );
  });

  test("deve salvar loggedUser no localStorage após login bem-sucedido", () => {
    const mockSetItem = jest.spyOn(Storage.prototype, "setItem");

    localStorage.setItem(
      "users",
      JSON.stringify([{ name: "Julia", email: "julia@email.com", password: "123" }])
    );

    document.querySelector("#login-email").value = "julia@email.com";
    document.querySelector("#login-password").value = "123";

    document.querySelector("#login-form").dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );

    expect(mockSetItem).toHaveBeenCalledWith(
      "loggedUser",
      JSON.stringify({ name: "Julia", email: "julia@email.com", password: "123" })
    );

    mockSetItem.mockRestore();
  });
});