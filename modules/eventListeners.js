import { formatDate, escapeHtml, delay } from "./utils.js";
import { renderComments } from "./render.js";

export function handleAddLikeClick(comments) {
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("like-button")) {
      event.stopPropagation();
      const index = event.target.dataset.index;
      const comment = comments[index];

      if (comment.isLikeLoading) {
        return;
      }

      comment.isLikeLoading = true;
      const commentsList = document.querySelector(".comments");
      renderComments(comments, commentsList);

      delay(2000)
        .then(() => {
          comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1;
          comment.isLiked = !comment.isLiked;
        })
        .finally(() => {
          comment.isLikeLoading = false;
          const commentsList = document.querySelector(".comments");
          renderComments(comments, commentsList);
        });
    }
  });
}

export function handleAddCommentClick(comments) {
  document.addEventListener("click", (event) => {
    if (!event.target.classList.contains("like-button")) {
      if (event.target.closest(".comment")) {
        const commentElement = event.target.closest(".comment");
        const index = commentElement.dataset.index;
        const comment = comments[index];

        if (!comment) {
          console.error("handleAddCommentClick: comment is undefined");
          return;
        }

        const addFormNameInput = document.querySelector("#add-form-name");
        const addFormTextInput = document.querySelector("#add-form-text");

        addFormNameInput.value = comment.name;
        addFormTextInput.value = `> ${comment.text}\n`;
        addFormTextInput.focus();
      }
    }
  });
}

export function handleAddComment(
  addFormButton,
  addFormNameInput,
  addFormTextInput,
  comments,
  commentsList,
  addComment,
  loadComments,
  addCommentLoader,
  formNameValue,
  formTextValue,
  token
) {
  addFormButton.addEventListener("click", () => {
    const name = escapeHtml(addFormNameInput.value);
    let text = addFormTextInput.value; 

    text = text.trim();

    if (!name || !text) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    addFormButton.disabled = true;
    addCommentLoader.style.display = "block";

    addComment({ name, text, token })
      .then(() => {
        loadComments();
      })
      .catch(error => {
        console.error("Ошибка при добавлении комментария:", error);
        alert(`Произошла ошибка при добавлении комментария: ${error.message}.`);
      })
      .finally(() => {
        addFormButton.disabled = false;
        addCommentLoader.style.display = "none";
      });
  });
}