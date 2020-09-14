import { User } from '../users/interfaces'
import { Article } from '../articles/interfaces'
import { Types } from 'mongoose'

export interface Comment {
    id: string
    text: string
    author: User | Types.ObjectId
    article: Article | Types.ObjectId
}

export interface CreateCommentArgs {
    text: string
    articleId: string
}
