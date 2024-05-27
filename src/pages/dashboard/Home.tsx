import { Link } from 'react-router-dom'
import { Button, Grid, Tooltip, Typography } from '@mui/material'
import logo_check from '../../assets/logo_check.svg'
import background from '../../assets/bg.png'
import YouTubeIcon from '@mui/icons-material/YouTube'
import FormatSizeIcon from '@mui/icons-material/FormatSize'
export const Home = () => {
	return (
		<Grid
			container
			style={{
				backgroundImage: `url(${background})`,
				backgroundSize: 'cover',
				color: 'white',
				height: '100vh',
			}}
		>
			<Grid
				item
				xs={12}
				display={'flex'}
				justifyContent={'space-between'}
				alignItems={'flex-start'}
				width={'90%'}
				paddingX={20}
			>
				<Link to={'/'}>
					<Tooltip title={'Volver al Inicio'}>
						<img
							src={logo_check}
							alt="logo_check"
							className="logo-principal logo_dashboard"
							width={100}
						/>
					</Tooltip>
				</Link>
				<Button
					sx={{ marginTop: 2, backgroundColor: '#7E0B10', color: 'white' }}
					variant="contained"
				>
					<Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
						Cerrar X
					</Link>
				</Button>
			</Grid>
			<Grid container style={{ height: '540px' }}>
				<Grid item xs={1}></Grid>
				<Grid
					item
					xs={10}
					style={{
						backgroundColor: '#7E0B10',
						width: '90%',
						borderRadius: '20px',
					}}
				>
					<Typography
						variant={'body1'}
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'flex-start',
							marginTop: '40px',
							textTransform: 'uppercase',
						}}
						sx={{
							fontSize: {
								md: 36,
								sm: 30,
								xs: 28,
							},
						}}
					>
						Administrador Web
					</Typography>

					<div
						style={{
							display: 'flex',
							justifyContent: 'space-around',
							alignItems: 'center',
							marginTop: '60px',
						}}
					>
						<Button
							startIcon={<YouTubeIcon style={{ width: 50, height: 50 }} />}
							sx={{
								margin: 2,
								backgroundColor: '#191918',
								color: 'white',
								width: '400px',
								height: '70px',
								border: '1px solid #707070',
								borderRadius: ' 20px',
								fontSize: {
									md: 22,
									sm: 18,
									xs: 16,
								},
							}}
						>
							<Tooltip title={'Editar videos de la web'}>
								<Link
									to={'/dashboard/videos'}
									style={{ textDecoration: 'none', color: 'white' }}
								>
									Editar últimos videos
								</Link>
							</Tooltip>
						</Button>
						<Button
							startIcon={<FormatSizeIcon style={{ width: 50, height: 50 }} />}
							sx={{
								margin: 2,
								backgroundColor: '#191918',
								color: 'white',
								width: '400px',
								height: '70px',
								border: '1px solid #707070',
								borderRadius: ' 20px',
								fontSize: {
									md: 22,
									sm: 18,
									xs: 16,
								},
							}}
						>
							<Tooltip title={'Editar textos de la web'}>
								<Link
									to={'/dashboard/texts'}
									style={{ textDecoration: 'none', color: 'white' }}
								>
									Editar textos
								</Link>
							</Tooltip>
						</Button>
					</div>
					{/* <nav className="dashboard_home_nav">
					<ul>
						<li className={'dashboard_link'}>
							<Tooltip title={'Editar videos de la web'}>
								<Link to={'/dashboard/videos'}>Editar Videos</Link>
							</Tooltip>
						</li>
					</ul>
				</nav> */}
				</Grid>
				<Grid item xs={1}></Grid>
			</Grid>
		</Grid>
	)
}
