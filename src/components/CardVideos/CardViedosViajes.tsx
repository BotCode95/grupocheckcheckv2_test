import { useState, useEffect } from 'react'
import { Card } from '@mui/material'
import ReactPlayer from 'react-player'
import { Puff } from 'react-loader-spinner'

interface Props {
	url: string
}

export const CardVideoViajes = ({ url }: Props) => {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			setLoading(false)
		}, 5000)
	}, [])
	return (
		<Card sx={{ maxWidth: 400 }}>
			<ReactPlayer
				url={url}
				width={'100%'}
				playing={false}
				volume={0.4}
				controls={true}
				light={
					loading ? (
						<Puff
							height="80"
							width="80"
							color="#7E0B10"
							ariaLabel="puff-loading"
							wrapperStyle={{
								backgroundColor: 'black',
								width: '100%',
								height: '100%',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
							wrapperClass=""
							visible={true}
						/>
					) : (
						false
					)
				}
			/>
		</Card>
	)
}
