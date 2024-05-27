/* eslint-disable indent */
import { Grid } from '@mui/material'
import instagramImg from '../../assets/redes/instagram.svg'
import twitchImg from '../../assets/redes/twitch.svg'
import youtubeImg from '../../assets/redes/youtube.svg'
import gmailImg from '../../assets/redes/gmail.svg'
import twitterImg from '../../assets/redes/twitter.svg'
interface Props {
	nombrePagina: string
	redSocial: string
	colorPrincipal?: string
	link: string
}
const selectImage = (image: string) => {
	switch (image) {
		case 'instagram':
			return instagramImg
		case 'twitch':
			return twitchImg
		case 'youtube':
			return youtubeImg
		case 'gmail':
			return gmailImg
		case 'twitter':
			return twitterImg
		default:
			return twitterImg
	}
}
export const CardRedSocial = ({
	nombrePagina,
	redSocial,
	colorPrincipal,
	link,
}: Props) => {
	return (
		<Grid
			container
			marginTop={2}
			display={'flex'}
			alignItems={'center'}
			justifyContent={'center'}
		>
			<Grid item xs={12} md={10} display={'flex'} flexDirection={'row'}>
				<a href={link} target="_blank" rel="noreferrer">
					<img
						src={selectImage(redSocial)}
						alt={redSocial}
						className="icono_red"
					/>
				</a>
				<Grid container>
					<Grid item xs={12} md={9}>
						<div
							className="red_social_nombrepagina"
							style={{ borderRight: '8px solid bold #000' }}
						>
							{nombrePagina}
						</div>
					</Grid>
					<Grid
						item
						xs={4}
						className="red_social_nombre"
						style={{ borderRight: '10px solid bold #000' }}
					>
						{redSocial.toUpperCase()}
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}
