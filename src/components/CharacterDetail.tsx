import axios from "axios";
import { useParams } from "react-router-dom";
import {useQuery} from '@tanstack/react-query'
import Loader from "./Loader";
import toast from "react-hot-toast";
import { ICharacter } from "../generalTypes";


const fetchCharacter=async(paramId:string)=>{
    const data=await axios.get(`https://rickandmortyapi.com/api/character/${paramId}`)
    return data
  }
  

function CharacterDetail() {
    const {id:paramId}=useParams();
    if (!paramId) return <p>nothing found</p>

        //! useQuery function
        const { isLoading, isError, data,error:chracterQueryError } = useQuery({
            queryKey: ['characters',paramId],
            queryFn:()=> fetchCharacter(paramId),
          });
    
    if(isLoading) return <div className='w-full h-screen flex justify-center items-center'><Loader  size={50} /></div>
    if(isError) return <div>{toast.error(chracterQueryError?.response?.data?.error)}</div>
    if(data)return (
    <div className="flex flex-col gap-5">
        <CharacterDetailMain character={data.data} />
        <CharacterDetailEpisodes />
    </div>
  )
}

export default CharacterDetail;


import { FcBusinesswoman, FcBusinessman } from "react-icons/fc";
interface ICharacterDetailMainProps{
    character:ICharacter;
}
function CharacterDetailMain({character}:ICharacterDetailMainProps) {
  return (
    <div className='flex flex-col h-80 w-80 rounded-md  text-xs bg-color-secondary'>
      {/*! image section */}
      <div>
        <img className='w-full h-full object-cover' src={character.image} alt={character.name} />
      </div>
      {/*! info section */}
      <div className='flex-1 flex flex-col  px-3 py-1'>
        <div className='flex-1 flex flex-col justify-between gap-5'>
        <div className='flex gap-1 items-center'>
          {character.gender==="Male"?<FcBusinessman className="mobile-icon hover:cursor-pointer"/>
          :<FcBusinesswoman className="mobile-icon hover:cursor-pointer"/>
          }
        
          <p className={`text-ellipsis overflow-hidden`}>{character.name.length>20 ? character.name.substring(0,20)+"...":character.name}</p>
        </div>
        <div>
          <span className="w-2 h-2 rounded-full bg-green-300"></span>
          <p>{character.status}-</p>
          <p>{character.species}</p>
        </div>
        </div>
      </div>
    </div>
  )
}

function CharacterDetailEpisodes() {
    return (
      <div>Main</div>
    )
  }
