import { NavLink } from 'react-router-dom'
import { Divider, Grid, IconButton, InputBase, Paper } from '@mui/material'
import logo_checkcheck from '../../assets/logo_checkcheck.svg'
import logo_facebook from '../../assets/redes/facebook.svg'
import logo_instagram from '../../assets/redes/instagram.svg'
import logo_twitter from '../../assets/redes/twitter.svg'
import { useTranslation } from 'react-i18next'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export const Footer = () => {
	const [t] = useTranslation('global')
	return (
		<div className='footer'>
			<div className='footer_container'>
				<Grid container>
					<Grid item md={3} sm={12} className='footer_contact'>
						<NavLink
							to='/'
							aria-current="page"
							className='footer_links_link'
							style={({ isActive }) => ({
								color: isActive ? 'var(--secondary-color)' : 'var(--white-color)',
							})}
						>
							<img src={logo_checkcheck} alt="Logo TeamCheckCheck" width={100} />
						</NavLink>
						<p>+1 (7635) 547-12-97</p>
						<a href={'mailto:support@checkcheck.com'} target='_blank' rel='noreferrer'>support@checkcheck.com</a>
					</Grid>
					<Grid item md={6} sm={12} className='footer_links'>
						<h6>Quick Links</h6>
						<ul>
							<li>
								<NavLink
									to='/teams'
									aria-current="page"
									className='footer_links_link'
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
									className='footer_links_link'
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
									className='footer_links_link'
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
									className='footer_links_link'
									style={({ isActive }) => ({
										color: isActive ? 'var(--secondary-color)' : 'var(--white-color)',
									})}
								>
									{t('navbar.pages.blog')}
								</NavLink>
							</li>
						</ul>
					</Grid>
					<Grid item md={3} sm={12} className='footer_newsletter'>
						<h6>Suscribe</h6>
						<Paper
							component="form"
							sx={{ display: 'flex', alignItems: 'center', paddingTop: '0px', background: 'linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 85%, rgba(193,50,52,1) 85%, rgba(193,50,52,1) 100%)'}}
						>
							<InputBase
								sx={{ ml: 1, flex: 1 }}
								placeholder="Get product updates"
								inputProps={{ 'aria-label': 'Get product updates' }}
							/>
							<Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
							<IconButton sx={{ p: '10px', color: 'white' }} aria-label="directions">
								<ArrowForwardIcon />
							</IconButton>
						</Paper>
					</Grid>
				</Grid>
				<div className='footer_hr'></div>
				<Grid container>
					<Grid item md={6} sm={12} className='footer_social'>
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
					</Grid>
					<Grid item md={6} sm={12} className='footer_copy'>
						{`© ${new Date().getFullYear()} Check Check Group. All rights reserved`}
					</Grid>
				</Grid>
			</div>
		</div>
	)
}
