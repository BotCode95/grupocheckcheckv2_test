import { Typography } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'

interface Props {
	titulo: string
	variant: Variant
	fontWeigth?: string
	style?: React.CSSProperties | undefined
	className?: string
}

export const TituloSeccion = ({
	titulo,
	variant,
	style,
	className,
	fontWeigth = 'normal',
}: Props) => {
	return (
		<Typography
			variant={`${variant}`}
			fontWeight={`${fontWeigth}`}
			color="white"
			className={className}
			style={style}
			sx={{
				fontSize: {
					md: 36,
					sm: 30,
					xs: 28,
				},
			}}
		>
			{titulo.toUpperCase()}
		</Typography>
	)
}
