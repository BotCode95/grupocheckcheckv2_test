import { Button } from '@mui/material'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { TextsContext } from '../../context/Dashboard/Texts'

export const BannerCTA = () => {
	const [t] = useTranslation('global')
	const {
		text
	} = useContext(TextsContext)
	return (
		<section className="home_cta">
			<div className="banner_cta_container d-flex justify-content-between">
				<h2 className="mb-0">{text?.homeTexts?.secondaryCTA?.title || t('bannerCTA.title')}</h2>
				<a
					href="https://discord.gg/zd3ntsNKuS"
					target="_blank"
					rel="noreferrer"
					style={{ textDecoration: 'none' }}
				>
					<Button
						variant="contained"
						size="large"
						className="buttonInscribite"
						style={{
							backgroundColor: 'var(--black-color)',
							fontSize: 20,
						}}
					>
						{text?.homeTexts?.secondaryCTA?.button || t('bannerCTA.button')}
					</Button>
				</a>
			</div>
		</section>
	)
}
