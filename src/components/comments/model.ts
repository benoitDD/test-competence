import { model, Schema, Document } from 'mongoose'

export interface ICommentBase {
    text: string
}

interface IComment extends ICommentBase, Document {}

const commentSchema = new Schema({
    text: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
    },
})

export default model<IComment>('Comment', commentSchema)
