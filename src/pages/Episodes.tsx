import { ICharacter, IEpisode } from "../generalTypes";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import {  useState,useEffect } from "react";
import ReactSelectFilter, { IReactSelectOption } from "../components/FilterComponents/ReactSelectFilter";
import queryString from "query-string";
import { Navigate } from "react-router-dom";
import { Pagination } from "@mui/material";
import { useEpisodeCharacters, useEpisodes } from "../fetchApi/fetchEpisode";
import {motion} from 'framer-motion'
import api from "../utils/axiosUtils";
import { GroupBase, OptionsOrGroups } from "react-select";
import { AxiosError } from "axios";

interface ISearchParams{
  page:number;
  name?:string;
  episode?:string
}
const loadPageWithAnimation={
  initial:{y:'-100vw',opacity:0},
  animate:{y:'0vw',opacity:1,transition:{duration:1.5}}
}

function Episodes() {
  const [page,setPage]=useState<number>(1);
  const [nameFilter,setNameFilter]=useState<string>("");
  const [episodeFilter,setEpisodeFilter]=useState<string>("");
  const [namesOfEachPage,setNamesOfEachPage]=useState<OptionsOrGroups<IReactSelectOption, GroupBase<IReactSelectOption>>>([]);
  const [episodesOfEachPage,setEpisodesOfEachPage]=useState<OptionsOrGroups<IReactSelectOption, GroupBase<IReactSelectOption>>>([]);

  useEffect(()=>{
    const getNameAndEpisodeListOfEachPage=async()=>{
        const data=await api.get(`episode/?page=${page}`)
        const pageEpisodes:IEpisode[]=data.data.results;
       const names:IReactSelectOption[]= pageEpisodes.map((item:IEpisode)=>{
        return {label:item.name,value:item.name}
       })
       const episodes:IReactSelectOption[]= pageEpisodes.map((item:IEpisode)=>{
        return {label:item.episode,value:item.episode}
       })
       setNamesOfEachPage(names)
       setEpisodesOfEachPage(episodes)
      }
   getNameAndEpisodeListOfEachPage();
  },[page])
  const searchParams:ISearchParams={page:page};
  if(nameFilter) searchParams.name=nameFilter;
  if(episodeFilter) searchParams.episode=episodeFilter;
  const queryFilters:string=queryString.stringify(searchParams);
  //! useQuery to get all episodes
    const { isLoading:isEpisodesLoading, isError:isEpisodesError, 
      data:episodeData,error:episodesError } = useEpisodes(page,nameFilter,episodeFilter,queryFilters)
      useEffect(()=>{
        setPage(1)
      },[nameFilter,episodeFilter]);

      const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value)
      };

      let charactersArray:string[]=[];
      const characters=episodeData?.data?.characters;
      if(Array.isArray(characters)){
       const arr= characters?.map(item=>item.split("/").at(-1))
       charactersArray=arr;
      }else{
      const item=characters?.split("/").at(-1)
      charactersArray.push(item)
    }
          const { data:episodeCharactersData} = useEpisodeCharacters(charactersArray)
          const chnageReaceSelectNamesHandler=(e:unknown)=>{
            setNameFilter(( e as IReactSelectOption).value)
            setEpisodeFilter("")
           }
           const chnageReaceSelectEpisodesHandler=(e:unknown)=>{
            setEpisodeFilter(( e as IReactSelectOption).value)
            setNameFilter("")
           }

      return (
        <div className="flex flex-col gap-10">
        <div className="container max-w-sm mx-auto flex flex-col gap-3 mb-8">
        <ReactSelectFilter placeHolder="search name..." value={nameFilter} options={episodesOfEachPage} chnageReaceSelectHandler={chnageReaceSelectNamesHandler} />
        <ReactSelectFilter placeHolder="search episode..." value={episodeFilter} options={namesOfEachPage} chnageReaceSelectHandler={chnageReaceSelectEpisodesHandler}/>
      </div>
    {isEpisodesLoading ? <div className='w-full h-screen flex justify-center items-center'><Loader  size={50} /></div>:false}
    {isEpisodesError && episodesError instanceof AxiosError && <div>{toast.error(episodesError?.response?.data?.error)}</div>}
    {episodeData && episodeCharactersData &&
    <motion.div variants={loadPageWithAnimation} initial="initial" animate="animate">
      <Navigate to={`/episodes/?${queryFilters}`} />
      
      <div className='container mx-auto max-w-6xl'>
    <div className="flex flex-wrap  justify-center lg:justify-start gap-4">
        {episodeData && episodeCharactersData &&  episodeData.data.results.map((item:IEpisode)=>(
            <Episode episode={item} characters={episodeCharactersData.data.results}   />
        ))}
        
    </div>
    </div>
    <div className='flex justify-center items-center mt-16'>
    <Pagination color="primary" MuiPaginationItem-textSecondary count={episodeData.data.info.pages} page={page} onChange={handleChange} />
      </div>
    </motion.div>
  }
  </div>
  )
}

export default Episodes;





//! one episode component
interface IEpisodeProps{
    episode:IEpisode;
    characters:ICharacter[];
}

const hoverCharacter={
  scale:1.13,
  transition:{duration:0.5,type:'spring',stiffness:200}
}
function Episode({episode,characters}:IEpisodeProps) {
  return (
    <motion.div whileHover={hoverCharacter} className='flex h-36 w-[340px] rounded-md overflow-hidden text-xs bg-color-secondary'>
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
    </motion.div>
  )
}
