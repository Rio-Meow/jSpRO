const API_URL = "https://webdev-hw-api.vercel.app/api/v1/alina-kalinina";

export async function getComments() {
try {
    const response = await fetch(API_URL + "/comments", {
    method: "GET",
    });

    if (!response.ok) {
    throw new Error(`Ошибка при загрузке комментариев: ${response.status}`);
    }

    const data = await response.json();
    return data.comments.map((comment) => {
    return {
        name: comment.author.name,
        date: comment.date,
        text: comment.text,
        likes: comment.likes,
        isLiked: false,
    };
    });
} catch (error) {
    console.error("Ошибка при получении комментариев:", error);
    alert("Произошла ошибка при загрузке комментариев. Попробуйте позже.");
    return [];
}
}

export async function addComment({ text, name }) {
try {
    const response = await fetch(API_URL + "/comments", {
    method: "POST",
    body: JSON.stringify({
        text,
        name,
    }),
    });

    if (!response.ok) {
    throw new Error(`Ошибка при добавлении комментария: ${response.status}`);
    }

    return await response.json();
} catch (error) {
    console.error("Ошибка при добавлении комментария:", error);
    alert(`Произошла ошибка при добавлении комментария: ${error.message}.`);
    return null;
}
}