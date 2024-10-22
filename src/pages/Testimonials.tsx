import { useEffect } from 'react'
import { BannerPage } from '../components/UI/BannerPage/BannerPage'
import { Footer } from '../components/UI/Footer'
import { Navbar } from '../components/navbar/Navbar'
import { useTranslation } from 'react-i18next'
import { GalleryTestimonials } from '../components/Players/GalleryTestimonials'
import { BannerCTA } from '../components/Banners/BannerCTA'
import { useContext } from 'react'
import { TextsContext } from '../context/Dashboard/Texts'

export const Testimonials = () => {
	const [t] = useTranslation('global')
	const { text, getTextByLanguage } = useContext(TextsContext)

	useEffect(() => {
		const language =
			(typeof window !== 'undefined' && localStorage.getItem('lng')) || 'es'
		if (!text || text?.questions?.length === 0) {
			getTextByLanguage(language)
		}
	}, [])

	return (
		<>
			<Navbar />
			<BannerPage title={t('testimonials.title')} />
			<div className="page my-5">
				<div className="py-5">
					{text?.testimonials !== null && text?.testimonials?.length > 0 && (
						<GalleryTestimonials testimonials={text.testimonials} />
					)}
				</div>
			</div>
			<BannerCTA />
			<Footer />
		</>
	)
}
