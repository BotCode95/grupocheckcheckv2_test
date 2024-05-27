import { Grid, Typography } from '@mui/material'
import { Lens as IconCircle } from '@mui/icons-material'
interface Props {
	titulo: string
	data: string[]
	icono: JSX.Element
}

export const Banner = ({ titulo, data, icono }: Props) => {
	return (
		<Grid
			item
			md={6}
			xs={12}
			display={'flex'}
			justifyContent={'center'}
			flexDirection={'column'}
			alignItems={'center'}
		>
			{icono}
			<Typography
				variant="body1"
				color="white"
				textTransform={'uppercase'}
				fontWeight={'bold'}
				sx={{ fontSize: { md: 26, sm: 20 } }}
				textAlign={'center'}
				marginBottom={2}
			>
				{titulo}
			</Typography>

			<Grid container className="banner">
				{data?.map((titulo, index) => (
					<Grid
						item
						md={6}
						xs={6}
						key={index}
						display={'flex'}
						justifyContent={'flex-start'}
						alignItems={'center'}
						className="banner_texto"
					>
						<IconCircle sx={{ fontSize: '8px' }} />
						<span className="banner_item_texto">{titulo}</span>
					</Grid>
				))}
			</Grid>
		</Grid>
	)
}
