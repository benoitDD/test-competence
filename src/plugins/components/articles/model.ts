import {
    Model,
    DataTypes,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    Association,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    Optional,
} from 'sequelize'

import { Status } from '../types'
import { Comment } from '../comments/model'

interface ArticleI {
    id: number
    title: string
    author: number
    image: string
    text: string
    tags: string[]
    status: Status
}

// Some attributes are optional in `User.build` and `User.create` calls
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ArticleCreation extends Optional<ArticleI, 'id'> {}

export class Article extends Model<ArticleI, ArticleCreation> implements ArticleI {
    public id!: number // Note that the `null assertion` `!` is required in strict mode.
    public title!: string
    public author!: number
    public image!: string
    public text!: string
    public tags!: string[]
    public status!: Status

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date

    // Since TS cannot determine model association at compile time
    // we have to declare them here purely virtually
    // these will not exist until `Model.init` was called.
    //Article has many comments:
    public getComments!: HasManyGetAssociationsMixin<Comment> // Note the null assertions!
    public addComment!: HasManyAddAssociationMixin<Comment, number>
    public hasComment!: HasManyHasAssociationMixin<Comment, number>
    public countComments!: HasManyCountAssociationsMixin
    public createComment!: HasManyCreateAssociationMixin<Comment>

    // You can also pre-declare possible inclusions, these will only be populated if you
    // actively include a relation.
    public readonly comments?: Comment[] // Note this is optional since it's only populated when explicitly requested in code

    public static associations: {
        comments: Association<Article, Comment>
    }
}

export const articleSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    author: {
        type: new DataTypes.NUMBER(),
        allowNull: false,
    },
    image: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    text: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    tags: {
        type: new DataTypes.STRING(128),
        allowNull: true,
    },
    status: {
        type: new DataTypes.STRING(128),
        allowNull: true,
    },
}
