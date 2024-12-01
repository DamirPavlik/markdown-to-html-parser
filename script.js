document.addEventListener("DOMContentLoaded", (event) => {
    const textArea = document.querySelector("textarea");
    const form = document.querySelector("form");
    const parsedContainer = document.querySelector(".parsed");

    function escapeHTML(str) {
        return str.replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
    }
    
    form.addEventListener("submit", e => {
        e.preventDefault();
        let val = textArea.value;
        let lines = val.split('\n');
        let html = ``;
        for (let i = 0; i < lines.length; i++) {
            line = lines[i].trim();
            if (line === "") {
                console.log("jebem ti mamu");
                continue;
            }
            let level = 0;
            while (level < line.length && line[level] === "#") {
                level ++;
            }

            if (level >= 1 && level <= 6 && line[level] === " ") {
                const content = line.slice(level + 1).trim();
                html += `<p>${escapeHTML(`<h${level}>${content}</h${level}>`)}</p>`;
            }
        }

        if (html !== undefined) {
            parsedContainer.insertAdjacentHTML("afterbegin", html);
        }
    })
});