import articleModel, { IArticleBase } from './model'

class ArticleService {
    createArticle(article: IArticleBase) {
        return articleModel.create(article)
    }
}

const articleService = new ArticleService()

export default articleService
