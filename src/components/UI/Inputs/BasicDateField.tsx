import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateField } from '@mui/x-date-pickers/DateField'
import { type Dayjs } from 'dayjs'

interface Props {
  label: string,
  onChange: (value: Dayjs | null) => void
  color?: 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | undefined
  fullWidth?: boolean
  required?: boolean
  value?:Dayjs | null
}

export const BasicDateField = ({label, onChange, color, fullWidth, required, value}: Props) => {
	return <LocalizationProvider dateAdapter={AdapterDayjs}>
		<DateField 
			label={label}
			fullWidth={fullWidth}
			required={required}
			color={color}
			onChange={onChange}
			value={value}
		/>
	</LocalizationProvider>
}