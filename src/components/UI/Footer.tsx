import { NavLink } from 'react-router-dom'
import { Divider, Grid, IconButton, InputBase, Paper } from '@mui/material'
import logo_checkcheck from '../../assets/logo_checkcheck.svg'
import { useTranslation } from 'react-i18next'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { RedSocialList } from '../RedSocial/RedSocialList'
import { useLanguage } from '../../hooks/useLanguage'

export const Footer = () => {
	const [t] = useTranslation('global')
	const lang = useLanguage()
	return (
		<div className='footer'>
			<div className='footer_container'>
				<Grid container justifyContent={'space-between'}>
					<Grid item md={4} sm={12} className='footer_contact'>
						<NavLink
							to={`/${lang}/`}
							aria-current="page"
							className='footer_links_link'
							style={({ isActive }) => ({
								color: isActive ? 'var(--secondary-color)' : 'var(--white-color)',
							})}
						>
							<img src={logo_checkcheck} alt={t('header.title') || ''} width={100} />
						</NavLink>
						<p><a href={`mailto:${t('footer.email')}`} target='_blank' rel='noreferrer'>{t('footer.email')}</a></p>
					</Grid>
					<Grid item md={4} sm={12} className='footer_links'>
						<h6>{t('footer.links')}</h6>
						<ul>
							<li>
								<NavLink
									to={`/${lang}/teams`}
									aria-current="page"
									className='footer_links_link'
									style={({ isActive }) => ({
										color: isActive ? 'var(--secondary-color)' : 'var(--white-color)',
									})}
								>
									{t('header.pages.team')}
								</NavLink>
							</li>
							<li>
								<NavLink
									to={`/${lang}/testimonials`}
									aria-current="page"
									className='footer_links_link'
									style={({ isActive }) => ({
										color: isActive ? 'var(--secondary-color)' : 'var(--white-color)',
									})}
								>
									{t('header.pages.testimonials')}
								</NavLink>
							</li>
							<li>
								<NavLink
									to={`/${lang}/faq`}
									aria-current="page"
									className='footer_links_link'
									style={({ isActive }) => ({
										color: isActive ? 'var(--secondary-color)' : 'var(--white-color)',
									})}
								>
									{t('header.pages.faq')}
								</NavLink>
							</li>
							<li>
								<NavLink
									to={`/${lang}/blog`}
									aria-current="page"
									className='footer_links_link'
									style={({ isActive }) => ({
										color: isActive ? 'var(--secondary-color)' : 'var(--white-color)',
									})}
								>
									{t('header.pages.blog')}
								</NavLink>
							</li>
						</ul>
					</Grid>
					{/* <Grid item md={3} sm={12} className='footer_newsletter'>
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
					</Grid> */}
				</Grid>
				<div className='footer_hr'></div>
				<Grid container>
					<Grid item md={6} sm={12} className='footer_social'>
						<RedSocialList redes={['twitch', 'instagram', 'youtube', 'x', 'tiktok']} type="outlined" width={32} />
					</Grid>
					<Grid item md={6} sm={12} className='footer_copy'>
						{`© ${new Date().getFullYear()} Check Check Group. All rights reserved`}
					</Grid>
				</Grid>
			</div>
		</div>
	)
}
