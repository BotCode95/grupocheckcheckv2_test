import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import { IQuestion } from '../../types/texts'
import Edit from '@mui/icons-material/Edit'
import Delete from '@mui/icons-material/Delete'
import { styled } from '@mui/material/styles'
import { useContext, useMemo, useState } from 'react'
import { TextsContext } from '../../context/Dashboard/Texts/TextsContext'
import ControlPoint from '@mui/icons-material/ControlPoint'
import TestimonialModal from './TestimonialModal'
import QuestionModal from './QuestionModal'
import { truncateText } from '../../utils/utils'

interface IModalQuestionOptions {
	open: boolean,
	action: 'edit' | 'create' | null,
	data: IQuestion | undefined
}

interface IModalDelete {
	open: boolean,
	data: IQuestion | undefined
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: 'var(--primary-color)',
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
		color: theme.palette.common.white
	},
}))

const StyledButton = styled(Button)({
	'&.MuiButton-root': {
		backgroundColor: 'var(--secondary-color)',
	},
})

const ROWS_PER_PAGE = 8

export const Questions = () => {
	const { text, updateTexts, getTextByLanguage, language, setLoading } =
		useContext(TextsContext)
	const [page, setPage] = useState(0)
	const [showModalQuestions, setShowModalQuestions] = useState<IModalQuestionOptions>({ open: false, action: null , data: undefined})
	const [showDeleteModal, setShowDeleteModal] = useState<IModalDelete>({ open: false, data: undefined })
	const visibleRows = useMemo(() => text && [...text.questions].slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE),
		[page, ROWS_PER_PAGE, text],
	)

	const handleSave = (action: 'create' | 'edit', data: IQuestion) => {
		setLoading(true)
		const questions = [...text.questions]
		if (action === 'create') {
			questions.push(data)
		} else if (action === 'edit') {
			const index = questions.findIndex(el => el.title === data.title)
			questions[index] = data
		}
		const newText = { ...text, questions }
		console.log('Datos guardados:', {id: text._id, data, text, newText })
		updateTexts(text._id, newText).finally(() => {
			getTextByLanguage(language).finally(() => {
				setLoading(false)
			})
		})
	}

	const handleCreateQuestion = () => {
		setShowModalQuestions({ open: true, data: undefined, action: 'create' })
	}

	const handleEditQuestion = (question: IQuestion) => {
		setShowModalQuestions({ open: true, data: question, action: 'edit'})
	}

	const handleDeleteQuestion = () => {
		const newQuestions = text?.questions.filter(el => !(el.title === showDeleteModal.data?.title))
		const newText = { ...text, questions: newQuestions }
		updateTexts(text._id, newText).finally(() => {
			getTextByLanguage(language).finally(() => {
				setLoading(false)
			})
		})
		console.log('Datos eliminados:', {showDeleteModal, newQuestions})
	}

	return <>
		<QuestionModal
			open={showModalQuestions.open}
			onClose={() => setShowModalQuestions({ open: false, data: undefined, action: null })}
			onSave={handleSave}
			initialData={showModalQuestions.data}
		/>
		<Dialog open={showDeleteModal.open} onClose={() => {setShowDeleteModal({ open: false, data: undefined })}} maxWidth="sm" fullWidth>
			<DialogTitle>Eliminar Pregunta</DialogTitle>
			<DialogContent>
				<Typography variant="body1" gutterBottom>
					¿Está seguro que desea eliminar la pregunta {showDeleteModal.data?.title}?
				</Typography>
			</DialogContent>
			<DialogActions sx={{ p: '1em' }}>
				<Button onClick={() => setShowDeleteModal({ open: false, data: undefined })} style={{ color: 'var(--secondary-color)'}}>
					Cancelar
				</Button>
				<StyledButton onClick={handleDeleteQuestion} color="primary" variant="contained">
					Eliminar
				</StyledButton>
			</DialogActions>
		</Dialog>
		<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
			<h3>Preguntas</h3>
			<Button 
				sx={{ bgcolor: 'var(--primary-color)', color: 'white', px: '1.5em', gap: '0.4em', textTransform: 'capitalize', borderRadius: '0.5em'}}
				onClick={() => {handleCreateQuestion()}}
			>
				<ControlPoint sx={{ fontSize: '1.3em'}}/>Nueva Pregunta
			</Button>
		</div>
		{ visibleRows?.length > 0 && <>
			<TableContainer style={{borderTopLeftRadius: '0.5em', borderTopRightRadius: '0.5em', marginTop: '2em', width: '100%'}}>
				<Table style={{color: 'white'}}>
					<TableHead>
						<TableRow>
							<StyledTableCell>
								Título
							</StyledTableCell>
							<StyledTableCell>
								Descripción
							</StyledTableCell>
							<StyledTableCell align='center'>
								Acciones
							</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{visibleRows?.map((question) => {
							return (<TableRow key={question?.title}>
								<StyledTableCell>
									{question?.title}
								</StyledTableCell>
								<StyledTableCell>
									{truncateText(question?.description, 70) || '-'}
								</StyledTableCell>
								<StyledTableCell sx={{textAlign: 'center'}}>
									<Button style={{padding:'0', minWidth: 'inherit', color: 'white', marginRight: '0.5em'}} onClick={()=> {handleEditQuestion(question)}}>
										<Edit fontSize='small'/>
									</Button>
									<Button style={{padding:'0', minWidth: 'inherit', color: 'white'}} onClick={()=> {setShowDeleteModal({ open: true, data: question })}}>
										<Delete fontSize='small'/>
									</Button>
								</StyledTableCell>
							</TableRow>)
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination labelDisplayedRows={(paginationInfo) => {
				return `${paginationInfo.from}-${paginationInfo.to} de ${paginationInfo.count}`
			}} rowsPerPageOptions={[ROWS_PER_PAGE]} style={{color: 'white'}} component='div' count={text?.questions?.length} rowsPerPage={ROWS_PER_PAGE} page={page} onPageChange={(e, newPage) => setPage(newPage)} />
		</>
		}
	</>
}