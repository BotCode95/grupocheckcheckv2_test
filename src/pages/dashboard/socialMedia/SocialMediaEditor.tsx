import { ChangeEvent } from 'react'
import { Box, Button, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

interface Props {
	socialMedia: { name: string; image: string; url: string }
	onChange: (field: string, value: string) => void
	onDelete: () => void
}
export const SocialMediaEditor = ({
	socialMedia,
	onChange,
	onDelete,
}: Props) => {
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			const reader = new FileReader()

			reader.onloadend = () => {
				console.log(reader)
				socialMedia.image = reader.result as string
				onChange('image', socialMedia.image)
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
				value={socialMedia.name}
				onChange={(e) => onChange('name', e.target.value)}
				fullWidth
			/>
			<TextField
				label="URL"
				value={socialMedia.url}
				onChange={(e) => onChange('url', e.target.value)}
				fullWidth
			/>
			{socialMedia.image && (
				<Box
					component="img"
					src={socialMedia.image}
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
