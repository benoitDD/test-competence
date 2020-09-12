import { Status, statusName } from '../types'
import { model, Schema, Document, Types } from 'mongoose'

interface IArticle extends Document {
    title: string
    image: string
    text: string
    tags: Types.Array<string>
    status: Status
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
