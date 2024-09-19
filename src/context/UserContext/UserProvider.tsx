import { FC, useReducer } from 'react'
import { UserContext, userReducer } from '.'
import api from '../../api/api'
import {
	Login,
	LoginResponse,
	Register,
	RegisterResponse,
	Status,
} from '../../types/forms'
import { User } from '../../types/user'

interface Props {
	children: React.ReactNode
}
export interface UserState {
	token: string | null
	user: User | null
	status: Status
	message: string
}

const User_INITIAL_STATE: UserState = {
	token: '',
	user: null,
	status: 'CHECKING',
	message: '',
}

export const UserProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(userReducer, User_INITIAL_STATE)
	// useEffect(() => {
	// 	getToken()
	// }, [])
	const login = async (loginUser: Login): Promise<void> => {
		try {
			const { data } = await api.post<LoginResponse>('/auth/login', loginUser)

			dispatch({
				type: 'LOGIN',
				payload: { user: data.user, token: data.token },
			})
			localStorage.setItem('token', data.token)
		} catch (error) {
			let message = ''
			if (error instanceof Error) message = error.message
			else message = String(error)
			dispatch({
				type: 'MESSAGE_ERROR',
				payload: message,
			})
		}
	}

	const register = async (registerUSer: Register): Promise<void> => {
		try {
			const { data } = await api.post<RegisterResponse>('/users', registerUSer)

			dispatch({
				type: 'REGISTER',
				payload: { user: data.user, token: data.token },
			})
			localStorage.setItem('token', data.token)
		} catch (error) {
			let message = ''
			if (error instanceof Error) message = error.message
			else message = String(error)
			dispatch({
				type: 'MESSAGE_ERROR',
				payload: message,
			})
		}
	}
	const logout = () => {
		dispatch({
			type: 'LOGOUT',
		})
	}

	const getToken = async () => {
		const token = localStorage.getItem('token')
		if (!token) return dispatch({ type: 'LOGOUT' })
		const res = await api.get('/auth', { headers: { 'x-token': token } })
		if (res.status !== 200) return dispatch({ type: 'LOGOUT' })
		localStorage.setItem('token', token)
		dispatch({
			type: 'LOGIN',
			payload: {
				user: res.data.user,
				token: res.data.token,
			},
		})
	}

	const cleanMessage = () => {
		dispatch({
			type: 'CLEAN_MESSAGE',
		})
	}
	return (
		<UserContext.Provider
			value={{
				...state,
				login,
				register,
				logout,
				getToken,
				cleanMessage,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}
