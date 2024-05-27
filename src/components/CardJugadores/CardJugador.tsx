/* eslint-disable indent */
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material'
import giuseppeImage from '../../assets/players/guiseppe.jpg'
import emilianoImage from '../../assets/players/emiliano.jpg'
import mathiasImage from '../../assets/players/mathias.jpg'
import elsonImage from '../../assets/players/elson.jpg'
import marianoImage from '../../assets/players/mariano.jpg'
import hernanImage from '../../assets/players/hernan.jpg'
import joseImage from '../../assets/players/jose.jpg'
import nicolasImage from '../../assets/players/nicolas.jpg'
import FlagAR from '../../assets/flags/FlagAR.svg'
import { useEffect, useState } from 'react'

interface Props {
	nombreJugador: string
	descripcion: string
	tipoDeJuego?: string
	valoresDeJuego?: string
	image: string
	coach?: string
	especialidades?: string
	flag?: string
	isMock?: boolean
}
export const CardJugador = ({
	nombreJugador,
	descripcion,
	tipoDeJuego,
	valoresDeJuego,
	image,
	coach,
	especialidades,
	flag,
	isMock = false,
}: Props) => {
	const selectImage = (image: string) => {
		switch (image) {
			case 'giuseppe':
				return giuseppeImage
			case 'emiliano':
				return emilianoImage
			case 'mathias':
				return mathiasImage
			case 'elson':
				return elsonImage
			case 'mariano':
				return marianoImage
			case 'hernan':
				return hernanImage
			case 'jose':
				return joseImage
			case 'nicolas':
				return nicolasImage
			default:
				return giuseppeImage
		}
	}

	const [descriptions, setDescriptions] = useState<string[]>(
		descripcion.split('.') ?? []
	)

	useEffect(() => {
		setDescriptions(descripcion.split('.') ?? [])
	}, [descripcion])
	return (
		<Grid
			item
			xs={12}
			md={6}
			lg={4}
			marginTop={5}
			display={'flex'}
			justifyContent={'center'}
			alignItems={'baseline'}
		>
			<Card
				sx={{
					maxWidth: 365,
					minHeight: 400,
					backgroundColor: 'transparent',
					color: 'white',
				}}
			>
				{isMock ? (
					<CardMedia
						component="img"
						height="360"
						sx={{ borderRadius: '15px' }}
						image={selectImage(image)}
						alt={nombreJugador}
					/>
				) : (
					<CardMedia
						component="img"
						height="360"
						sx={{ borderRadius: '15px' }}
						image={image}
						alt={nombreJugador}
					/>
				)}
				<CardContent>
					<Grid
						display={'flex'}
						alignItems={'center'}
						justifyContent={'space-between'}
					>
						<Typography
							gutterBottom
							variant="h5"
							component="div"
							textAlign={'center'}
							marginTop={2}
							fontWeight="bold"
							sx={{
								fontSize: {
									md: 26,
									sm: 24,
									xs: 20,
								},
							}}
						>
							{nombreJugador.toUpperCase()}
						</Typography>
						{flag ? (
							<img
								src={flag}
								alt={'bandera_ar'}
								width={40}
								height={25}
								style={{ borderRadius: '5px' }}
							/>
						) : (
							<img
								src={FlagAR}
								alt={'bandera_ar'}
								width={40}
								height={25}
								style={{ borderRadius: '5px' }}
							/>
						)}
					</Grid>
					{descriptions.map((desc, i) => (
						<Typography
							variant="body2"
							color="white"
							textAlign={'center'}
							marginBottom={1}
							sx={{
								fontSize: {
									md: 14,
									sm: 14,
									xs: 14,
								},
							}}
							key={i}
						>
							{descriptions.length !== i + 1 ? desc.trim() + '.' : null}
						</Typography>
					))}

					<Grid marginTop={3}>
						<Typography
							variant="body2"
							color="white"
							textAlign={'center'}
							sx={{
								fontSize: {
									md: 14,
									sm: 14,
									xs: 14,
								},
							}}
						>
							<strong>{tipoDeJuego}</strong> {valoresDeJuego}
						</Typography>
						<Typography
							variant="body2"
							color="white"
							textAlign={'center'}
							sx={{
								fontSize: {
									md: 14,
									sm: 14,
									xs: 14,
								},
							}}
						>
							<strong>{coach}</strong> {especialidades}
						</Typography>
					</Grid>
				</CardContent>
			</Card>
		</Grid>
	)
}
