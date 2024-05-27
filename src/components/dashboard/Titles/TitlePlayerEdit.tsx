import { Typography } from '@mui/material'

interface Props {
	title: string
	classname: string
}

export const TitlePlayerEdit = ({ title, classname }: Props) => {
	return (
		<Typography
			variant={'body1'}
			className={classname}
			sx={{
				fontSize: {
					md: 16,
					sm: 14,
					xs: 12,
				},
			}}
		>
			{title}
		</Typography>
	)
}
