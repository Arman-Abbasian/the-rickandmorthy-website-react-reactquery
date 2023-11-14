interface Origin {
    name: string;
    url: string;
  }
export interface ICharacter {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: Origin;
    location: Origin;
    image: string;
    episode: string[];
    url: string;
    created: string;
  }

  export interface IEpisode{
      id: number;
      name: string;
      air_date: string;
      episode: string;
      characters: string[]|object;
      url: string;
      created: string;
    }

  export interface IRadioItem{
    value:string;
    label:string
  }