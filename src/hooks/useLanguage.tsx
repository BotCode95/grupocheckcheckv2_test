import i18next from 'i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { TextsContext } from '../context/Dashboard/Texts'
import { LNG } from '../context/Dashboard/Texts/TextsContext'

const excludedRoutes = [
	'login',
	'dashboard'
]

export const useLanguage = (): LNG | undefined => {
	const location = useLocation()
	const navigate = useNavigate()
	const lang = location.pathname.split('/')[1]
	const { setLanguage, language } = useContext(TextsContext)
	const isExcluded = excludedRoutes.includes(lang)
	if((!lang || (lang !== 'es' && lang !== 'en')) && !isExcluded) {
		navigate('/')
		return 
	}
	useEffect(() => {
		if(language !== lang && ['es', 'en'].includes(lang)) {
			setLanguage(lang as LNG)
			i18next.changeLanguage(lang)
		}
	}, [])
	return language
}