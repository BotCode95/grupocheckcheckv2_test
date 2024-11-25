import { UIState } from './'

type UIActionType =
	| { type: 'loading' }


export const uiReducer = (state: UIState, action: UIActionType): UIState => {
	switch (action.type) {
		case 'loading':
			return {
				...state,
				loading: false
			}
		default:
			return state
	}
}