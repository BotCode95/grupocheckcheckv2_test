import { NavLink } from 'react-router-dom'
import { Grid } from '@mui/material'
import { ButtonInscribite } from '../UI/Buttons/ButtonInscribite'
import { MenuMobile } from './MenuMobile'
import logo_check from '../../assets/logo_check.svg'
import { ScroolToTop } from '../UI/Scrool/ScroolToTop'
import { useTranslation } from 'react-i18next'
import { Language } from '../Language/Language'

export const Navbar = () => {
	const [t] = useTranslation('global')
	return (
		<nav className="navbar navbar-expand-lg navbar_sup">
			<MenuMobile />
			<ScroolToTop />
			<Grid container className="container_navbar">
				<Grid item xs={8} md={6}>
					<NavLink
						className="nav-link link_navbar link_logo"
						aria-current="page"
						to={'/'}
						style={({ isActive }) => ({
							color: isActive ? 'red' : 'white',
						})}
					>
						<img
							src={logo_check}
							alt="logo_check"
							className="logo-principal"
							width={110}
						/>
					</NavLink>
				</Grid>
				<Grid
					item
					xs={4}
					md={6}
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
					className="collapse navbar-collapse navbar_links"
					id="navbarNav"
					paddingX={5}
				>
					<ul className="navbar-nav align-items-center">
						<li className="nav-item">
							<NavLink
								className="nav-link link_navbar"
								aria-current="page"
								to={'/nosotros'}
								style={({ isActive }) => ({
									color: isActive ? 'red' : 'white',
								})}
							>
								{t('navbar.pages.us')}
							</NavLink>
						</li>

						{/* <li className="nav-item">
							<NavLink
								className="nav-link link_navbar"
								aria-current="page"
								to={'/entrevistas'}
								style={({ isActive }) => ({
									color: isActive ? 'red' : 'white',
								})}
							>
								{t('navbar.pages.interview')}
							</NavLink>
						</li> */}

						<li className="nav-item">
							<NavLink
								className="nav-link link_navbar"
								aria-current="page"
								style={({ isActive }) => ({
									color: isActive ? 'red' : 'white',
								})}
								to={'/viajes'}
							>
								{t('navbar.pages.trips')}
							</NavLink>
						</li>

						{/* <li className="nav-item">
							<NavLink
								className="nav-link link_navbar"
								aria-current="page"
								style={({ isActive }) => ({
									color: isActive ? 'red' : 'white',
								})}
								to="/faq"
							>
								FAQ
							</NavLink>
						</li> */}
						<li className="nav-item">
							{/* <Tooltip title={t('navbar.changeLanguage')}>
								<button
									className="button_language"
									onClick={() => handleLanguage()}
								>
									<Flag country={language.flag} size={40} />
								</button>
							</Tooltip> */}
							<Language />
						</li>

						<li className="nav-item">
							<NavLink
								to="/aplicar"
								rel="noreferrer"
								style={{ textDecoration: 'none' }}
							>
								<ButtonInscribite />
							</NavLink>
						</li>
					</ul>
				</Grid>
			</Grid>
		</nav>
	)
}
