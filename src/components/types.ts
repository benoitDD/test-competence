export enum Role {
    admin,
    user,
}
/** all roles */
export const rolesName = Object.keys(Role).filter((role) => Number.isNaN(Number(role)))

export enum Status {
    public,
    private,
}
/** all status */
export const statusName = Object.keys(Status).filter((s) => Number.isNaN(Number(s)))
