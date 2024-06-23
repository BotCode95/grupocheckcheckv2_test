import { Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
export const ButtonInscribite = () => {
	const [t] = useTranslation('global')
	return (
		<Button
			variant="contained"
			style={{ backgroundColor: '#7E0B10', color: 'white' }}
			className='buttonInscribite'
		>
			{t('navbar.buttonsuscribe')}
		</Button>
	)
}
