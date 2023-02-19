const http = require('http')

const routes = require('./routes')
const url = require('url')

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url, true)

  console.log(`Request Method: ${request.method} | Endpoint: ${parsedUrl.pathname}`);

  const route = routes.find((routeObj) => (
    routeObj.endpoint === parsedUrl.pathname && routeObj.method === request.method
  ))

  if (route) {
    request.query = parsedUrl.query
    route.handler(request, response)
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' })
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`)
  }
})

server.listen(8080, () => console.log('🔥 Server started at http://localhost:8080'))