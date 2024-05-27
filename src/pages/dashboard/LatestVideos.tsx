import { Grid, Divider } from '@mui/material'
import { LatestVideosUpdate } from '../../components/dashboard/UltimosVideos/LatestVideosUpdate'
import { ViajesDashboard } from '../../components/dashboard/Viajes/ViajesDashboard'
import { InterviewsDashboard } from '../../components/dashboard/Interviews/InterviewsDashboard'
import { NavbarDashboard } from './NavbarDashboard'

export const LatestVideos = () => {
	return (
		<div style={{ color: 'white' }}>
			<NavbarDashboard />
			<Divider
				style={{
					background: 'white',
					height: 2,
					width: '90%',
					margin: 'auto',
				}}
				variant="middle"
			/>
			<Grid
				container
				display={'flex'}
				justifyContent={'center'}
				alignItems={'center'}
				flexDirection={'column'}
			>
				<LatestVideosUpdate />
				<Divider
					style={{ background: 'white', height: 2, width: '80%' }}
					variant="middle"
				/>
				<ViajesDashboard />
				<Divider
					style={{ background: 'white', height: 2, width: '80%' }}
					variant="middle"
				/>
				<InterviewsDashboard />
			</Grid>
		</div>
	)
}
