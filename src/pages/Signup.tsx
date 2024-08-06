import { Button, Grid, TextField } from '@mui/material'
import { RedesSociales } from '../components/Banners/RedesSociales'
import { BannerPage } from '../components/UI/BannerPage/BannerPage'
import { Footer } from '../components/UI/Footer'
import { Navbar } from '../components/navbar/Navbar'
import { type ChangeEvent, useState, useMemo } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import { useTranslation } from 'react-i18next'
import { BasicDateField } from '../components/UI/Inputs/BasicDateField'
import { type Dayjs } from 'dayjs'
import { Spinner } from '../components/dashboard/Spinner/Spinner'
import FileUpload from '../components/FileUpload'
import api from '../api/api'
import { type EmailSend } from '../types/texts'

interface FormState {
	fullName: string
	email: string
	countryResidence: string
	hoursDedicate: string
	birthdate: Dayjs | null
	skype: string
	pokerSites: string
	pokerstarUser: string
	winamaxUser: string
	partypokerUser: string
	ggpokerUser: string
	user888: string
	anotherUsers: string
	backed: string
	spinsExperience: string
	hearAboutUs: string,
	files: File[] | null
}

const initialFormState: FormState = {
	fullName: '',
	email: '',
	countryResidence: '',
	hoursDedicate: '',
	birthdate: null,
	skype: '',
	pokerSites: '',
	pokerstarUser: '',
	winamaxUser: '',
	partypokerUser: '',
	ggpokerUser: '',
	user888: '',
	anotherUsers: '',
	backed: '',
	spinsExperience: '',
	hearAboutUs: '',
	files: null
}

