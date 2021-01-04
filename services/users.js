const MongoLib = require('../lib/mongo')
const bcrypt = require('bcrypt')

class UsersService {
  constructor () {
    this.collection = 'users'
    this.mongoDb = new MongoLib()
  }

  async getUserFromEmail ({ email }) {
    const [user] = await this.mongoDb.getAll(this.collection, { email })
    return user
  }

  async getUser ({ userId }) {
    const user = await this.mongoDb.get(this.collection, userId)
    return user
  }

  async createUser ({ user }) {
    const hashedPassword = await bcrypt.hash(user.password, 10)

    const createdUserId = await this.mongoDb.create(this.collection, {
      ...user,
      password: hashedPassword
    })

    return createdUserId
  }

  async verifyUserExists ({ email }) {
    const [user] = await this.mongoDb.getAll(this.collection, { email })
    return user
  }

  async changeUserStatus ({ userId, status }) {
    await this.mongoDb.update(this.collection, userId, { status })
  }
}

module.exports = UsersService
