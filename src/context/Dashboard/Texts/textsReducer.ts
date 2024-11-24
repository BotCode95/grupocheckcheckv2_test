import { TextsState, objTextEmpty } from './TextsProvider'
import { IText } from '../../../types/texts'
import { LNG } from './TextsContext'
import { LocalDining } from '@mui/icons-material'

type TextsActionType =
	| { type: 'Texts', payload: IText[] }
	| { type: 'TextByLanguage', payload: IText }
	| { type: 'UpdateText', payload: IText }
	| { type: 'SetLanguage', payload: LNG }
	| { type: 'Error', payload: string }
	| { type: 'SetLoading', payload: boolean }


export const textsReducer = (state: TextsState, action: TextsActionType): TextsState => {
	switch (action.type) {
		case 'Texts':
			return {
				...state,
				texts: action.payload
			}
		case 'TextByLanguage':
			return {
				...state,
				text: action.payload,
				loading: false
			}
		case 'UpdateText':
			return {
				...state,
				text: action.payload,
				loading: false
			}
		case 'SetLanguage':
			return {
				...state,
				language: action.payload,
				loading: false
			}
		case 'Error':
			return {
				...state,
				message: action.payload,
				text: objTextEmpty,
				loading: false
			}
		case 'SetLoading': {
			return {
				...state,
				loading: action.payload
			}
		}
		default:
			return state
	}
}