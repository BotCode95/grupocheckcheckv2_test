import './PlayerView.css'
import { Grid } from '@mui/material'
import { IPlayer } from '../../types/texts'
import { Spinner } from '../dashboard/Spinner/Spinner'
import { useState } from 'react'
import ContentLoader from 'react-content-loader'

interface Props {
	player: IPlayer | null
}

interface ChipTextProps {
	text?: string
	type?: 'white' | 'red'
}

const ChipText = ({ text, type }: ChipTextProps) => {
	if (!text) return <></>
	return <span className={`chipText ${type ? type : ''}`}>{text}</span>
}

export const PlayerView = ({ player }: Props) => {
	const [imageLoaded, setImageLoaded] = useState(false)

	if (!player) {
		return (
			<Grid display={'flex'} justifyContent={'center'} padding={10}>
				<Spinner />
			</Grid>
		)
	}
	return (
		<Grid container className="playerView" id="playerView">
			<Grid item sm={12} md={6} className="playerView_playerInfo">
				<div className="playerView_playerName">
					<h2>{player.player_name.toUpperCase()}</h2>
					<div>
						<img src={player.flag} width={30} />
					</div>
				</div>
				<div className="playerView_playerType">
					<ChipText text={player.type_of_game} />
					<span>{player.values_game}</span>
				</div>
				<div className="playerView_extraType">
					<ChipText text={player.extra_type_of_game} type="white" />
					<span>{player.extra_values_game}</span>
				</div>
				<div className="playerView_playerCoach">
					<ChipText text={player.coach} />
					<span>{player.coach_especialities}</span>
				</div>
				<div className="playerView_playerDescription">
					{player.description.split('\n').map((desc, idx) => (
						<p key={idx}>{desc}</p>
					))}
				</div>
			</Grid>
			<Grid item sm={12} md={6} className="playerView_playerImage">
				{!imageLoaded && ( 
					<div className="playerView_placeholder">
						<ContentLoader
							speed={2}
							height={'80%'}
							width={'80%'}
							backgroundColor="#0e0e0e"
							foregroundColor="#000"
						>
							<rect x="0" y="0" rx="15" ry="15" width="100%" height="100%" />
						</ContentLoader>
					</div>
				)}
				<img
					src={player.image}
					alt={`${player.player_name}`}
					onLoad={() => setImageLoaded(true)} 
					className={imageLoaded ? 'loaded' : 'loading'}
				/>
			</Grid>
		</Grid>
	)
}
