import './BannerPage.css'

interface Props {
  title: string
}

export const BannerPage = ({ title }: Props) => {
	return <div className="bannerPage">
		<div className="bannerPage_container">
			<h1>{title}</h1>
		</div>
	</div>
}