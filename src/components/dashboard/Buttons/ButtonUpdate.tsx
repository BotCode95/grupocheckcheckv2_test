import { Button } from '@mui/material'
import { Colors, Variants } from '../../../types/typesMUI'

interface Props {
	variant: Variants | undefined
	color: Colors | undefined
	text: string
	onClick: () => void
}

export const ButtonUpdate = ({ variant, color, text, onClick }: Props) => {
	return (
		<Button variant={variant} color={color} onClick={onClick}>
			{text}
		</Button>
	)
}
