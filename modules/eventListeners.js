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
    if (event.target.closest(".comment") && !event.target.closest(".like-button")) {
      const commentElement = event.target.closest(".comment");
      const index = commentElement.dataset.index;
      const comment = comments[index];

      const addFormTextInput = document.querySelector("#add-form-text");

      addFormTextInput.value = `${comment.text}\n`;
      addFormTextInput.focus();
    }
  });
}