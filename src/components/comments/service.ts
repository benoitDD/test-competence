import commentModel, { ICommentBase } from './model'

class CommentService {
    createComment(comment: ICommentBase) {
        return commentModel.create(comment)
    }
}

const commentService = new CommentService()

export default commentService
