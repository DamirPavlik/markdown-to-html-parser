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

    function parseMarkdown(line) {
        const formats = [
            { delimiter: "**", tag: "strong", flag: false },
            { delimiter: "*", tag: "em", flag: false },
            { delimiter: "~~", tag: "del", flag: false },
        ];

        let result = "";
        let buffer = "";
        let activeFormat = null;

        for (let i = 0; i < line.length; i++) {
            const twoChar = line[i] + (line[i + 1] || "");
            const oneChar = line[i];

            let format = formats.find(f => f.delimiter === twoChar);
            if (format) {
                if (activeFormat === format) {
                    result += `<${format.tag}>${buffer}</${format.tag}>`;
                    buffer = "";
                    activeFormat = null;
                } else {
                    result += buffer;
                    buffer = "";
                    activeFormat = format;
                }
                i++; 
                continue;
            }

            format = formats.find(f => f.delimiter === oneChar);
            if (format) {
                if (activeFormat === format) {
                    result += `<${format.tag}>${buffer}</${format.tag}>`;
                    buffer = "";
                    activeFormat = null;
                } else {
                    result += buffer;
                    buffer = "";
                    activeFormat = format;
                }
                continue;
            }

            buffer += line[i];
        }

        result += buffer;
        return result;
    }


    form.addEventListener("submit", e => {
        e.preventDefault();
        let val = textArea.value;
        let lines = val.split('\n');
        let html = ``;
        let isCodeBlock = false;
        let codeBlockBuffer = "";
        
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();
            if (line === "") {
                continue;
            }

            if (line.startsWith("```")) {
                if (isCodeBlock) {
                    html += `<p>${escapeHTML(`<pre><code>${codeBlockBuffer}</code></pre>`)}</p>`
                    codeBlockBuffer = "";
                }
                isCodeBlock = !isCodeBlock;
                continue;
            }

            if (isCodeBlock) {
                codeBlockBuffer += (codeBlockBuffer ? "\n" : "") + line;
                continue;
            }

            line = parseMarkdown(line);

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

            if (line[0] === "`" && line[1] === "`" && line[2] === "`") {

            }
        }

        if (html !== undefined) {
            parsedContainer.innerHTML = html;
        }
    });
});
