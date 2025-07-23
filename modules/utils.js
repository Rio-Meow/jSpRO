export function formatDate(date) {
    if (!date) {
        return "";
    }

    if (!(date instanceof Date)) {
        return "";
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

export function escapeHtml(text) {
    return text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;")
        .replaceAll("&lt;", "< ") 
        .replaceAll("&gt;", " >");
}

export function parseAndFormatDate(dateString) {
    if (!dateString) {
        return "";
    }

    try {
        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            return "Неверная дата";
        }

        return formatDate(date);
    } catch (error) {
        console.error("Ошибка при парсинге даты:", error);
        return "Неверная дата";
    }
}

export function decodeHtml(text) {
    const element = document.createElement('textarea');
    element.innerHTML = text;
    return element.value;
}