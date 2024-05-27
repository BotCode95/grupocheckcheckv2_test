import { createContext } from 'react'
import { Login, Register, Status } from '../../types/forms'
import { User } from '../../types/user'

export interface ContextProps {
	token: string | null
	user: User | null
	status: Status
	message: string
	login: (loginUser: Login) => Promise<void>
	register: (registerUSer: Register) => Promise<void>
	logout: () => void
	getToken: () => void
	cleanMessage: () => void
}

export const UserContext = createContext({} as ContextProps)
