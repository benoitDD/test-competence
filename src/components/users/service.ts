import userModelFn, { IUser } from './model'
import { User, SignUpArgs } from './interfaces'
import { Types, Model } from 'mongoose'
import { SafeError } from '../../util'

let userModel: Model<IUser>
async function getUserModel() {
    if (userModel) return userModel

    userModel = await userModelFn()
    return userModel
}

class UserService {
    async getUser(id: string | Types.ObjectId): Promise<User | undefined> {
        const userModel = await getUserModel()
        return userModel.findById(id).then((user) => {
            return user?.toObject({ virtuals: true })
        })
    }
    async signUp(args: SignUpArgs, user?: User): Promise<User> {
        if (user) throw new SafeError('you are already connected, disconnect you then sign up you.')

        const userModel = await getUserModel()
        return userModel
            .create({
                avatar: args.avatar,
                email: args.email,
                login: args.login,
                password: args.password,
                role: 'user',
            })
            .then((newUser) => {
                return newUser.toObject({ virtuals: true })
            })
    }
}

const userService = new UserService()

export default userService
