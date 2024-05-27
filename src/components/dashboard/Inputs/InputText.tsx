import { ChangeEvent } from 'react'

interface Props {
	placeholder: string
	classname: string
	name: string
	value?: any
	onChange?: (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
		playername?: string
	) => void
}

export const InputText = ({
	placeholder,
	classname,
	name,
	value,
	onChange,
}: Props) => {
	return (
		<input
			placeholder={placeholder}
			className={classname}
			name={name}
			value={value}
			onChange={onChange}
		/>
	)
}
