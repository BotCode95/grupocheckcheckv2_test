import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { NavbarDashboard } from './NavbarDashboard'
import {
	Divider,
	Grid,
	Typography,
	FormControlLabel,
	Switch,
} from '@mui/material'
import styles from './dashboardpages.module.css'
import { InputText } from '../../components/dashboard/Inputs/InputText'
import { TitleEdit } from '../../components/dashboard/Titles/TitleEdit'
import { InputTextArea } from '../../components/dashboard/Inputs/InputTextArea'
import { ButtonSave } from '../../components/dashboard/Buttons/ButtonSave'
import { ButtonDelete } from '../../components/dashboard/Buttons/ButtonDelete'
import { useContext } from 'react'
import { TextsContext } from '../../context/Dashboard/Texts'
import { TitlePlayerEdit } from '../../components/dashboard/Titles/TitlePlayerEdit'
import { IText, IPlayer, Trips } from '../../types/texts'
import { ButtonAddInput } from '../../components/dashboard/Buttons/ButtonAddInput'
import { ButtonDeleteInput } from '../../components/dashboard/Buttons/ButtonDeleteInput'

export const TextsEdit = () => {
	const { text, language, updateTexts, getTextByLanguage, setLanguage } =
		useContext(TextsContext)
	const [texts, setTexts] = useState<IText>(text)
	const [isDeleteButtonDisabled, setIsDeleteButtonDisabled] = useState(true)
	const [updateText, setUpdateTexts] = useState(true)
	useEffect(() => {
		getTextByLanguage(language)
	}, [language])

	useEffect(() => {
		if (text) {
			setTexts(text)
		}
	}, [text])

	const updateTextByLanguage = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const id = text?._id ?? ''
		updateTexts(id, texts)
		setLanguage('es')
	}

	const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setTexts({ ...texts, [e.target.name]: e.target.value })
	}

	const onChangePlayers = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		playername: string
	) => {
		setTexts((prevState) => ({
			...prevState,
			players: prevState.players.map((el: IPlayer) => {
				return el.player_name === playername
					? { ...el, [e.target.name]: e.target.value }
					: el
			}),
		}))
	}

	const onChangetrips = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		id = Date.now().toString()
	) => {
		setTexts((prevState) => ({
			...prevState,
			imagesTrips: prevState.imagesTrips?.map((el: Trips) => {
				return el.id === id ? { ...el, [e.target.name]: e.target.value } : el
			}),
		}))
	}

	const addTrip = () => {
		setTexts((prevState) => ({
			...prevState,
			imagesTrips: [
				...(prevState.imagesTrips ?? []),
				{ id: Date.now().toString(), title: '', image: '' },
			],
		}))

		setIsDeleteButtonDisabled(false)
	}

	const deleteVideo = () => {
		setTexts((prevState) => ({
			...prevState,
			imagesTrips: prevState?.imagesTrips!.slice(0, -1),
		}))
		if (texts.imagesTrips?.length === 2) {
			setIsDeleteButtonDisabled(true)
		}
	}
	return (
		<div style={{ color: 'white' }}>
			<NavbarDashboard />
			<Divider className={styles.divider} variant="middle" />

			{texts && (
				<form onSubmit={updateTextByLanguage}>
					<Grid container className={styles.container_texts}>
						<Grid
							item
							xs={12}
							display={'flex'}
							flexDirection={'column'}
							alignItems={'center'}
							justifyContent={'flex-start'}
						>
							<Typography
								variant={'body1'}
								className={`${styles.text_titles} ${styles.text_administrador}`}
								sx={{
									fontSize: {
										md: 28,
										sm: 28,
										xs: 22,
									},
								}}
							>
								Administrador Web
							</Typography>
							<FormControlLabel
								value={language}
								control={<Switch color="info" />}
								label={language === 'en' ? 'EN' : 'ES'}
								onChange={() => setLanguage(language === 'en' ? 'es' : 'en')}
								labelPlacement={language === 'en' ? 'end' : 'start'}
							/>

							<Typography
								variant={'body1'}
								className={`${styles.text_titles} ${styles.text_subtitle}`}
								sx={{
									fontSize: {
										md: 22,
										sm: 22,
										xs: 18,
									},
								}}
							>
								EDITAR TEXTOS
							</Typography>
						</Grid>
						<Grid container marginLeft={'3rem'} marginRight={'3rem'}>
							<Grid item xs={12} md={6} className={styles.grid_column}>
								<TitleEdit title={'home'} classname={styles.text_titles_edit} />
								<InputText
									classname={styles.input_text}
									placeholder={'home'}
									name="home"
									value={texts?.home}
									onChange={onChange}
								/>
							</Grid>
							<Grid item xs={12} md={6} className={styles.grid_column}>
								<TitleEdit
									title={'acerca de nosotros'}
									classname={styles.text_titles_edit}
								/>
								<InputText
									classname={styles.input_text}
									placeholder={'acerca de nosotros'}
									name="us"
									value={texts?.us}
									onChange={onChange}
								/>
							</Grid>
							<Grid item xs={12} md={12} className={styles.grid_column12}>
								<TitleEdit
									title={'nosotros'}
									classname={styles.text_titles_edit}
								/>
								<InputTextArea
									classname={`${styles.input_text} ${styles.textarea}  ${styles.textareaUS}`}
									placeholder={'about us'}
									value={texts?.about_us}
									name="about_us"
									onChange={onChange}
								/>
							</Grid>
							<TitleEdit
								title={'Viajes'}
								classname={`${styles.text_titles_edit} ${styles.text_title_edit_player}`}
							/>
							{texts.imagesTrips?.map((trip, index) => (
								<Grid container key={index}>
									<Grid item xs={12} md={12} className={styles.grid_column}>
										<Grid container>
											<Grid
												item
												md={6}
												display={'flex'}
												justifyContent={'center'}
											>
												<InputText
													classname={styles.input_text}
													placeholder={'nombre viaje'}
													name="title"
													value={trip.title}
													onChange={(e) => onChangetrips(e, trip.id)}
												/>
											</Grid>
											<Grid
												item
												md={6}
												display={'flex'}
												justifyContent={'flex-start'}
											>
												<InputText
													classname={`${styles.input_text} ${styles.input_url}`}
													placeholder={'Imagen'}
													name="image"
													value={trip.image}
													onChange={(e) => onChangetrips(e, trip.id)}
												/>
											</Grid>
										</Grid>
									</Grid>
								</Grid>
							))}
							<Grid
								item
								xs={12}
								display={'flex'}
								justifyContent={'flex-end'}
								paddingRight={'5rem'}
							>
								<ButtonAddInput title={'Agregar video'} onClick={addTrip} />
								<ButtonDeleteInput
									onClick={deleteVideo}
									disabled={isDeleteButtonDisabled}
								/>
							</Grid>

							<Grid container>
								<TitleEdit
									title={'jugadores'}
									classname={`${styles.text_titles_edit} ${styles.text_title_edit_player}`}
								/>
								{texts?.players.map((player, index) => (
									<Grid
										item
										xs={12}
										md={6}
										key={index}
										className={styles.players}
									>
										<Typography
											variant="body1"
											style={{
												textAlign: 'left',
												color: 'white',
												fontWeight: 700,
											}}
										>
											Jugador {index + 1}
										</Typography>
										<div className={styles.player}>
											<TitlePlayerEdit
												title={'Nombre'}
												classname={`${styles.text_titles_edit} ${styles.text_titles_player_edit}`}
											/>
											<InputText
												classname={styles.input_text}
												placeholder={''}
												value={player.player_name}
												name="player_name"
												onChange={(e) => onChangePlayers(e, player.player_name)}
											/>
											<TitlePlayerEdit
												title={'Descripción'}
												classname={`${styles.text_titles_edit} ${styles.text_titles_player_edit}`}
											/>
											<InputTextArea
												classname={`${styles.input_text} ${styles.textarea}`}
												placeholder={'coach team'}
												value={player.description}
												name="description"
												onChange={(e) => onChangePlayers(e, player.player_name)}
											/>
											<TitlePlayerEdit
												title={'Tipo de Juego'}
												classname={`${styles.text_titles_edit} ${styles.text_titles_player_edit}`}
											/>
											<InputText
												classname={styles.input_text}
												placeholder={''}
												value={player.type_of_game}
												name="type_of_game"
												onChange={(e) => onChangePlayers(e, player.player_name)}
											/>
											<TitlePlayerEdit
												title={'Valores de Juego'}
												classname={`${styles.text_titles_edit} ${styles.text_titles_player_edit}`}
											/>
											<InputText
												classname={styles.input_text}
												placeholder={''}
												value={player.values_game}
												name="values_game"
												onChange={(e) => onChangePlayers(e, player.player_name)}
											/>
											<TitlePlayerEdit
												title={'Coach'}
												classname={`${styles.text_titles_edit} ${styles.text_titles_player_edit}`}
											/>
											<InputText
												classname={styles.input_text}
												placeholder={''}
												value={player.coach}
												name="coach"
												onChange={(e) => onChangePlayers(e, player.player_name)}
											/>
											<TitlePlayerEdit
												title={'Especialidades'}
												classname={`${styles.text_titles_edit} ${styles.text_titles_player_edit}`}
											/>
											<InputText
												classname={styles.input_text}
												placeholder={''}
												value={player.coach_especialities}
												name="especialities"
												onChange={(e) => onChangePlayers(e, player.player_name)}
											/>
											<TitlePlayerEdit
												title={'Imagen'}
												classname={`${styles.text_titles_edit} ${styles.text_titles_player_edit}`}
											/>
											<InputText
												classname={styles.input_text}
												placeholder={''}
												value={player.image}
												name="image"
												onChange={(e) => onChangePlayers(e, player.player_name)}
											/>
										</div>
										<div style={{ marginBottom: '2rem' }}></div>
									</Grid>
								))}
								{/* <Grid
									item
									xs={12}
									display={'flex'}
									justifyContent={'flex-end'}
									paddingRight={'5rem'}
								>
									<ButtonAddInput title="Agregar Jugador" onClick={addPlayer} />
									<ButtonDeleteInput
										onClick={deletePlayer}
										disabled={isDeleteButtonDisabled}
									/>
								</Grid> */}
								<div style={{ marginBottom: '2rem' }}></div>
							</Grid>
						</Grid>
						<Grid
							item
							display={'flex'}
							justifyContent={'flex-end'}
							alignItems={'flex-end'}
							style={{ margin: 5, width: '100%' }}
						>
							<ButtonDelete
								color={'error'}
								title="Cancelar"
								onClick={() => setUpdateTexts(false)}
							/>
							<ButtonSave color={'info'} title="Guardar" />
						</Grid>
					</Grid>
				</form>
			)}
			<div style={{ marginBottom: '2rem' }}></div>
		</div>
	)
}
