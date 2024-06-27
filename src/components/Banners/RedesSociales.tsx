import { Grid } from '@mui/material'
// import { CardRedSocial } from '../CardRedes/CardRedSocial'
// import redessoc from '../../data/redes_sociales.json'
// import { TituloSeccion } from '../UI/Titulos/TituloSeccion'
import { useTranslation } from 'react-i18next'

export const RedesSociales = () => {
	const [t] = useTranslation('global')
	return (
		<Grid
			style={{ backgroundColor: 'var(--color-primary)' }}
			paddingTop={5}
			className="padding_left90 banner_redes"
		>
			{/* <TituloSeccion
				titulo={t('followed_in_social_media')}
				variant={'h5'}
				fontWeigth={'bold'}
				style={{ paddingTop: '50px', paddingBottom: '30px' }}
			/>
			<Grid container display={'flex'} justifyContent={'center'}>
				{redessoc.redesPrincipales.map((red, index) => (
					<Grid item xs={10} md={4} key={index}>
						<CardRedSocial
							nombrePagina={red.nombrePagina}
							redSocial={red.redSocial}
							colorPrincipal={red.colorPrincipal}
							link={red.link}
						/>
					</Grid>
				))}
				<Grid
					container
					marginTop={2}
					display={'flex'}
					justifyContent={'center'}
				>
					{/* spacing={2}  en desktop se veia mejor*/}
			{/* <Grid item xs={0} md={2}></Grid>
					{redessoc.redesSecundarias.map((red, index) => (
						<Grid item xs={10} md={4} key={index}>
							<CardRedSocial
								nombrePagina={red.nombrePagina}
								redSocial={red.redSocial}
								colorPrincipal={red.colorPrincipal}
								link={red.link}
							/>
						</Grid>
					))}
					<Grid item xs={0} md={2}></Grid>
				</Grid>
			</Grid>  */}
		</Grid>
	)
}
