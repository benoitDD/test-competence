import { Status } from '../types'
import { Resolver } from '../graphql'
import { User } from '../users/graphql'

export interface Comment {
    id: string
    author: User
    text: string
}
