import { createContext } from 'react'

export interface ContextProps {
	loading: boolean
}

export const VideosContext = createContext({} as ContextProps)
