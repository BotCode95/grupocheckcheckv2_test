import React from 'react'
import { RedesSociales } from '../components/Banners/RedesSociales'
import { VideosEntrevistas } from '../components/CardVideos/VideosEntrevistas'
import { Navbar } from '../components/navbar/Navbar'
import { Footer } from '../components/UI/Footer'
import background from '../assets/bg.png'

export const Entrevistas = () => {
	return (
		<div
			style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}
		>
			<Navbar />
			<VideosEntrevistas />
			<RedesSociales />
			<Footer />
		</div>
	)
}
