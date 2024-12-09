import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import { ITestimonial } from '../../types/texts'
import Edit from '@mui/icons-material/Edit'
import Delete from '@mui/icons-material/Delete'
import { styled } from '@mui/material/styles'
import { useContext, useMemo, useState } from 'react'
import { TextsContext } from '../../context/Dashboard/Texts/TextsContext'
import ControlPoint from '@mui/icons-material/ControlPoint'
import TestimonialModal from './TestimonialModal'

interface IModalTestimonialOptions {
	open: boolean,
	action: 'edit' | 'create' | null,
	data: ITestimonial | undefined
}

interface IModalDelete {
	open: boolean,
	data: ITestimonial | undefined
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

export const Testimonials = () => {
	const { text, updateTexts, getTextByLanguage, language, setLoading } =
		useContext(TextsContext)
	const [page, setPage] = useState(0)
	const [showModalTestimonials, setShowModalTestimonials] = useState<IModalTestimonialOptions>({ open: false, action: null , data: undefined})
	const [showDeleteModal, setShowDeleteModal] = useState<IModalDelete>({ open: false, data: undefined })
	const visibleRows = useMemo(() => text && [...text.testimonials].slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE),
		[page, ROWS_PER_PAGE, text],
	)

	const handleSave = (action: 'create' | 'edit', data: ITestimonial) => {
		setLoading(true)
		const testimonials = [...text.testimonials]
		if (action === 'create') {
			testimonials.push(data)
		} else if (action === 'edit') {
			const index = testimonials.findIndex(el => el.author === data.author)
			testimonials[index] = data
		}
		const newText = { ...text, testimonials }
		console.log('Datos guardados:', {id: text._id, data, text, newText })
		updateTexts(text._id, newText).finally(() => {
			getTextByLanguage(language).finally(() => {
				setLoading(false)
			})
		})
	}

	const handleCreateTestimonial = () => {
		setShowModalTestimonials({ open: true, data: undefined, action: 'create' })
	}

	const handleEditTestimonial = (testimonial: ITestimonial) => {
		setShowModalTestimonials({ open: true, data: testimonial, action: 'edit'})
	}

	const handleDeleteTestimonial = () => {
		const newTestimonials = text?.testimonials.filter(el => !(el.author === showDeleteModal.data?.author))
		const newText = { ...text, testimonials: newTestimonials }
		updateTexts(text._id, newText).finally(() => {
			getTextByLanguage(language).finally(() => {
				setLoading(false)
			})
		})
		console.log('Datos eliminados:', {showDeleteModal, newTestimonials})
	}

	return <>
		<TestimonialModal
			open={showModalTestimonials.open}
			onClose={() => setShowModalTestimonials({ open: false, data: undefined, action: null })}
			onSave={handleSave}
			initialData={showModalTestimonials.data}
		/>
		<Dialog open={showDeleteModal.open} onClose={() => {setShowDeleteModal({ open: false, data: undefined })}} maxWidth="sm" fullWidth>
			<DialogTitle>Eliminar Testimonio</DialogTitle>
			<DialogContent>
				<Typography variant="body1" gutterBottom>
					¿Está seguro que desea eliminar el testimonio de {showDeleteModal.data?.author}?
				</Typography>
			</DialogContent>
			<DialogActions sx={{ p: '1em' }}>
				<Button onClick={() => setShowDeleteModal({ open: false, data: undefined })} style={{ color: 'var(--secondary-color)'}}>
					Cancelar
				</Button>
				<StyledButton onClick={handleDeleteTestimonial} color="primary" variant="contained">
					Eliminar
				</StyledButton>
			</DialogActions>
		</Dialog>
		<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
			<h3>Testimonios</h3>
			<Button 
				sx={{ bgcolor: 'var(--primary-color)', color: 'white', px: '1.5em', gap: '0.4em', textTransform: 'capitalize', borderRadius: '0.5em'}}
				onClick={() => {handleCreateTestimonial()}}
			>
				<ControlPoint sx={{ fontSize: '1.3em'}}/>Nuevo Testimonio
			</Button>
		</div>
		{ visibleRows?.length > 0 && <>
			<TableContainer style={{borderTopLeftRadius: '0.5em', borderTopRightRadius: '0.5em', marginTop: '2em', width: '100%'}}>
				<Table style={{color: 'white'}}>
					<TableHead>
						<TableRow>
							<StyledTableCell>
								Foto
							</StyledTableCell>
							<StyledTableCell>
								Autor
							</StyledTableCell>
							<StyledTableCell>
								Título
							</StyledTableCell>
							<StyledTableCell align='center'>
								Acciones
							</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{visibleRows?.map((testimonial) => {
							return (<TableRow key={testimonial?.author}>
								<StyledTableCell>
									<div style={{ }} ><img src={testimonial?.image} style={{width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover'}} /></div>
								</StyledTableCell>
								<StyledTableCell>
									{testimonial?.author}
								</StyledTableCell>
								<StyledTableCell>
									{testimonial?.title || '-'}
								</StyledTableCell>
								<StyledTableCell sx={{textAlign: 'center'}}>
									<Button style={{padding:'0', minWidth: 'inherit', color: 'white', marginRight: '0.5em'}} onClick={()=> {handleEditTestimonial(testimonial)}}>
										<Edit fontSize='small'/>
									</Button>
									<Button style={{padding:'0', minWidth: 'inherit', color: 'white'}} onClick={()=> {setShowDeleteModal({ open: true, data: testimonial })}}>
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
			}} rowsPerPageOptions={[ROWS_PER_PAGE]} style={{color: 'white'}} component='div' count={text?.testimonials?.length} rowsPerPage={ROWS_PER_PAGE} page={page} onPageChange={(e, newPage) => setPage(newPage)} />
		</>}
	</>
}