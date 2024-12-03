const http = require('http');
const fs = require('fs');
const path = require('path');

const todos = [
    { id: 1, text: 'Воспользуйтесь AI-ассистентом GigaCode в редакторе кода', completed: false },
    { id: 2, text: 'Используйте привычные консольные команды в окне встроенного терминала', completed: false },
    { id: 3, text: 'Посмотрите на список доступных расширений', completed: false }
];

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
            if (err) throw err;
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        });
    } else if (req.url === '/todos' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todos));
    } else if (req.url === '/toggle' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { id } = JSON.parse(body);
            todos.forEach(todo => {
                if (todo.id === id) {
                    todo.completed = !todo.completed;
                }
            });
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(todos));
        });
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
