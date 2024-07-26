import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
// import './App.css'
import { Inicio, Faq, Error404, Team, Testimonials, Trips, Intro, Signup } from './pages'
import { UIState } from './context/UIContext/'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'
import { UserProvider } from './context/UserContext'
import { Home } from './pages/dashboard/Home'
import { Login } from './pages/Login'
import { LatestVideos } from './pages/dashboard/LatestVideos'
import { TextsEdit } from './pages/dashboard/TextsEdit'
import { TextsProvider } from './context/Dashboard/Texts/TextsProvider'

function App() {
	return (
		<UserProvider>
			<UIState>
				<TextsProvider>
					<div className="App">
						<HashRouter>
							<Routes>
								<Route path="/">
									<Route index element={<Intro />} />
									<Route path="/es">
										<Route path='/es' element={<Inicio />} />
										<Route path="/es/teams" element={<Team />} />
										<Route path="/es/testimonials" element={<Testimonials />} />
										<Route path="/es/blog" element={<Trips />} />
										<Route path="/es/faq" element={<Faq />} />
										<Route path="/es/signup" element={<Signup />} />
									</Route>
									<Route path="/en">
										<Route index element={<Inicio />} />
										<Route path="/en/teams" element={<Team />} />
										<Route path="/en/testimonials" element={<Testimonials />} />
										<Route path="/en/blog" element={<Trips />} />
										<Route path="/en/faq" element={<Faq />} />
										<Route path="/en/signup" element={<Signup />} />
									</Route>
									
									<Route path="/login" element={<Login />} />
									{/* <Route path="/nosotros" element={<Nosotros />} />*/}
									{/* <Route path="/entrevistas" element={<Entrevistas />} /> */}
									{/* <Route path="/viajes" element={<Viajes />} /> */}
									<Route
										path="/dashboard"
										element={<ProtectedRoute redirectTo="/login" />}
									>
										<Route path="/dashboard" element={<Home />} />
										<Route
											path="/dashboard/videos"
											element={<LatestVideos />}
										/>
										<Route path="/dashboard/texts" element={<TextsEdit />} />
									</Route>

									<Route path="*" element={<Error404 />} />
								</Route>
							</Routes>
						</HashRouter>
					</div>
				</TextsProvider>
			</UIState>
		</UserProvider>
	)
}

export default App
