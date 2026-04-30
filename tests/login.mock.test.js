jest.mock("../js/storage", () => ({
    getStorage: jest.fn(),
    setStorage: jest.fn(),
}));

const { getStorage, setStorage } = require("../js/storage");
const { saveUser } = require("../js/login");

describe("login.js com mock", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("deve salvar usuário usando storage mockado", () => {
        const user = {
            name: "Marcelo",
            email: "a@a.com",
            password: "123",
        };

        getStorage.mockReturnValue([]);

        saveUser(user);

        expect(getStorage).toHaveBeenCalledWith("users");
        expect(setStorage).toHaveBeenCalledWith("users", [user]);
    });
});