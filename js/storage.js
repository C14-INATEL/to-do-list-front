const getStorage = (key) => {
    return JSON.parse(localStorage.getItem(key)) || [];
};

const setStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

if (typeof window !== "undefined") {
    window.storage = {
        getStorage,
        setStorage,
    };
}

if (typeof module !== "undefined") {
    module.exports = {
        getStorage,
        setStorage,
    };
}