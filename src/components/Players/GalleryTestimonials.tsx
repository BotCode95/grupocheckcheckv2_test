import './GalleryTestimonials.css'
import { ITestimonial } from '../../types/texts'
import { useEffect, useRef, useState } from 'react'

interface Props {
  testimonials: ITestimonial[]
}

// Ajusta el factor de desplazamiento según sea necesario
const SPEED_GALLERY = 1

export const GalleryTestimonials = ({ testimonials }: Props) => {

	const galleryWrapperRef = useRef<HTMLDivElement>(null)
	const [isDown, setIsDown] = useState(false)
	const [startX, setStartX] = useState(0)
	const [scrollLeft, setScrollLeft] = useState(0)

	const handleMouseDown = (e: React.MouseEvent) => {
		if (galleryWrapperRef.current) {
			setIsDown(true)
			setStartX(e.pageX - galleryWrapperRef.current.offsetLeft)
			setScrollLeft(galleryWrapperRef.current.scrollLeft)
		}
	}

	const handleMouseLeave = () => {
		setIsDown(false)
	}

	const handleMouseUp = () => {
		setIsDown(false)
	}

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

	const handleTouchEnd = () => {
		setIsDown(false)
	}

	const handleTouchMove = (e: React.TouchEvent) => {
		if (!isDown) return
		if (galleryWrapperRef.current) {
			const x = e.touches[0].pageX - galleryWrapperRef.current.offsetLeft
			const walk = (x - startX) * SPEED_GALLERY
			galleryWrapperRef.current.scrollLeft = scrollLeft - walk
		}
	}

	useEffect(() => {
		if (galleryWrapperRef.current) {
			const galleryWidth = galleryWrapperRef.current.scrollWidth
			const visibleWidth = galleryWrapperRef.current.clientWidth
			const centerPosition = (galleryWidth - visibleWidth) / 2
			galleryWrapperRef.current.scrollLeft = centerPosition
		}
	}, [testimonials])
    
	return <div className="galleryTestimonials">
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
			{
				testimonials.map(testimonial => (<div
					key={testimonial.author} className="galleryTestimonials_card"
				>
					<div className='galleryTestimonials_imgContainer'>
						<img src={testimonial.image} alt={testimonial.author} />
					</div>
					<div className='galleryTestimonials_info'>
						<h3 className="galleryTestimonials_title">{testimonial.title}</h3>
						<p>
							{testimonial.description}
						</p>
						<span>by {testimonial.author}</span>
					</div>
				</div>))
			}
		</div>
	</div>
}