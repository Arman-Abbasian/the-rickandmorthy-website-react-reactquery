import { useQuery } from "@tanstack/react-query";
import axios from "axios"

//!Qeury function for get episodes
const fetchEpisodes=async(queryFilters:string)=>{
    const data=await axios.get(`https://rickandmortyapi.com/api/episode?${queryFilters}`)
    return data
  }

  export const useEpisodes=(page:number,nameFilter:string,episodeFilter:string,queryFilters:string)=>{
   return  useQuery({
    queryKey: ['episodes',page,nameFilter,episodeFilter],
    queryFn:()=> fetchEpisodes(queryFilters)
  });
}

//!Qeury function for get characters of a episode
const fetchEpisodeCharacters=async(characters:string[])=>{
    const data=await axios.get(`https://rickandmortyapi.com/api/character/${characters}`)
    return data
  }

  export const useEpisodeCharacters=(charactersArray:string[])=>{
   return  useQuery({
    queryKey: ['episodeCharacters',charactersArray],
    queryFn:()=> fetchEpisodeCharacters(charactersArray),
    enabled:charactersArray.length>0
  });
}