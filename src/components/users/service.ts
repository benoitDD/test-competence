import userModel, { IUserBase } from './model'

class UserService {
    createUser(user: IUserBase) {
        return userModel.create(user)
    }
}

const userService = new UserService()

export default userService
