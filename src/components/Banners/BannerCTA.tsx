import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import { useLanguage } from '../../hooks/useLanguage'

export const BannerCTA = () => {
	const [t] = useTranslation('global')
	const lang = useLanguage()

	return <section className='home_cta'>
		<div className='banner_cta_container d-flex justify-content-between'>
			<h2 className='mb-0'>{t('bannerCTA.title')}</h2>
			<NavLink
				to={`/${lang}/signup`}
				rel="noreferrer"
				style={{ textDecoration: 'none' }}
			>
				<Button
					variant='contained'
					size='large'
					className='buttonInscribite'
					style={{
						backgroundColor: 'var(--black-color)',
						fontSize: 20,
					}}
				>
					{t('bannerCTA.button')}
				</Button>
			</NavLink>
		</div>
	</section>
}