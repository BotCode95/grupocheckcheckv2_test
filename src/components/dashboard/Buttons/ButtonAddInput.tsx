import { Tooltip, IconButton } from '@mui/material'
import ControlPointIcon from '@mui/icons-material/ControlPoint'

interface Props {
	title: string
	onClick: () => void
}
export const ButtonAddInput = ({ title, onClick }: Props) => {
	return (
		<Tooltip title={title}>
			<IconButton color="primary" onClick={onClick}>
				<ControlPointIcon />
			</IconButton>
		</Tooltip>
	)
}
