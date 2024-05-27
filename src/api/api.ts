import axios, { AxiosRequestConfig } from 'axios'

const baseUrl = `${process.env.REACT_APP_BACKEND_URL}/api`

const api = axios.create({baseURL: baseUrl})


api.interceptors.request.use(
	async (config: AxiosRequestConfig ) => {
		const token = await localStorage.getItem('token')
		if(token) {
			if(config.headers){
				config.headers['x-token'] = token
			}
		}
		return config
	}
)
export default api