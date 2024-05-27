import { ChangeEvent, FormEvent, useState } from 'react'
import { InputVideo } from '../Inputs/InputVideo'
import { Box, Grid } from '@mui/material'
import { TituloSeccion } from '../../UI/Titulos/TituloSeccion'
import { ButtonUpdate } from '../Buttons/ButtonUpdate'
import api from '../../../api/api'
import Swal from 'sweetalert2'
import { ButtonSave } from '../Buttons/ButtonSave'
import { ButtonDelete } from '../Buttons/ButtonDelete'
import { Video } from '../../../types/latestvideos'
import { Spinner } from '../Spinner/Spinner'
import styles from '../dashboard.module.css'

export const LatestVideosUpdate = () => {
	const [updateLatestVideos, setUpdateLatestVideos] = useState(false)
	const [loading, setLoading] = useState(false)
	const [videos, setVideos] = useState<Video[]>([])
	const activeUpdateVideos = () => {
		getLatestVideos()
		setUpdateLatestVideos(true)
	}

	const getLatestVideos = async () => {
		try {
			const { data } = await api.get('/latestvideo')
			setVideos(data.videos)
			setLoading(true)
		} catch (error) {
			setLoading(true)
		}
	}

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

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(false)
		updateLatestVideosApi()
		setLoading(true)
		setTimeout(() => {
			setUpdateLatestVideos(false)
		}, 1000)
	}

	const updateLatestVideosApi = async () => {
		videos.map((video, index) => {
			api
				.put(`/latestvideo/${video._id}`, video)
				.then(function (response) {
					if (response.status === 200 && index + 1 === videos.length) {
						Swal.fire(
							'Se actualizaron los links de los últimos videos',
							'se vera reflejado en la web en unos segundos.',
							'success'
						)
					}
				})
				.catch((error: any) => {
					Swal.fire({
						icon: 'error',
						title: 'Oops...',
						text: 'Hubo un fallo en la actualización!',
						footer: 'comunicate con tu administrador',
					})
				})
		})
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
			sx={{ marginTop: 5 }}
			className={styles.containerVideos}
		>
			{updateLatestVideos ? (
				loading ? (
					<div className={styles.containerEditVideosLink}>
						<TituloSeccion titulo="Últimos Videos" variant={'h3'} />
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
										handleChange={(e: ChangeEvent<HTMLInputElement>) =>
											handleChange(e, index)
										}
									/>
								</div>
							))}
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
						</Box>
					</div>
				) : (
					<Spinner />
				)
			) : (
				<ButtonUpdate
					variant={'contained'}
					color={'info'}
					text={'¿Desea Actualizar los Últimos Videos?'}
					onClick={activeUpdateVideos}
				/>
			)}
		</Grid>
	)
}
