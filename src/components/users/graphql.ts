import { Resolver } from '../graphql'
import { UserAndToken, SignUpArgs, SignInArgs } from './interfaces'
import userService from './service'

class UserGraphql {
    signUp: Resolver<unknown, SignUpArgs, UserAndToken> = (_, args, { user }) => {
        return userService.signUp(args, user)
    }
    signIn: Resolver<unknown, SignInArgs, UserAndToken> = (_, args, { user }) => {
        return userService.signIn(args, user)
    }
}

const userGraphql = new UserGraphql()

export default userGraphql
