const http = require('http')

const routes = require('./routes')

const server = http.createServer((request, response) => {
  console.log(`Request Method: ${request.method} | Endpoint: ${request.url}`);

  const route = routes.find((routeObj) => (
    routeObj.endpoint === request.url && routeObj.method === request.method
  ))

  console.log(routes[0]);

  if (route) {
    route.handler(request, response)
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' })
    response.end(`Cannot ${request.method} ${request.url}`)
  }
})

server.listen(8080, () => console.log('🔥 Server started at http://localhost:8080'))