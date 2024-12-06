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

    function parseBold(line) {
        let result = "";
        let isBold = false;
        let buffer = "";

        for (let i = 0; i < line.length; i++) {
            if (line[i] === "*" && line[i + 1] === "*") {
                if (isBold) {
                    result += `<strong>${buffer}</strong>`;
                    buffer = "";
                } else {
                    result += buffer;
                    buffer = "";
                }
                isBold = !isBold;
                i++;
            } else {
                buffer += line[i];
            }
        }

        result += buffer;
        return result;
    }

    form.addEventListener("submit", e => {
        e.preventDefault();
        let val = textArea.value;
        let lines = val.split('\n');
        let html = ``;
        
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();
            if (line === "") {
                console.log("jebem ti mamu");
                continue;
            }

            // Process bold text
            line = parseBold(line);

            // Headings
            let level = 0;
            while (level < line.length && line[level] === "#") {
                level++;
            }

            if (level >= 1 && level <= 6 && line[level] === " ") {
                const content = line.slice(level + 1).trim();
                html += `<p>${escapeHTML(`<h${level}>${content}</h${level}>`)}</p>`;
                continue;
            }

            // Paragraph
            if (line[0].match(/^[0-9a-zA-Z]+$/)) {
                html += `<p>${escapeHTML(`<p>${line}<p>`)}</p>`;
                continue;
            }

            // Blockquote
            if (line.startsWith(">") && line[1] === " ") {
                const content = line.slice(2);
                html += `<p>${escapeHTML(`<blockquote>${content}</blockquote>`)}</p>`;
                continue;
            }
        }

        if (html !== undefined) {
            parsedContainer.innerHTML = html;
        }
    });
});
