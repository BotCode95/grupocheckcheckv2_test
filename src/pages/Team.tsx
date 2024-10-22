import { useContext, useEffect, useState } from 'react'
import { BannerPage } from '../components/UI/BannerPage/BannerPage'
import { Footer } from '../components/UI/Footer'
import { Navbar } from '../components/navbar/Navbar'
import { GalleryPlayers } from '../components/Players/GalleryPlayers'
import { PlayerView } from '../components/Players/PlayerView'
import { type IPlayer } from '../types/texts'
import { useTranslation } from 'react-i18next'
import { BannerCTA } from '../components/Banners/BannerCTA'
import { TextsContext } from '../context/Dashboard/Texts'
import { Grid } from '@mui/material'
import { SpinnerImg } from '../components/UI/Spinners/SpinnerImg'

export const Team = () => {
	const [playerSelected, setPlayerSelected] = useState<IPlayer | null>(null)
	const [t] = useTranslation('global')
	const {
		text,
		loading: loadingFetch,
		getTextByLanguage,
	} = useContext(TextsContext)

	useEffect(() => {
		const language =
			(typeof window !== 'undefined' && localStorage.getItem('lng')) || 'es'
		if (!text || text?.questions?.length === 0) {
			getTextByLanguage(language)
		}
	}, [])

	useEffect(() => {
		if (
			(playerSelected === null || !playerSelected.player_name) &&
			text.players?.length > 0
		) {
			setPlayerSelected(text.players[0])
		}
	}, [text?.players])

	return (
		<>
			<Navbar />
			<BannerPage title={t('team.title')} />
			{loadingFetch ? (
				<Grid container>
					<Grid
						item
						xs={12}
						display={'flex'}
						justifyContent={'center'}
						alignItems={'center'}
						height={'100vh'}
					>
						<SpinnerImg />
					</Grid>
				</Grid>
			) : (
				<div className="page">
					<div className="page_container">
						<p className="team_paragraph">{t('team.description')}</p>
						<GalleryPlayers
							players={text.players}
							playerSelected={playerSelected}
							setPlayer={setPlayerSelected}
						/>
						<PlayerView player={playerSelected} />
					</div>
				</div>
			)}

			<BannerCTA />
			<Footer />
		</>
	)
}
