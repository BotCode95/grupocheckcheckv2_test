import {
	Button,
	Card,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Table,
	TableBody,
	TableCell,
	tableCellClasses,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TextField,
	Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { ChangeEvent, useContext, useEffect, useMemo, useState } from 'react'
import { TextsContext } from '../../context/Dashboard/Texts/TextsContext'
import ControlPoint from '@mui/icons-material/ControlPoint'
import { Spinner } from '../../components/dashboard/Spinner/Spinner'
import { useTranslation } from 'react-i18next'
import {
	CommunityText,
	TextBanner,
	WhyText,
	type IHomeTexts,
} from '../../types/texts'
import { FormImage } from './Images/FormImage'

const initialFormState: IHomeTexts = {
	title: '',
	description: '',
	why: {
		title: '',
		coaching: {
			title: '',
			description: '',
			image: '',
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
			title: '',
			image: '',
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
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: 'var(--primary-color)',
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
		color: theme.palette.common.white,
	},
}))

const StyledButton = styled(Button)({
	'&.MuiButton-root': {
		backgroundColor: 'var(--secondary-color)',
	},
})

const ROWS_PER_PAGE = 8

export const Home = () => {
	const {
		text,
		language,
		updateTexts,
		loading,
		getTextByLanguage,
		setLoading,
	} = useContext(TextsContext)
	const [formState, setFormState] = useState<IHomeTexts>(initialFormState)

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		const elements = name.split('.')
		if (elements.length === 1) {
			setFormState((prevState) => ({
				...prevState,
				[name]: value,
			}))
		} else if (elements.length === 2) {
			setFormState((prevState: any) => ({
				...prevState,
				[elements[0]]: {
					...prevState[elements[0]],
					[elements[1]]: value,
				},
			}))
		} else if (elements.length === 3) {
			setFormState((prevState: any) => ({
				...prevState,
				[elements[0]]: {
					...prevState[elements[0]],
					[elements[1]]: {
						...prevState[elements[0]][elements[1]],
						[elements[2]]: value,
					},
				},
			}))
		}
	}

	const handleSubmit = (event: React.FormEvent) => {
		setLoading(true)
		event.preventDefault()
		const newText = { ...text, homeTexts: formState }

		console.log('newText', newText)
		updateTexts(text._id, newText).finally(() => {
			getTextByLanguage(language, false).finally(() => {
				setLoading(false)
			})
		})
	}

	const handleFileChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		fieldName: TextBanner,
		parentObjKey: keyof IHomeTexts,
		childObjKey: keyof WhyText | keyof CommunityText
	) => {
		const file = e.target.files?.[0]

		if (file) {
			const reader = new FileReader()

			reader.onloadend = () => {
				setFormState((prev: IHomeTexts) => {
					// Accede al objeto padre
					const parentObj = prev[parentObjKey]

					// Verifica que el objeto padre exista y tenga la clave hijo
					if (
						parentObj &&
						typeof parentObj === 'object' &&
						childObjKey in parentObj
					) {
						return {
							...prev,
							[parentObjKey]: {
								...parentObj,
								[childObjKey]: {
									...(parentObj as any)[childObjKey],
									image: reader.result as string,
									title: fieldName?.title,
									description: fieldName?.description,
								},
							},
						}
					}
					return prev
				})
			}

			reader.readAsDataURL(file)
		}
	}

	useEffect(() => {
		setFormState(text?.homeTexts)
	}, [language])

	console.log('formSate', formState)

	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: 'center',
				}}
			>
				<h3>Home</h3>
			</div>
			<Card className="my-4 p-4">
				<h4 className="mt-4">Sección principal</h4>
				<TextField
					name="title"
					label="Título principal"
					value={formState.title}
					onChange={handleInputChange}
					fullWidth
					color="error"
					className="my-3"
				/>
				<TextField
					name="description"
					label="Descripción principal"
					value={formState.description}
					onChange={handleInputChange}
					fullWidth
					multiline
					rows={3}
					color="error"
					className="my-3"
				/>
				<h4 className="mt-4">Sección Equipo</h4>
				<TextField
					name="titleTeam"
					label="Título principal - Pantalla Equipo"
					value={formState.titleTeam}
					onChange={handleInputChange}
					fullWidth
					color="error"
					className="my-3"
				/>
				<h4 className="mt-4">
					Primera sección - Porque elegir Grupo Check Check
				</h4>
				<TextField
					name="why.title"
					label="Título de la sección"
					value={formState.why.title}
					onChange={handleInputChange}
					fullWidth
					color="error"
					className="my-3"
				/>
				<h5>Coaching</h5>
				<TextField
					name="why.coaching.title"
					label="Título"
					value={formState.why.coaching.title}
					onChange={handleInputChange}
					fullWidth
					color="error"
					className="my-3"
				/>
				<TextField
					name="why.coaching.description"
					label="Descripción"
					value={formState.why.coaching.description}
					onChange={handleInputChange}
					fullWidth
					multiline
					rows={3}
					color="error"
					className="my-3"
				/>
				<FormImage
					name="Imagen Coaching"
					handleFileChange={(e) =>
						handleFileChange(e, formState.why.coaching, 'why', 'coaching')
					}
					parentObjKey={'why'}
					childObjKey={'coaching'}
					data={formState.why.coaching}
				/>
				<h5>Potencial</h5>
				<TextField
					name="why.potential.title"
					label="Título"
					value={formState.why.potential.title}
					onChange={handleInputChange}
					fullWidth
					color="error"
					className="my-3"
				/>
				<TextField
					name="why.potential.description"
					label="Descripción"
					value={formState.why.potential.description}
					onChange={handleInputChange}
					fullWidth
					multiline
					rows={2}
					color="error"
					className="my-3"
				/>
				<FormImage
					name="Imagen Potencial"
					handleFileChange={(e) =>
						handleFileChange(e, formState.why.potential, 'why', 'potential')
					}
					parentObjKey={'why'}
					childObjKey={'potential'}
					data={formState.why.potential}
				/>
				<h5>Crecimiento</h5>
				<TextField
					name="why.growth.title"
					label="Título"
					value={formState.why.growth.title}
					onChange={handleInputChange}
					fullWidth
					color="error"
					className="my-3"
				/>
				<TextField
					name="why.growth.description"
					label="Descripción"
					value={formState.why.growth.description}
					onChange={handleInputChange}
					fullWidth
					multiline
					rows={2}
					color="error"
					className="my-3"
				/>
				<FormImage
					name="Imagen Crecimiento"
					handleFileChange={(e) =>
						handleFileChange(e, formState.why.growth, 'why', 'growth')
					}
					data={formState.why.growth}
					parentObjKey={'why'}
					childObjKey={'growth'}
				/>
				<h4 className="mt-4">Segunda sección - Comunidad</h4>
				<TextField
					name="community.title"
					label="Título de la sección"
					value={formState.community.title}
					onChange={handleInputChange}
					fullWidth
					color="error"
					className="my-3"
				/>
				<TextField
					name="community.description"
					label="Descripción de la sección"
					value={formState.community.description}
					onChange={handleInputChange}
					fullWidth
					multiline
					rows={2}
					color="error"
					className="my-3"
				/>
				<h5>Librería</h5>
				<TextField
					name="community.library.title"
					label="Título"
					value={formState.community.library.title}
					onChange={handleInputChange}
					fullWidth
					color="error"
					className="my-3"
				/>
				<TextField
					name="community.library.description"
					label="Descripción"
					value={formState.community.library.description}
					onChange={handleInputChange}
					fullWidth
					multiline
					rows={2}
					color="error"
					className="my-3"
				/>
				<FormImage
					name="Imagen Videos"
					handleFileChange={(e) =>
						handleFileChange(
							e,
							formState.community.library,
							'community',
							'library'
						)
					}
					parentObjKey={'community'}
					childObjKey={'library'}
					data={formState.community.library}
				/>
				<h5>Coaching</h5>
				<TextField
					name="community.coaching.title"
					label="Título"
					value={formState.community.coaching.title}
					onChange={handleInputChange}
					fullWidth
					color="error"
					className="my-3"
				/>
				<TextField
					name="community.coaching.description"
					label="Descripción"
					value={formState.community.coaching.description}
					onChange={handleInputChange}
					fullWidth
					multiline
					rows={2}
					color="error"
					className="my-3"
				/>
				<FormImage
					name="Imagen Coaching"
					handleFileChange={(e) =>
						handleFileChange(
							e,
							formState.community.coaching,
							'community',
							'coaching'
						)
					}
					parentObjKey={'community'}
					childObjKey={'coaching'}
					data={formState.community.coaching}
				/>
				<h5>Soporte</h5>
				<TextField
					name="community.support.title"
					label="Título"
					value={formState.community.support.title}
					onChange={handleInputChange}
					fullWidth
					color="error"
					className="my-3"
				/>
				<TextField
					name="community.support.description"
					label="Descripción"
					value={formState.community.support.description}
					onChange={handleInputChange}
					fullWidth
					multiline
					rows={2}
					color="error"
					className="my-3"
				/>
				<FormImage
					name="Imagen Soporte"
					handleFileChange={(e) =>
						handleFileChange(
							e,
							formState.community.support,
							'community',
							'support'
						)
					}
					parentObjKey={'community'}
					childObjKey={'support'}
					data={formState.community.support}
				/>
				<h4 className="mt-4">Banner Principal - CTA (Pantalla Home)</h4>
				<TextField
					name="primaryCTA.title"
					label="Título (Primera linea)"
					value={formState.primaryCTA.title}
					onChange={handleInputChange}
					fullWidth
					color="error"
					className="my-3"
				/>
				<TextField
					name="primaryCTA.subtitle"
					label="Título (Segunda linea)"
					value={formState.primaryCTA.subtitle}
					onChange={handleInputChange}
					fullWidth
					color="error"
					className="my-3"
				/>
				<TextField
					name="primaryCTA.button"
					label="Texto del botón"
					value={formState.primaryCTA.button}
					onChange={handleInputChange}
					fullWidth
					color="error"
					className="my-3"
				/>
				<h4 className="mt-4">Banner Secundario - CTA (Otras pantallas)</h4>
				<TextField
					name="secondaryCTA.title"
					label="Título"
					value={formState.secondaryCTA.title}
					onChange={handleInputChange}
					fullWidth
					color="error"
					className="my-3"
				/>
				<TextField
					name="secondaryCTA.button"
					label="Texto del botón"
					value={formState.secondaryCTA.button}
					onChange={handleInputChange}
					fullWidth
					color="error"
					className="my-3"
				/>
				<Button
					variant="contained"
					fullWidth
					color="error"
					disabled={false}
					onClick={(event: React.FormEvent) => handleSubmit(event)}
				>
					{loading ? <Spinner height="30" /> : <span>Aplicar cambios</span>}
				</Button>
			</Card>
		</>
	)
}
