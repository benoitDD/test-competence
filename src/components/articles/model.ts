import { Status, statusName } from '../types'
import { model, Schema, Document, Types } from 'mongoose'

export interface IArticle extends Document {
    title: string
    image: string
    text: string
    status: Status
    tags: Types.Array<string>
    author: Schema.Types.ObjectId
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
    tags: {
        type: [String],
        required: true,
    },
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

export default model<IArticle>('Article', articleSchema)
