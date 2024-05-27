import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Box, Grid } from '@mui/material'
import { TituloSeccion } from '../../UI/Titulos/TituloSeccion'
import { ButtonSave } from '../Buttons/ButtonSave'
import { ButtonDelete } from '../Buttons/ButtonDelete'
import { ButtonUpdate } from '../Buttons/ButtonUpdate'
import api from '../../../api/api'
import { Video } from '../../../types/latestvideos'
import Swal from 'sweetalert2'
import { InputVideo } from '../Inputs/InputVideo'
import { ButtonDeleteInput } from '../Buttons/ButtonDeleteInput'
import { ButtonAddInput } from '../Buttons/ButtonAddInput'
import { Spinner } from '../Spinner/Spinner'
import styles from '../dashboard.module.css'

export const InterviewsDashboard = () => {
	const [videos, setVideos] = useState<Video[]>([])
	const [videosInitials, setVideosInitials] = useState<Video[]>([])
	const [updateLatestVideos, setUpdateLatestVideos] = useState(false)
	const [loaded, setLoaded] = useState(false)
	const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
		const arrVideos = videos.map((item, i) => {
			if (index === i) {
				return {
					...item,
					url: e.target.value,
				}
			} else {
				return item
			}
		})

		setVideos(arrVideos)
	}

	const activeUpdateVideos = () => {
		getInterviewsVideos()

		setUpdateLatestVideos(true)
	}

	const getInterviewsVideos = async () => {
		try {
			const { data } = await api.get('/interviewsvideo')
			setVideos(data.videos)
			setVideosInitials(data.videos)
			setLoaded(true)
		} catch (error) {
			console.log(error)
		}
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoaded(false)
		if (videosInitials.length > videos.length) {
			deleteVideoApi()
		} else {
			updateinterviewsVideosApi()
		}
		setLoaded(true)
		setTimeout(() => {
			setUpdateLatestVideos(false)
		}, 1000)
	}

	const deleteVideoApi = () => {
		const videosDelete = videosInitials.filter(
			(video, index) => video._id !== videos[index]?._id
		)
		videosDelete.map((video) => {
			api
				.delete(`interviewsvideo/${video._id}`)
				.then((response) => {
					console.log(response)
				})
				.catch((error) => {
					console.log(error)
				})
		})
	}

	const updateinterviewsVideosApi = async () => {
		videos.map((video, index) => {
			if (video._id.length > 2) {
				api
					.put(`/interviewsvideo/${video._id}`, video)
					.then(function (response) {
						if (response.status === 200 && index + 1 === videos.length) {
							Swal.fire(
								'Se actualizaron los links de los videos',
								'se vera reflejado en la web en unos segundos.',
								'success'
							)
						}
					})
					.catch(function (error) {
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'Hubo un fallo en la actualización!',
							footer: 'comunicate con tu administrador',
						})
					})
			} else {
				createVideoApi(video, index)
			}
		})
	}

	const createVideoApi = (video: Video, index: number) => {
		api
			.post('/interviewsvideo', video)
			.then(function (response) {
				if (response.status === 200 && index + 1 === videos.length) {
					Swal.fire(
						'Se crearon los links de los videos nuevos',
						'se vera reflejado en la web en unos segundos.',
						'success'
					)
				}
				setLoaded(true)
			})
			.catch(function (error) {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Hubo un fallo en la actualización!',
					footer: 'comunicate con tu administrador',
				})
				setLoaded(true)
			})
	}

	const addVideo = () => {
		setVideos([...videos, { url: '', _id: videos.length.toString() }])
	}

	const deleteVideo = () => {
		setVideos(
			videos.filter((video) => video._id !== videos[videos.length - 1]._id)
		)
	}
	return (
		<Grid
			item
			xs={12}
			md={8}
			display={'flex'}
			flexDirection={'column'}
			justifyContent={'center'}
			alignItems={'center'}
			sx={{ marginTop: 5, minHeight: '400px' }}
		>
			{updateLatestVideos ? (
				loaded ? (
					<div className={styles.containerEditVideosLink}>
						<TituloSeccion titulo="Página Entrevistas" variant={'h3'} />
						<Box
							component="form"
							sx={{
								'& .MuiTextField-root': { m: 1, width: '70ch' },
							}}
							noValidate
							autoComplete="off"
							display={'flex'}
							justifyContent={'center'}
							flexDirection={'column'}
							onSubmit={handleSubmit}
						>
							{videos.map((video, index) => (
								<div key={video._id}>
									<InputVideo
										value={video.url}
										index={index}
										label={'URL Video ' + (index + 1)}
										handleChange={(e: ChangeEvent<HTMLInputElement>) =>
											handleChange(e, index)
										}
									/>
								</div>
							))}
							{videos.length ? (
								<>
									<Grid
										item
										display={'flex'}
										justifyContent={'flex-end'}
										alignItems={'flex-end'}
										style={{ margin: 5 }}
									>
										<ButtonAddInput
											title={'Agregar video'}
											onClick={addVideo}
										/>
										<ButtonDeleteInput onClick={deleteVideo} />
									</Grid>

									<Grid
										display={'flex'}
										justifyContent={'flex-end'}
										alignItems={'flex-end'}
										style={{ margin: 5 }}
									>
										<ButtonSave color={'info'} title="Guardar" />
										<ButtonDelete
											color={'error'}
											title="Cancelar"
											onClick={() => setUpdateLatestVideos(false)}
										/>
									</Grid>
								</>
							) : (
								<>
									<TituloSeccion
										titulo="No hay videos en esta sección"
										variant="body1"
									/>
									<ButtonAddInput title={'Agregar video'} onClick={addVideo} />
								</>
							)}
						</Box>
					</div>
				) : (
					<Spinner />
				)
			) : (
				<ButtonUpdate
					variant={'contained'}
					color={'info'}
					text={'¿Desea Actualizar los Videos? - Página Entrevistas'}
					onClick={activeUpdateVideos}
				/>
			)}
		</Grid>
	)
}
