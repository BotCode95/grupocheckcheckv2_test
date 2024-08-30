/* eslint-disable indent */
/* eslint-disable no-mixed-spaces-and-tabs */
import { useContext, useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import { CardJugador } from '../components/CardJugadores/CardJugador'
import { Footer } from '../components/UI/Footer'
import { TituloSeccion } from '../components/UI/Titulos/TituloSeccion'
import { Navbar } from '../components/navbar/Navbar'
import { RedesSociales } from '../components/Banners/RedesSociales'
import { Banner } from '../components/Banners/Banner'
import background from '../assets/bg.png'
import { ReactComponent as PokerCards } from '../assets/poker-cards.svg'
import { ReactComponent as CasinoChip } from '../assets/casino-chip.svg'
import { useTranslation } from 'react-i18next'
import { TextsContext } from '../context/Dashboard/Texts/TextsContext'
import { Spinner } from '../components/dashboard/Spinner/Spinner'

export const Nosotros = () => {
	const [t] = useTranslation('global')
	const { loading, language, text, getTextByLanguage, setLoading } =
		useContext(TextsContext)
	// const [loading, setLoading] = useState(false)

	useEffect(() => {
		setLoading(true)
		// getTextByLanguage(language ?? 'es')
		// setLoading(false)
	}, [language])

	const search: string[] = t('search.items', { returnObjects: true })
	const offer: string[] = t('offer.items', { returnObjects: true })

	if (loading)
		return (
			<Grid container>
				<Grid
					item
					xs={12}
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
					marginTop={5}
				>
					<Spinner />
				</Grid>
			</Grid>
		)

	return (
		<div style={{ backgroundImage: `url(${background})` }}>
			<Navbar />
			<Grid container>
				<Grid
					item
					xs={12}
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
					marginTop={5}
				>
					<TituloSeccion
						titulo={'Coach Team'}
						variant={'h1'}
						fontWeigth="bold"
					/>
				</Grid>
				<Grid container className="container_jugadores" marginBottom={3}>
					{text?.players?.length &&
						text.players.map((player, index) => {
							return (
								<CardJugador
									nombreJugador={player.player_name}
									descripcion={player.description}
									tipoDeJuego={player.type_of_game}
									valoresDeJuego={player.values_game}
									image={player.image || ''}
									coach={player.coach}
									especialidades={player.coach_especialities}
									flag={player.flag}
									key={index}
								/>
							)
						})}
				</Grid>
			</Grid>
			<Grid container spacing={2} className="banners_nosotros">
				<Banner
					titulo={t('search.title')}
					data={search}
					icono={<PokerCards className="icono_buscamos_ofrecemos" />}
				/>
				<Banner
					titulo={t('offer.title')}
					data={offer}
					icono={<CasinoChip className="icono_buscamos_ofrecemos" />}
				/>
			</Grid>
			<RedesSociales />
			<Footer />
		</div>
	)
}
