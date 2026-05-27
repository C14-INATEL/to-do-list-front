const { initLogin } = require("../js/login");

describe("login.js - testes com mock", () => {
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

    localStorage.clear();
    global.alert = jest.fn();
    global.fetch = jest.fn();
  });

  test("deve fazer login com sucesso e salvar os tokens", async () => {
  global.fetch.mockResolvedValue({
    ok: true,
    json: async () => ({
      access: "access-token-fake",
      refresh: "refresh-token-fake",
    }),
  });

  initLogin();

  document.querySelector("#login-username").value = "marcelo";
  document.querySelector("#login-password").value = "123456";

  document.querySelector("#login-form").dispatchEvent(
    new Event("submit", { bubbles: true, cancelable: true })
  );

  await Promise.resolve();
  await Promise.resolve();

  expect(global.fetch).toHaveBeenCalledWith(
    "http://127.0.0.1:8000/api/login/",
    expect.objectContaining({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "marcelo",
        password: "123456",
      }),
    })
  );

  expect(localStorage.getItem("access")).toBe("access-token-fake");
  expect(localStorage.getItem("refresh")).toBe("refresh-token-fake");
});

  test("deve mostrar erro quando o cadastro falhar", async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      json: async () => ({
        username: ["Usuário já existe"],
      }),
    });

    initLogin();

    document.querySelector("#register-username").value = "marcelo";
    document.querySelector("#register-name").value = "Marcelo";
    document.querySelector("#register-email").value = "marcelo@email.com";
    document.querySelector("#register-password").value = "123456";

    document.querySelector("#register-form").dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );

    await Promise.resolve();
    await Promise.resolve();

    expect(global.fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/api/register/",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );

    expect(
      document.querySelector("#register-error").classList.contains("hide")
    ).toBe(false);
  });
});