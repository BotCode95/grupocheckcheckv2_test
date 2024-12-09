import React, { useEffect, useState } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	Typography,
	Box,
} from '@mui/material'
import { ITestimonial } from '../../types/texts'
import styled from '@emotion/styled'

interface ModalProps {
	open: boolean
	onClose: () => void
	onSave: (action: 'create' | 'edit', data: ITestimonial) => void
	initialData?: ITestimonial
}

// Estilos personalizados
const StyledTextField = styled(TextField)({
	'& label.Mui-focused': {
		color: 'var(--secondary-color)'
	},
	'& .MuiInput-underline:after': {
		borderBottomColor: 'var(--secondary-color)',
	},
	'& .MuiOutlinedInput-root': {
		'&.Mui-focused fieldset': {
			borderColor: 'var(--secondary-color)',
		},
	},
})
  
const StyledButton = styled(Button)({
	'&.MuiButton-root': {
		backgroundColor: 'var(--secondary-color)',
	},
})

const defaultValues = {
	title: '',
	description: '',
	author: '',
	image: ''
}

const TestimonialModal: React.FC<ModalProps> = ({ open, onClose, onSave, initialData }) => {
	const [formData, setFormData] = useState<ITestimonial>(
		initialData || defaultValues
	)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof ITestimonial) => {
		const file = e.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setFormData((prev) => ({
					...prev,
					[fieldName]: reader.result as string,
				}))
			}
			reader.readAsDataURL(file)
		}
	}

	const handleSave = () => {
		onSave(initialData ? 'edit' : 'create', formData)
		onClose()
	}

	useEffect(() => {
		initialData ? setFormData(initialData) : setFormData(defaultValues)
	}, [initialData])

	return (
		<Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
			<DialogTitle>{initialData ? 'Editar Testimonio' : 'Crear Testimonio'}</DialogTitle>
			<DialogContent>
				<Typography variant="subtitle1" gutterBottom>
					Complete la información del testimonio:
				</Typography>
				<StyledTextField
					label="Título del testimonio"
					name="title"
					value={formData.title}
					onChange={handleChange}
					fullWidth
					margin="normal"
				/>
				<StyledTextField
					label="Descripción"
					name="description"
					value={formData.description}
					onChange={handleChange}
					fullWidth
					multiline
					rows={4}
					margin="normal"
				/>
				<StyledTextField
					label="Autor"
					name="author"
					value={formData.author}
					onChange={handleChange}
					fullWidth
					margin="normal"
					disabled={!!initialData}
				/>
				<div>
					<Typography variant="body2" gutterBottom>
						Imagen del Autor:
					</Typography>
					{formData.image && (
						<Box
							component="img"
							src={formData.image}
							alt="Preview Imagen"
							sx={{ width: 200, height: 200, objectFit: 'cover', marginBottom: 2, display: 'block' }}
						/>
					)}
					<input
						type="file"
						accept="image/*"
						onChange={(e) => handleFileChange(e, 'image')}
					/>
				</div>
			</DialogContent>
			<DialogActions sx={{ p: '1em 2em' }}>
				<Button onClick={onClose} style={{ color: 'var(--secondary-color)'}}>
					Cancelar
				</Button>
				<StyledButton onClick={handleSave} color="primary" variant="contained">
					{initialData ? 'Guardar' : 'Crear'}
				</StyledButton>
			</DialogActions>
		</Dialog>
	)
}

export default TestimonialModal
