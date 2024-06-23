import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import './App2.css'
import { Inicio, Viajes, Nosotros, Faq, Error404 } from './pages'
import { UIState } from './context/UIContext/'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'
import { UserProvider } from './context/UserContext'
import { Home } from './pages/dashboard/Home'
import { Login } from './pages/Login'
import { LatestVideos } from './pages/dashboard/LatestVideos'
import { TextsEdit } from './pages/dashboard/TextsEdit'
import { TextsProvider } from './context/Dashboard/Texts/TextsProvider'
import { AplicarAqui } from './pages/AplicarAqui'

function App() {
	return (
		<UserProvider>
			<UIState>
				<TextsProvider>
					<div className="App">
						<HashRouter>
							<Routes>
								<Route path="/">
									<Route index element={<Inicio />} />
									<Route path="/nosotros" element={<Nosotros />} />
									{/* <Route path="/entrevistas" element={<Entrevistas />} /> */}
									<Route path="/viajes" element={<Viajes />} />
									<Route path="/faq" element={<Faq />} />
									<Route path="/login" element={<Login />} />
									<Route path="/aplicar" element={<AplicarAqui />} />
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
