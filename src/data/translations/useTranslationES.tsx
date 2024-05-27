import { useContext, useEffect } from 'react'
import { TextsContext } from '../../context/Dashboard/Texts'

export const useTranslationES = () => {
	const { text, getTextByLanguage } = useContext(TextsContext)

	useEffect(() => {
		getTextByLanguage('es')
	}, [])

	const global_es: any = {
		navbar: {
			pages: {
				home: 'INICIO',
				us: 'NOSOTROS',
				interview: 'ENTREVISTAS',
				trips: 'VIAJES',
			},
			buttonsuscribe: 'INSCRIBITE',
			changeLanguage: 'Traducir la web a inglés',
		},
		part_of_family: {
			title: 'DE LA FAMILIA XX',
			title_strong: 'FORMÁ PARTE',
			button: 'aplicar aquí',
		},
		aboutme: {
			title: text.us,
			description_title:
				'CHECK CHECK es una empresa dedicada a la enseñanza y bancaje de jugadores que se dedican al POKER en la modalidad de SPIN AND GO.',
			description_details:
				'Nuestro trabajo es el puente que tenemos como conexión con el MUNDO, donde nuestra intención es ABRIR PUERTAS para que la comunidad vea la realidad de este rubro.',
			description_details_2:
				'Buena energía, compromiso, actitud y gente que ame este trabajo son los pilares de este proyecto del cual QUEREMOS QUE SEAS PARTE.',
		},
		latest_videos: {
			title: 'Últimos VIDEOS',
		},
		search: {
			title: '¿Qué buscamos?',
			items: [
				'Garra',
				'Esfuerzo',
				'Ganas',
				'Sinceridad',
				'Pasión',
				'Dedicación',
				'Estudio',
				'Motivación',
				'Compromiso',
				'Responsabilidad',
			],
		},
		offer: {
			title: '¿Qúe ofrecemos?',
			items: [
				'Pasión',
				'Lealtad',
				'Respeto',
				'Paciencia',
				'Estudio',
				'Disciplina',
				'Aprendizaje',
				'Dedicación',
				'Profesionalismo',
				'Acompañamiento',
			],
		},
		followed_in_social_media: 'Seguinos en nuestras redes',
		players: [
			{
				player_name: 'giuseppe',
				description:
					'Co-fundador de Check Check, más conocido como la Yiyoneta. Uno de los streamers principales de XX.',
				type_of_game: 'Regular',
				values_game: '250/500',
				coach: 'Coach',
				especialities: 'en $50s $100s $500s $1000s',
				image: 'giuseppe',
			},
			{
				player_name: 'Emiliano',
				description:
					'Co-fundador de Check Check. Fanático de los SPIN MAX. Uno de los streamers principales de XX.',
				type_of_game: 'Regular',
				values_game: '100/250/500S',
				coach: 'Coach SPIN ULTRA',
				especialities: 'en $50 $100s',
				image: 'emiliano',
			},
			{
				player_name: 'Mathias',
				description:
					'Co-fundador de Check Check. Fanático de los SPIN MAX. Uno de los streamers principales de XX.',
				type_of_game: 'Regular',
				values_game: '100/250/500s',
				coach: 'Coach SPIN ULTRA',
				especialities: 'en $20s',
				image: 'mathias',
			},
			{
				player_name: 'Elson',
				description:
					'Integrante de la Familia hace 2 años. Regular 50/100 Coach en 10-20s',
				type_of_game: 'Regular',
				values_game: '50/100',
				coach: 'Coach',
				especialities: 'en $10 $20s',
				image: 'elson',
			},
			{
				player_name: 'Mariano',
				description: 'Integrante de la Familia XX. Apasionado por el poker.',
				type_of_game: 'Regular',
				values_game: '50s',
				coach: 'Coach SPIN ULTRA',
				especialities: 'en $3 $5s',
				image: 'mariano',
			},
			{
				player_name: 'Hernán',
				description: 'Integrante de la Familia XX. Apasionado por el poker.',
				type_of_game: 'Regular',
				values_game: '50s',
				coach: 'Coach SPIN ULTRA',
				especialities: 'en $0.25 $1 $3s',
				image: 'hernan',
			},
			{
				player_name: 'José',
				description: 'Integrante de la Familia XX, Apasionado por el poker.',
				type_of_game: 'Regular',
				values_game: '20s',
				coach: 'Coach REG SPEED',
				especialities: 'en $3 $5 $10s',
				image: 'jose',
			},
			{
				player_name: 'Nicolás',
				description: 'Integrante de la Familia XX, Apasionado por el poker.',
				type_of_game: 'Regular',
				values_game: '',
				coach: 'Coach REG SPEED',
				especialities: 'en $0.25 $1 $3s',
				image: 'nicolas',
			},
		],
		trips: {
			title: 'Viajes',
			rosario: 'CAP ROSARIO',
		},
	}
	return {
		global_es,
	}
}
