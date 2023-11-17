import axios from "axios";
import { ICharacter, IEpisode } from "../generalTypes";
import {useQuery} from '@tanstack/react-query';
import { AxiosError } from 'axios' 
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const fetchEpisodes=async()=>{
    const data=await axios.get(`https://rickandmortyapi.com/api/episode`)
    return data
  }
  const fetchEpisodeCharacters=async(characters:string[])=>{
    const data=await axios.get(`https://rickandmortyapi.com/api/character/${characters}`)
    return data
  }

  

function Episodes() {
    const { isLoading:isEpisodesLoading, isError:isEpisodesError, data:episodeData,error:episodesError } = useQuery({
        queryKey: ['episodes'],
        queryFn:()=> fetchEpisodes(),
      });


      let charactersArray:string[]=[];
      const characters=episodeData?.data?.characters;
      if(Array.isArray(characters)){
       const arr= characters?.map(item=>item.split("/").at(-1))
       charactersArray=arr;
      }else{
      const item=characters?.split("/").at(-1)
      charactersArray.push(item)
    }
          const { data:episodeCharactersData} = useQuery({
            queryKey: ['episodeCharacters',charactersArray],
            queryFn:()=> fetchEpisodeCharacters(charactersArray),
            enabled:charactersArray.length>0
          });
      if(isEpisodesLoading) return <div className='w-full h-screen flex justify-center items-center'><Loader  size={50} /></div>
      if(isEpisodesError && episodesError instanceof AxiosError) return <div>{toast.error(episodesError?.response?.data?.error)}</div>
      if(episodeData)
      return (
    <div className="flex flex-wrap gap-4">
        {episodeData && episodeCharactersData &&  episodeData.data.results.map((item:IEpisode)=>(
            <Episode episode={item} characters={episodeCharactersData.data.results}   />
        ))}
        
    </div>
  )
}

export default Episodes;




interface IEpisodeProps{
    episode:IEpisode;
    characters:ICharacter[];
}


function Episode({episode,characters}:IEpisodeProps) {
  return (
    <div className='flex h-36 w-96 rounded-md overflow-hidden text-xs bg-color-secondary'>
      {/*! image section */}
      <div>
        <img className='w-full h-full object-cover' src={'/images/episodePoster.png'} alt={episode.episode} />
      </div>
      {/*! info section */}
      <div className='flex-1 flex flex-col  p-3'>
        <div className='flex flex-col gap-0.5 h-12 mb-3'>
          <p>episode: {episode.episode}</p>
          <p>name: {episode.name.length>20 ? episode.name.substring(0,20)+"...":episode.name}</p>
          <h2  className="font-bold">characters</h2>
        </div>
        <div className="h-24 overflow-y-auto">
          <div className="flex flex-col gap-0.5">
          {characters && [characters].flat().map((character:ICharacter)=>{
            return <div className="flex items-center gap-2" >
                <div className="w-5 h-5 rounded-full overflow-hidden"><img className='w-full h-full object-cover' src={character.image} alt={character.name} /></div>
                <p>{character.name.length>13 ? character.name.substring(0,13)+"...":character.name}</p>
            </div>
          })}
          </div>
        </div>
      </div>
    </div>
  )
}
