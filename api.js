const API_URL = "https://webdev-hw-api.vercel.app/api/v1/alina-kalinina/comments";

export async function getComments() {
try {
    const response = await fetch(API_URL, {
    method: "GET",
    });

    if (!response.ok) {
    throw new Error(`Ошибка при загрузке комментариев: ${response.status}`);
    }

    const data = await response.json();
    return data.comments.map((comment) => {
    return {
        name: comment.author.name,
        date: new Date(comment.date).toLocaleDateString() + " " + new Date(comment.date).toLocaleTimeString(),
        text: comment.text,
        likes: comment.likes,
        isLiked: false,
    };
    });
} catch (error) {
    console.error("Ошибка при получении комментариев:", error);
    return []; 
}
}

export async function addComment({ text, name }) {
try {
    const response = await fetch(API_URL, {
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
    return null; 
}
}