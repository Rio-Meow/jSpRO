const API_URL = "https://webdev-hw-api.vercel.app/api/v2/alina-kalinina";

export async function getComments() {
  try {
    const response = await fetch(API_URL + "/comments", {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Ошибка при загрузке комментариев: ${response.status}`);
    }

    const data = await response.json();
    return data.comments.map((comment) => {
      return {
        id: comment.id,
        name: comment.author.name,
        date: comment.date,
        text: comment.text,
        likes: comment.likes,
        isLiked: comment.isLiked,
      };
    });
  } catch (error) {
    console.error("Ошибка при получении комментариев:", error);
    throw error;
  }
}

export async function addComment({ name, text }) {
  try {
    const token = localStorage.getItem('token');
    const url = `${API_URL}/comments`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `key ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        text: text,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Ошибка ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Ошибка при добавлении комментария:", error);
    throw error;
  }
}