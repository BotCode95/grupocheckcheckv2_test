import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Table,
	TableBody,
	TableCell,
	tableCellClasses,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from '@mui/material'
import { IPlayer } from '../../types/texts'
import Edit from '@mui/icons-material/Edit'
import Delete from '@mui/icons-material/Delete'
import { styled } from '@mui/material/styles'
import { useContext, useMemo, useState } from 'react'
import { TextsContext } from '../../context/Dashboard/Texts/TextsContext'
import PlayerModal from './PlayerModal'
import ControlPoint from '@mui/icons-material/ControlPoint'

interface IModalPlayerOptions {
	open: boolean
	action: 'edit' | 'create' | null
	data: IPlayer | undefined
}

interface IModalDelete {
	open: boolean
	data: IPlayer | undefined
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: 'var(--primary-color)',
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
		color: theme.palette.common.white,
	},
}))

const StyledButton = styled(Button)({
	'&.MuiButton-root': {
		backgroundColor: 'var(--secondary-color)',
	},
})

const ROWS_PER_PAGE = 8

export const Players = () => {
	const { text, updateTexts, getTextByLanguage, language, setLoading } =
		useContext(TextsContext)
	const [page, setPage] = useState(0)
	const [modalPlayerOptions, setModalPlayerOptions] =
		useState<IModalPlayerOptions>({
			open: false,
			action: null,
			data: undefined,
		})
	const [showDeleteModal, setShowDeleteModal] = useState<IModalDelete>({
		open: false,
		data: undefined,
	})
	const visibleRows = useMemo(
		() =>
			text &&
			[...text.players].slice(
				page * ROWS_PER_PAGE,
				page * ROWS_PER_PAGE + ROWS_PER_PAGE
			),
		[page, ROWS_PER_PAGE, text]
	)

	const handleSave = (action: 'create' | 'edit', data: IPlayer) => {
		setLoading(true)
		const players = [...text.players]
		if (action === 'create') {
			players.push(data)
		} else if (action === 'edit') {
			const index = players.findIndex(
				(el) => el.player_name === data.player_name
			)
			players[index] = data
		}
		const newText = { ...text, players }
		console.log('Datos guardados:', { id: text._id, data, text, newText })
		updateTexts(text._id, newText).finally(() => {
			getTextByLanguage(language, false).finally(() => {
				setLoading(false)
			})
		})
	}

	const handleCreatePlayer = () => {
		setModalPlayerOptions({ open: true, data: undefined, action: 'create' })
	}

	const handleEditPlayer = (player: IPlayer) => {
		setModalPlayerOptions({ open: true, data: player, action: 'edit' })
	}

	const handleDeletePlayer = () => {
		const newPlayers = text?.players.filter(
			(el) => !(el.player_name === showDeleteModal.data?.player_name)
		)
		const newText = { ...text, players: newPlayers }
		updateTexts(text._id, newText).finally(() => {
			getTextByLanguage(language, false).finally(() => {
				setLoading(false)
			})
		})
		console.log('Datos eliminados:', { showDeleteModal, newPlayers })
	}

	return (
		<>
			<PlayerModal
				open={modalPlayerOptions.open}
				onClose={() =>
					setModalPlayerOptions({ open: false, data: undefined, action: null })
				}
				onSave={handleSave}
				initialData={modalPlayerOptions.data}
			/>
			<Dialog
				open={showDeleteModal.open}
				onClose={() => {
					setShowDeleteModal({ open: false, data: undefined })
				}}
				maxWidth="sm"
				fullWidth
			>
				<DialogTitle>Eliminar Jugador</DialogTitle>
				<DialogContent>
					<Typography variant="body1" gutterBottom>
						¿Está seguro que desea eliminar al jugador{' '}
						{showDeleteModal.data?.player_name}?
					</Typography>
				</DialogContent>
				<DialogActions sx={{ p: '1em' }}>
					<Button
						onClick={() => setShowDeleteModal({ open: false, data: undefined })}
						style={{ color: 'var(--secondary-color)' }}
					>
						Cancelar
					</Button>
					<StyledButton
						onClick={handleDeletePlayer}
						color="primary"
						variant="contained"
					>
						Eliminar
					</StyledButton>
				</DialogActions>
			</Dialog>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<h3>Jugadores</h3>
				<Button
					sx={{
						bgcolor: 'var(--primary-color)',
						color: 'white',
						px: '1.5em',
						gap: '0.4em',
						textTransform: 'capitalize',
						borderRadius: '0.5em',
					}}
					onClick={() => {
						handleCreatePlayer()
					}}
				>
					<ControlPoint sx={{ fontSize: '1.3em' }} />
					Nuevo Jugador
				</Button>
			</div>
			{visibleRows?.length > 0 && (
				<>
					<TableContainer
						style={{
							borderTopLeftRadius: '0.5em',
							borderTopRightRadius: '0.5em',
							marginTop: '2em',
							width: '100%',
						}}
					>
						<Table style={{ color: 'white' }}>
							<TableHead>
								<TableRow>
									<StyledTableCell>Foto</StyledTableCell>
									<StyledTableCell>Nombre</StyledTableCell>
									<StyledTableCell>Bandera</StyledTableCell>
									<StyledTableCell>Coach</StyledTableCell>
									<StyledTableCell>Spin</StyledTableCell>
									<StyledTableCell>Cargo</StyledTableCell>
									<StyledTableCell align="center">Acciones</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{visibleRows?.map((player) => {
									return (
										<TableRow key={player?.player_name}>
											<StyledTableCell>
												<div style={{}}>
													<img
														src={player?.image}
														style={{
															width: '40px',
															height: '40px',
															borderRadius: '50%',
															objectFit: 'cover',
														}}
													/>
												</div>
											</StyledTableCell>
											<StyledTableCell>{player?.player_name}</StyledTableCell>
											<StyledTableCell>
												<div>
													<img
														src={player?.flag}
														width="100%"
														style={{ maxWidth: '25px' }}
													/>
												</div>
											</StyledTableCell>
											<StyledTableCell>{player?.coach || '-'}</StyledTableCell>
											<StyledTableCell>
												{player?.type_of_game || '-'}
											</StyledTableCell>
											<StyledTableCell>
												{player?.extra_type_of_game || '-'}
											</StyledTableCell>
											<StyledTableCell sx={{ textAlign: 'center' }}>
												<Button
													style={{
														padding: '0',
														minWidth: 'inherit',
														color: 'white',
														marginRight: '0.5em',
													}}
													onClick={() => {
														handleEditPlayer(player)
													}}
												>
													<Edit fontSize="small" />
												</Button>
												<Button
													style={{
														padding: '0',
														minWidth: 'inherit',
														color: 'white',
													}}
													onClick={() => {
														setShowDeleteModal({ open: true, data: player })
													}}
												>
													<Delete fontSize="small" />
												</Button>
											</StyledTableCell>
										</TableRow>
									)
								})}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						labelDisplayedRows={(paginationInfo) => {
							return `${paginationInfo.from}-${paginationInfo.to} de ${paginationInfo.count}`
						}}
						rowsPerPageOptions={[ROWS_PER_PAGE]}
						style={{ color: 'white' }}
						component="div"
						count={text?.players?.length}
						rowsPerPage={ROWS_PER_PAGE}
						page={page}
						onPageChange={(e, newPage) => setPage(newPage)}
					/>
				</>
			)}
		</>
	)
}
