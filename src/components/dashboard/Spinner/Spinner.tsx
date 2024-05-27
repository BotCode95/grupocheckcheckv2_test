import { LineWave } from 'react-loader-spinner'

interface ISpinner {
	height?: string
	width?: string
}

export const Spinner = ({ height = '100', width = '100' }: ISpinner) => {
	return (
		<LineWave
			height={height}
			width={width}
			color="#C4C4ff"
			ariaLabel="line-wave"
			wrapperStyle={{}}
			wrapperClass=""
			visible={true}
			firstLineColor=""
			middleLineColor=""
			lastLineColor=""
		/>
	)
}
