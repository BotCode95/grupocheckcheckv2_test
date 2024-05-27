import { Button } from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'
import { Colors } from '../../../types/typesMUI'

interface Props {
	color: Colors
	title: string
	onClick: () => void
}

export const ButtonDelete = ({ color, title, onClick }: Props) => {
	return (
		<Button
			variant="contained"
			color={color}
			style={{ margin: 5 }}
			startIcon={<DeleteIcon />}
			onClick={onClick}
		>
			{title}
		</Button>
	)
}
