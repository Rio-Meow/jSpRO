import { escapeHtml, parseAndFormatDate } from "./utils.js";

export function renderComments(comments, commentsList) {
    commentsList.innerHTML = comments
        .map((comment, index) => {
            const formattedText = comment.text.replace(/<|>/g, (match) => {
                return `<span class="tag">${escapeHtml(match)}</span>`;
            });

            return `
                <li class="comment" data-index="${index}">
                    <div class="comment-header">
                        <div>${escapeHtml(comment.name)}</div>
                        <div>${parseAndFormatDate(comment.date)}</div>
                    </div>
                    <div class="comment-body">
                        <div class="comment-text">
                            ${formattedText}
                        </div>
                    </div>
                    <div class="comment-footer">
                        <div class="likes">
                            <span class="likes-counter">${comment.likes}</span>
                            <button 
                                data-index="${index}" 
                                class="like-button ${comment.isLiked ? "-active-like" : ""}"
                                aria-label="${comment.isLiked ? 'Убрать лайк' : 'Лайкнуть комментарий'}"
                            ></button>
                        </div>
                    </div>
                </li>
            `;
        })
        .join("");
}