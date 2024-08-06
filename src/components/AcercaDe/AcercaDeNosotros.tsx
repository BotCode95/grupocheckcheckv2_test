import { Typography, Grid } from '@mui/material'
import { TituloSeccion } from '../UI/Titulos/TituloSeccion'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import xx from '../../assets/xx.png'
import { useTranslation } from 'react-i18next'

export const AcercaDeNosotros = () => {
	const [t] = useTranslation('global')
	return (
		<>
			<TituloSeccion
				titulo={t('aboutme.title')}
				variant={'h5'}
				fontWeigth={'bold'}
				className={'padding_left90 acercade_titulo'}
			/>
			<Grid container spacing={2}>
				<Grid
					item
					md={8}
					xs={12}
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
				>
					<img src={xx} alt="logo_xx" style={{ width: '350px' }} />
				</Grid>
				<Grid item xs={12} md={4} className="acercade_texto">
					<Grid container spacing={2} className="acercade_info">
						<Grid item xs={12}>
							<Typography variant="body1" color="white">
								<CloseRoundedIcon fontSize="small" />
								<CloseRoundedIcon fontSize="medium" />
								{t('aboutme.description_title')}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="body1" color="white">
								{t('aboutme.description_details')}
							</Typography>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="body1" color="white">
								{t('aboutme.description_details_2')}
								<CloseRoundedIcon fontSize="small" />
								<CloseRoundedIcon fontSize="medium" />
							</Typography>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</>
	)
}
