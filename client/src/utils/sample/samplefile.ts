import type { FileItem } from "@/lib/types";
export const sampleFiles: FileItem[] = [
  {
    name: 'project',
    type: 'folder',
    path: '/project',
    children: [
      {
        name: 'app.js',
        type: 'file',
        path: '/project/app.js',
        content: `console.log('App started');`,
      },
      {
        name: 'config',
        type: 'folder',
        path: '/project/config',
        children: [
          {
            name: 'settings.json',
            type: 'file',
            path: '/project/config/settings.json',
            content: `{"env": "development"}`,
          },
        ],
      },
    ],
  },
  {
    name: '.gitignore',
    type: 'file',
    path: '/.gitignore',
    content: `node_modules/`,
  },
];




export const trialParseData = "Of course! I can help you build a classic Snake game. We'll use HTML for the structure, CSS for styling, and JavaScript for the game logic. I'll use Vite to run a simple development server.\n\n<boltArtifact id=\"snake-game\" title=\"Snake Game\">\n  <boltAction type=\"file\" filePath=\"package.json\">\n    {\n      \"name\": \"snake-game\",\n      \"private\": true,\n      \"version\": \"0.0.0\",\n      \"type\": \"module\",\n      \"scripts\": {\n        \"dev\": \"vite\"\n      },\n      \"devDependencies\": {\n        \"vite\": \"^4.5.0\"\n      }\n    }\n  </boltAction>\n  <boltAction type=\"shell\">\n    npm install\n  </boltAction>\n  <boltAction type=\"file\" filePath=\"index.html\">\n    <!DOCTYPE html>\n    <html lang=\"en\">\n      <head>\n        <meta charset=\"UTF-8\" />\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n        <title>Snake Game</title>\n        <link rel=\"stylesheet\" href=\"style.css\" />\n      </head>\n      <body>\n        <h1>SNAKE</h1>\n        <div class=\"game-info\">\n          SCORE: <span id=\"score\">0</span>\n        </div>\n        <canvas id=\"gameCanvas\" width=\"400\" height=\"400\"></canvas>\n        <script type=\"module\" src=\"game.js\"></script>\n      </body>\n    </html>\n  </boltAction>\n  <boltAction type=\"file\" filePath=\"style.css\">\n    body {\n      display: flex;\n      flex-direction: column;\n      align-items: center;\n      justify-content: center;\n      height: 100vh;\n      margin: 0;\n      background-color: #2c3e50;\n      font-family: 'Courier New', Courier, monospace;\n      color: white;\n    }\n\n    h1 {\n      margin-bottom: 1rem;\n    }\n\n    .game-info {\n      font-size: 1.5rem;\n      margin-bottom: 1rem;\n    }\n\n    #gameCanvas {\n      background-color: #ecf0f1;\n      border: 5px solid #bdc3c7;\n      box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);\n    }\n  </boltAction>\n  <boltAction type=\"file\" filePath=\"game.js\">\n    const canvas = document.getElementById('gameCanvas');\n    const ctx = canvas.getContext('2d');\n    const scoreElement = document.getElementById('score');\n\n    const TILE_SIZE = 20;\n    const CANVAS_WIDTH = canvas.width;\n    const CANVAS_HEIGHT = canvas.height;\n    const GRID_WIDTH = CANVAS_WIDTH / TILE_SIZE;\n    const GRID_HEIGHT = CANVAS_HEIGHT / TILE_SIZE;\n\n    let snake = [{ x: 10, y: 10 }];\n    let food = {};\n    let direction = { x: 0, y: 0 }; // Initial direction\n    let score = 0;\n    let isGameOver = false;\n    let gameInterval = null;\n\n    function generateFood() {\n      while (true) {\n        food = {\n          x: Math.floor(Math.random() * GRID_WIDTH),\n          y: Math.floor(Math.random() * GRID_HEIGHT),\n        };\n        // Ensure food doesn't spawn on the snake\n        let onSnake = snake.some(segment => segment.x === food.x && segment.y === food.y);\n        if (!onSnake) {\n          break;\n        }\n      }\n    }\n\n    function drawGame() {\n      // Clear canvas with the background color\n      ctx.fillStyle = '#ecf0f1';\n      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);\n\n      // Draw snake\n      ctx.fillStyle = '#27ae60'; // Green\n      snake.forEach(segment => {\n        ctx.fillRect(segment.x * TILE_SIZE, segment.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);\n      });\n\n      // Draw food\n      ctx.fillStyle = '#c0392b'; // Red\n      ctx.fillRect(food.x * TILE_SIZE, food.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);\n    }\n\n    function updateGame() {\n      if (isGameOver) return;\n\n      const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };\n\n      // Check for wall collision\n      if (head.x < 0 || head.x >= GRID_WIDTH || head.y < 0 || head.y >= GRID_HEIGHT) {\n        endGame();\n        return;\n      }\n\n      // Check for self collision\n      for (let i = 1; i < snake.length; i++) {\n        if (head.x === snake[i].x && head.y === snake[i].y) {\n          endGame();\n          return;\n        }\n      }\n\n      snake.unshift(head);\n\n      // Check for food collision\n      if (head.x === food.x && head.y === food.y) {\n        score++;\n        scoreElement.textContent = score;\n        generateFood();\n      } else {\n        // Only pop if we didn't eat food and the snake has started moving\n        if (direction.x !== 0 || direction.y !== 0) {\n          snake.pop();\n        }\n      }\n\n      drawGame();\n    }\n\n    function changeDirection(event) {\n      const key = event.key;\n      const goingUp = direction.y === -1;\n      const goingDown = direction.y === 1;\n      const goingLeft = direction.x === -1;\n      const goingRight = direction.x === 1;\n\n      // Start the game on first key press\n      if ((direction.x === 0 && direction.y === 0) && (key.startsWith('Arrow') || ['w', 'a', 's', 'd'].includes(key))) {\n        startGame();\n      }\n\n      if ((key === 'ArrowUp' || key === 'w') && !goingDown) {\n        direction = { x: 0, y: -1 };\n      } else if ((key === 'ArrowDown' || key === 's') && !goingUp) {\n        direction = { x: 0, y: 1 };\n      } else if ((key === 'ArrowLeft' || key === 'a') && !goingRight) {\n        direction = { x: -1, y: 0 };\n      } else if ((key === 'ArrowRight' || key === 'd') && !goingLeft) {\n        direction = { x: 1, y: 0 };\n      }\n    }\n\n    function endGame() {\n      isGameOver = true;\n      clearInterval(gameInterval);\n      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';\n      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);\n      \n      ctx.fillStyle = 'white';\n      ctx.font = '40px \"Courier New\", Courier, monospace';\n      ctx.textAlign = 'center';\n      ctx.fillText('Game Over', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);\n      \n      ctx.font = '20px \"Courier New\", Courier, monospace';\n      ctx.fillText(`Final Score: ${score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);\n    }\n\n    function init() {\n      document.addEventListener('keydown', changeDirection);\n      generateFood();\n      drawGame(); // Initial draw\n    }\n    \n    function startGame() {\n        if (!gameInterval) {\n            gameInterval = setInterval(updateGame, 120); // Game speed\n        }\n    }\n\n    init();\n  </boltAction>\n  <boltAction type=\"shell\">\n    npm run dev\n  </boltAction>\n</boltArtifact>"