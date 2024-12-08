# Markdown to HTML Parser

This project is a **Markdown to HTML parser** that converts user-written Markdown syntax into HTML elements. It's a simple, interactive tool that helps visualize the conversion of Markdown text into its corresponding HTML representation.

## Features

The parser supports the following Markdown elements:

| Markdown Syntax        | Output HTML           | Description                             |
|-------------------------|-----------------------|-----------------------------------------|
| `# Heading 1`          | `<h1>Heading 1</h1>`  | Converts to an H1 heading.             |
| `## Heading 2`         | `<h2>Heading 2</h2>`  | Converts to an H2 heading.             |
| `### Heading 3`        | `<h3>Heading 3</h3>`  | Converts to an H3 heading.             |
| `#### Heading 4`       | `<h4>Heading 4</h4>`  | Converts to an H4 heading.             |
| `##### Heading 5`      | `<h5>Heading 5</h5>`  | Converts to an H5 heading.             |
| `###### Heading 6`     | `<h6>Heading 6</h6>`  | Converts to an H6 heading.             |
| `Text`                 | `<p>Text</p>`         | Converts plain text to a paragraph.    |
| `> Blockquote`         | `<blockquote>`        | Converts to a blockquote.              |
| `**Bold Text**`        | `<strong>Bold Text</strong>` | Renders bold text.             |
| `*Italic Text*`        | `<em>Italic Text</em>` | Renders italicized text.               |
| `~~Strikethrough~~`    | `<del>Strikethrough</del>` | Renders strikethrough text.       |
| `__Underlined__`       | `<u>Underlined</u>`   | Renders underlined text.               |
| `` `Inline Code` ``    | `<code>Inline Code</code>` | Renders inline code.             |
| `` ```Code Block``` ``       | `<pre><code>Code Block</code></pre>` | Renders an ordered list.        |
| `![Alt text](url)`     | `<img src="url" alt="Alt text">` | Embeds an image with alt text.  |
| `[Link Text](url)`     | `<a href="url">Link Text</a>` | Renders a hyperlink.            |
| `* List item 1 *`        | `<ul><li>List item 1</li></ul>` | Renders an unordered list.      |

## Example

Here’s an example of the parser in action:

### Input (Markdown):
```markdown
# Heading 1
**Bold Text**
[Link to Google](https://google.com)
```

### Output (HTML):
```
<h1>Heading 1</h1>
<strong>Bold Text</strong>
<a href="https://google.com">Link to Google</a>
```
