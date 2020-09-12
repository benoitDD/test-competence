import { Status, statusName } from '../types'
import { model, Schema, Document, Types } from 'mongoose'

export interface IArticleBase {
    title: string
    image: string
    text: string
    tags: string[]
    status: Status
}

interface IArticle extends IArticleBase, Document {
    tags: Types.Array<string>
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
})

export default model<IArticle>('Article', articleSchema)
