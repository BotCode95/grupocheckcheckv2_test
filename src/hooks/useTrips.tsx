import { useContext } from 'react'
import { TextsContext } from '../context/Dashboard/Texts'

export const useTrips = () => {
	const { text } = useContext(TextsContext)

	return {
		trips: text.imagesTrips,
	}
}
