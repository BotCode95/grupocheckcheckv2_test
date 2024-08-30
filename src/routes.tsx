import { HashRouter, Routes, Route } from 'react-router-dom'
import {
	Inicio,
	Faq,
	Error404,
	Team,
	Testimonials,
	TripsBlog,
	Intro,
	Signup,
	Login,
} from './pages'
import { Home, TextsEdit, LatestVideos } from './pages/dashboard'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'

export const AppRoutes = () => {
	return (
		<HashRouter>
			<Routes>
				<Route path="/">
					<Route index element={<Intro />} />
					<Route path="/es">
						<Route index element={<Inicio lng="es" />} />
						<Route path="/es/teams" element={<Team />} />
						<Route path="/es/testimonials" element={<Testimonials />} />
						<Route path="/es/blog" element={<TripsBlog />} />
						<Route path="/es/faq" element={<Faq />} />
						<Route path="/es/signup" element={<Signup />} />
					</Route>
					<Route path="/en">
						<Route index element={<Inicio lng="en" />} />
						<Route path="/en/teams" element={<Team />} />
						<Route path="/en/testimonials" element={<Testimonials />} />
						<Route path="/en/blog" element={<TripsBlog />} />
						<Route path="/en/faq" element={<Faq />} />
						<Route path="/en/signup" element={<Signup />} />
					</Route>

					<Route path="/login" element={<Login />} />
					{/* <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/entrevistas" element={<Entrevistas />} />
      <Route path="/viajes" element={<Viajes />} /> */}
					<Route
						path="/dashboard"
						element={<ProtectedRoute redirectTo="/login" />}
					>
						<Route path="/dashboard" element={<Home />} />
						<Route path="/dashboard/videos" element={<LatestVideos />} />
						<Route path="/dashboard/texts" element={<TextsEdit />} />
					</Route>

					<Route path="*" element={<Error404 />} />
				</Route>
			</Routes>
		</HashRouter>
	)
}
