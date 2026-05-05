jest.mock("../js/storage", () => ({
    getStorage: jest.fn(),
    setStorage: jest.fn(),
}));

const { getStorage, setStorage } = require("../js/storage");
const { removeTodoLocalStorage } = require("../js/scripts");

describe("scripts.js com mock", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("deve remover tarefa usando storage mockado", () => {
        getStorage.mockReturnValue([
            { text: "Estudar", done: 0 },
            { text: "Trabalhar", done: 0 },
        ]);

        removeTodoLocalStorage("Estudar");

        expect(getStorage).toHaveBeenCalledWith("todos");

        expect(setStorage).toHaveBeenCalledWith("todos", [
            { text: "Trabalhar", done: 0 },
        ]);
    });
});