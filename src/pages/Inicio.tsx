import { useContext, useEffect, useState } from 'react'
import { Button, Grid } from '@mui/material'
import { Navbar } from '../components/navbar/Navbar'
import { SpinnerImg } from '../components/UI/Spinners/SpinnerImg'
import { UIContext } from '../context/UIContext/UIContext'
import { TextsContext } from '../context/Dashboard/Texts'
import banner from '../assets/bannerCutted.jpg'
import coachingImg from '../assets/icons/coaching.jpg'
import desarrolloImg from '../assets/icons/desarrollo.jpg'
import growthImg from '../assets/icons/growth.jpg'
import supportImg from '../assets/icons/support.png'
import personImg from '../assets/icons/person.png'
import videoplayerImg from '../assets/icons/videoplayer.png'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Footer } from '../components/UI/Footer'


export const Inicio = () => {
	const { loading, loadingHome } = useContext(UIContext)
	const [bannerLoaded, setBannerLoaded] = useState<boolean>(false)
	const isLoadingOK: string | null = localStorage.getItem('loading')
	const [t] = useTranslation('global')

	const { language, getTextByLanguage } = useContext(TextsContext)
	
	useEffect(() => {
		if (!isLoadingOK) {
			loadingHome(2000)
		}
	}, [])

	useEffect(() => {
		getTextByLanguage(language)
	}, [language])

	const handleImageLoad = () => {
		setBannerLoaded(true)
	}
	console.log({bannerLoaded, isLoadingOK, loading})
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
					<div className='home_banner_container'>
						<img src={banner} onLoad={handleImageLoad} />
					</div>
					<main>
						<h1>Welcome to TeamCheckCheck</h1>
						<div className="home_main_hr"></div>
						<p>
							{'At teamcheckcheck we\'re more than just a backing platform – we\'re a community dedicated to empowering poker players worldwide. Whether you\'re a novice looking to refine your skills or a seasoned player aiming for mastery, our elite coaches from around the globe are here to guide you every step of the way.'}
						</p>
						<section className="home_why">
							<h2>Why choose TeamCheckCheck?</h2>
							<Grid container className='home_why_list'>
								<Grid item md={4} sm={12} className="home_why_list_item">
									<img src={coachingImg} alt='Expert Coaching' width={110} />
									<h3>Expert Coaching</h3>
									<p>
										{'Our team comprises top-tier coaches with years of experience in Spin & Go poker. They\'re not just instructors; they\'re mentors committed to helping you reach your full potential.'}
									</p>
								</Grid>
								<Grid item md={4} sm={12} className="home_why_list_item">
									<img src={desarrolloImg} alt='Unleash Your Potential' width={116} />
									<h3>Unleash Your Potential</h3>
									<p>
										{'We believe in unlocking the hidden talents within every player. Our mission is to equip you with the knowledge, strategies, and mindset to excel at the poker table and beyond.'}
									</p>
								</Grid>
								<Grid item md={4} sm={12} className="home_why_list_item">
									<img src={growthImg} alt='No Limits, Only Growth' width={116}/>
									<h3>No Limits, Only Growth</h3>
									<p>
										{'At Teamcheckcheck, we\'re dedicated to fostering a culture of continuous improvement. We\'ll never hold you back – instead, we\'ll empower you to maximize your skill sets and achieve success on your terms.'}
									</p>
								</Grid>
							</Grid>
						</section>
						<section className="home_community">
							<h2>Join Our Community Today</h2>
							<p>
								{'Whether you\'re aiming for the top ranks or seeking to sharpen your edge, Teamcheckcheck is your ultimate destination for poker excellence. Take the first step towards realizing your true potential and join our vibrant community of poker enthusiasts.'}
							</p>
							<div className='home_community_list'>
								<div className='home_community_list_item'>
									<img src={videoplayerImg} width={100} />
									<h4>Extensive Video Library</h4>
									<p>Over 1000 videos, with a minimun of 20 nex videos per month</p>
								</div>
								<div className='home_community_list_item'>
									<img src={personImg} width={100} />
									<h4>Regular Group Coaching</h4>
									<p>A staking system with 14 levels designated to help players of all abilities succeed.</p>
								</div>
								<div className='home_community_list_item'>
									<img src={supportImg} width={100} />
									<h4>Dedicately support</h4>
									<p>A private Skype group for each player with 4 experienced managers</p>
								</div>
							</div>
						</section>
					</main>
					<section className='home_cta'>
						<div className='home_cta_container'>
							<h2>{'Are you ready to elevate your game? Let\'s embark on this journey together.'}</h2>
							<h2>{'Your success starts here.'}</h2>
							<NavLink
								to="/aplicar"
								rel="noreferrer"
								style={{ textDecoration: 'none' }}
							>
								<Button
									variant='contained'
									size='large'
									className='buttonInscribite'
									style={{
										backgroundColor: 'var(--black-color)',
										height: '60px',
										fontSize: 20,
									}}
								>
									{t('part_of_family.button')}
								</Button>
							</NavLink>
						</div>
					</section>
					<Footer />
				</>
			)}
		</div>
	)
}
