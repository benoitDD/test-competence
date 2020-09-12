import { model, Schema, Document } from 'mongoose'

interface IComment extends Document {
    text: string
}

const commentSchema = new Schema({
    text: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
    },
})

export default model<IComment>('Comment', commentSchema)
