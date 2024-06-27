/* eslint-disable indent */
import './RedSocialList.css'
import redesJson from '../../data/redes_sociales.json'
import twitchImg from '../../assets/redes/twitch.svg'
import youtubeImg from '../../assets/redes/youtube.svg'
import gmailImg from '../../assets/redes/gmail.svg'
import facebookImg from '../../assets/redes/facebook.svg'
import instagramImg from '../../assets/redes/instagram.svg'
import twitterImg from '../../assets/redes/twitter.svg'
interface Props {
  redes: string[]
  width?: number
}
interface PropsItem {
	nombrePagina: string
	redSocial: string
	link: string
  width?: number
}
interface SocialMedia {
  nombrePagina: string;
  redSocial: string;
  colorPrincipal: string;
  link: string;
}
const redSocialJSON: SocialMedia[] = redesJson
const selectImage = (image: string) => {
	switch (image) {
		case 'instagram':
			return instagramImg
		case 'twitch':
			return twitchImg
		case 'youtube':
			return youtubeImg
		case 'gmail':
			return gmailImg
		case 'twitter':
			return twitterImg
    case 'facebook': 
      return facebookImg
		default:
			return twitterImg
	}
}
const RedSocialItem = ({
	nombrePagina,
	redSocial,
	link,
  width = 24
}: PropsItem) => {
	return (
      <li>
        <a
          href={link}
          target='_blank'
          rel="noreferrer"
        >
          <img src={selectImage(redSocial)} alt={`${redSocial} - ${nombrePagina}`} width={width} />
        </a>
      </li>
	)
}

export const RedSocialList = ({
  redes,
  width
}: Props) => {
  return (
    <ul className='d-flex gap-3 list-unstyled m-0 red_social_list'>
      {redes?.length > 0 && redes.map(red => {
        const result = redSocialJSON.find(el => el.redSocial === red)
        return result && <RedSocialItem
          key={red}
          width={width}
          redSocial={result.redSocial}
          link={result.link}
          nombrePagina={result.nombrePagina}  
        />
      })}
    </ul>
  )
}
