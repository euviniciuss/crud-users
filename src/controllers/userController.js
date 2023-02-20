let users = require('../mocks/user')

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

function updateUsers(request, response) {
  let { id } = request.params
  const { name } = request.body

  id = Number(id)

  const userExists = users.find((user) => user.id === id)

  if (!userExists) {
    return response.send(404, { error: "User not found in database" })
  }

  users = users.map((user) => {
    if (user.id === id) {
      return {
        ...user,
        name
      }
    }

    return user
  })

  response.send(200, { message: 'User updated successfully!' })
}

function deleteUsers(request, response) {
  let { id } = request.params
  id = Number(id)

  users = users.filter((user) => user.id !== id)

  response.send(200, { message: 'User removed successfully!' })
}


module.exports = { listUsers, getUsersById, createUser, updateUsers, deleteUsers }