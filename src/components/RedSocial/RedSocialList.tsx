/* eslint-disable indent */
import './RedSocialList.css'
import redesJson from '../../data/redes_sociales.json'
import twitchContained from '../../assets/redes/twitch.svg'
import youtubeContained from '../../assets/redes/youtube.svg'
import instagramContained from '../../assets/redes/instagram.svg'
import twitchOutlined from '../../assets/redes/twitchOutlined.svg'
import youtubeOutlined from '../../assets/redes/youtubeOutlined.svg'
import instagramOutlined from '../../assets/redes/instagramOutlined.svg'
import tiktokOutlined from '../../assets/redes/tiktokOutlined.svg'
import xOutlined from '../../assets/redes/xOutlined.svg'
import { useLanguage } from '../../hooks/useLanguage'

interface Props {
  redes: string[]
  width?: number,
  type: 'contained' | 'outlined'
}
interface PropsItem {
	nombrePagina: string
	redSocial: string
	link: string
  width?: number,
  type: Props['type']
}
interface SocialMedia {
  es: SocialMediaItem[];
  en: SocialMediaItem[];
}
interface SocialMediaItem {
  nombrePagina: string;
  redSocial: string;
  colorPrincipal: string;
  link: string;
}
const redSocialJSON: SocialMedia = redesJson
const selectImage = (image: string, type: Props['type']) => {
	switch (image) {
		case 'instagram':
			if(type === 'contained') {
        return instagramContained
      }
      if(type === 'outlined') {
        return instagramOutlined
      }
      break
		case 'twitch':
			if(type === 'contained') {
        return twitchContained
      }
      if(type === 'outlined') {
        return twitchOutlined
      }
      break
		case 'youtube':
      if(type === 'contained') {
        return youtubeContained
      }
      if(type === 'outlined') {
        return youtubeOutlined
      }
      break
    case 'tiktok':
      if(type === 'contained') {
        return tiktokOutlined
      }
      if(type === 'outlined') {
        return tiktokOutlined
      }
      break
    case 'x':
      if(type === 'contained') {
        return xOutlined
      }
      if(type === 'outlined') {
        return xOutlined
      }
      break
	}
}
const RedSocialItem = ({
	nombrePagina,
	redSocial,
	link,
  width = 24,
  type
}: PropsItem) => {
	return (
      <li>
        <a
          href={link}
          target='_blank'
          rel="noreferrer"
        >
          <img src={selectImage(redSocial, type)} alt={`${redSocial} - ${nombrePagina}`} width={width} />
        </a>
      </li>
	)
}

export const RedSocialList = ({
  redes,
  width,
  type
}: Props) => {
  const lang = useLanguage()
  return (
    <ul className='d-flex gap-3 list-unstyled m-0 red_social_list'>
      {redes?.length > 0 && lang && redes.map(red => {
        const result = redSocialJSON[lang].find(el => el.redSocial === red)
        return result && <RedSocialItem
          key={red}
          width={width}
          redSocial={result.redSocial}
          link={result.link}
          nombrePagina={result.nombrePagina}
          type={type}
        />
      })}
    </ul>
  )
}
