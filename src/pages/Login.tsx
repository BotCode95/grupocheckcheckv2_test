import { useContext, useEffect, useState, MouseEvent } from 'react'
import {
	Button,
	TextField,
	Typography,
	Card,
	InputAdornment,
	IconButton
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext/UserContext'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import logo_check_check from '../assets/logo_checkcheck.svg'
import { styled } from '@mui/material/styles'
import { ColorRing } from 'react-loader-spinner'

type FormValues = {
	email: string
	password: string
}

const StyledTextField = styled(TextField)({
	'& label.Mui-focused': {
		color: 'var(--secondary-color)'
	},
	'& .MuiInput-underline:after': {
		borderBottomColor: 'var(--secondary-color)',
	},
	'& .MuiOutlinedInput-root': {
		'&.Mui-focused fieldset': {
			borderColor: 'var(--secondary-color)',
		},
	},
})

const StyledButton = styled(Button)({
	'&.MuiButton-root': {
		backgroundColor: 'var(--secondary-color)',
	},
})

export const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<FormValues>()
	const [loading, setLoading] = useState(false)

	const { token, status, message, cleanMessage, login } =
		useContext(UserContext)

	const onSubmit = handleSubmit((data) => {
		setLoading(true)
		login(data)
		setTimeout(() => {
			setLoading(false)
			reset()
		}, 1000)
	})

	useEffect(() => {
		setTimeout(() => {
			cleanMessage()
		}, 3000)
	}, [message])

	const [showPassword, setShowPassword] = useState(false)

	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
	}

	const navigate = useNavigate()

	useEffect(() => {
		if (localStorage.getItem('token') && status === 'AUTHENTICATED')
			navigate('/dashboard')
	}, [token])

	return (
		<div style={{ height: '100vh', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column'}}>
			<div style={{ margin: '3em 0'}}>
				<img src={logo_check_check} width='150px' />
			</div>
			<Card
				sx={{
					maxWidth: '600px',
					display: 'flex',
					padding: '1.5em',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
					backgroundColor: 'white',
					borderRadius: '0.5em'
				}}
			>
				<Typography component='h1' variant='h6' mb={'1em'}>
					Iniciar sesión
				</Typography>
				<form onSubmit={onSubmit}>
					<StyledTextField
						{...register('email', {
							required: {
								value: true,
								message: 'Campo requerido',
							},
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
								message: 'El formato no es correcto',
							},
						})}
						type="email"
						name="email"
						margin="dense"
						required
						fullWidth
						label="Correo"
						color="secondary"
						inputProps={{ className: 'input_base' }}
						InputLabelProps={{ className: 'textfield' }}
						disabled={loading}
					/>
					{errors.email && (
						<Typography sx={{ color: 'white' }}>
							{errors.email.message}
						</Typography>
					)}
					<StyledTextField
						{...register('password', {
							required: {
								value: true,
								message: 'Campo requerido',
							},
						})}
						type={showPassword ? 'text' : 'password'}
						name="password"
						margin="dense"
						className="input_base"
						fullWidth
						label="Contraseña"
						color="secondary"
						required
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							),
						}}
						InputLabelProps={{ className: 'textfield' }}
						inputProps={{ className: 'input_base' }}
						sx={{ my: '1em'}}
						disabled={loading}
					/>
					{errors.password && (
						<Typography sx={{ color: 'white' }}>
							{errors.password.message}
						</Typography>
					)}
					{message ? (
						<p style={{ color: 'white' }}>El password es incorrecto</p>
					) : null}
					<StyledButton
						variant="contained"
						sx={{ bgcolor: 'var(--secondary-color)'}}
						type="submit"
						fullWidth
						disabled={loading}
					>
						{
							loading ? <ColorRing width='25px' height='25px' colors={['white', 'white', 'white', 'white', 'white']} /> : 'Ingresar'
						}
					</StyledButton>
				</form>
			</Card>
		</div>
	)
}