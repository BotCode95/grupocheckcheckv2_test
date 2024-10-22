import { BannerPage } from '../components/UI/BannerPage/BannerPage'
import { Navbar } from '../components/navbar/Navbar'
import { Footer } from '../components/UI/Footer'
import { TituloSeccion } from '../components/UI/Titulos/TituloSeccion'
import { Grid } from '@mui/material'
import { BannerCTA } from '../components/Banners/BannerCTA'
import { useTranslation } from 'react-i18next'
import { Trips } from '../types/texts'
import { useContext, useEffect, useState } from 'react'
import { TextsContext } from '../context/Dashboard/Texts'
import ContentLoader from 'react-content-loader'

export const TripsBlog = () => {
	const [t] = useTranslation('global')
	const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([])

	const {
		text: { imagesTrips: trips, players },
		getTextByLanguage,
	} = useContext(TextsContext)

	useEffect(() => {
		const language =
			(typeof window !== 'undefined' && localStorage.getItem('lng')) || 'es'
		if (players?.length === 0) {
			getTextByLanguage(language)
		}

		if (trips.length > 0) {
			setImagesLoaded(new Array(trips.length).fill(false))
		}
	}, [])

	const handleImageLoad = (index: number) => {
		setImagesLoaded((prev) => {
			const updated = [...prev]
			updated[index] = true
			return updated
		})
	}

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
							className="trip_imageContainer"
						>
							{!imagesLoaded[index] && ( // Mostrar Spinner si la imagen aún no se ha cargado
								<div
									style={{
										width: '100%',
										height: '100%',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										backgroundColor: 'rgba(0, 0, 0, 1)',
									}}
								>
									<ContentLoader
										speed={2}
										height={'600px'}
										width={'80%'}
										backgroundColor="#0e0e0e"
										foregroundColor="#000"
									>
										<rect
											x="0"
											y="0"
											rx="15"
											ry="15"
											width="100%"
											height="600px"
										/>
									</ContentLoader>
								</div>
							)}
							<img
								src={trip.image}
								alt={trip.title}
								style={{ maxWidth: '1024px', width: '100%' }}
								onLoad={() => handleImageLoad(index)}
								className={`trip_image ${
									imagesLoaded[index] ? 'loaded' : 'loading'
								}`}
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
