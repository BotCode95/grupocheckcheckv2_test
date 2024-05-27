import { Grid, Button } from '@mui/material'
import { TituloSeccion } from '../UI/Titulos/TituloSeccion'
import { VideoYT } from '../Videos/VideoYT'
import { useTranslation } from 'react-i18next'
import { useState, useEffect } from 'react'
import api from '../../api/api'
import { Video } from '../../types/latestvideos'

const videosPreLoading: Video[] = [
	{
		_id: '0',
		url: 'https://www.youtube.com/watch?v=BpSnusylWcw&ab_channel=GrupoCheckCheck',
	},
	{
		_id: '1',
		url: 'https://www.youtube.com/watch?v=jxPawT3zE9Y&ab_channel=GrupoCheckCheck',
	},
	{
		_id: '2',
		url: 'https://www.youtube.com/watch?v=ryx9io-2lKM&ab_channel=GrupoCheckCheck',
	},
]

export const UltimosVideos = () => {
	const [t] = useTranslation('global')

	const [videos, setVideos] = useState<Video[]>([])

	useEffect(() => {
		consultarVideos()
	}, [])

	const consultarVideos = async () => {
		try {
			const { data } = await api.get('/latestvideo')
			setVideos(data.videos)
		} catch (error) {
			setVideos(videosPreLoading)
		}
	}
	return (
		<div
			style={{
				backgroundColor: 'black',
				paddingBottom: '1rem',
			}}
		>
			<Grid
				container
				spacing={2}
				marginTop={5}
				display={'flex'}
				justifyContent="center"
				alignItems={'center'}
				className="padding_left90"
			>
				<Grid item xs={7} md={9}>
					<TituloSeccion
						titulo={t('latest_videos.title')}
						variant={'body1'}
						fontWeigth={'bold'}
					/>
				</Grid>
				<Grid item xs={5} md={3}>
					<Button
						variant="contained"
						size={'large'}
						className="boton_color_primary"
						style={{ borderRadius: '10px' }}
					>
						<a
							href="https://www.youtube.com/channel/UC6B_Q2labPyTD1iXEAG1DeA?sub_confirmation=1"
							style={{ textDecoration: 'none', color: 'white' }}
							target="_blank"
							rel="noreferrer"
						>
							{t('latest_videos.buttonsuscribe')}
						</a>
					</Button>
				</Grid>
			</Grid>
			<Grid
				container
				spacing={2}
				paddingY={5}
				display={'flex'}
				justifyContent="center"
				alignItems={'center'}
				className="padding_left90 padding_right90"
			>
				{videos.map((video) => (
					<Grid
						item
						xs={12}
						md={4}
						className="card_ultimos_videos"
						key={video._id}
					>
						<VideoYT url={video.url} />
					</Grid>
				))}
			</Grid>
		</div>
	)
}
