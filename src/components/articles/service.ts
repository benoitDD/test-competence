import articleModel from './model'
import { CreateArticleArgs, Article, UpdateArticleArgs, RemoveArticleArgs } from './interfaces'
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
                return createdArticle.toJSON({ virtuals: true })
            })
    }

    updateArticle(args: UpdateArticleArgs, user?: User): Promise<Article> {
        if (!user) throw new SafeError('you must be connected to update a article')

        return articleModel
            .findById(args.id)
            .then((article) => {
                if (!article) throw new SafeError('article no found')

                if (article.author.toString() !== user.id) throw new SafeError('your are no the own of this article')

                if (args.image) article.image = args.image
                if (args.status) article.status = args.status
                if (args.tags) article.tags = args.tags as mongoose.Types.Array<string>
                if (args.text) article.text = args.text
                if (args.title) article.title = args.title

                return article.save()
            })
            .then((article) => {
                return article.toJSON({ getters: true })
            })
    }

    removeArticle(args: RemoveArticleArgs, user?: User): Promise<boolean> {
        if (!user) throw new SafeError('you must be connected to remove a article')

        return articleModel
            .findById(args.id)
            .then((article) => {
                if (!article) throw new SafeError('article no found')

                if (article.author.toString() !== user.id) throw new SafeError('your are no the own of this article')

                return articleModel.deleteOne({ _id: args.id })
            })
            .then(({ deletedCount }) => {
                return deletedCount === 1
            })
    }
}

const articleService = new ArticleService()

export default articleService
