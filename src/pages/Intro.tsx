import crosses from '../assets/crosses.png'
import logo_check_check from '../assets/logo_checkcheck.svg'
import ArFlag from '../assets/icons/ar.svg'
import GbFlag from '../assets/icons/gb.svg'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const Intro = () => {
	const [t] = useTranslation('global')
	return <div className="intro">
		<div className='intro_content'>
			<div className="intro_logo">
				<img src={logo_check_check} alt="Logo Check Check" />
			</div>
			<ul className="intro_lang">
				<li>
					<NavLink to='/en/'>
						<div className='intro_lang_img'>
							<img src={GbFlag} alt="AR" />
						</div>
						<span>{t('intro.urlEnglish')}</span>
					</NavLink>
				</li>
				<li>
					<NavLink to='/es/'>
						<div className='intro_lang_img'>
							<img src={ArFlag} alt="GB" />
						</div>
						<span>{t('intro.urlSpanish')}</span>
					</NavLink>
				</li>
			</ul>
		</div>
		<div className="intro_crosses">
			<img src={crosses} alt="Crosses" />
		</div>
	</div>
}