import { Resolver } from '../graphql'
import commentService from './service'
import { Comment, CreateCommentArgs, SearchByArticleArgs } from './interfaces'
import { User } from '../users/interfaces'
import { Article } from '../articles/interfaces'
import { Types } from 'mongoose'
import userService from '../users/service'
import articleService from '../articles/service'

class CommentGraphql {
    createComment: Resolver<unknown, CreateCommentArgs, Comment> = (_, args, { user }) => {
        return commentService.createComment(args, user)
    }
    commentsByArticle: Resolver<unknown, SearchByArticleArgs, Comment[]> = (_, args, { user }) => {
        return commentService.searchByArticle(args, user)
    }
}

const commentGraphql = new CommentGraphql()

export default commentGraphql

const authorResolver: Resolver<Comment, void, User> = (comment) => {
    if (Types.ObjectId.isValid(comment.author as Types.ObjectId))
        return userService.getUser(comment.author as Types.ObjectId)
    else return comment.author as User
}

const articleResolver: Resolver<Comment, void, Article> = (comment, _, { user }) => {
    if (Types.ObjectId.isValid(comment.article as Types.ObjectId))
        return articleService.getArticle({ id: comment.article as Types.ObjectId }, user)
    else return comment.article as Article
}

export const typeResolver = {
    author: authorResolver,
    article: articleResolver,
}
