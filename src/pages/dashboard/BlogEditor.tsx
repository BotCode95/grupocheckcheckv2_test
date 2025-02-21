import { ChangeEvent } from 'react'
import { Box, Button, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

interface Props {
	trip: { title: string; image: string }
	onChange: (field: string, value: string) => void
	onDelete: () => void
}
export const BlogEditor = ({ trip, onChange, onDelete }: Props) => {
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			const reader = new FileReader()

			reader.onloadend = () => {
				console.log(reader)
				trip.image = reader.result as string
				onChange('image', trip.image)
			}

			reader.readAsDataURL(file)
		}
	}
	return (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: '1rem',
				marginBottom: '1rem',
			}}
		>
			<TextField
				label="Nombre"
				value={trip.title}
				onChange={(e) => onChange('title', e.target.value)}
				fullWidth
			/>
			{trip.image && (
				<Box
					component="img"
					src={trip.image}
					alt="Preview Imagen"
					sx={{
						width: 50,
						height: 50,
						objectFit: 'cover',
						marginBottom: 2,
						display: 'block',
					}}
				/>
			)}
			<input
				type="file"
				accept="image/*"
				onChange={(e: ChangeEvent<HTMLInputElement>) => handleFileChange(e)}
			/>
			<Button color="error" variant="contained" onClick={onDelete}>
				<DeleteIcon />
			</Button>
		</div>
	)
}