export const Signup = () => {
	const [formState, setFormState] = useState<FormState>(initialFormState)
	const [sendingData, setSendingData] = useState<boolean>(false)
	const [t] = useTranslation('global')
	const history = useNavigate()
	const lang = useLanguage()

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		console.log('handleInputChange', name, value)
		setFormState((prevState) => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleBirthdateChange = (birthdate: Dayjs | null) => {
		console.log('handleBirthdateChange', birthdate)
		setFormState((prevState) => ({
			...prevState,
			birthdate
		}))
	}

	const handleFileChange = (files: File[]) => {
		setFormState((prevState) => ({
			...prevState,
			files
		}))
	}

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault()
		sendEmail()
	}

	const sendEmail = async () => {
		setSendingData(true)
		const state: Record<string, unknown> = {
			fullName: formState.fullName,
			email: formState.email,
			countryResidence: formState.countryResidence,
			hoursDedicate: formState.hoursDedicate,
			birthdate: formState.birthdate,
			skype: formState.skype,
			pokerSites: formState.pokerSites,
			pokerstarUser: formState.pokerstarUser,
			winamaxUser: formState.winamaxUser,
			partypokerUser: formState.partypokerUser,
			ggpokerUser: formState.ggpokerUser,
			user888: formState.user888,
			anotherUsers: formState.anotherUsers,
			backed: formState.backed,
			spinsExperience: formState.spinsExperience,
			hearAboutUs: formState.hearAboutUs,
			files: formState.files || []
		}
		// console.log(state)
		// setTimeout(() => {
		// 	setSendingData(false)
		// 	Swal.fire({
		// 		title: t('contact.success') || 'Email enviado correctamente',
		// 		icon: 'success',
		// 		confirmButtonText: 'OK',
		// 	}).then((result) => {
		// 		if (result.isConfirmed) {
		// 			history(`/${lang}`)
		// 		}
		// 	})
		// }, 1000)
		// return
		try {
			await api.post<EmailSend>('/email/send-email', state)
			Swal.fire({
				title: t('contact.success') || 'Email enviado correctamente',
				icon: 'success',
				confirmButtonText: 'OK',
			}).then((result) => {
				if (result.isConfirmed) {
					history(`/${lang}`)
				}
			})
			setFormState(initialFormState)
			setSendingData(false)
		} catch (error) {
			Swal.fire({
				title: t('contact.error.title') || 'Algo fallo en el envió del email',
				text: t('contact.error.message') || 'Podes contactarnos directamente a grupocheckcheck@gmail.com',
				icon: 'error',
				confirmButtonText: 'OK',
			})
			setSendingData(false)
		}
	}

	const isValid = useMemo(() => {
		let valid = true
		
		if(!formState.fullName) valid = false
		if(!formState.birthdate) valid = false
		if(!formState.email) valid = false
		if(!formState.countryResidence) valid = false
		console.log('isValid', valid)
		return valid
	}, [formState])

	return <>
		<Navbar />
		<BannerPage title={t('contact.title')} />
		<div className='signup page_container mt-5 mb-5'>
			<Grid container spacing={2}>
				<Grid item sx={{
					'& .MuiInputBase-input': {
						color: 'white',
					},
					'& .MuiInputBase-input:hover': {
						color: 'white',
					},
					'& .MuiInputBase-input:active': {
						color: 'white',
					},
					'& .MuiInputBase-input:focus': {
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
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline.Mui-focused': {
						color: 'white',
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: 'white'
					},
				}}
				sm={12}
				md={6}
				>
					<TextField
						name="fullName"
						label={t('contact.form.fullName')}
						value={formState.fullName}
						onChange={handleInputChange}
						required
						fullWidth
						autoComplete="off"
						color="error"
					/>
				</Grid>
				<Grid item sx={{
					'& .MuiInputBase-input': {
						color: 'white',
					},
					'& .MuiInputBase-input:hover': {
						color: 'white',
					},
					'& .MuiInputBase-input:active': {
						color: 'white',
					},
					'& .MuiInputBase-input:focus': {
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
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline.Mui-focused': {
						color: 'white',
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: 'white'
					},
				}}
				sm={12}
				md={3}
				>
					<BasicDateField
						label={t('contact.form.birthdate')}
						onChange={handleBirthdateChange}
						color="error"
						fullWidth
						required
						value={formState.birthdate}
					/>
				</Grid>
				<Grid item sx={{
					'& .MuiInputBase-input': {
						color: 'white',
					},
					'& .MuiInputBase-input:hover': {
						color: 'white',
					},
					'& .MuiInputBase-input:active': {
						color: 'white',
					},
					'& .MuiInputBase-input:focus': {
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
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline.Mui-focused': {
						color: 'white',
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: 'white'
					},
				}}
				sm={12}
				md={3}
				>
					<TextField
						name="countryResidence"
						label={t('contact.form.countryResidence')}
						value={formState.countryResidence}
						onChange={handleInputChange}
						required
						fullWidth
						color="error"
					/>
				</Grid>
				<Grid item sx={{
					'& .MuiInputBase-input': {
						color: 'white',
					},
					'& .MuiInputBase-input:hover': {
						color: 'white',
					},
					'& .MuiInputBase-input:active': {
						color: 'white',
					},
					'& .MuiInputBase-input:focus': {
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
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline.Mui-focused': {
						color: 'white',
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: 'white'
					},
				}}
				sm={12}
				md={6}
				>
					<TextField
						name="email"
						label={t('contact.form.email')}
						value={formState.email}
						onChange={handleInputChange}
						required
						fullWidth
						color="error"
					/>
				</Grid>
				<Grid item sx={{
					'& .MuiInputBase-input': {
						color: 'white',
					},
					'& .MuiInputBase-input:hover': {
						color: 'white',
					},
					'& .MuiInputBase-input:active': {
						color: 'white',
					},
					'& .MuiInputBase-input:focus': {
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
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline.Mui-focused': {
						color: 'white',
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: 'white'
					},
				}}
				sm={12}
				md={6}
				>
					<TextField
						name="skype"
						label={t('contact.form.skype') || 'Skype username'}
						value={formState.skype}
						onChange={handleInputChange}
						fullWidth
						color="error"
					/>
				</Grid>
				<Grid item sx={{
					'& .MuiInputBase-input': {
						color: 'white',
					},
					'& .MuiInputBase-input:hover': {
						color: 'white',
					},
					'& .MuiInputBase-input:active': {
						color: 'white',
					},
					'& .MuiInputBase-input:focus': {
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
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline.Mui-focused': {
						color: 'white',
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: 'white'
					},
				}}
				sm={12}
				>
					<TextField
						name="pokerSites"
						label={t('contact.form.pokerSites') || 'What Poker Sites do you play on?'}
						value={formState.pokerSites}
						onChange={handleInputChange}
						fullWidth
						color="error"
					/>
				</Grid>
				<Grid item sx={{
					'& .MuiInputBase-input': {
						color: 'white',
					},
					'& .MuiInputBase-input:hover': {
						color: 'white',
					},
					'& .MuiInputBase-input:active': {
						color: 'white',
					},
					'& .MuiInputBase-input:focus': {
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
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline.Mui-focused': {
						color: 'white',
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: 'white'
					},
				}}
				sm={12}
				md={4}
				>
					<TextField
						name="pokerstarUser"
						label={t('contact.form.pokerstarUser') || 'Pokerstars Username'}
						value={formState.pokerstarUser}
						onChange={handleInputChange}
						fullWidth
						color="error"
					/>
				</Grid>
				<Grid item sx={{
					'& .MuiInputBase-input': {
						color: 'white',
					},
					'& .MuiInputBase-input:hover': {
						color: 'white',
					},
					'& .MuiInputBase-input:active': {
						color: 'white',
					},
					'& .MuiInputBase-input:focus': {
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
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline.Mui-focused': {
						color: 'white',
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: 'white'
					},
				}}
				sm={12}
				md={4}
				>
					<TextField
						name="winamaxUser"
						label={t('contact.form.winamaxUser') || 'Winamax Username'}
						value={formState.winamaxUser}
						onChange={handleInputChange}
						fullWidth
						color="error"
					/>
				</Grid>
				<Grid item sx={{
					'& .MuiInputBase-input': {
						color: 'white',
					},
					'& .MuiInputBase-input:hover': {
						color: 'white',
					},
					'& .MuiInputBase-input:active': {
						color: 'white',
					},
					'& .MuiInputBase-input:focus': {
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
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline.Mui-focused': {
						color: 'white',
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: 'white'
					},
				}}
				sm={12}
				md={4}
				>
					<TextField
						name="partypokerUser"
						label={t('contact.form.partypokerUser') || 'Partypoker Username'}
						value={formState.partypokerUser}
						onChange={handleInputChange}
						fullWidth
						color="error"
					/>
				</Grid>
				<Grid item sx={{
					'& .MuiInputBase-input': {
						color: 'white',
					},
					'& .MuiInputBase-input:hover': {
						color: 'white',
					},
					'& .MuiInputBase-input:active': {
						color: 'white',
					},
					'& .MuiInputBase-input:focus': {
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
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline.Mui-focused': {
						color: 'white',
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: 'white'
					},
				}}
				sm={12}
				md={6}
				>
					<TextField
						name="ggpokerUser"
						label={t('contact.form.ggpokerUser') || 'GGPoker Username'}
						value={formState.ggpokerUser}
						onChange={handleInputChange}
						fullWidth
						color="error"
					/>
				</Grid>
				<Grid item sx={{
					'& .MuiInputBase-input': {
						color: 'white',
					},
					'& .MuiInputBase-input:hover': {
						color: 'white',
					},
					'& .MuiInputBase-input:active': {
						color: 'white',
					},
					'& .MuiInputBase-input:focus': {
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
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline.Mui-focused': {
						color: 'white',
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: 'white'
					},
				}}
				sm={12}
				md={6}
				>
					<TextField
						name="user888"
						label={t('contact.form.user888') || '888 Username'}
						value={formState.user888}
						onChange={handleInputChange}
						fullWidth
						color="error"
					/>
				</Grid>
				<Grid item sx={{
					'& .MuiInputBase-input': {
						color: 'white',
					},
					'& .MuiInputBase-input:hover': {
						color: 'white',
					},
					'& .MuiInputBase-input:active': {
						color: 'white',
					},
					'& .MuiInputBase-input:focus': {
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
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline.Mui-focused': {
						color: 'white',
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: 'white'
					},
				}}
				sm={12}
				md={6}
				>
					<TextField
						name="anotherUsers"
						label={t('contact.form.anotherUsers') || 'Do you use any other Poker sites/Usernames/Aliases?'}
						value={formState.anotherUsers}
						onChange={handleInputChange}
						fullWidth
						color="error"
					/>
				</Grid>
				<Grid item sx={{
					'& .MuiInputBase-input': {
						color: 'white',
					},
					'& .MuiInputBase-input:hover': {
						color: 'white',
					},
					'& .MuiInputBase-input:active': {
						color: 'white',
					},
					'& .MuiInputBase-input:focus': {
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
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline.Mui-focused': {
						color: 'white',
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: 'white'
					},
				}}
				sm={12}
				md={6}
				>
					<TextField
						name="backed"
						label={t('contact.form.backed') || 'Have you been backed before?'}
						value={formState.backed}
						onChange={handleInputChange}
						fullWidth
						color="error"
					/>
				</Grid>
				<Grid item sx={{
					'& .MuiInputBase-input': {
						color: 'white',
					},
					'& .MuiInputBase-input:hover': {
						color: 'white',
					},
					'& .MuiInputBase-input:active': {
						color: 'white',
					},
					'& .MuiInputBase-input:focus': {
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
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline.Mui-focused': {
						color: 'white',
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: 'white'
					},
				}}
				sm={12}
				>
					<TextField
						name="spinsExperience"
						label={t('contact.form.spinsExperience') || 'Have you been backed before?'}
						value={formState.spinsExperience}
						onChange={handleInputChange}
						multiline
						rows={3}
						fullWidth
						color="error"
					/>
				</Grid>
				<Grid item sx={{
					'& .MuiInputBase-input': {
						color: 'white',
					},
					'& .MuiInputBase-input:hover': {
						color: 'white',
					},
					'& .MuiInputBase-input:active': {
						color: 'white',
					},
					'& .MuiInputBase-input:focus': {
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
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline.Mui-focused': {
						color: 'white',
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: 'white'
					},
				}}
				sm={12}
				md={6}
				>
					<TextField
						name="hoursDedicate"
						label={t('contact.form.hoursDedicate') || 'How many hours a week are you willing to dedicate to playing and studying?'}
						value={formState.hoursDedicate}
						onChange={handleInputChange}
						fullWidth
						color="error"
					/>
				</Grid>
				<Grid item sx={{
					'& .MuiInputBase-input': {
						color: 'white',
					},
					'& .MuiInputBase-input:hover': {
						color: 'white',
					},
					'& .MuiInputBase-input:active': {
						color: 'white',
					},
					'& .MuiInputBase-input:focus': {
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
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline.Mui-focused': {
						color: 'white',
						borderColor: 'white !important'
					},
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: 'white'
					},
				}}
				sm={12}
				md={6}
				>
					<TextField
						name="hearAboutUs"
						label={t('contact.form.hearAboutUs') || 'How did you hear about us? '}
						value={formState.hearAboutUs}
						onChange={handleInputChange}
						fullWidth
						color="error"
					/>
				</Grid>
				<Grid item sm={12} className='my-3'>
					{t('contact.form.fileDescription')}
					<br />
					<br />
					<FileUpload handleFiles={handleFileChange} />
				</Grid>
				<Grid item sm={12}>
					<Button
						variant="contained"
						fullWidth
						color="error"
						disabled={sendingData || !isValid}
						onClick={(event: React.FormEvent) => handleSubmit(event)}
					>
						{sendingData ? (
							<Spinner height="30" />
						) : (
							<span>{t('contact.buttonSend')}</span>
						)}
					</Button>
				</Grid>
			</Grid>
		</div>
		<RedesSociales />
		<Footer />
	</>
}