document.addEventListener("DOMContentLoaded", (event) => {
    const textArea = document.querySelector("textarea");
    const form = document.querySelector("form");
    const parsedContainer = document.querySelector(".parsed");
    const previewContainer = document.querySelector(".preview");

    function escapeHTML(str) {
        return str.replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
    }
    
    function unescapeHTML(str) {
        const tempElement = document.createElement("div");
        tempElement.innerHTML = str;
        return tempElement.textContent || tempElement.innerText || "";
    }

    function parseMarkdown(line) {
        const formats = [
            { delimiter: "**", tag: "strong", flag: false },
            { delimiter: "*", tag: "em", flag: false },
            { delimiter: "~~", tag: "del", flag: false },
            { delimiter: "__", tag: "u", flag: false },
            { delimiter: "`", tag: "code", flag: false },
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
        const val = textArea.value;
        const lines = val.split('\n');
        
        let html = ``;
        let isCodeBlock = false;
        let codeBlockBuffer = "";

        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();

            // remove spaces
            if (line === "") {
                continue;
            }

            // code block
            if (line.startsWith("```")) {
                if (isCodeBlock) {
                    html += `${escapeHTML(`<pre><code>${codeBlockBuffer}</code></pre>`)}<br/>`
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

            // headings
            let level = 0;
            while (level < line.length && line[level] === "#") {
                level++;
            }

            if (level >= 1 && level <= 6 && line[level] === " ") {
                const content = line.slice(level + 1).trim();
                html += `${escapeHTML(`<h${level}>${content}</h${level}>`)}<br/>`;
                continue;
            }

            // paragraph
            if (line[0].match(/^[0-9a-zA-Z]+$/)) {
                html += `${escapeHTML(`<p>${line}<p>`)}<br/>`;
                continue;
            }

            // blockquote
            if (line.startsWith(">") && line[1] === " ") {
                const content = line.slice(2);
                html += `${escapeHTML(`<blockquote>${content}</blockquote>`)}<br/>`;
                continue;
            }

            // img tag
            if (line.startsWith("!")) {
                let altText = "";
                let imageSource = "";

                if (line[1] === "[" && line.includes("]") && line.includes("(") && line.includes(")")) {
                    altText = line.substring(line.indexOf("[") + 1, line.lastIndexOf("]"));
                    imageSource = line.substring(line.indexOf("(") + 1, line.lastIndexOf(")"));
                } else if (line[1] === "(" && line.includes(")")) {
                    imageSource = line.substring(line.indexOf("(") + 1, line.lastIndexOf(")"));
                }

                if (imageSource) {
                    html += `${escapeHTML(`<img src="${imageSource}" ${altText ? `alt="${altText}"` : ""} />`)}<br/>`;
                    continue;
                }
            }
        }
        console.log("unescaped HTML: ", unescapeHTML(html));
        console.log("HTML: ", html);

        if (html !== undefined) {
            parsedContainer.innerHTML = html;
            previewContainer.innerHTML = unescapeHTML(html);
        }
    });
});
