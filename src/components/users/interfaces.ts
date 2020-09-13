import { Role } from '../types'

export interface User {
    id: string
    email: string
    login: string
    avatar: string
    role: Role
}

export interface SignUpArgs {
    login: string
    password: string
    email: string
    avatar: string
}
