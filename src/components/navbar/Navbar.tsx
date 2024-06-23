import { NavLink, Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import { ButtonInscribite } from '../UI/Buttons/ButtonInscribite'
import { MenuMobile } from './MenuMobile'
import { ScroolToTop } from '../UI/Scrool/ScroolToTop'
import { useTranslation } from 'react-i18next'
import { Language } from '../Language/Language'
import logo_check_check from '../../assets/logo_checkcheck.svg'
import logo_facebook from '../../assets/redes/facebook.svg'
import logo_instagram from '../../assets/redes/instagram.svg'
import logo_twitter from '../../assets/redes/twitter.svg'

export const Navbar = () => {
	const [t] = useTranslation('global')
	return (
		<nav className='navbar'>
			<MenuMobile />
			<ScroolToTop />
			<Grid container className='navbar_container'>
				<Grid 
					item 
					md={4}
					display={'flex'}
					justifyContent={'start'}
					alignItems={'center'}
				>
					<NavLink
						aria-current="page"
						to={'/'}
					>
						<img src={logo_check_check} alt="logo_check" width={100}/>
					</NavLink>
				</Grid>
				<Grid 
					item 
					md={4}
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
				>
					<ul className='navbar_links d-flex gap-3 list-unstyled m-0'>
						<li>
							<NavLink
								to='/teams'
								aria-current="page"
								className='navbar_link'
								style={({ isActive }) => ({
									color: isActive ? 'var(--secondary-color)' : 'var(--white-color)',
								})}
							>
								{t('navbar.pages.team')}
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/testimonials'
								aria-current="page"
								className='navbar_link'
								style={({ isActive }) => ({
									color: isActive ? 'var(--secondary-color)' : 'var(--white-color)',
								})}
							>
								{t('navbar.pages.testimonials')}
							</NavLink>
						</li>
						<li>
							<NavLink
								to='/faq'
								aria-current="page"
								className='navbar_link'
								style={({ isActive }) => ({
									color: isActive ? 'var(--secondary-color)' : 'var(--white-color)',
								})}
							>
								{t('navbar.pages.faq')}
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
					<div className='navbar_social'>
						<ul className='d-flex gap-3 list-unstyled m-0 navbar_social_list'>
							<li>
								<a
									href='https://facebook.com'
									target='_blank'
									rel="noreferrer"
								>
									<img src={logo_facebook} alt='Facebook' width={24} />
								</a>
							</li>
							<li>
								<a
									href='https://instagram.com'
									target='_blank'
									rel="noreferrer"
								>
									<img src={logo_instagram} alt='Instagram' width={24} />
								</a>
							</li>
							<li>
								<a
									href='https://x.com'
									target='_blank'
									rel="noreferrer"
								>
									<img src={logo_twitter} alt='Twitter' width={24} />
								</a>
							</li>
						</ul>
					</div>
					<div className='navbar_signup'>
						<NavLink
							to="/aplicar"
							rel="noreferrer"
							style={{ textDecoration: 'none' }}
						>
							<ButtonInscribite />
						</NavLink>
					</div>
					<div className='navbar_language'>
						<Language />
					</div>
				</Grid>
			</Grid>
		</nav>
	)
}
