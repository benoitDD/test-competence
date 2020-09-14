import { Resolver } from '../graphql'
import { UserAndToken, SignUpArgs, SignInArgs, UpdateUserArgs, User } from './interfaces'
import userService from './service'

class UserGraphql {
    signUp: Resolver<unknown, SignUpArgs, UserAndToken> = (_, args, { user }) => {
        return userService.signUp(args, user)
    }
    signIn: Resolver<unknown, SignInArgs, UserAndToken> = (_, args, { user }) => {
        return userService.signIn(args, user)
    }
    updateUser: Resolver<unknown, UpdateUserArgs, User> = (_, args, { user }) => {
        return userService.updateUser(args, user)
    }
    signOut: Resolver<unknown, unknown, boolean> = (_, args, { user }) => {
        return userService.signOut(user)
    }
}

const userGraphql = new UserGraphql()

export default userGraphql
