import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import api from "../utils/axiosUtils";

//!Qeury function for get episodes
const fetchEpisodes=async(queryFilters:string)=>{
    const data=await api.get(`episode?${queryFilters}`)
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
    const data=await api.get(`character/${characters}`)
    return data
  }

  export const useEpisodeCharacters=(charactersArray:string[])=>{
   return  useQuery({
    queryKey: ['episodeCharacters',charactersArray],
    queryFn:()=> fetchEpisodeCharacters(charactersArray),
    enabled:charactersArray.length>0
  });
}