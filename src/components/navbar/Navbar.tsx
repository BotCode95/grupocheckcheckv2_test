import { NavLink } from 'react-router-dom'
import { Grid, Tooltip } from '@mui/material'
import { ButtonInscribite } from '../UI/Buttons/ButtonInscribite'
import { MenuMobile } from './MenuMobile'
import { ScroolToTop } from '../UI/Scrool/ScroolToTop'
import { useTranslation } from 'react-i18next'
import logo_check_check from '../../assets/logo_checkcheck.svg'
import { RedSocialList } from '../RedSocial/RedSocialList'
import { useLanguage } from '../../hooks/useLanguage'
import ukLogo from '../../assets/flags/ukLogo.png'
export const Navbar = () => {
	const [t] = useTranslation('global')
	const lang = useLanguage()

	return (
		<nav className="navbar">
			<MenuMobile />
			<ScroolToTop />
			<Grid container className="navbar_container">
				<Grid
					item
					md={4}
					display={'flex'}
					justifyContent={'start'}
					alignItems={'center'}
				>
					<NavLink aria-current="page" to={`/${lang}/`}>
						<img
							src={logo_check_check}
							alt={t('header.title') || ''}
							width={100}
						/>
					</NavLink>
				</Grid>
				<Grid
					item
					md={4}
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
				>
					<ul className="navbar_links d-flex gap-3 list-unstyled m-0">
						<li>
							<NavLink
								to={`/${lang}/teams`}
								aria-current="page"
								className="navbar_link"
								style={({ isActive }) => ({
									color: isActive
										? 'var(--secondary-color)'
										: 'var(--white-color)',
								})}
							>
								{t('header.pages.team')}
							</NavLink>
						</li>
						<li>
							<NavLink
								to={`/${lang}/testimonials`}
								aria-current="page"
								className="navbar_link"
								style={({ isActive }) => ({
									color: isActive
										? 'var(--secondary-color)'
										: 'var(--white-color)',
								})}
							>
								{t('header.pages.testimonials')}
							</NavLink>
						</li>
						<li>
							<NavLink
								to={`/${lang}/faq`}
								aria-current="page"
								className="navbar_link"
								style={({ isActive }) => ({
									color: isActive
										? 'var(--secondary-color)'
										: 'var(--white-color)',
								})}
							>
								{t('header.pages.faq')}
							</NavLink>
						</li>
						<li>
							<NavLink
								to={`/${lang}/blog`}
								aria-current="page"
								className="navbar_link"
								style={({ isActive }) => ({
									color: isActive
										? 'var(--secondary-color)'
										: 'var(--white-color)',
								})}
							>
								{t('header.pages.blog')}
							</NavLink>
						</li>
					</ul>
				</Grid>
				<Grid
					item
					md={4}
					display={'flex'}
					justifyContent={'end'}
					alignItems={'center'}
				>
					<div className="navbar_social">
						<RedSocialList
							redes={['twitch', 'instagram', 'youtube']}
							type="contained"
						/>
					</div>
					<div className="navbar_signup">
						<NavLink
							to={`/${lang}/signup`}
							rel="noreferrer"
							style={{ textDecoration: 'none' }}
						>
							<ButtonInscribite />
						</NavLink>
					</div>
					<div>
						<Tooltip
							title={`${
								lang === 'en'
									? 'Ir a Grupo Check Check'
									: 'Ir a Team Chek Check'
							}`}
						>
							<NavLink
								to={`/${lang === 'en' ? 'es' : 'en'}/`}
								rel="noreferrer"
								target="_blank"
								style={{ textDecoration: 'none' }}
							>
								<img src={ukLogo} alt="" width={50} />
							</NavLink>
						</Tooltip>
					</div>
				</Grid>
			</Grid>
		</nav>
	)
}
