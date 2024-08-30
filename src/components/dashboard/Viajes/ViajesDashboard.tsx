import { ChangeEvent, FormEvent, useState, useContext, useEffect } from 'react'
import { TextsContext } from '../../../context/Dashboard/Texts/TextsContext'
import { InputVideo } from '../Inputs/InputVideo'
import { Box, Grid, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import { TituloSeccion } from '../../UI/Titulos/TituloSeccion'
import { ButtonSave } from '../Buttons/ButtonSave'
import { ButtonDelete } from '../Buttons/ButtonDelete'
import { ButtonUpdate } from '../Buttons/ButtonUpdate'
import api from '../../../api/api'
import { VideoTrips } from '../../../types/latestvideos'
import Swal from 'sweetalert2'
import { ButtonAddInput } from '../Buttons/ButtonAddInput'
import { ButtonDeleteInput } from '../Buttons/ButtonDeleteInput'
import { Spinner } from '../Spinner/Spinner'
import styles from '../dashboard.module.css'

export const ViajesDashboard = () => {
	const [videos, setVideos] = useState<VideoTrips[]>([])
	const [videosInitials, setVideosInitials] = useState<VideoTrips[]>([])
	const [updateLatestVideos, setUpdateLatestVideos] = useState(false)
	const [loaded, setLoaded] = useState(false)
	// const {
	// 	text: { imagesTrips },
	// 	getTextByLanguage,
	// } = useContext(TextsContext)
	// useEffect(() => {
	// 	if (imagesTrips?.length === 0) {
	// 		getTextByLanguage()
	// 	}
	// }, [])

	const activeUpdateVideos = () => {
		getTripsVideos()

		setUpdateLatestVideos(true)
	}

	const getTripsVideos = async () => {
		try {
			const { data } = await api.get('/tripsvideo')
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
			updatetripsVideosApi()
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
				.delete(`tripsvideo/${video._id}`)
				.then((response) => {
					Swal.fire(
						'Se actualizaron los links de los videos',
						'se vera reflejado en la web en unos segundos.',
						'success'
					)
				})
				.catch((error) => {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Hubo un fallo en la actualización!',
						footer: 'comunicate con tu administrador',
					})
				})
		})
	}

	const updatetripsVideosApi = async () => {
		setLoaded(false)
		videos.map((video, index) => {
			if (video._id.length > 2) {
				api
					.put(`/tripsvideo/${video._id}`, video)
					.then(function (response) {
						if (response.status === 200 && index + 1 === videos.length) {
							Swal.fire(
								'Se actualizaron los links de los videos',
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
			} else {
				createVideoApi(video, index)
			}
		})
	}

	const createVideoApi = (video: VideoTrips, index: number) => {
		api
			.post('/tripsvideo', video)
			.then(function (response) {
				if (response.status === 200 && index + 1 === videos.length) {
					Swal.fire(
						'Se crearon los links de los videos nuevos',
						'se vere reflejado en la web en unos segundos.',
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
	}

	const addVideo = () => {
		setVideos([...videos, { url: '', city: '', _id: videos.length.toString() }])
	}

	const deleteVideo = () => {
		setVideos(
			videos.filter((video) => video._id !== videos[videos.length - 1]._id)
		)
	}

	const handleCityChange = (e: SelectChangeEvent<string>, index: number) => {
		const newVideos = [...videos]
		newVideos[index].city = e.target.value
		setVideos(newVideos)
	}

	const handleUrlChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
		const newVideos = [...videos]
		newVideos[index].url = e.target.value
		setVideos(newVideos)
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
						<TituloSeccion titulo="Página Viajes" variant={'h3'} />
						{/* <Box
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
								<Grid
									container
									key={video._id}
									display={'flex'}
									alignItems={'center'}
								>
									<Grid item xs={8}>
										<InputVideo
											value={video.url}
											index={index}
											label={'URL Video ' + (index + 1)}
											handleChange={(e: ChangeEvent<HTMLInputElement>) =>
												handleUrlChange(e, index)
											}
										/>
									</Grid>
									<Grid item xs={4}>
										<Select
											id={`city-${video.url}`}
											defaultValue={imagesTrips[0].title ?? ''}
											value={video.city}
											onChange={(e) => handleCityChange(e, index)}
											fullWidth
											sx={{ backgroundColor: '#fdc8c8fc' }}
										>
											{imagesTrips?.map((trip, i) => (
												<MenuItem key={i} value={trip.title}>
													{trip.title}
												</MenuItem>
											))}
										</Select>
									</Grid>
								</Grid>
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
										item
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
						</Box> */}
					</div>
				) : (
					<Spinner />
				)
			) : (
				<ButtonUpdate
					variant={'contained'}
					color={'info'}
					text={'¿Desea Actualizar los Videos? - Página Viajes'}
					onClick={activeUpdateVideos}
				/>
			)}
		</Grid>
	)
}
