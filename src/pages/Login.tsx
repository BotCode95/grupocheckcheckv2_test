import { useContext, useEffect, useState, MouseEvent } from 'react'
import {
	Button,
	TextField,
	Grid,
	Box,
	Typography,
	Card,
	InputAdornment,
	IconButton,
	Tooltip,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext/UserContext'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import background from '../assets/bg.png'

type FormValues = {
	email: string
	password: string
}

export const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormValues>()

	const { token, status, message, cleanMessage, login } =
		useContext(UserContext)

	const onSubmit = handleSubmit((data) => {
		login(data)
		reset()
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
		<Box>
			<Grid
				container
				direction="column"
				spacing="2"
				display={'flex'}
				justifyContent={'center'}
				alignItems={'center'}
				minHeight={'90vh'}
				style={{
					backgroundImage: `url(${background})`,
					backgroundSize: 'cover',
				}}
			>
				<Card
					sx={{
						width: '700px',
						height: '400px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
						marginTop: '20px',
						backgroundColor: 'var(--color-primary)',
					}}
				>
					<form onSubmit={onSubmit}>
						<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
							<TextField
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
								sx={{
									marginTop: '25px',
									width: '400px',
								}}
								inputProps={{ className: 'input_base' }}
								InputLabelProps={{ className: 'textfield' }}
							/>
							{errors.email && (
								<Typography sx={{ color: 'white' }}>
									{errors.email.message}
								</Typography>
							)}
						</Grid>
						<Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
							<TextField
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
								sx={{ marginTop: '35px', width: '400px' }}
							/>

							{errors.password && (
								<Typography sx={{ color: 'white' }}>
									{errors.password.message}
								</Typography>
							)}
						</Grid>
						{message ? (
							<p style={{ color: 'white' }}>El password es incorrecto</p>
						) : null}
						<Grid
							item
							xs={12}
							sm={12}
							md={12}
							sx={{ marginTop: '20px', marginBottom: '20px' }}
						>
							<Button
								variant="contained"
								color={'error'}
								type="submit"
								fullWidth
							>
								Ingresar
							</Button>
						</Grid>
						<Grid item xs={12} sm={12} md={8}>
							<Tooltip
								title={'Momentaneamente no se encuentra disponible el registro'}
							>
								<Typography className="button_link">
									{/* <Link to={'/register'}>¿Deseas crear una cuenta?</Link> */}
									<span style={{ color: 'white' }}>
										¿Deseas crear una cuenta?
									</span>
								</Typography>
							</Tooltip>
						</Grid>
					</form>
				</Card>
			</Grid>
		</Box>
	)
}
