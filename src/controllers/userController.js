const users = require('../mocks/user')

function listUsers(request, response) {
  const { order } = request.query

  const sortedUsers = users.sort((a, b) => {
    if (order === 'desc') {
      return a.id < b.id ? 1 : -1
    }

    return a.id > b.id ? 1 : -1
  })

  response.send(200, sortedUsers)
}

function getUsersById(request, response) {
  const { id } = request.params

  const user = users.find((user) => user.id === Number(id))

  if (!user) {
    return response.send(404, { error: 'User not found in database' })
  }
  
  response.send(200, user)
}

module.exports = { listUsers, getUsersById }