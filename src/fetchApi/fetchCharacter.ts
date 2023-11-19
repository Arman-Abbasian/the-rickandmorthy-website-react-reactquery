import { useQuery } from "@tanstack/react-query";
import api from "../utils/axiosUtils";

//!Qeury function for get characters
const fetchCharacters=async(queryFilters:string)=>{
    const data=await api.get(`character?${queryFilters}`)
    return data
  }

  export const useCharacters=(page:number,nameFilter:string,statusFilter:string,genderFilter:string,queryFilters:string)=>{
   return  useQuery({
    queryKey: ['characters',page,nameFilter,statusFilter,genderFilter],
    queryFn:()=> fetchCharacters(queryFilters),
    refetchOnMount:true,
    refetchOnReconnect:true,
    refetchOnWindowFocus:true,
    
  });
}

//!Qeury function for get one character

const fetchCharacter=async(paramId:string)=>{
    const data=await api.get(`character/${paramId}`)
    return data
  }

export const useCharacter=(paramId:string)=>{
    return useQuery({
    queryKey: ['characters',paramId],
    queryFn:()=> fetchCharacter(paramId!),
  });
}

//!Qeury function for get one epidoses of a character
const fetchCharacterEpisodes=async(episodes:string[])=>{
  const data=await api.get(`/episode/${episodes}`)
  return data
}
export const useCharacterEpisodes=(episodesArray:string[])=>{
  return useQuery({
    queryKey: ['characterEpisodes',episodesArray],
    queryFn:()=> fetchCharacterEpisodes(episodesArray),
    enabled:episodesArray.length>0
  });
}
