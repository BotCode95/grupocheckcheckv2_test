import { Link, Navigate, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useContext, useMemo } from 'react'
import logo_check_check from '../assets/logo_checkcheck.svg'
import icon_players from '../assets/icons/players.svg'
import icon_testimonials from '../assets/icons/testimonials.svg'
import flag_arg from '../assets/icons/ar.svg'
import flag_gb from '../assets/icons/gb.svg'
import icon_faqs from '../assets/icons/faqs.svg'
import { TextsContext } from '../context/Dashboard/Texts'
import { Players } from './dashboard/Players'
import { Testimonials } from './dashboard/Testimonials'
import { Questions } from './dashboard/Questions'
import { Button } from '@mui/material'
import { ColorRing } from 'react-loader-spinner'

const Sidebar: React.FC = () => {
	const { language, setLanguage, setLoading, loading } = useContext(TextsContext)
	const { logout } = useContext(UserContext)
	const location = useLocation()
	
	return <div style={{ maxWidth: '250px', width: '100%', padding: '2em 1em', textAlign: 'center', borderRight: '2px solid rgba(255,255,255,0.05)', height: '100vh', display: 'flex', flexDirection: 'column' }}>
		<div
		>
			<NavLink aria-current='page' to={'/'}>
				<img
					src={logo_check_check}
					width={100}
				/>
			</NavLink>
		</div>
		<nav className='dashboard_sidebar_nav'>
			<ul>
				<li><Link className={location.pathname?.includes('players') ? 'active' : ''} to='/dashboard/players'>
					<div>
						<img src={icon_players} />
					</div>
					Jugadores
				</Link></li>
				<li><Link className={location.pathname?.includes('testimonials') ? 'active' : ''} to='/dashboard/testimonials'>
					<div>
						<img src={icon_testimonials} />
					</div>
					Testimonios
				</Link></li>
				<li><Link className={location.pathname?.includes('faqs') ? 'active' : ''} to='/dashboard/faqs'>
					<div>
						<img src={icon_faqs} />
					</div>
					FAQs
				</Link></li>
			</ul>
		</nav>
		<div style={{fontSize: '0.8em', marginTop: '4em' }}>
			Versión en <br />
			<Button 
				style={{color: 'white', borderRadius: '0.5em', padding: '0.5em 1.2em', fontSize: '1.2em', margin: '1em 0', backgroundColor: `${language.includes('es') ? 'var(--primary-color)' : 'transparent'}`}}
				onClick={() => {
					setLoading(true)
					setLanguage('es')
					setTimeout(() => setLoading(false), 1000)
				}}
				disabled={loading}
			>
				<img src={flag_arg} width='24px' style={{ marginRight: '8px' }} /> Esp
			</Button>
			<br />
			<Button
				style={{color: 'white', borderRadius: '0.5em', padding: '0.5em 1.2em', fontSize: '1.2em', backgroundColor: `${language.includes('en') ? 'var(--primary-color)' : 'transparent'}`}}
				onClick={() => {
					setLoading(true)
					setLanguage('en')
					setTimeout(() => setLoading(false), 1000)
				}}
				disabled={loading}
			>
				<img src={flag_gb} width='24px' style={{ marginRight: '8px' }} /> Eng
			</Button>
		</div>
		<div style={{ marginTop: 'auto' }}>
			<Button size='small' style={{ color: 'var(--secondary-color)', fontSize: '0.7em'}} onClick={() => logout()}>
				LOG OUT
			</Button>
		</div>
	</div>
}

export const DashboardLayout: React.FC = () => {
	const { status } = useContext(UserContext)
	const { text, loading } = useContext(TextsContext)
	if (status !== 'AUTHENTICATED') {
		return <Navigate to={'/login'} />
	}

	const data = useMemo(() => {
		return text
	}, [text])

	return <div style={{ display: 'flex' }}>
		<Sidebar />
		{loading ? <div style={{placeContent: 'center', width: '100%', textAlign: 'center'}}>
			<ColorRing width='50px' height='50px' colors={['white', 'white', 'white', 'white', 'white']} />
		</div> : <div style={{ padding: '3rem', color: 'white', width: '100%' }}>
			<Routes>
				<Route path="/" element={<Navigate to="/dashboard/players" replace />} />
				<Route path="players" element={<Players />} />
				<Route path="testimonials" element={<Testimonials />} />
				<Route path="faqs" element={<Questions />} />
			</Routes>
		</div>}
	</div>
}