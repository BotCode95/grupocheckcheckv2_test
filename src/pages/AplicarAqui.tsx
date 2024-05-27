import { useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/navbar/Navbar'
import { Footer } from '../components/UI/Footer'
import background from '../assets/bg.png'
import emailjs from 'emailjs-com'
import { Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

import {
	Grid,
	TextField,
	Button,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Box,
} from '@mui/material'
import Swal from 'sweetalert2'
import { Spinner } from '../components/dashboard/Spinner/Spinner'

interface FormState {
	name: string
	lastName: string
	email: string
	countryResidence: string
	xpPoker: string
	hsWeeks: string
	dispCoachig: string
	previousStable: string
}

const initialFormState: FormState = {
	name: '',
	lastName: '',
	email: '',
	countryResidence: '',
	xpPoker: '',
	hsWeeks: '0',
	dispCoachig: 'no',
	previousStable: 'no',
}

export const AplicarAqui = () => {
	const [t] = useTranslation('global')
	const [formState, setFormState] = useState<FormState>(initialFormState)
	const history = useNavigate()

	const [sendData, setSendData] = useState<boolean>(false)

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setFormState((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleSelectChangeStable = (event: any) => {
		const value = event.target.value as string

		setFormState((prevState) => ({
			...prevState,
			previousStable: value,
		}))
	}

	const handleSelectChangeCoaching = (event: any) => {
		const value = event.target.value as string
		setFormState((prevState) => ({
			...prevState,
			dispCoachig: value,
		}))
	}

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		sendEmail()
	}
	const sendEmail = async () => {
		setSendData(true)
		const state: Record<string, unknown> = {
			name: formState.name,
			lastName: formState.lastName,
			email: formState.email,
			countryResidence: formState.countryResidence,
			hsWeeks: formState.hsWeeks,
			xpPoker: formState.xpPoker,
			dispCoachig: formState.dispCoachig,
			previousStable: formState.previousStable,
		}
		try {
			const templateEmail = t('contact.isEnglish')
				? process.env.REACT_APP_EMAILJS_TEMPLATEID_ENGLISH
				: process.env.REACT_APP_EMAILJS_TEMPLATEID
			const response = await emailjs.send(
				process.env.REACT_APP_EMAILJS_SERVICEID ?? '',
				templateEmail ?? '',
				state,
				process.env.REACT_APP_EMAILJS_USERID ?? ''
			)
			Swal.fire({
				title: 'Email enviado correctamente',
				icon: 'success',
				confirmButtonText: 'OK',
			}).then((result) => {
				if (result.isConfirmed) {
					history('/')
				}
			})
			setFormState(initialFormState)
			setSendData(false)
		} catch (error) {
			Swal.fire({
				title: 'Algo fallo en el envió del email',
				text: 'Podes contactarnos directamente a grupocheckcheck@gmail.com',
				icon: 'error',
				confirmButtonText: 'OK',
			})
			setSendData(false)
		}
	}
	return (
		<div
			style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}
		>
			<Navbar />
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					maxWidth: '90%',
					backgroundColor: '#7E0B10',
					borderRadius: 10,
					margin: 'auto',
					marginBottom: 4,
				}}
			>
				<Grid
					sx={{
						padding: '24px',
						minWidth: '320px',
						width: '80%',
						backgroundColor: '#7E0B10',
					}}
				>
					<Typography variant="h3" textAlign={'center'} color={'white'}>
						{t('contact.title')}
					</Typography>
					<Typography
						variant="h6"
						textAlign={'center'}
						color={'white'}
						margin={5}
					>
						{t('contact.description')}
					</Typography>
					<form onSubmit={handleSubmit}>
						<Grid
							container
							display={'flex'}
							justifyContent={'center'}
							alignItems={'center'}
						>
							<Grid container display={'flex'} justifyContent={'center'}>
								<Grid
									item
									xs={12}
									md={6}
									sx={{
										marginY: '10px',
										paddingX: '5px',
										'& .MuiInputBase-input': {
											color: 'white',
										},
										'& .MuiInputBase-input:hover': {
											color: 'white',
										},
										'& .MuiInputBase-input:active': {
											backgroundColor: '#7E0B10',
											color: 'white',
										},
										'& .MuiInputBase-input:focus': {
											backgroundColor: '#7E0B10',
											color: 'white',
										},
										'& .MuiFormLabel-root': {
											color: 'white',
										},
										'& .MuiFormLabel-root:hover': {
											color: 'white !important',
										},
										'& .MuiFormLabel-root:active': {
											color: 'white !important',
										},
										'& .MuiFormLabel-root:focus': {
											color: 'white !important',
										},
										'& .Mui-focused': {
											color: 'white',
										},
									}}
								>
									<TextField
										name="name"
										label={t('contact.name')}
										value={formState.name}
										onChange={handleInputChange}
										required
										fullWidth
										autoComplete="off"
									/>
								</Grid>
								<Grid
									item
									xs={12}
									md={6}
									sx={{
										marginY: '10px',
										paddingX: '5px',
										'& .MuiInputBase-input': {
											color: 'white',
										},
										'& .MuiInputBase-input:hover': {
											color: 'white',
										},
										'& .MuiFormLabel-root': {
											color: 'white',
										},
										'& .MuiFormLabel-root:hover': {
											color: 'white',
										},
										'& .MuiFormLabel-root:active': {
											color: 'white',
										},
										'& .MuiFormLabel-root:focus': {
											color: 'white',
										},
										'& .MuiInputBase-input:active': {
											backgroundColor: '#7E0B10',
											color: 'white',
										},
										'& .MuiInputBase-input:focus': {
											backgroundColor: '#7E0B10',
											color: 'white',
										},
									}}
								>
									<TextField
										name="lastName"
										label={t('contact.lastName')}
										value={formState.lastName}
										onChange={handleInputChange}
										required
										fullWidth
										autoComplete="off"
									/>
								</Grid>
							</Grid>
							<Grid
								item
								xs={12}
								sx={{
									marginY: '10px',
									paddingX: '5px',
									'& .MuiInputBase-input': {
										color: 'white',
									},
									'& .MuiInputBase-input:hover': {
										color: 'white',
									},
									'& .MuiFormLabel-root': {
										color: 'white',
									},
									'& .MuiFormLabel-root:hover': {
										color: 'white',
									},
									'& .MuiFormLabel-root:active': {
										color: 'white',
									},
									'& .MuiFormLabel-root:focus': {
										color: 'white',
									},
									'& .MuiInputBase-input:active': {
										backgroundColor: '#7E0B10',
										color: 'white',
									},
									'& .MuiInputBase-input:focus': {
										backgroundColor: '#7E0B10',
										color: 'white',
									},
								}}
								display={'flex'}
								justifyContent={'center'}
							>
								<TextField
									name="email"
									label={t('contact.email')}
									value={formState.email}
									onChange={handleInputChange}
									required
									fullWidth
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sx={{
									marginY: '10px',
									paddingX: '5px',
									'& .MuiInputBase-input': {
										color: 'white',
									},
									'& .MuiInputBase-input:hover': {
										color: 'white',
									},
									'& .MuiFormLabel-root': {
										color: 'white',
									},
									'& .MuiFormLabel-root:hover': {
										color: 'white',
									},
									'& .MuiFormLabel-root:active': {
										color: 'white',
									},
									'& .MuiFormLabel-root:focus': {
										color: 'white',
									},
									'& .MuiInputBase-input:active': {
										backgroundColor: '#7E0B10',
										color: 'white',
									},
									'& .MuiInputBase-input:focus': {
										backgroundColor: '#7E0B10',
										color: 'white',
									},
								}}
								display={'flex'}
								justifyContent={'center'}
							>
								<TextField
									name="countryResidence"
									label={t('contact.countryResidence')}
									value={formState.countryResidence}
									onChange={handleInputChange}
									required
									fullWidth
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sx={{
									marginY: '10px',
									paddingX: '5px',
									'& .MuiInputBase-input': {
										color: 'white',
									},
									'& .MuiInputBase-input:hover': {
										color: 'white',
									},
									'& .MuiFormLabel-root': {
										color: 'white',
									},
									'& .MuiFormLabel-root:hover': {
										color: 'white',
									},
									'& .MuiFormLabel-root:active': {
										color: 'white',
									},
									'& .MuiFormLabel-root:focus': {
										color: 'white',
									},
									'& .MuiInputBase-input:active': {
										backgroundColor: '#7E0B10',
										color: 'white',
									},
									'& .MuiInputBase-input:focus': {
										backgroundColor: '#7E0B10',
										color: 'white',
									},
								}}
								display={'flex'}
								justifyContent={'center'}
							>
								{' '}
								<TextField
									name="xpPoker"
									label={t('contact.xpPoker')}
									value={formState.xpPoker}
									multiline
									rows={5}
									onChange={handleInputChange}
									required
									fullWidth
								/>
							</Grid>
							<Grid
								item
								xs={12}
								sx={{
									marginY: '10px',
									paddingX: '5px',
									'& .MuiInputBase-input': {
										color: 'white',
									},
									'& .MuiInputBase-input:hover': {
										color: 'white',
									},
									'& .MuiFormLabel-root': {
										color: 'white',
									},
									'& .MuiFormLabel-root:hover': {
										color: 'white',
									},
									'& .MuiFormLabel-root:active': {
										color: 'white',
									},
									'& .MuiFormLabel-root:focus': {
										color: 'white',
									},
									'& .MuiInputBase-input:active': {
										backgroundColor: '#7E0B10',
										color: 'white',
									},
									'& .MuiInputBase-input:focus': {
										backgroundColor: '#7E0B10',
										color: 'white',
									},
								}}
							>
								{' '}
								<TextField
									type="text"
									name="hsWeeks"
									label={t('contact.hsWeeks')}
									value={formState.hsWeeks}
									onChange={handleInputChange}
									required
									fullWidth
								/>
							</Grid>
							<Grid container paddingBottom={'20px'}>
								<Grid
									item
									xs={12}
									md={6}
									sx={{
										marginY: '10px',
										paddingX: '5px',
										'& .MuiInputBase-input': {
											color: 'white',
										},
										'& .MuiInputBase-input:hover': {
											color: 'white',
										},
										'& .MuiFormLabel-root': {
											color: 'white',
										},
										'& .MuiFormLabel-root:hover': {
											color: 'white',
										},
										'& .MuiFormLabel-root:active': {
											color: 'white',
										},
										'& .MuiFormLabel-root:focus': {
											color: 'white',
										},
										'& .MuiInputBase-input:active': {
											backgroundColor: '#7E0B10',
											color: 'white',
										},
										'& .MuiInputBase-input:focus': {
											backgroundColor: '#7E0B10',
											color: 'white',
										},
									}}
								>
									<FormControl fullWidth>
										<InputLabel>{t('contact.dispCoachig')}</InputLabel>
										<Select
											name="dispCoachig"
											value={formState.dispCoachig}
											onChange={handleSelectChangeCoaching}
											required
											fullWidth
											displayEmpty
											variant="standard"
										>
											<MenuItem value={'si'}>{t('contact.isTrue')}</MenuItem>
											<MenuItem value={'no'}>No</MenuItem>
										</Select>
									</FormControl>
								</Grid>
								<Grid
									item
									xs={12}
									md={6}
									sx={{
										marginY: '10px',
										paddingX: '5px',
										'& .MuiInputBase-input': {
											color: 'white',
										},
										'& .MuiFormLabel-root': {
											color: 'white',
										},
										'& .MuiFormLabel-root:hover': {
											color: 'white',
										},
									}}
								>
									{' '}
									<FormControl fullWidth>
										<InputLabel>{t('contact.previousStable')}</InputLabel>
										<Select
											name="previousStable"
											value={formState.previousStable}
											onChange={handleSelectChangeStable}
											required
											fullWidth
											variant="standard"
										>
											<MenuItem value={'si'}>{t('contact.isTrue')}</MenuItem>
											<MenuItem value={'no'}>No</MenuItem>
										</Select>
									</FormControl>
								</Grid>
							</Grid>
							<Grid item xs={12} md={6}>
								<Button
									type="submit"
									variant="contained"
									fullWidth
									color="error"
									disabled={sendData}
								>
									{sendData ? (
										<Spinner height="30" />
									) : (
										<span>{t('contact.buttonSend')}</span>
									)}
								</Button>
							</Grid>
						</Grid>
					</form>
				</Grid>
			</Box>
			<Footer />
		</div>
	)
}
