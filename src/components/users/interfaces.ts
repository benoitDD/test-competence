import { tokenToString } from 'typescript'
import { Role } from '../types'

export interface User {
    id: string
    email: string
    login: string
    avatar: string
    role: Role
}

export interface UserAndToken extends User {
    token: string
}

export interface SignUpArgs {
    login: string
    password: string
    email: string
    avatar: string
}

export interface SignInArgs {
    login: string
    password: string
}

export interface UpdateUserArgs {
    avatar?: string
}
