import axios from "axios";
import { ICharacter, IEpisode } from "../generalTypes";
import {useQuery} from '@tanstack/react-query';
import { AxiosError } from 'axios' 
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import {  useState,useEffect } from "react";
import ReactSelectFilter, { IReactSelectOption } from "../components/FilterComponents/ReactSelectFilter";
import queryString from "query-string";
import { Navigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import { GroupBase, OptionsOrGroups } from "react-select";


interface ISearchParams{
  page:number;
  name?:string;
  episode?:string
}
const fetchEpisodes=async(queryFilters:string)=>{
    const data=await axios.get(`https://rickandmortyapi.com/api/episode?${queryFilters}`)
    return data
  }
  const fetchEpisodeCharacters=async(characters:string[])=>{
    const data=await axios.get(`https://rickandmortyapi.com/api/character/${characters}`)
    return data
  }

  

function Episodes() {
  const [page,setPage]=useState<number>(1);
  const [nameFilter,setNameFilter]=useState<string>("");
  const [episodeFilter,setEpisodeFilter]=useState<string>("");
  const [reactSelectNamesOption,setReactSelectNamesOption]=useState<OptionsOrGroups<IReactSelectOption[], GroupBase<IReactSelectOption[]>>>([])
  const [reactSelectEpisodesOption,setReactSelectEpisodesOption]=useState<OptionsOrGroups<IReactSelectOption[], GroupBase<IReactSelectOption[]>>>([])

  const searchParams:ISearchParams={page:page};
  if(nameFilter) searchParams.name=nameFilter;
  if(episodeFilter) searchParams.episode=episodeFilter;
  const queryFilters:string=queryString.stringify(searchParams);
    const { isLoading:isEpisodesLoading, isError:isEpisodesError, 
      data:episodeData,error:episodesError } = useQuery({
        queryKey: ['episodes',page,nameFilter,episodeFilter],
        queryFn:()=> fetchEpisodes(queryFilters)
      });
      useEffect(()=>{
        setPage(1)
      },[nameFilter,episodeFilter]);

      const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
      };
      useEffect(()=>{
        axios.get("https://rickandmortyapi.com/api/episode")
        .then(({data})=>{
          const episodes:IEpisode[]=data.results
          console.log(episodes)
          setReactSelectNamesOption(episodes.map(item=>({label:item.name,value:item.name}))) 
          setReactSelectEpisodesOption(episodes.map(item=>({label:item.episode,value:item.episode})))
        })
        .catch(err=>toast.error(err.data.message))
      },[])

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
          const chnageReaceSelectNamesHandler=(e:unknown)=>{
            setNameFilter(( e as IReactSelectOption).value)
            setEpisodeFilter("")
           }
           const chnageReaceSelectEpisodesHandler=(e:unknown)=>{
            setEpisodeFilter(( e as IReactSelectOption).value)
            setNameFilter("")
           }
      if(isEpisodesLoading) return <div className='w-full h-screen flex justify-center items-center'><Loader  size={50} /></div>
      if(isEpisodesError && episodesError instanceof AxiosError) return <div>{toast.error(episodesError?.response?.data?.error)}</div>
      if(episodeData)
      return (
    <div>
      <Navigate to={`/episodes/?${queryFilters}`} />
      <div className="container max-w-sm mx-auto flex flex-col gap-3 mb-8">
        <ReactSelectFilter placeHolder="search name..." value={nameFilter} options={reactSelectNamesOption} chnageReaceSelectHandler={chnageReaceSelectNamesHandler} />
        <ReactSelectFilter placeHolder="search episode..." value={episodeFilter} options={reactSelectEpisodesOption} chnageReaceSelectHandler={chnageReaceSelectEpisodesHandler}/>
      </div>
    <div className="flex flex-wrap justify-center gap-4">
        {episodeData && episodeCharactersData &&  episodeData.data.results.map((item:IEpisode)=>(
            <Episode episode={item} characters={episodeCharactersData.data.results}   />
        ))}
        
    </div>
    <div className='flex justify-center items-center mt-16'>
    <Pagination color="primary" MuiPaginationItem-textSecondary count={episodeData.data.info.pages} page={page} onChange={handleChange} />
      </div>
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
    <div className='flex h-36 w-[340px] rounded-md overflow-hidden text-xs bg-color-secondary'>
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
        <div className="h-24 scrollBar">
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
