import Grid from '@mui/material/Grid'
import { CardVideoEntrevista } from './CardVideoEntrevista'
import { useEffect, useState } from 'react'
import { Video } from '../../types/latestvideos'
import api from '../../api/api'
import { videosPreLoadingEntrevistas } from '../../data/videosEntrevistas'

export const VideosEntrevistas = () => {
	const [videos, setVideos] = useState<Video[]>([])

	useEffect(() => {
		consultarVideos()
	}, [])

	const consultarVideos = async () => {
		try {
			const { data } = await api.get('/interviewsvideo')
			setVideos(data.videos)
		} catch (error) {
			setVideos(videosPreLoadingEntrevistas)
		}
	}
	return (
		<Grid
			container
			spacing={2}
			marginBottom={5}
			className="padding_left90 padding_right90"
		>
			<Grid item md={12} xs={12}>
				<Grid container spacing={2}>
					{videos.map((video) => (
						<Grid item md={4} xs={12} key={video._id}>
							<CardVideoEntrevista url={video.url} />
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	)
}
