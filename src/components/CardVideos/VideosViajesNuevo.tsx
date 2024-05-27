import { Grid } from '@mui/material'
import { CardVideoViajes } from './CardViedosViajes'

interface IProps {
	viajesUrl: string[]
}

export const VideosViajesNuevo = ({ viajesUrl }: IProps) => {
	return (
		<Grid
			container
			spacing={2}
			marginBottom={5}
			className="padding_left90 padding_right90"
		>
			<Grid item md={12} xs={12}>
				<Grid container spacing={2}>
					{viajesUrl.map((video, i) => (
						<Grid item md={4} xs={12} key={i}>
							<CardVideoViajes url={video} />
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	)
}
