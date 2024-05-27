import { Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'

interface Props {
	title: string
	classname: string
}

export const TitleEdit = ({ title, classname }: Props) => {
	return (
		<Typography
			variant={'body1'}
			className={classname}
			sx={{
				fontSize: {
					md: 22,
					sm: 22,
					xs: 18,
				},
			}}
		>
			{title} <EditIcon sx={{ paddingLeft: 1 }} fontSize="large" />
		</Typography>
	)
}
