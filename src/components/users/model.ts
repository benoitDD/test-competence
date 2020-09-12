import { Role, rolesName } from '../types'
import { model, Schema, Document } from 'mongoose'

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
        minlength: 5,
        maxlength: 50,
    },
    login: {
        type: String,
        required: true,
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

export default model<IUser>('User', userSchema)
