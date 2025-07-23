import { formatDate, escapeHtml } from "./utils.js";
import { renderComments } from "./render.js";
import { addComment } from "./api.js";
import { decodeHtml } from "./utils.js";

export function handleAddLikeClick(comments) {
    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("like-button")) {
            event.stopPropagation();
            const index = event.target.dataset.index;

            try {
                if (comments[index].isLiked) {
                    comments[index].likes--;
                } else {
                    comments[index].likes++;
                }

                comments[index].isLiked = !comments[index].isLiked;
                const commentsList = document.querySelector(".comments");
                renderComments(comments, commentsList);
            } catch (error) {
                console.error("Ошибка при обработке лайка:", error);
                alert("Произошла ошибка при обработке лайка. Попробуйте позже.");
            }
        }
    });
}

export function handleAddCommentClick(comments) {
    document.addEventListener("click", (event) => {
        if (event.target.closest(".comment") && !event.target.closest(".like-button")) {
            const commentElement = event.target.closest(".comment");
            const indexStr = commentElement.dataset.index;

            const index = parseInt(indexStr, 10);

            if (Number.isInteger(index) && index >= 0 && index < comments.length && comments[index]) {
                try {
                    const comment = comments[index];

                    const addFormNameInput = document.querySelector("#add-form-name");
                    const addFormTextInput = document.querySelector("#add-form-text");

                    addFormNameInput.value = ""; 

                    addFormTextInput.value = `${decodeHtml(comment.text)}\n`;

                    addFormTextInput.focus();
                } catch (error) {
                    console.error("Ошибка при обработке клика по комментарию:", error);
                    alert("Произошла ошибка. Попробуйте позже.");
                }
            } else {
                console.error("Неверный индекс комментария:", index);
                return;
            }
        }
    });
}

export function handleAddComment(
    addFormButton,
    addFormNameInput,
    addFormTextInput,
    comments,
    loadComments
) {
    addFormButton.addEventListener("click", async () => {
        const name = escapeHtml(addFormNameInput.value);
        let text = escapeHtml(addFormTextInput.value);

        if (!name || !text) {
            alert("Пожалуйста, заполните все поля");
            return;
        }

        text = text.trim();

        if (!text) {
            alert("Пожалуйста, введите непустой комментарий");
            return;
        }

        addFormButton.disabled = true;

        try {
            await addComment({ name: name, text: text });

            addFormNameInput.value = "";
            addFormTextInput.value = "";

            await loadComments();
        } catch (error) {
            console.error("Ошибка при добавлении комментария:", error);
            alert(`Произошла ошибка при добавлении комментария: ${error.message}. Попробуйте позже.`);
        } finally {
            addFormButton.disabled = false;
        }
    });
}