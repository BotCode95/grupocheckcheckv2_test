import { Link, NavLink } from 'react-router-dom'
import { Grid, Typography } from '@mui/material'
import { ButtonInscribite } from './Buttons/ButtonInscribite'
import { ScroolToTop } from './Scrool/ScroolToTop'
import background from '../../assets/bg.png'
import { useTranslation } from 'react-i18next'

export const Footer = () => {
	const [t] = useTranslation('global')
	return (
		<Grid
			container
			spacing={2}
			className="container_footer"
			display={'flex'}
			justifyContent={'center'}
			style={{ backgroundImage: `url(${background})` }}
		>
			<Grid item xs={12} md={4}>
				<Typography
					variant="h6"
					color="white"
					sx={{
						fontSize: {
							md: 18,
							sm: 16,
							xs: 14,
						},
					}}
				>
					GRUPO CHECK CHECK
				</Typography>
				<Typography
					variant="body2"
					color="white"
					sx={{
						fontSize: {
							md: 14,
							sm: 12,
							xs: 12,
						},
					}}
				>
					{new Date().getFullYear()} Copyright
				</Typography>
			</Grid>
			<Grid item xs={6} md={3}>
				<Grid container spacing={2}>
					<ScroolToTop />
					<Grid item xs={12}>
						<Link className="link_footer" to={'/'}>
							{t('navbar.pages.home')}
						</Link>
					</Grid>
					<Grid item xs={12} style={{ paddingTop: '6px' }}>
						<Link className="link_footer" to={'/nosotros'}>
							{t('navbar.pages.us')}
						</Link>
					</Grid>
					<Grid item xs={12} style={{ paddingTop: '6px' }}>
						<Link className="link_footer" to={'entrevistas'}>
							{t('navbar.pages.interview')}
						</Link>
					</Grid>
				</Grid>
			</Grid>
			<Grid item xs={6} md={3}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<Link className="link_footer" to={'/viajes'}>
							{t('navbar.pages.trips')}
						</Link>
					</Grid>
					{/* <Grid item xs={12} style={{ paddingTop: '6px' }}>
						<Link className="link_footer" to={'/faq'}>
							FAQ
						</Link>
					</Grid> */}
				</Grid>
			</Grid>
			<Grid item xs={12} md={2} className="boton_inscribite">
				<NavLink
					to="/aplicar"
					rel="noreferrer"
					style={{ textDecoration: 'none' }}
				>
					<ButtonInscribite />
				</NavLink>
			</Grid>
		</Grid>
	)
}
