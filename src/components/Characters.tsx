import {useQuery} from '@tanstack/react-query'
import Pagination from '@mui/material/Pagination';
import queryString from 'query-string'
import { Navigate } from "react-router-dom";
import {toast} from 'react-hot-toast'


interface ISearchParams{
  page:number;
  status?:string;
  gender?:string;
}

const fetchCharacters=async(queryFilters:string)=>{
  const data=await axios.get(`https://rickandmortyapi.com/api/characte?${queryFilters}`)
  return data
}

function Characters() {
  //! initial filter query string =>is used when user back to website after a while
  const initialStatus:string= localStorage.getItem("statusFilter") ? localStorage.getItem("statusFilter")! :"";
  const initialGender:string= localStorage.getItem("genderFilter") ? localStorage.getItem("genderFilter")! :"";

  //! 3 state to handle the change of 3 querystring filter 
  const [page,setPage]=useState<number>(1)
  const [statusFilter,setStatusFilter]=useState<string>(initialStatus);
  const [genderFilter,setGenderFilter]=useState<string>(initialGender);
  //!this useEffect handle the change of all pages when change the status and gender state
  //!and setPages to 1 for pretend the error
useEffect(()=>{
  setPage(1)
},[statusFilter,genderFilter])

//!store the changes of statusFilter & genderFilter states in localStorage
  if(statusFilter){
    localStorage.setItem("statusFilter",statusFilter)
  }else {
    localStorage.removeItem("statusFilter")
  }
  if(genderFilter){
    localStorage.setItem("genderFilter",genderFilter)
  }else localStorage.removeItem("genderFilter")
  const searchParams:ISearchParams={page:page};
  if(statusFilter) searchParams.status=statusFilter
  if(genderFilter) searchParams.gender=genderFilter

  //! quryFilters is all the quryString that we want to stick to the url
  const queryFilters:string=queryString.stringify(searchParams);
  
  //! useQuery function
  const { isLoading, isError, data,error:chracterQueryError } = useQuery({
    queryKey: ['characters',page,statusFilter,genderFilter],
    queryFn:()=> fetchCharacters(queryFilters),
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  };
console.log(chracterQueryError)
  if(isLoading) return <div className='w-full h-screen flex justify-center items-center'><Loader size={50} /></div>
  if(isError) return <div>{toast.error(chracterQueryError?.response?.data?.error)}</div>
  if(data) return (
    <div>
      <Navigate to={`/characters/?${queryFilters}`} />
      <FilterCharacter genderFilter={genderFilter} setGenderFilter={setGenderFilter} statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
      <div>
    <div className="flex flex-wrap justify-center gap-4 ">
      {data.data.results.map((item:ICharacter)=>{
        return <Character character={item} /> 
      })}
      </div>
      <div className='flex justify-center items-center mt-16'>
    <Pagination color="primary" MuiPaginationItem-textSecondary count={data.data.info.pages} page={page} onChange={handleChange} />
      </div>
    </div>
      </div>
  )
}

export default Characters


//! one character item
import { FcBusinesswoman, FcBusinessman } from "react-icons/fc";
import { AiOutlineEye } from "react-icons/ai";
import { ICharacter } from "../generalTypes";
import axios from 'axios'
import { useEffect, useState } from 'react'
import FilterCharacter from './Layout/FilterCharacter';
import Loader from './Loader';

interface IProps{
  character:ICharacter
}
function Character({character}:IProps) {
  return (
    <div className='flex h-20 w-80 rounded-md overflow-hidden text-xs bg-color-secondary'>
      {/*! image section */}
      <div>
        <img className='w-full h-full object-cover' src={character.image} alt={character.name} />
      </div>
      {/*! info section */}
      <div className='flex-1 flex justify-between items-center px-3'>
        <div className='flex-1 flex flex-col justify-between gap-5'>
        <div className='flex gap-1 items-center'>
          {character.gender==="Male"?<FcBusinessman className="mobile-icon hover:cursor-pointer"/>
          :<FcBusinesswoman className="mobile-icon hover:cursor-pointer"/>
          }
        
          <p className={`text-ellipsis overflow-hidden`}>{character.name.length>20 ? character.name.substring(0,20)+"...":character.name}</p>
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
