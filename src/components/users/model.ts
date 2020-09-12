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

import { Role } from '../types'
import { Article } from '../articles/model'

interface UserI {
    id: number
    email: string
    login: string
    password: string
    avatar: string
    role: Role
}

// Some attributes are optional in `User.build` and `User.create` calls
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface UserCreation extends Optional<UserI, 'id'> {}

export class User extends Model<UserI, UserCreation> implements UserI {
    public id!: number // Note that the `null assertion` `!` is required in strict mode.
    public email!: string
    public login!: string
    public password!: string
    public avatar!: string
    public role!: Role

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date

    // Since TS cannot determine model association at compile time
    // we have to declare them here purely virtually
    // these will not exist until `Model.init` was called.
    //User has many articles:
    public getArticles!: HasManyGetAssociationsMixin<Article> // Note the null assertions!
    public addProject!: HasManyAddAssociationMixin<Article, number>
    public hasProject!: HasManyHasAssociationMixin<Article, number>
    public countProjects!: HasManyCountAssociationsMixin
    public createProject!: HasManyCreateAssociationMixin<Article>

    // You can also pre-declare possible inclusions, these will only be populated if you
    // actively include a relation.
    public readonly articles?: Article[] // Note this is optional since it's only populated when explicitly requested in code

    public static associations: {
        articles: Association<User, Article>
    }
}

export const userSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    login: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    password: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
    avatar: {
        type: new DataTypes.STRING(128),
        allowNull: true,
    },
    role: {
        type: new DataTypes.STRING(128),
        allowNull: true,
    },
}
