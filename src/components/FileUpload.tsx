import { useCallback, useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import { useTranslation } from 'react-i18next'

interface Props {
	handleFiles: (files: File[]) => void
}

const MAX_SIZE = 25 * 1024 * 1024 // 25MB in bytes
type FileWithPreview = File & { preview: string }
export const FileUpload = ({ handleFiles }: Props) => {
	const [files, setFiles] = useState<FileWithPreview[]>([])
	const [t] = useTranslation('global')

	const onDrop = useCallback((acceptedFiles: File[]) => {
		const filesWithPreview = acceptedFiles.map(file => 
			Object.assign(file, {
				preview: URL.createObjectURL(file)
			})
		) as FileWithPreview[]
    
		setFiles(prevFiles => [...prevFiles, ...filesWithPreview])
	}, [])

	useEffect(() => {
		if( files?.length > 0) {
			handleFiles(files)
		}
	}, [files])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'application/pdf': ['.pdf'],
			'application/msword': ['.doc'],
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
		},
		maxSize: MAX_SIZE,
	})

	return (
		<Box
			{...getRootProps()}
			sx={{
				border: '2px dashed #ccc',
				padding: 2,
				textAlign: 'center',
				cursor: 'pointer',
				borderRadius: 2,
				'&:hover': {
					borderColor: '#000',
				},
			}}
		>
			<input {...getInputProps()} />
			{isDragActive ? (
				<Typography variant="body1">Suelta los archivos aquí...</Typography>
			) : (
				<p>{t('contact.form.fileUploadDescription')}</p>
			)}
			<Box mt={2}>
				{files.map((file, index) => (
					<Typography key={index} variant="body2">
						{file.name}
					</Typography>
				))}
			</Box>
		</Box>
	)
}

export default FileUpload