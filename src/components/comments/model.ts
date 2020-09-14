import { model, Schema, Document } from 'mongoose'

interface IComment extends Document {
    text: string
    author: Schema.Types.ObjectId
    article: Schema.Types.ObjectId
}

const commentSchema = new Schema({
    text: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: 'Article',
        required: true,
    },
})

export default model<IComment>('Comment', commentSchema)
