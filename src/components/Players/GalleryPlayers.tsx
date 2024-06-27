import './GalleryPlayers.css'
import { IPlayer } from '../../types/texts'
import { useRef, useState } from 'react'
interface Props {
  players: IPlayer[]
  setPlayer: (player: IPlayer) => void
}

export const GalleryPlayers = ({ players, setPlayer }: Props) => {

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
			const walk = (x - startX) * 1 // Ajusta el factor de desplazamiento según sea necesario
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
			const walk = (x - startX) * 1 // Ajusta el factor de desplazamiento según sea necesario
			galleryWrapperRef.current.scrollLeft = scrollLeft - walk
		}
	}
    
	return <div className="galleryPlayers">
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
					key={player.player_name} className="galleryPlayers_card"
					style={{
						backgroundImage: `url(${player.image})`
					}}
					onClick={() => setPlayer(player)}
				>
					<h3 className="galleryPlayers_playername">{player.player_name.toUpperCase()}</h3>
					<div className="galleryPlayers_shadow"></div>
				</div>))
			}
		</div>
	</div>
}