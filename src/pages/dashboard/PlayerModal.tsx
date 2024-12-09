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
import { IPlayer } from '../../types/texts'
import styled from '@emotion/styled'

interface ModalProps {
	open: boolean
	onClose: () => void
	onSave: (action: 'create' | 'edit', data: IPlayer) => void
	initialData?: IPlayer
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
	player_name: '',
	description: '',
	type_of_game: '',
	values_game: '',
	extra_type_of_game: '',
	extra_values_game: '',
	coach: '',
	coach_especialities: '',
	image: '',
	flag: '',
}

const PlayerModal: React.FC<ModalProps> = ({ open, onClose, onSave, initialData }) => {
	const [formData, setFormData] = useState<IPlayer>(
		initialData || defaultValues
	)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target
		setFormData((prev) => ({ ...prev, [name]: value }))
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof IPlayer) => {
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
			<DialogTitle>{initialData ? 'Editar Jugador' : 'Crear Jugador'}</DialogTitle>
			<DialogContent>
				<Typography variant="subtitle1" gutterBottom>
					Complete la información del jugador:
				</Typography>
				<StyledTextField
					label="Nombre del Jugador"
					name="player_name"
					value={formData.player_name}
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
				<StyledTextField
					label="Tipo de Juego"
					name="type_of_game"
					value={formData.type_of_game}
					onChange={handleChange}
					fullWidth
					margin="normal"
				/>
				<StyledTextField
					label="Valores del Juego"
					name="values_game"
					value={formData.values_game}
					onChange={handleChange}
					fullWidth
					margin="normal"
				/>
				<StyledTextField
					label="Extra Tipo de Juego"
					name="extra_type_of_game"
					value={formData.extra_type_of_game}
					onChange={handleChange}
					fullWidth
					margin="normal"
				/>
				<StyledTextField
					label="Extra Valores del Juego"
					name="extra_values_game"
					value={formData.extra_values_game}
					onChange={handleChange}
					fullWidth
					margin="normal"
				/>
				<StyledTextField
					label="Coach"
					name="coach"
					value={formData.coach}
					onChange={handleChange}
					fullWidth
					margin="normal"
				/>
				<StyledTextField
					label="Especialidades del Coach"
					name="coach_especialities"
					value={formData.coach_especialities}
					onChange={handleChange}
					fullWidth
					margin="normal"
				/>
				<div>
					<Typography variant="body2" gutterBottom>
						Imagen del Jugador:
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
				<div style={{ marginTop: 16 }}>
					<Typography variant="body2" gutterBottom>
						Bandera:
					</Typography>
					{formData.flag && (
						<Box
							component="img"
							src={formData.flag}
							alt="Preview Bandera"
							sx={{ width: 60, objectFit: 'cover', marginBottom: 2, display: 'block' }}
						/>
					)}
					<input
						type="file"
						accept="image/*"
						onChange={(e) => handleFileChange(e, 'flag')}
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

export default PlayerModal
