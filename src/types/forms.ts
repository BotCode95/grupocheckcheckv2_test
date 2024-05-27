import { User } from './user'

export interface Login {
    email: string
    password: string
}

export interface Register{
    name: string
    lastname: string
    email: string
    password: string
}


export interface RegisterResponse {
    msg: string,
    user: User
    token: string
    
}


export interface LoginResponse {
    user: User
    token: string
    
}

export type Status = 'CHECKING' | 'AUTHENTICATED' | 'NOT-AUTHENTICATED'