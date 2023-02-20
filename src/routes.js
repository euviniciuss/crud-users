const useController = require('./controllers/userController')

module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    handler: useController.listUsers
  },
  {
    endpoint: '/users/:id',
    method: 'GET',
    handler: useController.getUsersById
  },
  {
    endpoint: '/users',
    method: 'POST',
    handler: useController.createUser
  },
  {
    endpoint: '/users/:id',
    method: 'PUT',
    handler: useController.updateUsers
  },
  {
    endpoint: '/users/:id',
    method: 'DELETE',
    handler: useController.deleteUsers
  }
]