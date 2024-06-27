import { useContext, useEffect, useState } from 'react'
import { BannerPage } from '../components/UI/BannerPage/BannerPage'
import { Footer } from '../components/UI/Footer'
import { Navbar } from '../components/navbar/Navbar'
import { TextsContext } from '../context/Dashboard/Texts'
import { GalleryPlayers } from '../components/Players/GalleryPlayers'
import { PlayerView } from '../components/Players/PlayerView'
import { IPlayer } from '../types/texts'
import { NavLink } from 'react-router-dom'
import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

export const Team = () => {
	const { loading, language, text, getTextByLanguage, setLoading } =
		useContext(TextsContext)
	const [playerSelected, setPlayerSelected] = useState<IPlayer | null>(null)
	const [t] = useTranslation('global')

	useEffect(() => {
		if((playerSelected === null || !playerSelected.player_name) && text.players?.length > 0) {
			setPlayerSelected(text.players[0])
		}
	}, [text.players])
	
	console.log({loading, language, text, getTextByLanguage, setLoading})
	return <>
		<Navbar />
		<BannerPage title="Team" />
		<div className='page'>
			<div className="page_container">
				<p className='team_paragraph'><strong>XX</strong> is a company dedicated to teaching and banking players who are dedicated to <strong>POKER</strong> in the <strong>SPIN AND GO</strong> modality.</p>
				<GalleryPlayers players={text.players} setPlayer={setPlayerSelected} />
				<PlayerView player={playerSelected} />
			</div>
		</div>
		<section className='home_cta'>
			<div className='home_cta_container'>
				<h2>{'Are you ready to elevate your game? Let\'s embark on this journey together.'}</h2>
				<h2>{'Your success starts here.'}</h2>
				<NavLink
					to="/aplicar"
					rel="noreferrer"
					style={{ textDecoration: 'none' }}
				>
					<Button
						variant='contained'
						size='large'
						className='buttonInscribite'
						style={{
							backgroundColor: 'var(--black-color)',
							height: '60px',
							fontSize: 20,
						}}
					>
						{t('part_of_family.button')}
					</Button>
				</NavLink>
			</div>
		</section>
		<Footer />
	</>
}