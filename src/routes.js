const useController = require('./controllers/userController')

module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    handler: useController.listUsers
  }
]