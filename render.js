import { escapeHtml } from "./utils.js";

export function renderComments(comments, commentsList) {
  commentsList.innerHTML = comments
    .map((comment, index) => {
      return `<li class="comment" data-index="${index}">
                <div class="comment-header">
                    <div>${escapeHtml(comment.name)}</div>
                    <div>${comment.date}</div>
                </div>
                <div class="comment-body">
                    <div class="comment-text">
                        ${escapeHtml(comment.text)}
                    </div>
                </div>
                <div class="comment-footer">
                    <div class="likes">
                        <span class="likes-counter">${comment.likes}</span>
                        <button data-index="${index}" class="like-button ${
        comment.isLiked ? "-active-like" : ""
      }"></button>
                    </div>
                </div>
            </li>`;
    })
    .join("");
}