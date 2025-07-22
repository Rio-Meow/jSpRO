const API_URL = "https://wedev-api.sky.pro/api/user";

export async function login({ login, password }) {
  try {
    const response = await fetch(API_URL + "/login", {
      method: "POST",
      body: JSON.stringify({
        "login": login,
        "password": password,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Неверный логин или пароль");
    }

    const data = await response.json();
    localStorage.setItem("token", data.user.token);
    return data;
  } catch (error) {
    console.error("Ошибка при авторизации:", error);
    throw error;
  }
}