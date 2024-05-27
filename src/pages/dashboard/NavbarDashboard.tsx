import { Grid, Tooltip } from '@mui/material'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import { NavLink, useNavigate } from 'react-router-dom'
import logo_check from '../../assets/logo_check.svg'

export const NavbarDashboard = () => {
	const navigate = useNavigate()

	return (
		<Grid container>
			<Grid item xs={2} md={2}></Grid>
			<Grid
				item
				xs={8}
				md={10}
				style={{
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: 'center',
				}}
			>
				<>
					<Tooltip title={'Volver atras'}>
						<ArrowBackIcon width={40} onClick={() => navigate('/dashboard')} />
					</Tooltip>
					<Tooltip title={'Volver a inicio'}>
						<NavLink
							className="nav-link link_navbar link_logo"
							aria-current="page"
							to="/"
						>
							<img
								src={logo_check}
								alt="logo_check"
								className="logo-principal"
								width={110}
							/>
						</NavLink>
					</Tooltip>
					{/* <Button
						sx={{
							marginTop: 2,
							backgroundColor: '#7E0B10',
							color: 'white',
							display: 'flex',
							justifyContent: 'flex-end',
						}}
						variant="contained"
					>
						<Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
							Cerrar X
						</Link>
					</Button> */}
				</>
			</Grid>
		</Grid>
	)
}
