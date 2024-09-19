import { BannerPage } from '../components/UI/BannerPage/BannerPage'
import { Navbar } from '../components/navbar/Navbar'
import { Footer } from '../components/UI/Footer'
import { TituloSeccion } from '../components/UI/Titulos/TituloSeccion'
import { Grid } from '@mui/material'
import { BannerCTA } from '../components/Banners/BannerCTA'
import { useTranslation } from 'react-i18next'
import { Trips } from '../types/texts'
import { useContext, useEffect } from 'react'
import { TextsContext } from '../context/Dashboard/Texts'

export const TripsBlog = () => {
	const [t] = useTranslation('global')

	const {
		text: { imagesTrips: trips, players },
		getTextByLanguage,
	} = useContext(TextsContext)

	useEffect(() => {
		if (players?.length === 0) {
			getTextByLanguage(localStorage.getItem('lng') ?? 'es')
		}
	}, [])

	return (
		<>
			<Navbar />
			<BannerPage title={t('header.pages.blog')} />
			<div className="page_container mt-5 ">
				{trips.map((trip: Trips, index) => (
					<Grid container key={index} className="py-5">
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
								style={{ maxWidth: '1024px', width: '100%' }}
							/>
						</Grid>
						{/* <VideosViajesNuevo viajesUrl={trip.videos} /> */}
					</Grid>
				))}
			</div>
			<BannerCTA />
			<Footer />
		</>
	)
}
