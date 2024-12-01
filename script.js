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
            lines[i] = lines[i].trim();
            if (lines[i] === "") {
                console.log("jebem ti mamu");
                continue;
            }

            if (lines[i].startsWith("#") && lines[i][1] === " ") {
                const content = lines[i].split(" ").slice(1).join(" ");
                html += `<p>${escapeHTML("<h1>" + content + "</h1>")}</p>`;
            }

            if (lines[i][0] === "#" && lines[i][1] === "#" && lines[i][2] === " ") {
                const content = lines[i].split(" ").slice(1).join(" ");
                html += `<p>${escapeHTML("<h2>" + content + "</h2>")}</p>`;
            }

            if (lines[i][0] === "#" && lines[i][1] === "#" && lines[i][2] === "#" && lines[i][3] === " ") {
                const content = lines[i].split(" ").slice(1).join(" ");
                html += `<p>${escapeHTML("<h3>" + content + "</h3>")}</p>`;
            }

            if (lines[i][0] === "#" && lines[i][1] === "#" && lines[i][2] === "#" && lines[i][3] === "#" && lines[i][4] === " ") {
                const content = lines[i].split(" ").slice(1).join(" ");
                html += `<p>${escapeHTML("<h4>" + content + "</h4>")}</p>`;
            }

            if (lines[i][0] === "#" && lines[i][1] === "#" && lines[i][2] === "#" && lines[i][3] === "#" && lines[i][4] === "#" && lines[i][5] === " ") {
                const content = lines[i].split(" ").slice(1).join(" ");
                html += `<p>${escapeHTML("<h5>" + content + "</h5>")}</p>`;
            }

            if (lines[i][0] === "#" && lines[i][1] === "#" && lines[i][2] === "#" && lines[i][3] === "#" && lines[i][4] === "#" && lines[i][5] === "#" && lines[i][6] === " ") {
                const content = lines[i].split(" ").slice(1).join(" ");
                html += `<p>${escapeHTML("<h6>" + content + "</h6>")}</p>`;
            }

        }

        if (html !== undefined) {
            parsedContainer.insertAdjacentHTML("afterbegin", html);
        }
    })
});