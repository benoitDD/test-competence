import { Status, statusName } from '../types'
import { model, Schema, Document, Types, Model } from 'mongoose'

export interface IArticleBase {
    title: string
    image: string
    text: string
    tags: string[]
    status: Status
    author: Schema.Types.ObjectId
}

export interface IArticle extends IArticleBase, Document {
    tags: Types.Array<string>
    //author: IUser
}

const articleSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
    },
    image: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
    },
    text: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 500,
    },
    tags: [String],
    status: {
        type: String,
        required: true,
        enum: statusName,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})

export type IArticleModel = Model<IArticle>

export default model<IArticle, IArticleModel>('Article', articleSchema)
