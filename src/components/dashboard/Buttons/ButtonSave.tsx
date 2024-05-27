import { Button } from '@mui/material'
import { Colors } from '../../../types/typesMUI'
import { Save as SaveIcon } from '@mui/icons-material'

interface Props {
	color: Colors
	title: string
}

export const ButtonSave = ({ color, title }: Props) => {
	return (
		<Button
			variant="contained"
			color={color}
			style={{ margin: 5 }}
			type="submit"
			startIcon={<SaveIcon />}
		>
			{title}
		</Button>
	)
}
