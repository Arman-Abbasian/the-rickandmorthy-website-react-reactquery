import axios from "axios";
import { useParams } from "react-router-dom";
import {useQuery} from '@tanstack/react-query'
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { ICharacter, IEpisode } from "../generalTypes";
import { HiOutlineFilm } from "react-icons/hi";
import { BsArrowDownCircle } from "react-icons/bs";
import { AxiosError } from 'axios' 


const fetchCharacter=async(paramId:string)=>{
    const data=await axios.get(`https://rickandmortyapi.com/api/character/${paramId}`)
    return data
  }
  const fetchCharacterEpisodes=async(episodes:string[])=>{
    const data=await axios.get(`https://rickandmortyapi.com/api/episode/${episodes}`)
    return data
  }
  

function CharacterDetail() {
  const [sortEpisode,setSortEpisode]=useState<boolean>(true)
    const {id:paramId}=useParams();

    const changeSort=()=>{
      console.log("first")
      setSortEpisode((prev)=>!prev)
    }
        //! useQuery function
        const { isLoading, isError, data,error:chracterQueryError } = useQuery({
            queryKey: ['characters',paramId],
            queryFn:()=> fetchCharacter(paramId!),
          });

      let episodesArray:string[]=[];
      const episodes=data?.data?.episode;
      if(Array.isArray(episodes)){
       const arr= episodes?.map(item=>item.split("/").at(-1))
       episodesArray=arr;
      }else{
      const item=episodes?.split("/").at(-1)
      episodes?.push(item)
    }
          const { data:charachterEpisodeData} = useQuery({
            queryKey: ['characterEpisodes',episodesArray],
            queryFn:()=> fetchCharacterEpisodes(episodesArray),
            enabled:episodesArray.length>0
          });
          let sortedEpisodes:IEpisode[]=[];
          if(charachterEpisodeData){
            if(sortEpisode){
              sortedEpisodes= [charachterEpisodeData.data].flat().sort((a,b)=>+new Date(b.created) - +new Date(a.created))
          
          }else{
            sortedEpisodes= [charachterEpisodeData.data].flat().sort((a,b)=>+new Date(a.created) - +new Date(b.created))
          }
          console.log(sortedEpisodes)
        }
        

    if(isLoading) return <div className='w-full h-screen flex justify-center items-center'><Loader  size={50} /></div>
    if(isError && chracterQueryError instanceof AxiosError) return <div>{toast.error(chracterQueryError?.response?.data?.error)}</div>
    if(data && sortedEpisodes.length>0)return (
    <div className="flex flex-col gap-5 max-w-xl  items-center container mx-auto md:flex-row md:gap-10 md:items-start">
        <CharacterDetailMain character={data.data} />
        <div className='flex flex-col p-2  w-72 max-h-96 overflow-y-auto rounded-md text-xs bg-color-secondary'>
          <header  className="flex justify-between items-center mb-4">
            <HiOutlineFilm className="mobile-icon"/>
            <button onClick={changeSort} ><BsArrowDownCircle className={`mobile-icon transition-all duration-300 ${sortEpisode?'rotate0':'rotate-180'}`} /></button>
          </header>
          <div className="flex flex-col gap-2">
          {
          sortedEpisodes.map((item:IEpisode,index:number)=>(
            <CharacterDetailEpisodes rowNumber={String(index+1).padStart(2,"0")} episode={item} />
            ))
          }
          </div>
        
        </div>
    </div>
  )
}

export default CharacterDetail;


import { FcBusinesswoman, FcBusinessman } from "react-icons/fc";
import { CiLocationOn ,  } from "react-icons/ci";
import { ReactNode, useState } from "react";
interface ICharacterDetailMainProps{
    character:ICharacter;
}
function CharacterDetailMain({character}:ICharacterDetailMainProps) {
  const createdDate:ReactNode=new Date(character.created).toLocaleDateString('en-US',{day:"numeric",month:"short",year:"numeric"})
  return (
    <div className='flex flex-col  w-72 h-96 overflow-hidden  rounded-md text-xs bg-color-secondary'>
      {/*! image section */}
      <div className="h-1/2">
        <img className='w-full h-full object-cover' src={character.image} alt={character.name} />
      </div>
      {/*! info section */}
      <div className='flex-1 flex flex-col  px-3 py-1'>
        <div className='flex-1 flex flex-col justify-between gap-5'>
        <p className='flex gap-1 items-center'>
          {character.gender==="Male"?<FcBusinessman className="mobile-icon hover:cursor-pointer"/>
          :<FcBusinesswoman className="mobile-icon hover:cursor-pointer"/>
          }
        
          <p className={`text-ellipsis overflow-hidden`}>{character.name.length>20 ? character.name.substring(0,20)+"...":character.name}</p>
        </p>
        <div className="flex gap-1 items-center">
          <span className="w-2 h-2 rounded-full bg-green-300"></span>
          <p>{character.status}-</p>
          <p>{character.species}</p>
        </div>
        <p className="flex gap-1 items-center"><span><CiLocationOn className="mobile-icon"/></span> <span>{character.location.name}</span></p>
        <p><strong className="font-bold">origin : </strong> {character.origin.name}</p>
        <p><strong className="font-bold">created : </strong> {createdDate}</p>
        </div>
      </div>
    </div>
  )
}
interface ICharacterDetailEpisodesProps{
  rowNumber:string;
  episode:IEpisode;
}
function CharacterDetailEpisodes({rowNumber,episode}:ICharacterDetailEpisodesProps) {
  const createdDate:ReactNode=new Date(episode.created).toLocaleDateString('en-US',{day:"numeric",month:"short",year:"numeric"})
    return (
      <div className="flex items-center justify-between">
        <p>{rowNumber}: {episode.episode}</p>
        <span>{createdDate}</span>
      </div>
    )
  }
