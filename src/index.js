const http = require('http')
const routes = require('./routes')
const { URL } = require('url')

const server = http.createServer((request, response) => {
  const url = `http://localhost:8080${request.url}`;
  const parsedUrl = new URL(url)

  let { pathname } = parsedUrl
  let id

  console.log(`Request Method: ${request.method} | Endpoint: ${pathname}`);

  const splitEndPoint = pathname.split('/').filter(Boolean)
  
  if (splitEndPoint.length > 1) {
    pathname = `/${splitEndPoint[0]}/:id`
    id = splitEndPoint[1]
  }

  const route = routes.find((routeObj) => (
    routeObj.endpoint === pathname && routeObj.method === request.method
  ))

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams)
    request.params = { id }
    
    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(body))
    }

    route.handler(request, response)
  } else {
    response.writeHead(404, { 'Content-Type': 'text/html' })
    response.end(`Cannot ${request.method} ${parsedUrl.pathname}`)
  }
})

server.listen(8080, () => console.log('🔥 Server started at http://localhost:8080'))