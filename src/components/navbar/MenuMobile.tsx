import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material'
import logo_check from '../../assets/logo_check.svg'
import { Language } from '../Language/Language'
import { useTranslation } from 'react-i18next'
export const MenuMobile = () => {
	const [menuOpen, setMenuOpen] = useState(true)
	const [t] = useTranslation('global')

	return (
		<div>
			<div
				onClick={() => setMenuOpen(!menuOpen)}
				className={` ${
					menuOpen
						? 'menu-only-mobile row justify-content-between'
						: 'icono-close visible-menu'
				}`}
			>
				<div className="col-6">
					<MenuIcon sx={{ fontSize: 50, color: '#7E0B10' }} />
				</div>
				<div className="col-6" style={{ paddingLeft: '40px' }}>
					<img src={logo_check} alt="logo_check" width={110} />
				</div>
			</div>
			<div className={` nav-menu-hamburg ${menuOpen ? '' : 'visible-menu'} `}>
				<div className="row icono-imagen-show">
					<div
						className="col-9 d-flex justify-content-between"
						style={{ textAlign: 'left' }}
					>
						<NavLink
							className="nav-link link_navbar"
							aria-current="page"
							to="/"
						>
							<img src={logo_check} alt="logo_check" width={100} />
						</NavLink>
						<Language />
					</div>
					<div className="col-3">
						<span
							onClick={() => setMenuOpen(!menuOpen)}
							className={` ${menuOpen ? 'icono-close' : ''}`}
						>
							<CloseIcon
								sx={{ fontSize: 50, color: '#7E0B10', cursor: 'pointer' }}
							/>
						</span>
					</div>
				</div>
				<nav>
					<ul className="navbar-nav">
						<li className="nav-item nav-menu">
							<NavLink
								to="/nosotros"
								className="nav-link active"
								onClick={() => setMenuOpen(!menuOpen)}
							>
								{t('navbar.pages.us')}
							</NavLink>
						</li>
						<li className="nav-item nav-menu">
							<NavLink
								to="/viajes"
								className="nav-link"
								onClick={() => setMenuOpen(!menuOpen)}
							>
								{t('navbar.pages.trips')}
							</NavLink>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	)
}
