const http = require('http')
const useController = require('./controllers/userController')

const server = http.createServer((request, response) => {
  console.log(`Request Method: ${request.method} | Endpoint: ${request.url}`);

  if (request.url === '/users' && request.method === 'GET') {
    useController.listUsers(request, response)
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' })
    response.end(`Cannot ${request.method} ${request.url}`)
  }

})

server.listen(8080, () => console.log('🔥 Server started at http://localhost:8080'))