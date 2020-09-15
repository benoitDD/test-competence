import { Resolver } from '../graphql'
import { User } from '../users/interfaces'
import {
    CreateArticleArgs,
    Article,
    UpdateArticleArgs,
    RemoveArticleArgs,
    GetArticleArgs,
    CommentsByArticleArgs,
} from './interfaces'
import articleService from './service'
import userService from '../users/service'
import commentService from '../comments/service'
import { Types } from 'mongoose'
import { Comment } from '../comments/interfaces'

class ArticleGraphql {
    createArticle: Resolver<void, CreateArticleArgs, Article> = (_, args, { user }) => {
        return articleService.createArticle(args, user)
    }
    updateArticle: Resolver<void, UpdateArticleArgs, Article> = (_, args, { user }) => {
        return articleService.updateArticle(args, user)
    }
    removeArticle: Resolver<void, RemoveArticleArgs, boolean> = (_, args, { user }) => {
        return articleService.removeArticle(args, user)
    }
    getArticle: Resolver<void, GetArticleArgs, Article> = (_, args, { user }) => {
        return articleService.getArticle(args, user)
    }
}

const articleGraphql = new ArticleGraphql()

export default articleGraphql

const authorResolver: Resolver<Article, void, User> = (article) => {
    if (Types.ObjectId.isValid(article.author as Types.ObjectId))
        return userService.getUser(article.author as Types.ObjectId)
    else return article.author as User
}

const commentsResolver: Resolver<Article, CommentsByArticleArgs, Comment[]> = (article, args, { user }) => {
    return commentService.searchByArticle({ articleId: article.id, limit: args.limit, skip: args.skip }, user)
}

export const typeResolver = {
    author: authorResolver,
    comments: commentsResolver,
}
