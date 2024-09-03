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

export const Team = () => {
	const [playerSelected, setPlayerSelected] = useState<IPlayer | null>(null)
	const [t] = useTranslation('global')
	const { text } = useContext(TextsContext)

	useEffect(() => {
		if (
			(playerSelected === null || !playerSelected.player_name) &&
			text.players?.length > 0
		) {
			setPlayerSelected(text.players[0])
		}
	}, [text.players])

	return (
		<>
			<Navbar />
			<BannerPage title={t('team.title')} />
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
			<BannerCTA />
			<Footer />
		</>
	)
}
