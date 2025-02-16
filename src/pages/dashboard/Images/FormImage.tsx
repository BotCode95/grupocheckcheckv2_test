import { Box, Typography } from '@mui/material'
import { ChangeEvent } from 'react'
import {
	CommunityText,
	IHomeTexts,
	TextBanner,
	WhyText,
} from '../../../types/texts'

interface Props {
	data: TextBanner
	name: string
	parentObjKey: keyof IHomeTexts
	childObjKey: keyof WhyText | keyof CommunityText
	handleFileChange: (
		event: ChangeEvent<HTMLInputElement>,
		data: TextBanner,
		parentObjKey: keyof IHomeTexts,
		childObjKey: keyof WhyText | keyof CommunityText
	) => void
}
export const FormImage = ({
	data,
	name,
	parentObjKey,
	childObjKey,
	handleFileChange,
}: Props) => {
	return (
		<div>
			<Typography variant="body2" gutterBottom>
				{name}
			</Typography>
			{data.image && (
				<Box
					component="img"
					src={data.image}
					alt="Preview Imagen"
					sx={{
						width: 200,
						height: 200,
						objectFit: 'cover',
						marginBottom: 2,
						display: 'block',
					}}
				/>
			)}
			<input
				type="file"
				accept="image/*"
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					handleFileChange(e, data, parentObjKey, childObjKey)
				}
			/>
		</div>
	)
}
