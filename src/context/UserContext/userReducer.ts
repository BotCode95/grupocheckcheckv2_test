import { User } from '../../types/user'
import { UserState } from './UserProvider'

type UserActionType =
	| { type: 'LOGIN', payload: { user: User, token: string } }
	| { type: 'REGISTER', payload: { user: User, token: string } }
	| { type: 'MESSAGE_ERROR', payload: string }
	| { type: 'LOGOUT' }
	| { type: 'CLEAN_MESSAGE' }


export const userReducer = (state: UserState, action: UserActionType): UserState => {
	switch (action.type) {
		case 'LOGIN':
		case 'REGISTER':
			return {
				...state,
				user: action.payload.user,
				token: action.payload.token,
				status: 'AUTHENTICATED'
			}
		case 'LOGOUT':
			return {
				...state,
				token: null,
				status: 'NOT-AUTHENTICATED'
			}
		case 'MESSAGE_ERROR':
			return {
				...state,
				message: action.payload
			}
		case 'CLEAN_MESSAGE':
			return {
				...state,
				message: ''
			}
		default:
			return state
	}
}