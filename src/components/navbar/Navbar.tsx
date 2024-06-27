import { NavLink, Link } from 'react-router-dom'
import { Grid } from '@mui/material'
import { ButtonInscribite } from '../UI/Buttons/ButtonInscribite'
import { MenuMobile } from './MenuMobile'
import { ScroolToTop } from '../UI/Scrool/ScroolToTop'
import { useTranslation } from 'react-i18next'
import { Language } from '../Language/Language'
import logo_check_check from '../../assets/logo_checkcheck.svg'
import { RedSocialList } from '../RedSocial/RedSocialList'

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
						<li>
							<NavLink
								to='/blog'
								aria-current="page"
								className='navbar_link'
								style={({ isActive }) => ({
									color: isActive ? 'var(--secondary-color)' : 'var(--white-color)',
								})}
							>
								{t('navbar.pages.blog')}
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
						<RedSocialList redes={['facebook', 'instagram', 'twitter']}/>
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
