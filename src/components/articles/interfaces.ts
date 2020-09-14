import { Comment } from '../comments/interfaces'
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

export interface UpdateArticleArgs {
    id: string
    title?: string
    image?: string
    text?: string
    tags?: string[]
    status?: Status
}

export interface RemoveArticleArgs {
    id: string
}

export interface GetArticleArgs {
    id: string | Types.ObjectId
}
