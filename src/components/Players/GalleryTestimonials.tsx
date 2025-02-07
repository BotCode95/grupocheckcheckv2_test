import './GalleryTestimonials.css'
import { ITestimonial } from '../../types/texts'
import { useEffect, useRef, useState } from 'react'
import ContentLoader from 'react-content-loader'

interface Props {
	testimonials: ITestimonial[]
}

const SPEED_GALLERY = 1

export const GalleryTestimonials = ({ testimonials }: Props) => {
	const galleryWrapperRef = useRef<HTMLDivElement>(null)
	const [isDown, setIsDown] = useState(false)
	const [startX, setStartX] = useState(0)
	const [scrollLeft, setScrollLeft] = useState(0)
	const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([])
	const [testimonialSelected, setTestimonialSelected] = useState<ITestimonial | null>(null)

	const handleMouseDown = (e: React.MouseEvent) => {
		if (galleryWrapperRef.current) {
			setIsDown(true)
			setStartX(e.pageX - galleryWrapperRef.current.offsetLeft)
			setScrollLeft(galleryWrapperRef.current.scrollLeft)
		}
	}

	const handleMouseLeave = () => setIsDown(false)
	const handleMouseUp = () => setIsDown(false)

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!isDown) return
		e.preventDefault()
		if (galleryWrapperRef.current) {
			const x = e.pageX - galleryWrapperRef.current.offsetLeft
			const walk = (x - startX) * SPEED_GALLERY
			galleryWrapperRef.current.scrollLeft = scrollLeft - walk
		}
	}

	const handleTouchStart = (e: React.TouchEvent) => {
		if (galleryWrapperRef.current) {
			setIsDown(true)
			setStartX(e.touches[0].pageX - galleryWrapperRef.current.offsetLeft)
			setScrollLeft(galleryWrapperRef.current.scrollLeft)
		}
	}

	const handleTouchEnd = () => setIsDown(false)

	const handleTouchMove = (e: React.TouchEvent) => {
		if (!isDown) return
		if (galleryWrapperRef.current) {
			const x = e.touches[0].pageX - galleryWrapperRef.current.offsetLeft
			const walk = (x - startX) * SPEED_GALLERY
			galleryWrapperRef.current.scrollLeft = scrollLeft - walk
		}
	}

	const handleImageLoad = (index: number) => {
		setImagesLoaded(prev => {
			const updated = [...prev]
			updated[index] = true
			return updated
		})
	}

	// Centrar el testimonio seleccionado
	const handleSelectTestimonial = (testimonial: ITestimonial) => {
		setTestimonialSelected(testimonial)

		requestAnimationFrame(() => {
			if (galleryWrapperRef.current) {
				const selectedCard = document.getElementById(`testimonial-${testimonial.author}`)
				if (selectedCard) {
					const gallery = galleryWrapperRef.current
					const cardRect = selectedCard.getBoundingClientRect()
					const galleryRect = gallery.getBoundingClientRect()

					const offset = cardRect.left - galleryRect.left - (gallery.clientWidth / 2) + (cardRect.width / 2)

					gallery.scrollBy({ left: offset, behavior: 'smooth' })
				}
			}
		})
	}

	useEffect(() => {
		if (galleryWrapperRef.current) {
			const galleryWidth = galleryWrapperRef.current.scrollWidth
			const visibleWidth = galleryWrapperRef.current.clientWidth
			const centerPosition = (galleryWidth - visibleWidth) / 2
			galleryWrapperRef.current.scrollLeft = centerPosition
		}

		if (testimonials.length > 0) {
			setImagesLoaded(new Array(testimonials.length).fill(false))
		}
	}, [testimonials])

	return (
		<div className="galleryTestimonials">
			<div
				className='galleryTestimonials_wrapper'
				ref={galleryWrapperRef}
				onMouseDown={handleMouseDown}
				onMouseLeave={handleMouseLeave}
				onMouseUp={handleMouseUp}
				onMouseMove={handleMouseMove}
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
				onTouchMove={handleTouchMove}
			>
				{testimonials.map((testimonial, index) => (
					<div
						key={testimonial.author}
						id={`testimonial-${testimonial.author}`} // ID para encontrar el testimonio
						className={`galleryTestimonials_card ${testimonialSelected?.author === testimonial.author ? 'galleryTestimonials_selected' : ''}`}
						onClick={() => handleSelectTestimonial(testimonial)}
					>
						<div className='galleryTestimonials_imgContainer'>
							{!imagesLoaded[index] && (
								<div
									style={{
										width: '100%',
										height: '100%',
										display: 'flex',
										justifyContent: 'center',
										alignItems: 'center',
										backgroundColor: 'rgba(0, 0, 0, 1)',
										borderRadius: '20px'
									}}>
									<ContentLoader
										speed={2}
										height={'100%'}
										width={'100%'}
										backgroundColor="#0e0e0e"
										foregroundColor="#000"
									>
										<rect x="0" y="0" rx="15" ry="15" width="100%" height="100%" />
									</ContentLoader>
								</div>
							)}
							<img
								src={testimonial.image}
								alt={testimonial.author}
								onLoad={() => handleImageLoad(index)}
								className={`galleryTestimonials_img ${imagesLoaded[index] ? 'loaded' : 'loading'}`}
							/>
						</div>
						<div className='galleryTestimonials_info'>
							<h3 className="galleryTestimonials_title">{testimonial.title}</h3>
							<p>{testimonial.description}</p>
							<span>by {testimonial.author}</span>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
