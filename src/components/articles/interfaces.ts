import { Comment } from '../comments/graphql'
import { Status } from '../types'
import { User } from '../users/interfaces'
import { Types } from 'mongoose'

export interface Article {
    id: string
    title: string
    image: string
    text: string
    tags: string[]
    status: Status
    comment: Comment[]
    author: User | Types.ObjectId
}

export interface CreateArticleArgs {
    title: string
    image: string
    text: string
    tags: string[]
    status: Status
}
