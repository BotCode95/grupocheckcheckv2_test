import './PlayerView.css'
import { Grid } from '@mui/material'
import { IPlayer } from '../../types/texts'
import { Spinner } from '../dashboard/Spinner/Spinner'

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
				<img src={player.image} alt={`${player.player_name}`} />
			</Grid>
		</Grid>
	)
}
