const COMMENTS_KEY = "comments";
const USERS_KEY = "users";
const TOKEN_KEY = "token";

function getFromLocalStorage(key) {
const data = localStorage.getItem(key);
return data ? JSON.parse(data) : null;
}

function saveToLocalStorage(key, data) {
localStorage.setItem(key, JSON.stringify(data));
}

export async function getComments() {
try {
    const comments = getFromLocalStorage(COMMENTS_KEY) || [];
    return comments.map((comment) => ({
    ...comment,
    date:
        new Date(comment.date).toLocaleDateString() +
        " " +
        new Date(comment.date).toLocaleTimeString(), 
    }));
} catch (error) {
    console.error("Ошибка при получении комментариев из LocalStorage:", error);
    return [];
}
}

export async function addComment({ text, name, token }) {
try {
    const users = getFromLocalStorage(USERS_KEY) || [];
    const user = users.find((user) => user.token === token);
    if (!user) {
    throw new Error("Пользователь не авторизован");
    }

    const newComment = {
    name: user.login, 
    date: new Date().toISOString(),
    text,
    likes: 0,
    isLiked: false,
    };

    const comments = getFromLocalStorage(COMMENTS_KEY) || [];
    comments.push(newComment);
    saveToLocalStorage(COMMENTS_KEY, comments);
    return newComment;
} catch (error) {
    console.error("Ошибка при добавлении комментария в LocalStorage:", error);
    throw error;
}
}

export async function register({ login, password }) {
try {
    let users = getFromLocalStorage(USERS_KEY) || [];
    const existingUser = users.find((user) => user.login === login);

    if (existingUser) {
    throw new Error("Пользователь с таким логином уже существует");
    }

    const newUser = {
    login,
    password,
    token: generateToken(), 
    };

    users.push(newUser);
    saveToLocalStorage(USERS_KEY, users);
    return newUser;
} catch (error) {
    console.error("Ошибка при регистрации в LocalStorage:", error);
    throw error;
}
}

export async function login({ login, password }) {
try {
    const users = getFromLocalStorage(USERS_KEY) || [];
    const user = users.find(
    (user) => user.login === login && user.password === password
    );

    if (!user) {
    throw new Error("Неверный логин или пароль");
    }

    saveToLocalStorage(TOKEN_KEY, user.token);
    return user.token;
} catch (error) {
    console.error("Ошибка при авторизации в LocalStorage:", error);
    throw error;
}
}


export async function logout() {
localStorage.removeItem(TOKEN_KEY);
}

export async function getToken() {
return getFromLocalStorage(TOKEN_KEY);
}

function generateToken() {
return Math.random().toString(36).substring(2, 15);
}