import commentModel from './model'
import { CreateCommentArgs, Comment, SearchByArticleArgs } from './interfaces'
import { SafeError } from '../../util'
import { User } from '../users/interfaces'
import articleService from '../articles/service'
import { Types, Schema } from 'mongoose'

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
    async searchByArticle(args: SearchByArticleArgs, user?: User): Promise<Comment[]> {
        const skip = Math.max(args.skip || 0, 0)

        const limit = Math.min(Math.max(args.limit, 0), 20)

        //may throw a error, if article not found or private
        await articleService.getArticle({ id: args.articleId }, user)

        return commentModel
            .find({ article: (new Types.ObjectId(args.articleId) as unknown) as Schema.Types.ObjectId })
            .limit(limit)
            .skip(skip)
            .then((res) => {
                return res.map((i) => i.toObject({ virtuals: true }))
            })
    }
}

const commentService = new CommentService()

export default commentService
