import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import { useContext } from 'react'
import { BannerPage } from '../components/UI/BannerPage/BannerPage'
import { Footer } from '../components/UI/Footer'
import { Navbar } from '../components/navbar/Navbar'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useTranslation } from 'react-i18next'
import { BannerCTA } from '../components/Banners/BannerCTA'
import { TextsContext } from '../context/Dashboard/Texts'

export const Faq = () => {
	const [t] = useTranslation('global')
	const { text } = useContext(TextsContext)
	const questions = text.questions
	console.log('questions', questions)
	return (
		<>
			<Navbar />
			<BannerPage title={t('faq.title')} />
			<div className='page_container faq'>
				{
					questions?.length > 0 && questions.map((question, idx) => (
						<Accordion key={`faq${idx}`} sx={{ color: 'var(--white-color)', bgcolor: 'var(--dark-color)' }} className='faq_accordion'>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon sx={{color: 'var(--white-color)'}}/>}
								aria-controls={`faq${idx}`}
								id={`faq${idx}`}
							>
								<Typography fontWeight={600}><span className='faq_icon'>✦</span>{question.title}</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<Typography>
									{question.description}
								</Typography>
							</AccordionDetails>
						</Accordion>))
				}
			</div>
			<BannerCTA />
			<Footer />
		</>
	)
}
