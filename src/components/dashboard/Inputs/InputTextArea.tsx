import { ChangeEvent } from 'react'

interface Props {
	placeholder: string
	classname: string
	name: string
	value: string
	onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const InputTextArea = ({
	placeholder,
	classname,
	name,
	value,
	onChange,
}: Props) => {
	return (
		<textarea
			placeholder={placeholder}
			className={classname}
			value={value}
			name={name}
			onChange={onChange}
		/>
	)
}
