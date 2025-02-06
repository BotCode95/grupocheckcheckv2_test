import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { TextsContext } from '../context/Dashboard/Texts'
import logo_check_check from '../assets/logo_checkcheck.svg'
import arSite from '../assets/flags/argLogo.png'
// import ukSite from '../assets/flags/ukLogo.png'
import crosses from '../assets/crosses.png'
import { NavLink } from 'react-router-dom'
// import { urlWebOtherLanguage } from '../constants/urls'

export const Intro = () => {
	const [t] = useTranslation('global')
	const { getTextByLanguage } = useContext(TextsContext)

	return (
		<div className="intro">
			<div className="intro_content">
				<div className="intro_logo">
					<img src={logo_check_check} alt="Logo Check Check" />
				</div>
				<ul className="intro_lang">
					<li>
						<NavLink to="/es/">
							<div
								className="intro_lang_img"
								onClick={() => getTextByLanguage('es')}
							>
								<img src={arSite} alt="AR" />
							</div>
							<span>{t('intro.urlSpanish')}</span>
						</NavLink>
					</li>
					{/* <li>
						<a href={urlWebOtherLanguage}>
							<div
								className="intro_lang_img"
								onClick={() => getTextByLanguage('en')}
							>
								<img src={ukSite} alt="GB" />
							</div>
							<span>{t('intro.urlEnglish')}</span>
						</a>
					</li> */}
				</ul>
			</div>
			<div className="intro_crosses">
				<img src={crosses} alt="Crosses" />
			</div>
		</div>
	)
}
