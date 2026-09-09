
//core modules
const http = require('http');
const port = 5000;

const books = [
    { title: 'Book 1', author: 'Author 1' },
    { title: 'Book 2', author: 'Author 2' },
    { title: 'Book 3', author: 'Author 3' }
];

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('<h1>Welcome to our home page</h1>');
        res.end();
    }else if (req.url === '/about') {
        res.write('<h1>Welcome to our about page</h1>');
        res.end();
    }else if (req.url === '/books') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(books));
    }
  })

  server.listen(port, () => {
    console.log(`server is listening on port ${port}`);
})

