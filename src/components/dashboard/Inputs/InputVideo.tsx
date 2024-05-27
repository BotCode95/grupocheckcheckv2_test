import { ChangeEvent } from 'react'
import { TextField } from '@mui/material'

interface Props {
	label?: string
	value?: string
	index: number
	handleChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void
}

export const InputVideo = ({
	value,
	index,
	label = 'URL Ultimo Video 1',
	handleChange,
}: Props) => {
	return (
		<TextField
			required
			id="outlined-required"
			label={label}
			defaultValue={value}
			fullWidth
			onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, index)}
			inputProps={{ className: 'input_videos' }}
			sx={{
				'& .MuiInputLabel-root': { fontSize: '18px', color: 'white' },
			}}
		/>
	)
}
