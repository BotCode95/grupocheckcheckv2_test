import { Link } from 'react-router-dom'
import { Grid, Typography, Button } from '@mui/material'
import { Navbar } from '../components/navbar/Navbar'
import Erro404Img from '../assets/404.svg'
import background from '../assets/bg.png'
import { useLanguage } from '../hooks/useLanguage'

export const Error404 = () => {
	const lang = useLanguage()
	return (
		<div
			style={{
				backgroundImage: `url(${background})`,
				backgroundSize: 'cover',
				height: '100vh',
			}}
		>
			<Navbar />
			<Grid
				container
				spacing={2}
				className="bg_error"
				display={'flex'}
				justifyContent={'center'}
				alignItems={'center'}
			>
				{/* <Grid item md={2} /> */}
				<Grid
					item
					xs={12}
					md={6}
					display={'flex'}
					justifyContent={'center'}
					alignItems={'center'}
				>
					<img src={Erro404Img} alt="error" width={500} />
				</Grid>
				<Grid item xs={12} md={6}>
					<Typography
						variant="h3"
						color="white"
						paddingY={2}
						sx={{ fontSize: { md: 30, sm: 22 } }}
					>
						Página no encontrada
					</Typography>
					<ol>
						<Typography
							variant="body1"
							color="white"
							paddingY={1}
							sx={{ fontSize: { md: 18, sm: 14 } }}
						>
							<li>
								Comprobá que la dirección que introdujiste sea la correcta y no
								falta o sobra nada.
							</li>
						</Typography>
						<Typography
							variant="body1"
							color="white"
							paddingY={1}
							sx={{ fontSize: { md: 18, sm: 14 } }}
						>
							<li>
								Es posible que esta dirección haya existido en el pasado pero ya
								no existe.
							</li>
						</Typography>
					</ol>
					<Button
						variant="contained"
						size={'large'}
						className="boton_color_primary"
						style={{ borderRadius: '10px' }}
					>
						<Link
							to={`/${lang}`}
							style={{
								color: 'white',
								textDecoration: 'none',
							}}
						>
							Volver al inicio
						</Link>
					</Button>
				</Grid>
				{/* <Grid item md={2} /> */}
			</Grid>
		</div>
	)
}
