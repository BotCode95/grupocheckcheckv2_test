import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { I18nextProvider } from 'react-i18next'
import i18next from 'i18next'
import global_es from './translations/es/translations.json'
import global_en from './translations/en/translations.json'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'

const theme = createTheme({
	typography: {
		fontFamily: [
			'Montserrat',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'-apple-system',
			'Arial',
			'sans-serif',
		].join(','),
	},
})

i18next.init({
	interpolation: { escapeValue: false },
	lng: 'es',
	resources: {
		es: { global: global_es },
		en: { global: global_en },
	},
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
	<React.StrictMode>
		<I18nextProvider i18n={i18next}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<App />
			</ThemeProvider>
		</I18nextProvider>
	</React.StrictMode>
)

reportWebVitals()
