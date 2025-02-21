/* eslint-disable @typescript-eslint/no-empty-interface */

export interface Data {
    text: IText[]
}

export interface EmailSend {
    code: string
    message: string
}

export interface IText {
    _id: string
    home: string
    us: string
    about_us: string
    language: string
    players: IPlayer[]
    imagesTrips: Blog,
    testimonials: ITestimonial[],
    questions: IQuestion[],
    homeTexts: IHomeTexts
}

export interface ITextOmitId extends Omit<IText, '_id'> { }

export interface IPlayer {
    player_name: string
    description: string
    type_of_game?: string
    values_game?: string
    extra_type_of_game: string
    extra_values_game: string
    coach: string
    coach_especialities: string
    flag?: string
    image?: string
}

export interface ITestimonial {
    title: string;
    description: string;
    author: string;
    image: string;
}

export interface IQuestion {
    title: string;
    description: string;
}

export interface Blog {
    title?: string;
    description?: string;
    trips: Trips[]
}
export interface Trips {
    id?: string
    title: string
    image: string
}

export interface IHomeTexts {
    title: string,
    description: string,
    why:WhyText,
    community:CommunityText,
    primaryCTA: {
        title: string,
        subtitle: string,
        button: string
    },
    secondaryCTA: {
        title: string,
        button: string
    },
    titleTeam: string,
    titleTestimonial: string,
    socialMediaMenu: Array<SocialMedia>,
    socialMediaFooter: Array<SocialMedia>
}


export interface WhyText {
    title: string,
    coaching: TextBanner,
    potential:TextBanner,
    growth: TextBanner,
}

export interface CommunityText {
    title: string,
    description: string,
    library: TextBanner
    coaching: TextBanner,
    support: TextBanner
}

export interface TextBanner {
    title: string
    description?: string
    image?: string
}

export interface SocialMedia {
    name: string,
    url: string,
    image: string
}