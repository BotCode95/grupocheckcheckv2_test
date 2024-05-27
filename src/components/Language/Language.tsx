import React, { useContext, useState } from 'react'
import { Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { TextsContext } from '../../context/Dashboard/Texts'
import Flag from 'react-flagkit'

export const Language = () => {
	const [t, i18n] = useTranslation('global')
	const { setLanguage: setLng } = useContext(TextsContext)
	const [language, setLanguage] = useState({
		lng: 'en',
		flag: 'GB',
	})
	const handleLanguage = () => {
		if (language.lng === 'es') {
			setLng('es')
			setLanguage({
				lng: 'en',
				flag: 'GB',
			})
		} else {
			setLng('en')
			setLanguage({
				lng: 'es',
				flag: 'AR',
			})
		}
		i18n.changeLanguage(language.lng)
	}
	return (
		<Tooltip title={t('navbar.changeLanguage')}>
			<button className="button_language" onClick={() => handleLanguage()}>
				<Flag country={language.flag} size={40} />
			</button>
		</Tooltip>
	)
}
