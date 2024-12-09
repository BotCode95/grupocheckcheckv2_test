import React, { useEffect, useState } from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
	Typography
} from '@mui/material'
import { IQuestion } from '../../types/texts'
import styled from '@emotion/styled'

interface ModalProps {
	open: boolean
	onClose: () => void
	onSave: (action: 'create' | 'edit', data: IQuestion) => void
	initialData?: IQuestion
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
	description: ''
}

const QuestionModal: React.FC<ModalProps> = ({ open, onClose, onSave, initialData }) => {
	const [formData, setFormData] = useState<IQuestion>(
		initialData || defaultValues
	)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
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
			<DialogTitle>{initialData ? 'Editar Pregunta' : 'Crear Pregunta'}</DialogTitle>
			<DialogContent>
				<Typography variant="subtitle1" gutterBottom>
					Complete la información de la pregunta:
				</Typography>
				<StyledTextField
					label="Título de la Pregunta"
					name="title"
					value={formData.title}
					onChange={handleChange}
					fullWidth
					margin="normal"
					disabled={!!initialData}
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

export default QuestionModal
