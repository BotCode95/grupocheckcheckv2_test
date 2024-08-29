import { useTrips } from '../hooks/useTrips'
import { BannerPage } from '../components/UI/BannerPage/BannerPage'
import { Navbar } from '../components/navbar/Navbar'
import { Footer } from '../components/UI/Footer'
import { VideoResponse } from '../types/latestvideos'
// import { VideosViajesNuevo } from '../components/CardVideos/VideosViajesNuevo'
import { TituloSeccion } from '../components/UI/Titulos/TituloSeccion'
import { Grid } from '@mui/material'
import { BannerCTA } from '../components/Banners/BannerCTA'
import { useTranslation } from 'react-i18next'

export const Trips = () => {
	const [t] = useTranslation('global')
	const { trips } = useTrips()

	return <>
		<Navbar />
		<BannerPage title={t('header.pages.blog')} />
		<div className='page_container mt-5 '>
			{trips.map((trip: VideoResponse, index) => (
				<Grid container key={index} className='py-5'>
					<Grid
						item
						xs={12}
						display={'flex'}
						justifyContent={'center'}
						alignItems={'center'}
						marginY={3}
					>
						<TituloSeccion
							titulo={trip.title}
							variant={'body1'}
							fontWeigth="bold"
						/>
					</Grid>
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
							style={{maxWidth: '1024px', width: '100%'}}
						/>
					</Grid>
					{/* <VideosViajesNuevo viajesUrl={trip.videos} /> */}
				</Grid>
			))}
		</div>
		<BannerCTA />	
		<Footer />
	</>
}