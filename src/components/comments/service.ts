import commentModel from './model'
import { CreateCommentArgs, Comment } from './interfaces'
import { SafeError } from '../../util'
import { User } from '../users/interfaces'
import articleService from '../articles/service'

class CommentService {
    async createComment(comment: CreateCommentArgs, user?: User): Promise<Comment> {
        if (!user) throw new SafeError('you must be connected to create a comment')

        const article = await articleService.getArticle({ id: comment.articleId }, user)
        if (!article) throw new SafeError('no article found for this comment')

        return commentModel
            .create({
                author: user.id,
                text: comment.text,
                article: article.id,
            })
            .then((commentMongoose) => {
                return commentMongoose.toObject({ virtuals: true })
            })
    }
}

const commentService = new CommentService()

export default commentService
