const users = require('../mocks/user')

function listUsers(request, response) {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(users))
}

module.exports = { listUsers }