import { createContext } from 'react'

export interface ContextProps {
	loading: boolean
	loadingHome(time: number): void
}

export const UIContext = createContext({} as ContextProps)
