import './App.css'
// import './App.css'
import { UIState } from './context/UIContext/'
import { UserProvider } from './context/UserContext'
import { AppRoutes } from './routes'
import { TextsProvider } from './context/Dashboard/Texts/TextsProvider'

function App() {
	return (
		<UserProvider>
			<UIState>
				<TextsProvider>
					<div className="App">
						<AppRoutes />
					</div>
				</TextsProvider>
			</UIState>
		</UserProvider>
	)
}

export default App
