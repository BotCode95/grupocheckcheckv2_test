import { FC, useReducer } from 'react'
import { UIContext, uiReducer } from './'

interface Props {
	children: React.ReactNode
}
export interface UIState {
	loading: boolean
}

const UI_INITIAL_STATE: UIState = {
	loading: localStorage.getItem('loading') ? false : true,
}

export const UIState: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

	const loadingHome = (time: number) => {
		setTimeout(() => {
			dispatch({
				type: 'loading',
			})
		}, time)
		localStorage.setItem('loading', 'cargado')
	}
	return (
		<UIContext.Provider
			value={{
				...state,
				loadingHome,
			}}
		>
			{children}
		</UIContext.Provider>
	)
}
