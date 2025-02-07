import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { ChangeEvent, useContext, useEffect, useMemo, useState } from 'react'
import { TextsContext } from '../../context/Dashboard/Texts/TextsContext'
import ControlPoint from '@mui/icons-material/ControlPoint'
import { Spinner } from '../../components/dashboard/Spinner/Spinner'
import { useTranslation } from 'react-i18next'
import { type IHomeTexts } from '../../types/texts'

const initialFormState: IHomeTexts = {
	title: '',
	description: '',
	why: {
		title: '',
		coaching: {
			title: '',
			description: ''
		},
		potential: {
			title: '',
			description: ''
		},
		growth: {
			title: '',
			description: ''
		}
	},
	community: {
		title: '',
		description: '',
		library: {
			title: '',
			description: ''
		},
		coaching: {
			title: '',
			description: ''
		},
		support: {
			title: '',
			description: ''
		}
	},
	primaryCTA: {
		title: '',
		subtitle: '',
		button: ''
	},
	secondaryCTA: {
		title: '',
		button: ''
	}
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: 'var(--primary-color)',
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
		color: theme.palette.common.white
	},
}))

const StyledButton = styled(Button)({
	'&.MuiButton-root': {
		backgroundColor: 'var(--secondary-color)',
	},
})

const ROWS_PER_PAGE = 8

export const Home = () => {
	const { text, updateTexts, getTextByLanguage, language, setLoading, loading } = useContext(TextsContext)
	console.log({ text })
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
		updateTexts(text._id, newText).finally(() => {
			getTextByLanguage(language).finally(() => {
				setLoading(false)
			})
		})
	}

	console.log({ text, formState })

	useEffect(() => {
		setFormState(text?.homeTexts)
	}, [language])

	return <>
		<div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
			<h3>Home</h3>
		</div>
		<Card className='my-4 p-4'>
			<h4 className='mt-4'>Sección principal</h4>
			<TextField
				name="title"
				label='Título principal'
				value={formState.title}
				onChange={handleInputChange}
				fullWidth
				color="error"
				className='my-3'
			/>
			<TextField
				name="description"
				label='Descripción principal'
				value={formState.description}
				onChange={handleInputChange}
				fullWidth
				multiline
				rows={3}
				color="error"
				className='my-3'
			/>
			<h4 className='mt-4'>Primera sección - Porque elegir Grupo Check Check</h4>
			<TextField
				name="why.title"
				label='Título de la sección'
				value={formState.why.title}
				onChange={handleInputChange}
				fullWidth
				color="error"
				className='my-3'
			/>
			<h5>Coaching</h5>
			<TextField
				name="why.coaching.title"
				label='Título'
				value={formState.why.coaching.title}
				onChange={handleInputChange}
				fullWidth
				color="error"
				className='my-3'
			/>
			<TextField
				name="why.coaching.description"
				label='Descripción'
				value={formState.why.coaching.description}
				onChange={handleInputChange}
				fullWidth
				multiline
				rows={3}
				color="error"
				className='my-3'
			/>
			<h5>Potencial</h5>
			<TextField
				name="why.potential.title"
				label='Título'
				value={formState.why.potential.title}
				onChange={handleInputChange}
				fullWidth
				color="error"
				className='my-3'
			/>
			<TextField
				name="why.potential.description"
				label='Descripción'
				value={formState.why.potential.description}
				onChange={handleInputChange}
				fullWidth
				multiline
				rows={2}
				color="error"
				className='my-3'
			/>
			<h5>Crecimiento</h5>
			<TextField
				name="why.growth.title"
				label='Título'
				value={formState.why.growth.title}
				onChange={handleInputChange}
				fullWidth
				color="error"
				className='my-3'
			/>
			<TextField
				name="why.growth.description"
				label='Descripción'
				value={formState.why.growth.description}
				onChange={handleInputChange}
				fullWidth
				multiline
				rows={2}
				color="error"
				className='my-3'
			/>
			<h4 className='mt-4'>Segunda sección - Comunidad</h4>
			<TextField
				name="community.title"
				label='Título de la sección'
				value={formState.community.title}
				onChange={handleInputChange}
				fullWidth
				color="error"
				className='my-3'
			/>
			<TextField
				name="community.description"
				label='Descripción de la sección'
				value={formState.community.description}
				onChange={handleInputChange}
				fullWidth
				multiline
				rows={2}
				color="error"
				className='my-3'
			/>
			<h5>Librería</h5>
			<TextField
				name="community.library.title"
				label='Título'
				value={formState.community.library.title}
				onChange={handleInputChange}
				fullWidth
				color="error"
				className='my-3'
			/>
			<TextField
				name="community.library.description"
				label='Descripción'
				value={formState.community.library.description}
				onChange={handleInputChange}
				fullWidth
				multiline
				rows={2}
				color="error"
				className='my-3'
			/>
			<h5>Coaching</h5>
			<TextField
				name="community.coaching.title"
				label='Título'
				value={formState.community.coaching.title}
				onChange={handleInputChange}
				fullWidth
				color="error"
				className='my-3'
			/>
			<TextField
				name="community.coaching.description"
				label='Descripción'
				value={formState.community.coaching.description}
				onChange={handleInputChange}
				fullWidth
				multiline
				rows={2}
				color="error"
				className='my-3'
			/>
			<h5>Soporte</h5>
			<TextField
				name="community.support.title"
				label='Título'
				value={formState.community.support.title}
				onChange={handleInputChange}
				fullWidth
				color="error"
				className='my-3'
			/>
			<TextField
				name="community.support.description"
				label='Descripción'
				value={formState.community.support.description}
				onChange={handleInputChange}
				fullWidth
				multiline
				rows={2}
				color="error"
				className='my-3'
			/>
			<h4 className='mt-4'>Banner Principal - CTA (Pantalla Home)</h4>
			<TextField
				name="primaryCTA.title"
				label='Título (Primera linea)'
				value={formState.primaryCTA.title}
				onChange={handleInputChange}
				fullWidth
				color="error"
				className='my-3'
			/>
			<TextField
				name="primaryCTA.subtitle"
				label='Título (Segunda linea)'
				value={formState.primaryCTA.subtitle}
				onChange={handleInputChange}
				fullWidth
				color="error"
				className='my-3'
			/>
			<TextField
				name="primaryCTA.button"
				label='Texto del botón'
				value={formState.primaryCTA.button}
				onChange={handleInputChange}
				fullWidth
				color="error"
				className='my-3'
			/>
			<h4 className='mt-4'>Banner Secundario - CTA (Otras pantallas)</h4>
			<TextField
				name="secondaryCTA.title"
				label='Título'
				value={formState.secondaryCTA.title}
				onChange={handleInputChange}
				fullWidth
				color="error"
				className='my-3'
			/>
			<TextField
				name="secondaryCTA.button"
				label='Texto del botón'
				value={formState.secondaryCTA.button}
				onChange={handleInputChange}
				fullWidth
				color="error"
				className='my-3'
			/>
			<Button
				variant="contained"
				fullWidth
				color="error"
				disabled={false}
				onClick={(event: React.FormEvent) => handleSubmit(event)}
			>
				{loading ? (
					<Spinner height="30" />
				) : (
					<span>Aplicar cambios</span>
				)}
			</Button>
		</Card>
	</>
}