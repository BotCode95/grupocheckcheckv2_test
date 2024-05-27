import { Tooltip, IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'

interface Props {
	disabled?: boolean
	onClick: () => void
}

export const ButtonDeleteInput = ({ disabled = false, onClick }: Props) => {
	return (
		<>
			{disabled ? (
				<IconButton color="error" onClick={onClick} disabled={disabled}>
					<Delete />
				</IconButton>
			) : (
				<Tooltip title={'Eliminar video'}>
					<IconButton color="error" onClick={onClick} disabled={disabled}>
						<Delete />
					</IconButton>
				</Tooltip>
			)}
		</>
	)
}
