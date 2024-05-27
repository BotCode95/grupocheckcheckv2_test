export interface Video {
    _id: string
    url: string
}


export interface VideoTrips {
    _id: string
    url: string
    city: string
}



export interface VideoResponse {
    title:  string;
    image:  string;
    videos: string[];
}
