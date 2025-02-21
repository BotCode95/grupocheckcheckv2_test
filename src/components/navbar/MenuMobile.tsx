import { NavLink } from 'react-router-dom'
import logo_check_check from '../../assets/logo_checkcheck.svg'
import { useTranslation } from 'react-i18next'
import { Grid } from '@mui/material'
import { ButtonInscribite } from '../UI/Buttons/ButtonInscribite'
import { RedSocialList } from '../RedSocial/RedSocialList'
import { useLanguage } from '../../hooks/useLanguage'
import { useContext } from 'react'
import { TextsContext } from '../../context/Dashboard/Texts'
// import { urlWebOtherLanguage } from '../../constants/urls'
// import ukLogo from '../../assets/flags/ukLogo.png'

export const MenuMobile = () => {
	const [t] = useTranslation('global')
	const lang = useLanguage()

	const { text } = useContext(TextsContext)

	console.log('text', text)

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
		<div className="navbar_mobile text-white">
			<Grid
				container
				className="navbar_mobile_container"
				display={'flex'}
				justifyContent={'space-between'}
				alignItems={'center'}
			>
				<Grid item sm={3} className="navbar_mobile_logo">
					<NavLink aria-current="page" to={`/${lang}/`}>
						<img
							src={logo_check_check}
							alt={t('header.title') || ''}
							width={70}
						/>
					</NavLink>
				</Grid>
				{/* <Grid item sm={3} className="navbar_social">
					<RedSocialList
						redes={['twitch', 'instagram', 'youtube']}
						type="contained"
					/>
				</Grid> */}
				<Grid
					item
					sm={6}
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
					gap={2}
				>
					<div className="navbar_mobile_signup">
						<NavLink
							to={`/${lang}/signup`}
							rel="noreferrer"
							style={{ textDecoration: 'none' }}
						>
							<ButtonInscribite />
						</NavLink>
					</div>
					{/* <Tooltip
						title={`${
							lang === 'en' ? 'Ir a Grupo Check Check' : 'Ir a Team Chek Check'
						}`}
					>
						<a
							href={urlWebOtherLanguage}
							rel="noreferrer"
							target="_blank"
							style={{ textDecoration: 'none' }}
						>
							<img src={ukLogo} alt="" width={50} />
						</a>
					</Tooltip> */}
					<div className="navbar_mobile_btn" onClick={menuHandle}>
						<div className="navbar_mobile_btn_burger"></div>
					</div>
				</Grid>
				{/* <Grid item sm={3}>
					
				</Grid> */}
			</Grid>
			<div className="navbar_mobile_links">
				<ul className="d-flex gap-3 list-unstyled m-0 navbar_mobile_links_list">
					<li>
						<NavLink
							to={`/${lang}/teams`}
							aria-current="page"
							className="navbar_link"
							style={({ isActive }) => ({
								color: isActive
									? 'var(--secondary-color)'
									: 'var(--white-color)',
							})}
						>
							{t('header.pages.team')}
						</NavLink>
					</li>
					<li>
						<NavLink
							to={`/${lang}/testimonials`}
							aria-current="page"
							className="navbar_link"
							style={({ isActive }) => ({
								color: isActive
									? 'var(--secondary-color)'
									: 'var(--white-color)',
							})}
						>
							{t('header.pages.testimonials')}
						</NavLink>
					</li>
					<li>
						<NavLink
							to={`/${lang}/faq`}
							aria-current="page"
							className="navbar_link"
							style={({ isActive }) => ({
								color: isActive
									? 'var(--secondary-color)'
									: 'var(--white-color)',
							})}
						>
							{t('header.pages.faq')}
						</NavLink>
					</li>
					<li>
						<NavLink
							to={`/${lang}/blog`}
							aria-current="page"
							className="navbar_link"
							style={({ isActive }) => ({
								color: isActive
									? 'var(--secondary-color)'
									: 'var(--white-color)',
							})}
						>
							{t('header.pages.blog')}
						</NavLink>
					</li>
				</ul>
				<div className="navbar_mobile_social">
					{text?.homeTexts?.socialMediaMenu && (
						<RedSocialList
							redes={text.homeTexts.socialMediaMenu}
							type="contained"
							width={32}
						/>
					)}
				</div>
			</div>
		</div>
	)
}
