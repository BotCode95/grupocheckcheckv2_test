import { NavLink } from 'react-router-dom'
import logo_check_check from '../../assets/logo_checkcheck.svg'
import logo_facebook from '../../assets/redes/facebook.svg'
import logo_instagram from '../../assets/redes/instagram.svg'
import logo_twitter from '../../assets/redes/twitter.svg'
import { Language } from '../Language/Language'
import { useTranslation } from 'react-i18next'
import { Grid } from '@mui/material'
import { ButtonInscribite } from '../UI/Buttons/ButtonInscribite'
export const MenuMobile = () => {
	const [t] = useTranslation('global')

	const menuHandle = () => {
		const btn = document.querySelector('.navbar_mobile_btn')
		const nav = document.querySelector('.navbar')
		const width = document.body.clientWidth
		if (width < 992) {
			btn?.classList.toggle('open')
			nav?.classList.toggle('open')
		}
	}

	return (
		<div className='navbar_mobile text-white'>
			<Grid
				container
				className='navbar_mobile_container'
				display={'flex'}
				justifyContent={'space-between'}
				alignItems={'center'}
			>
				<Grid item sm={6} className='navbar_mobile_logo'>
					<NavLink
						aria-current="page"
						to={'/'}
					>
						<img src={logo_check_check} alt="logo_check" width={70}/>
					</NavLink>
				</Grid>
				<Grid item sm={6}
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
					gap={2}
				>
					<div className='navbar_mobile_signup'>
						<NavLink
							to="/aplicar"
							rel="noreferrer"
							style={{ textDecoration: 'none' }}
						>
							<ButtonInscribite />
						</NavLink>
					</div>
					<div className="navbar_mobile_btn" onClick={menuHandle}>
						<div className="navbar_mobile_btn_burger"></div>
					</div>
				</Grid>
			</Grid>
			<div className='navbar_mobile_links'>
				<ul className='d-flex gap-3 list-unstyled m-0'>
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
				<div className='navbar_mobile_language'>
					<Language />
				</div>
				<div className='navbar_mobile_social'>
					<a
						href='https://facebook.com'
						target='_blank'
						rel="noreferrer"
					>
						<img src={logo_facebook} alt='Facebook' width={32} />
					</a>
					<a
						href='https://instagram.com'
						target='_blank'
						rel="noreferrer"
					>
						<img src={logo_instagram} alt='Instagram' width={32} />
					</a>
					<a
						href='https://x.com'
						target='_blank'
						rel="noreferrer"
					>
						<img src={logo_twitter} alt='Twitter' width={32} />
					</a>
				</div>
			</div>
		</div>
	)
}
