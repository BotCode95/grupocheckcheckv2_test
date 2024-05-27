import { Grid } from '@mui/material'
import { TituloSeccion } from '../components/UI/Titulos/TituloSeccion'
import { Navbar } from '../components/navbar/Navbar'
import { RedesSociales } from '../components/Banners/RedesSociales'
import { Footer } from '../components/UI/Footer'
import background from '../assets/bg.png'
import { useTranslation } from 'react-i18next'
import { VideosViajesNuevo } from '../components/CardVideos/VideosViajesNuevo'
import { useTrips } from '../hooks/useTrips'
import { VideoResponse } from '../types/latestvideos'

export const Viajes = () => {
	const [t] = useTranslation('global')

	const { trips } = useTrips()

	return (
		<div
			style={{
				backgroundImage: `url(${background})`,
				backgroundRepeat: 'repeat-y',
			}}
		>
			<Navbar />
			<Grid container>
				<Grid
					item
					xs={12}
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
					marginY={5}
				>
					<TituloSeccion
						titulo={t('trips.title')}
						variant={'h1'}
						fontWeigth="bold"
					/>
				</Grid>
				{trips.map((trip: VideoResponse, index) => (
					<Grid container key={index}>
						<Grid
							item
							xs={12}
							display={'flex'}
							justifyContent={'center'}
							alignItems={'center'}
						>
							<img
								src={trip.image}
								alt="img_viajes"
								className="img_viajes"
								width={'1024px'}
								style={{
									boxShadow: '3px 0px 17px 0px rgba(218,218,218,0.34)',
								}}
							/>
						</Grid>
						<Grid
							item
							xs={12}
							display={'flex'}
							justifyContent={'center'}
							alignItems={'center'}
							marginY={2}
						>
							<TituloSeccion
								titulo={trip.title}
								variant={'body1'}
								fontWeigth="bold"
							/>
						</Grid>
						<VideosViajesNuevo viajesUrl={trip.videos} />
					</Grid>
				))}
			</Grid>
			<RedesSociales />
			<Footer />
		</div>
	)
}
