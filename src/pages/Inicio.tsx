import { useContext, useEffect } from 'react'
import { Grid } from '@mui/material'
import { AcercaDeNosotros } from '../components/AcercaDe/AcercaDeNosotros'
import { BannerFormaParte } from '../components/Banners/BannerFormaParte'
import { RedesSociales } from '../components/Banners/RedesSociales'
import { Footer } from '../components/UI/Footer'
import { UltimosVideos } from '../components/UltimosVideos/UltimosVideos'
import background from '../assets/bg.png'
import { Navbar } from '../components/navbar/Navbar'
import ReactPlayer from 'react-player'
import { SpinnerImg } from '../components/UI/Spinners/SpinnerImg'
import { UIContext } from '../context/UIContext/UIContext'
import { TextsContext } from '../context/Dashboard/Texts'

export const Inicio = () => {
	const { loading, loadingHome } = useContext(UIContext)
	const isLoadingOK: string | null = localStorage.getItem('loading')

	const { language, getTextByLanguage } = useContext(TextsContext)
	useEffect(() => {
		if (!isLoadingOK) {
			loadingHome(2000)
		}
	}, [])

	useEffect(() => {
		getTextByLanguage(language)
	}, [language])
	return (
		<div
			style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}
		>
			{loading ? (
				<Grid container>
					<Grid
						item
						xs={12}
						display={'flex'}
						justifyContent={'center'}
						alignItems={'center'}
						height={'100vh'}
					>
						<SpinnerImg />
					</Grid>
				</Grid>
			) : (
				<>
					<Navbar />
					<Grid
						container
						display={'flex'}
						justifyContent={'center'}
						alignItems={'center'}
					>
						<Grid item xs={10}>
							<div
								style={{
									borderRadius: '20px',
									marginBottom: '20px',
									marginTop: '20px',
									display: 'flex',
									justifyContent: 'center',
								}}
							>
								<ReactPlayer
									url={'https://youtu.be/kPB0LCjK1OY'}
									width={'100%'}
									height={'600px'}
									playing={true}
									volume={0}
									controls={true}
									className={'video-inicio'}
								/>
							</div>
						</Grid>
					</Grid>
					<BannerFormaParte />
					<AcercaDeNosotros />
					<UltimosVideos />
					<RedesSociales />
					<Footer />
				</>
			)}
		</div>
	)
}
