import i18next from 'i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { TextsContext } from '../context/Dashboard/Texts'
import { useContext, useEffect } from 'react'

export const useLanguage = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const lang = location.pathname.split('/')[1]
	const { setLanguage: setLng, language } = useContext(TextsContext)
	if(!lang || (lang !== 'es' && lang !== 'en')) {
		navigate('/')
		return 
	}
	useEffect(() => {
		if(language !== lang) {
			setLng(lang)
			i18next.changeLanguage(lang)
		}
	}, [])
	return lang
}