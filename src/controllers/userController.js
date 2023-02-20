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

function createUser(request, response) {
  const { body } = request
  const lastUserId = users[users.length - 1].id

  const newUser = {
    id: lastUserId + 1,
    name: body.name
  }

  users.push(newUser)

  response.send(201, { message: "User successfully created!" })
}

module.exports = { listUsers, getUsersById, createUser }