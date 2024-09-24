import { useContext, useEffect } from 'react'
import { Button, Grid } from '@mui/material'
import { Navbar } from '../components/navbar/Navbar'
import { SpinnerImg } from '../components/UI/Spinners/SpinnerImg'
import { UIContext } from '../context/UIContext/UIContext'
import banner from '../assets/bannerCutted.jpg'
import coachingImg from '../assets/icons/coaching.jpg'
import desarrolloImg from '../assets/icons/desarrollo.jpg'
import growthImg from '../assets/icons/growth.jpg'
import supportImg from '../assets/icons/support.png'
import personImg from '../assets/icons/person.png'
import videoplayerImg from '../assets/icons/videoplayer.png'
import { useTranslation } from 'react-i18next'
import { Footer } from '../components/UI/Footer'
import { TextsContext } from '../context/Dashboard/Texts'

export const Inicio = () => {
	const { loading, loadingHome } = useContext(UIContext)
	const isLoadingOK: string | null = localStorage.getItem('loading')
	const [t] = useTranslation('global')
	const {
		text,
		loading: loadingFetch,
		getTextByLanguage,
	} = useContext(TextsContext)

	useEffect(() => {
		if (!isLoadingOK) {
			loadingHome(600)
		}
	}, [])

	useEffect(() => {
		console.log('text', text)
		if (!text || text?.questions?.length === 0) {
			getTextByLanguage(localStorage.getItem('lng') ?? 'es')
		}
	}, [])

	if (loadingFetch) {
		return (
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
		)
	}

	return (
		<div className="home">
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
					<div className="home_banner_container">
						<img src={banner} />
					</div>
					<main>
						<h1>{t('home.title')}</h1>
						<div className="home_main_hr"></div>
						<p>{t('home.description')}</p>
						<section className="home_why">
							<h2>{t('home.why.title')}</h2>
							<Grid container className="home_why_list">
								<Grid item md={4} sm={12} className="home_why_list_item">
									<img src={coachingImg} alt="Expert Coaching" width={110} />
									<h3>{t('home.why.coaching.title')}</h3>
									<p>{t('home.why.coaching.description')}</p>
								</Grid>
								<Grid item md={4} sm={12} className="home_why_list_item">
									<img
										src={desarrolloImg}
										alt="Unleash Your Potential"
										width={116}
									/>
									<h3>{t('home.why.potential.title')}</h3>
									<p>{t('home.why.potential.description')}</p>
								</Grid>
								<Grid item md={4} sm={12} className="home_why_list_item">
									<img
										src={growthImg}
										alt="No Limits, Only Growth"
										width={116}
									/>
									<h3>{t('home.why.growth.title')}</h3>
									<p>{t('home.why.growth.description')}</p>
								</Grid>
							</Grid>
						</section>
						<section className="home_community">
							<h2>{t('home.community.title')}</h2>
							<p>{t('home.community.description')}</p>
							<div className="home_community_list">
								<div className="home_community_list_item">
									<img src={videoplayerImg} width={100} />
									<h4>{t('home.community.library.title')}</h4>
									<p>{t('home.community.library.description')}</p>
								</div>
								<div className="home_community_list_item">
									<img src={personImg} width={100} />
									<h4>{t('home.community.coaching.title')}</h4>
									<p>{t('home.community.coaching.description')}</p>
								</div>
								<div className="home_community_list_item">
									<img src={supportImg} width={100} />
									<h4>{t('home.community.support.title')}</h4>
									<p>{t('home.community.support.description')}</p>
								</div>
							</div>
						</section>
					</main>
					<section className="home_cta">
						<div className="home_cta_container">
							<h2>{t('home.cta.title')}</h2>
							<h2>{t('home.cta.subtitle')}</h2>
							<a
								href="https://discord.gg/zd3ntsNKuS"
								target="_blank"
								rel="noreferrer"
								style={{ textDecoration: 'none' }}
							>
								<Button
									variant="contained"
									size="large"
									className="buttonInscribite"
									style={{
										backgroundColor: 'var(--black-color)',
										fontSize: 20,
									}}
								>
									{t('home.cta.button')}
								</Button>
							</a>
						</div>
					</section>
					<Footer />
				</>
			)}
		</div>
	)
}
