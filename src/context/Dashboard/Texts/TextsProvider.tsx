import { FC, useReducer } from 'react'
import { TextsContext, textsReducer } from './'
import { Data, IText } from '../../../types/texts'
import api from '../../../api/api'
import { LNG } from './TextsContext'
import Swal from 'sweetalert2'

interface Props {
	children: React.ReactNode
}
export interface TextsState {
	texts: IText[]
	text: IText
	language: LNG
	loading: boolean
	message: string
}

export const objTextEmpty: IText = {
	_id: '',
	home: '',
	us: '',
	about_us: '',
	players: [
		{
			player_name: '',
			description: '',
			coach_especialities: '',
			coach: '',
			extra_type_of_game: 'string',
			extra_values_game: 'string',
			image: '',
			type_of_game: '',
			values_game: '',
		},
	],
	questions: [],
	testimonials: [],
	language: 'es',
	imagesTrips: {
		title: '',
		description: '',
		trips: [{ id: '', title: '', image: '' }],
	},
	homeTexts: {
		title: '',
		description: '',
		why: {
			title: '',
			coaching: {
				title: '',
				image: '',
				description: '',
			},
			potential: {
				title: '',
				image: '',
				description: '',
			},
			growth: {
				title: '',
				image: '',
				description: '',
			},
		},
		community: {
			title: '',
			description: '',
			library: {
				title: '',
				image: '',
				description: '',
			},
			coaching: {
				image: '',
				title: '',
				description: '',
			},
			support: {
				title: '',
				image: '',
				description: '',
			},
		},
		primaryCTA: {
			title: '',
			subtitle: '',
			button: '',
		},
		secondaryCTA: {
			title: '',
			button: '',
		},
		titleTeam: '',
		titleTestimonial: '',
		socialMediaMenu: [],
		socialMediaFooter: [],
	},
}

const Texts_INITIAL_STATE: TextsState = {
	texts: [],
	text: objTextEmpty,
	language: 'es',
	loading: false,
	message: '',
}

export const TextsProvider: FC<Props> = ({ children }) => {
	const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
	const [state, dispatch] = useReducer(
		textsReducer,
		Texts_INITIAL_STATE,
		(initial) => {
			const lng = localStorage.getItem('lng')
			let persistedState = null
			if (!isMobile) {
				persistedState = sessionStorage.getItem('appState' + lng)
			}

			if (persistedState) {
				const parsedState = JSON.parse(persistedState)
				if (parsedState) {
					return {
						...initial,
						...parsedState,
						text: parsedState || objTextEmpty,
					}
				}
				return {
					...initial,
					...parsedState,
				}
			}
			return initial
		}
	)

	const getTexts = async () => {
		try {
			const { data } = await api.get('/texts_test')
			dispatch({
				type: 'Texts',
				payload: data,
			})
		} catch (error) {
			let message = ''
			if (error instanceof Error) message = error.message
			else message = String(error)
			dispatch({
				type: 'Error',
				payload: message,
			})
		}
	}

	const getTextByLanguage = async (lng = 'es', cache = true) => {
		try {
			dispatch({
				type: 'SetLoading',
				payload: true,
			})
			const { data } = await api.get<Data>(`/texts_test?lng=${lng}`)

			dispatch({
				type: 'TextByLanguage',
				payload: data.text[0],
			})

			// Evitar guardar en sessionStorage si es un dispositivo móvil
			if (!isMobile && cache === true) {
				sessionStorage.setItem('appState' + lng, JSON.stringify(data.text[0]))
			} else {
				sessionStorage.clear()
			}
			localStorage.setItem('lng', lng)
		} catch (error) {
			let message = ''
			if (error instanceof Error) message = error.message
			else message = String(error)
			dispatch({
				type: 'Error',
				payload: message,
			})
		}
	}

	const updateTexts = async (id: string, text: IText) => {
		try {
			const { data } = await api.put<Data>(`/texts_test/${id}`, text)
			dispatch({
				type: 'UpdateText',
				payload: data.text[0],
			})
			Swal.fire(
				'Se actualizaron los textos',
				'se vera reflejado en la web en unos segundos.',
				'success'
			)
			sessionStorage.clear()
		} catch (error) {
			let message = ''
			if (error instanceof Error) message = error.message
			else message = String(error)
			dispatch({
				type: 'Error',
				payload: message,
			})
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Hubo un fallo en la actualización!',
				footer: 'comunicate con tu administrador',
			})
		}
	}

	const setLanguage = async (lng: LNG) => {
		localStorage.setItem('lng', lng)
		await getTextByLanguage(lng)
		dispatch({
			type: 'SetLanguage',
			payload: lng,
		})
	}

	const setLoading = (loading: boolean) => {
		dispatch({
			type: 'SetLoading',
			payload: loading,
		})
	}
	return (
		<TextsContext.Provider
			value={{
				...state,
				getTexts,
				getTextByLanguage,
				setLanguage,
				updateTexts,
				setLoading,
			}}
		>
			{children}
		</TextsContext.Provider>
	)
}
