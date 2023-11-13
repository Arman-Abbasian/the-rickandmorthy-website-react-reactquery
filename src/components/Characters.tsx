import {useQuery} from '@tanstack/react-query'
import Pagination from '@mui/material/Pagination';


const fetchCharacters=async(page:number)=>{
  const data=await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`)
  return data
}

function Characters() {
  const [page,setPage]=useState<number>(1)
  const [allPages,setAllPages]=useState<number>(10)
  const { isLoading, isError, data } = useQuery({
    queryKey: ['characters',page],
    queryFn:()=> fetchCharacters(page),
  });
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  };
  useEffect(()=>{
    if(data) {
      setAllPages(data.data.info.pages)
    }
  },[])
  if(isLoading) return <p>loading ...</p>
  if(isError) return <p>some error...</p>
  if(data) return (
    <div>
      <FilterCharacter />
    <div className="flex flex-wrap justify-center gap-4 ">
      {data.data.results.map((item:ICharacter)=>{
        return <Character character={item} /> 
      })}
      <div className='flex justify-center items-center mt-16'>
    <Pagination color="primary" MuiPaginationItem-textSecondary count={allPages} page={page} onChange={handleChange} />
      </div>
    </div>
      </div>
  )
}

export default Characters

import { FcBusinesswoman, FcBusinessman } from "react-icons/fc";
import { AiOutlineEye } from "react-icons/ai";
import { ICharacter } from "../generalTypes";
import axios from 'axios'
import { useEffect, useState } from 'react'
import FilterCharacter from './Layout/FilterCharacter';

interface IProps{
  character:ICharacter
}
function Character({character}:IProps) {
  return (
    <div className='flex h-20 w-80 rounded-md overflow-hidden text-xs bg-color-secondary'>
      {/*! image section */}
      <div>
        <img className='w-full h-full object-cover' src={character.image} />
      </div>
      {/*! info section */}
      <div className='flex-1 flex justify-between items-center gap-16  px-3'>
        <div className='flex flex-col justify-between gap-5'>
        <div className='flex gap-1 items-center'>
          {character.gender==="Male"?<FcBusinessman className="mobile-icon hover:cursor-pointer"/>
          :<FcBusinesswoman className="mobile-icon hover:cursor-pointer"/>
          }
        
          <p>{character.name}</p>
        </div>
        <div className='flex gap-1 items-center'>
          <span className="w-2 h-2 rounded-full bg-green-300"></span>
          <p>{character.status}-</p>
          <p>{character.species}</p>
        </div>
        </div>
        <AiOutlineEye className="mobile-icon hover:cursor-pointer"/>
      </div>
    </div>
  )
}
