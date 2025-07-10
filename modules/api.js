const API_URL = "https://webdev-hw-api.vercel.app/api/v1/alina-kalinina";
const COMMENTS_KEY = "comments";
const TOKEN_KEY = "token";

// Вспомогательная функция для работы с LocalStorage
function getFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  console.log(`getFromLocalStorage(${key}):`, data);
  return data ? JSON.parse(data) : null;
}

function saveToLocalStorage(key, data) {
  console.log(`saveToLocalStorage(${key}):`, data);
  localStorage.setItem(key, JSON.stringify(data));
}

// Функция для получения комментариев (теперь из LocalStorage)
export async function getComments() {
  try {
    const comments = getFromLocalStorage(COMMENTS_KEY) || [];
    console.log("getComments: Loaded comments from LocalStorage:", comments);
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

// Функция для добавления комментария (теперь в LocalStorage)
export async function addComment({ text, name, token }) {
  try {
    // Проверка токена (если он есть)
    if (!token) {
      throw new Error("Пользователь не авторизован");
    }
    const comments = getFromLocalStorage(COMMENTS_KEY) || [];
    const newComment = {
      name, // Используем переданное имя
      date: new Date().toISOString(),
      text,
      likes: 0,
      isLiked: false,
    };
    comments.push(newComment);
    saveToLocalStorage(COMMENTS_KEY, comments);
    console.log("addComment: Added comment to LocalStorage:", newComment);
    return newComment;
  } catch (error) {
    console.error("Ошибка при добавлении комментария в LocalStorage:", error);
    throw error;
  }
}

// Функция для регистрации (теперь в LocalStorage)
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
      token: generateToken(), // Генерируем простой токен
    };

    users.push(newUser);
    saveToLocalStorage(USERS_KEY, users);
    return newUser;
  } catch (error) {
    console.error("Ошибка при регистрации в LocalStorage:", error);
    throw error;
  }
}

// Функция для авторизации (теперь в LocalStorage)
export async function login({ login, password }) {
  try {
    const response = await fetch(API_URL + "/users/login", {
      method: "POST",
      body: JSON.stringify({
        login,
        password,
      }),
    });

    if (!response.ok) {
      try {
        const errorBody = await response.json();
        throw new Error(`Неверный логин или пароль: ${errorBody.message}`);
      } catch (jsonError) {
        throw new Error("Неверный логин или пароль");
      }
    }

    const data = await response.json();
    localStorage.setItem(TOKEN_KEY, data.token);
    return data.token;
  } catch (error) {
    console.error("Ошибка при авторизации:", error);
    throw error;
  }
}

// Функция для получения текущего токена
export async function getToken() {
  const token = localStorage.getItem(TOKEN_KEY);
  console.log("getToken:", token);
  return token;
}

// Вспомогательная функция для генерации простого токена
function generateToken() {
  return Math.random().toString(36).substring(2, 15);
}