import './GalleryPlayers.css'
import { IPlayer } from '../../types/texts'
import { useRef, useState } from 'react'
import ContentLoader from 'react-content-loader'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import { useLanguage } from '../../hooks/useLanguage'
interface Props {
	players: IPlayer[]
	setPlayer: (player: IPlayer) => void
	playerSelected: IPlayer | null
}

const SPEED_GALLERY = 1 // Ajusta el factor de desplazamiento según sea necesario
const SCROLL_STEP = 700 // Cantidad de desplazamiento por click

export const GalleryPlayers = ({ players, setPlayer, playerSelected }: Props) => {
	const lang = useLanguage()
	const galleryWrapperRef = useRef<HTMLDivElement>(null)
	const [isDown, setIsDown] = useState(false)
	const [startX, setStartX] = useState(0)
	const [scrollLeft, setScrollLeft] = useState(0)
	const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({})

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

	const handleImageLoad = (playerName: string) => {
		setLoadedImages(prevState => ({ ...prevState, [playerName]: true }))
	}

	const scrollGallery = (direction: 'left' | 'right') => {
		if (galleryWrapperRef.current) {
			const scrollAmount = direction === 'left' ? -SCROLL_STEP : SCROLL_STEP
			galleryWrapperRef.current.scrollBy({
				left: scrollAmount,
				behavior: 'smooth',
			})
		}
	}

	const handlePlayerSelect = (player: IPlayer) => {
		setPlayer(player)
		requestAnimationFrame(() => {
			if (galleryWrapperRef.current) {
				const selectedCard = document.getElementById(`player-${player.player_name}`)
				if (selectedCard) {
					const gallery = galleryWrapperRef.current
					const cardRect = selectedCard.getBoundingClientRect()
					const galleryRect = gallery.getBoundingClientRect()

					// Calculamos el desplazamiento solo lo necesario
					const cardLeft = cardRect.left - galleryRect.left
					const cardRight = cardRect.right - galleryRect.left
					const galleryWidth = galleryRect.width

					let offset = 0
					if (window.innerWidth <= 768) {  // Si es móvil
						// En móviles, se centra la tarjeta
						offset = cardRect.left - galleryRect.left - (gallery.clientWidth / 2) + (cardRect.width / 2)
					} else {  // Si es escritorio
						// Verificamos si la tarjeta está fuera del área visible
						if (cardLeft < 0) {
							// Si la tarjeta está a la izquierda, la movemos hasta el borde izquierdo
							offset = cardLeft
						} else if (cardRight > galleryWidth) {
							// Si la tarjeta está a la derecha, la movemos hasta el borde derecho
							offset = cardRight - galleryWidth
						}
					}

					if (offset !== 0) {
						gallery.scrollBy({ left: offset, behavior: 'smooth' })
					}
				}
			}
		})
	}

	return <div className="galleryPlayers">
		{lang === 'es' && <>
			<button
				className="galleryPlayers_arrow galleryPlayers_arrow--left"
				onClick={() => scrollGallery('left')}
				aria-label="Scroll Left"
			>
				<ArrowCircleLeftIcon fontSize='inherit' />
			</button>
			<button
				className="galleryPlayers_arrow galleryPlayers_arrow--right"
				onClick={() => scrollGallery('right')}
				aria-label="Scroll Right"
			>
				<ArrowCircleRightIcon fontSize='inherit' />
			</button>
		</>}
		<div
			className='galleryPlayers_wrapper'
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
				players.map(player => (<div
					key={player.player_name}
					id={`player-${player.player_name}`}
					className={`galleryPlayers_card ${playerSelected?.player_name === player.player_name ? 'galleryPlayers_selected' : ''}`}
					onClick={() => {
						if (player.player_name !== playerSelected?.player_name) handlePlayerSelect(player)
					}}
				>
					<div className="galleryPlayers_imageContainer">
						<img
							src={player.image}
							alt={player.player_name}
							className={`galleryPlayers_image ${loadedImages[player.player_name] ? 'loaded' : 'loading'}`}
							onLoad={() => handleImageLoad(player.player_name)}
						/>
						{!loadedImages[player.player_name] ? (
							<div className="galleryPlayers_placeholder">
								<ContentLoader
									speed={2}
									width={250}
									height={330}
									viewBox="0 0 250 330"
									backgroundColor="#0e0e0e"
									foregroundColor="#000"
								>
									<rect x="0" y="0" rx="15" ry="15" width="250" height="330" />
								</ContentLoader>
							</div>
						) : <div className='galleryPlayers_content'>
							<h3 className="galleryPlayers_playername">{player.player_name.toUpperCase()}</h3>
							<div className="galleryPlayers_shadow"></div>
						</div>}
					</div>
				</div>))
			}
		</div>
	</div>
}