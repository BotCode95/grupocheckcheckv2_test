import { useState, useEffect } from 'react'
import { Grid, Typography, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { TextsContext } from '../../context/Dashboard/Texts/TextsContext'
import { NavLink } from 'react-router-dom'
import { useLanguage } from '../../hooks/useLanguage'

export const BannerFormaParte = () => {
	const [t] = useTranslation('global')
	const { text } = useContext(TextsContext)
	const [title_strong, setTitleStrong] = useState<string | undefined>(undefined)
	const [title, setTitle] = useState<string | undefined>(undefined)
	const lang = useLanguage()
	useEffect(() => {
		if (text.home.length) {
			setTitleStrong(text.home.split(' ')[0] + ' ' + text.home.split(' ')[1])
			setTitle(
				text.home.split(' ')[2] +
					' ' +
					text.home.split(' ')[3] +
					' ' +
					text.home.split(' ')[4] +
					' ' +
					text.home.split(' ')[5]
			)
		}
	})
	return (
		<Grid
			container
			className="banner_aplicar"
			display={'flex'}
			justifyContent={'center'}
			alignItems={'center'}
		>
			<Grid
				item
				xs={12}
				md={8}
				display={'flex'}
				justifyContent={'center'}
				alignItems={'center'}
			>
				<Typography
					variant="h3"
					color="white"
					sx={{
						fontSize: {
							md: 48,
							sm: 36,
							xs: 28,
						},
					}}
				>
					<strong>{title_strong ?? t('part_of_family.title_strong')}</strong>
					<span> {title ?? t('part_of_family.title')}</span>
				</Typography>
			</Grid>
			<Grid
				item
				xs={6}
				md={3}
				style={{
					backgroundColor: 'black',
					textAlign: 'center',
					boxShadow: '1px 1px 6px #432223',
				}}
			>
				<NavLink
					to={`/${lang}/signup`}
					rel="noreferrer"
					style={{ textDecoration: 'none' }}
				>
					<Button
						variant="contained"
						size={'large'}
						style={{
							backgroundColor: 'black',
							height: '60px',
							fontSize: 20,
						}}
					>
						{t('part_of_family.button')}
					</Button>
				</NavLink>
			</Grid>
			<Grid item xs={1} md={1}></Grid>
		</Grid>
	)
}
