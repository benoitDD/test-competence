import { User } from './users/interfaces'

export type Context = { user?: User }

export interface Resolver<Parent, Arguments, Reponse> {
    (parent: Parent, args: Arguments, context: Context): Reponse | Promise<Reponse> | Promise<undefined>
}
