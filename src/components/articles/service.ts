import articleModel from './model'
import { CreateArticleArgs, Article } from './interfaces'
import { User } from '../users/interfaces'
import mongoose from 'mongoose'
import { SafeError } from '../../util'

class ArticleService {
    createArticle(args: CreateArticleArgs, user?: User): Promise<Article> {
        if (!user) throw new SafeError('you must be connected to create a article')

        return articleModel
            .create({
                title: args.title,
                image: args.image,
                status: args.status,
                text: args.text,
                tags: args.tags,
                author: mongoose.Types.ObjectId(user.id),
            })
            .then((createdArticle) => {
                return createdArticle.toJSON({ getters: true })
            })
    }
}

const articleService = new ArticleService()

export default articleService
