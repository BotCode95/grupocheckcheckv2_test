import { Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

interface Props {
	redirectTo?: string
}

export const ProtectedRoute = ({ redirectTo = '/' }: Props) => {
	const { status } = useContext(UserContext)
	if (status !== 'AUTHENTICATED') {
		return <Navigate to={redirectTo} />
	}
	return <Outlet />
}
