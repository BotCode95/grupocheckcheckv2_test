import { FC, useReducer } from 'react'
import { VideosContext, videosReducer } from './'

interface Props {
	children: React.ReactNode
}
export interface VideosState {
	loading: boolean
}

const Videos_INITIAL_STATE: VideosState = {
	loading: true,
}

export const VideosProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(videosReducer, Videos_INITIAL_STATE)
	return (
		<VideosContext.Provider
			value={{
				...state,
			}}
		>
			{children}
		</VideosContext.Provider>
	)
}
