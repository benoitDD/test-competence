import { Resolver } from '../graphql'
import { User, SignUpArgs } from './interfaces'
import userService from './service'

class UserGraphql {
    signUp: Resolver<unknown, SignUpArgs, User> = (_, args, { user }) => {
        //return userService.signUp(args, user)
    }
}

const userGraphql = new UserGraphql()

export default userGraphql
