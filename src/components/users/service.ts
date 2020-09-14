import userModelFn, { IUser } from './model'
import { User, SignUpArgs, SignInArgs, UserAndToken, UpdateUserArgs } from './interfaces'
import { Types, Model } from 'mongoose'
import { SafeError } from '../../util'
import jwt from 'jsonwebtoken'
import config from '../../config'
import bcrypt from 'bcryptjs'

let userModelMemo: Model<IUser>
async function getUserModel() {
    if (userModelMemo) return userModelMemo

    userModelMemo = await userModelFn()
    return userModelMemo
}

class UserService {
    async getUser(id: string | Types.ObjectId): Promise<User | undefined> {
        const userModel = await getUserModel()
        return userModel.findById(id).then((user) => {
            return user?.toObject({ virtuals: true })
        })
    }
    async signUp(args: SignUpArgs, user?: User): Promise<UserAndToken> {
        if (user) throw new SafeError('you are already connected, disconnect you, then sign you up.')

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
                return this.addTokenToUser(newUser.toObject({ virtuals: true }))
            })
    }
    async signIn(args: SignInArgs, user?: User): Promise<UserAndToken> {
        if (user) throw new SafeError('you are already connected, disconnect you, then sign you in.')

        const userModel = await getUserModel()

        return userModel.find({ login: args.login }).then(async (reply) => {
            if (reply.length === 0) throw new SafeError('no user finded for this login or password.')

            const userMongoose: IUser = reply[0]

            if (!(await bcrypt.compare(args.password, userMongoose.password)))
                throw new SafeError('no user finded for this login or password.')

            const user: User = userMongoose.toObject({ virtuals: true })

            return this.addTokenToUser(user)
        })
    }
    async addTokenToUser(user: User): Promise<UserAndToken> {
        return new Promise((resolve, reject) => {
            jwt.sign(
                user,
                config.get('userAuthentication').secretKey,
                {
                    expiresIn: config.get('userAuthentication').expireIn,
                },
                function (err, token) {
                    if (err) return reject(err)

                    const userAndtoken: UserAndToken = { ...user, token: token as string }
                    resolve(userAndtoken)
                },
            )
        })
    }
    async updateUser(args: UpdateUserArgs, user?: User): Promise<User | undefined> {
        if (!user) throw new SafeError('you must be connected to update a user')

        const userModel = await getUserModel()
        return userModel
            .findById(user.id)
            .then((userMongoose) => {
                if (!userMongoose) return

                if (args.avatar) userMongoose.avatar = args.avatar

                return userMongoose.save()
            })
            .then((userMongoose) => {
                return userMongoose?.toObject({ virtuals: true })
            })
    }
}

const userService = new UserService()

export default userService
