import { Model, DataTypes, Optional } from 'sequelize'

interface CommentI {
    id: number
    author: number
    text: string
}

// Some attributes are optional in `User.build` and `User.create` calls
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CommentCreation extends Optional<CommentI, 'id'> {}

export class Comment extends Model<CommentI, CommentCreation> implements CommentI {
    public id!: number // Note that the `null assertion` `!` is required in strict mode.
    public author!: number
    public text!: string

    // timestamps!
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

export const commentSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    author: {
        type: new DataTypes.NUMBER(),
        allowNull: false,
    },
    text: {
        type: new DataTypes.STRING(128),
        allowNull: false,
    },
}
