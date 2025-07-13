import { formatDate, escapeHtml } from "./utils.js";
import { renderComments } from "./render.js";
import { addComment } from "./api.js"; 

export function handleAddLikeClick(comments) {
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("like-button")) {
      event.stopPropagation();
      const index = event.target.dataset.index;

      if (comments[index].isLiked) {
        comments[index].likes--;
      } else {
        comments[index].likes++;
      }

      comments[index].isLiked = !comments[index].isLiked;
      const commentsList = document.querySelector(".comments");
      renderComments(comments, commentsList);
    }
  });
}

export function handleAddCommentClick(comments) {
  document.addEventListener("click", (event) => {
    if (event.target.closest(".comment") && !event.target.closest(".like-button")) {
      const commentElement = event.target.closest(".comment");
      const index = commentElement.dataset.index;
      const comment = comments[index];

      const addFormNameInput = document.querySelector("#add-form-name");
      const addFormTextInput = document.querySelector("#add-form-text");

      addFormNameInput.value = comment.name;
      addFormTextInput.value = `> ${comment.text}\n`;
      addFormTextInput.focus();
    }
  });
}

export function handleAddComment(
  addFormButton,
  addFormNameInput,
  addFormTextInput,
  comments,
  commentsList,
  loadComments,
) {
  addFormButton.addEventListener("click", async () => {
    let name = escapeHtml(addFormNameInput.value);
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
      await addComment({ name: name, text: text, forceError: true }); 

      addFormNameInput.value = "";
      addFormTextInput.value = "";
      sessionStorage.removeItem("storedName");
      sessionStorage.removeItem("storedText");
      loadComments();


    } catch (error) {
      console.error("Ошибка при добавлении комментария:", error);

      if (error.message === "Failed to fetch") {
        alert("Проблемы с соединением. Пожалуйста, попробуйте позже.");
      } else if (error.message === "Validation error") {
        alert("Слишком короткое имя или текст комментария.");
      } else {
        alert("Произошла ошибка при добавлении комментария. Попробуйте позже.");
      }
    } finally {
      addFormButton.disabled = false;
    }
  });
}