import { createContext } from 'react'
import { IText } from '../../../types/texts'

export interface ContextProps {
	texts: IText[]
	text: IText
	language: LNG
	message: string
	loading: boolean
	getTexts: () => Promise<void>
	getTextByLanguage: (lng?: string, cache?: boolean) => Promise<void>
	setLanguage: (lng: LNG) => void
	setLoading: (loading: boolean) => void
	updateTexts: (id: string, text: IText) => Promise<void>
}

export type LNG = 'es' | 'en'
export const TextsContext = createContext({} as ContextProps)
