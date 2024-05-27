import Grid from '@mui/material/Grid'
import { CardVideoViajes } from './CardViedosViajes'
import { Video } from '../../types/latestvideos'
import { useEffect, useState } from 'react'
import api from '../../api/api'
import { videosPreLoadingViajes } from '../../data/videosViajes'

export const VideosViajes = () => {
	const [videos, setVideos] = useState<Video[]>([])

	useEffect(() => {
		consultarVideos()
	}, [])

	const consultarVideos = async () => {
		try {
			const { data } = await api.get('/tripsvideo')
			setVideos(data.videos)
		} catch (error) {
			setVideos(videosPreLoadingViajes)
		}
	}
	return (
		<Grid
			container
			spacing={2}
			marginBottom={5}
			className="padding_left90 padding_right90"
		>
			<Grid item md={8} xs={12}>
				<Grid container spacing={2}>
					{videos.map((video) => (
						<Grid item md={6} xs={12} key={video._id}>
							<CardVideoViajes url={video.url} />
						</Grid>
					))}
				</Grid>
			</Grid>
			<Grid item md={4} xs={12}>
				<Grid container spacing={2}>
					<Grid item md={12} xs={12}>
						{/* <Grid height={'70%'}> */}
						<CardVideoViajes
							url={'https://www.youtube.com/watch?v=FmX-iJfg7eU&t=102s'}
						/>
					</Grid>
					<Grid item md={12} xs={12}>
						<CardVideoViajes
							url={'https://www.youtube.com/watch?v=7z41H58GgEY&t=586s'}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}
