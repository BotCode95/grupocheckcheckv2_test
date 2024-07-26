import { BannerPage } from '../components/UI/BannerPage/BannerPage'
import { Footer } from '../components/UI/Footer'
import { Navbar } from '../components/navbar/Navbar'
import { useTranslation } from 'react-i18next'
import { GalleryTestimonials } from '../components/Players/GalleryTestimonials'
import { type ITestimonial } from '../types/texts'
import { BannerCTA } from '../components/Banners/BannerCTA'

export const Testimonials = () => {
	const [t] = useTranslation('global')
	const testimonials = t('testimonials.testimonials', { returnObjects: true }) as ITestimonial[]
	
	return <>
		<Navbar />
		<BannerPage title={t('testimonials.title')} />
		<div className='page my-5'>
			<div className="py-5">
				{testimonials !== null && <GalleryTestimonials testimonials={testimonials} />}
			</div>
		</div>
		<BannerCTA />
		<Footer />
	</>
}