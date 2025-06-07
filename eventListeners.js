import { formatDate, escapeHtml } from "./utils.js";
import { renderComments } from "./render.js";

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
    if (event.target.closest(".comment")) {
      const commentElement = event.target.closest(".comment");
      const index = commentElement.dataset.index;
      const comment = comments[index];

      const addFormNameInput = document.querySelector("#add-form-name");
      const addFormTextInput = document.querySelector("#add-form-text");

      addFormNameInput.value = comment.name;
      addFormTextInput.value = `> ${comment.name}: ${comment.text}\n`;
      addFormTextInput.focus();
    }
  });
}

export function handleAddComment(
  addFormButton,
  addFormNameInput,
  addFormTextInput,
  comments,
  commentsList
) {
  addFormButton.addEventListener("click", () => {
    const name = escapeHtml(addFormNameInput.value);
    const text = escapeHtml(addFormTextInput.value);

    if (!name || !text) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    const now = new Date();
    const formattedDate = formatDate(now);

    const newComment = {
      name: name,
      date: formattedDate,
      text: text,
      likes: 0,
      isLiked: false,
    };

    comments.push(newComment);

    addFormNameInput.value = "";
    addFormTextInput.value = "";

    renderComments(comments, commentsList);
  });
}