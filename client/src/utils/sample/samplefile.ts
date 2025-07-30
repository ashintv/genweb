export const files: Record<string, { name: string; language: string; value: string }> = {
  'script.js': {
    name: 'script.js',
    language: 'javascript',
    value: `console.log('Hello, world!');\n// This is a simple JavaScript file.\n// You can edit this code to see changes in the console.`,
  },
  'style.css': {
    name: 'style.css',
    language: 'css',
    value: `body {\n  background-color: #f0f0f0;\n  font-family: Arial, sans-serif;\n}\n\nh1 {\n  color: #333;\n}\n\n/* Add your styles here */\n`,
  },
  'index.html': {
    name: 'index.html',
    language: 'html',
    value: `<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>My Project</title>\n</head>\n<body>\n    <h1>Hello, World!</h1>\n    <script src="script.js"></script>\n</body>\n</html>`,
  },
};