import { useContext, useEffect, useState } from 'react'
import { VideoResponse } from '../types/latestvideos'
import { TextsContext } from '../context/Dashboard/Texts'
import api from '../api/api'
import { videosMock } from '../data/videos/videosMock'

export const useTrips = () => {
	const { text, getTextByLanguage } = useContext(TextsContext)
	const [videos, setVideos] = useState<VideoResponse[]>([])

	useEffect(() => {
		consultarVideos()
	}, [])

	useEffect(() => {
		if (!text.imagesTrips.length) {
			getTextByLanguage()
		}
	}, [])

	const consultarVideos = async () => {
		try {
			const { data } = await api.get('/tripsvideo?isShow=true')
			setVideos(data.videos)
		} catch (e) {
			setVideos(videosMock)
		}
	}
	return {
		trips: videos,
	}
}
