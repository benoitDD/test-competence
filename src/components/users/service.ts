import userModel, { IUserBase } from './model'
import { User } from './interfaces'
import { Types } from 'mongoose'

class UserService {
    createUser(user: IUserBase) {
        return userModel.create(user)
    }
    getUser(id: string | Types.ObjectId): Promise<User> | Promise<undefined> {
        return userModel.findById(id).then((user) => {
            return user?.toObject({ virtuals: true })
        })
    }
}

const userService = new UserService()

export default userService
