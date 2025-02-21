import {
	Button,
	Card,
	TableCell,
	tableCellClasses,
	TextField,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { TextsContext } from '../../context/Dashboard/Texts/TextsContext'
import ControlPoint from '@mui/icons-material/ControlPoint'
import { Spinner } from '../../components/dashboard/Spinner/Spinner'
import { Trips } from '../../types/texts'
import { BlogEditor } from './BlogEditor'

interface IBlog {
	title?: string
	description?: string
	trips: Trips[]
}
const initialFormState: IBlog = {
	trips: [
		{
			id: '',
			title: '',
			image: '',
		},
	],
}

export const Blog = () => {
	const {
		text,
		language,
		updateTexts,
		loading,
		getTextByLanguage,
		setLoading,
	} = useContext(TextsContext)
	const [formState, setFormState] = useState<IBlog>(initialFormState)

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setFormState((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleSubmit = (event: React.FormEvent) => {
		setLoading(true)
		event.preventDefault()
		const newText = { ...text, imagesTrips: formState }

		console.log('newText', newText)
		updateTexts(text._id, newText).finally(() => {
			getTextByLanguage(language, false).finally(() => {
				setLoading(false)
			})
		})
	}

	const handleBlogChange = (index: number, field: string, value: string) => {
		setFormState((prev: IBlog) => {
			const updatedTrips = [...prev.trips]
			updatedTrips[index] = { ...updatedTrips[index], [field]: value }
			return { ...prev, trips: updatedTrips }
		})
	}

	const handleAddBlog = () => {
		setFormState((prev: IBlog) => ({
			...prev,
			trips: [...prev.trips, { id: '', title: '', image: '' }],
		}))
	}

	const handleDeleteBlog = (index: number) => {
		setFormState((prev: IBlog) => {
			const updatedTrips = [...prev.trips]
			updatedTrips.splice(index, 1)
			return { ...prev, trips: updatedTrips }
		})
	}

	useEffect(() => {
		setFormState(text?.imagesTrips)
	}, [language])

	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: 'center',
				}}
			>
				<h3>Blog de Viajes</h3>
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
					label="Descripción"
					value={formState.description}
					onChange={handleInputChange}
					fullWidth
					multiline
					rows={3}
					color="error"
					className="my-3"
				/>
				{formState?.trips?.map((trip, index) => (
					<BlogEditor
						key={index}
						trip={trip}
						onChange={(field, value) => handleBlogChange(index, field, value)}
						onDelete={() => handleDeleteBlog(index)}
					/>
				))}
				<Button
					startIcon={<ControlPoint />}
					variant="contained"
					onClick={() => handleAddBlog()}
				></Button>
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
