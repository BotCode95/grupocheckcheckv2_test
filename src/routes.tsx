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
	DashboardLayout
} from './pages'

export const AppRoutes = () => {
	return (
		<HashRouter>
			<Routes>
				<Route path="/">
					<Route path="/" element={<Intro />} />
					<Route path="/login" element={<Login />} />
					<Route path="/es">
						<Route index element={<Inicio />} />
						<Route path="/es/teams" element={<Team />} />
						<Route path="/es/testimonials" element={<Testimonials />} />
						<Route path="/es/blog" element={<TripsBlog />} />
						<Route path="/es/faq" element={<Faq />} />
						<Route path="/es/signup" element={<Signup />} />
					</Route>
					<Route path="/en">
						<Route index element={<Inicio />} />
						<Route path="/en/teams" element={<Team />} />
						<Route path="/en/testimonials" element={<Testimonials />} />
						<Route path="/en/blog" element={<TripsBlog />} />
						<Route path="/en/faq" element={<Faq />} />
						<Route path="/en/signup" element={<Signup />} />
					</Route>
					<Route path="/dashboard/*" element={<DashboardLayout />} />
					<Route path="*" element={<Error404 />} />
				</Route>
			</Routes>
		</HashRouter>
	)
}
