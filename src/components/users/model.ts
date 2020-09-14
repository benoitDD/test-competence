import { Role, rolesName } from '../types'
import { model, Schema, Document, Model } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUserBase {
    email: string
    login: string
    password: string
    avatar: string
    role: Role
}

export interface IUser extends IUserBase, Document {}

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 50,
    },
    login: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 20,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    avatar: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
    },
    role: {
        type: String,
        required: true,
        enum: rolesName,
    },
})

const init: () => Promise<Model<IUser>> = async () => {
    const salt = await bcrypt.genSalt(10)

    //hash the password user before save in database.
    userSchema.pre<IUser>('save', function (next) {
        if (!this.isModified('password')) return next()

        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err)

            this.password = hash
            next()
        })
    })

    return model<IUser>('User', userSchema)
}

export default init
