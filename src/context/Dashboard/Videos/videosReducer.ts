import { VideosState } from './VideosProvider'

type VideosActionType = 
| {type: 'get_videos_latest'}
| {type: 'get_videos_trips'}
| {type: 'get_videos_interviews'}


export const videosReducer = (state: VideosState, action: VideosActionType): VideosState => {
	switch (action.type) {
	case 'get_videos_latest':
		return {
			...state,
		}
	case 'get_videos_trips':
		return {
			...state,
		}
	case 'get_videos_interviews':
		return {
			...state,
		}
	default:
		return state
	}
}