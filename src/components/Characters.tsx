import {useQuery} from '@tanstack/react-query'
import Pagination from '@mui/material/Pagination';
import queryString from 'query-string'
import { Link, Navigate } from "react-router-dom";
import {toast} from 'react-hot-toast'
import  { IReactSelectOption } from './FilterComponents/ReactSelectFilter';
import { AxiosError } from 'axios' 


interface ISearchParams{
  page:number;
  name?:string;
  status?:string;
  gender?:string;
}

const fetchCharacters=async(queryFilters:string)=>{
  const data=await axios.get(`https://rickandmortyapi.com/api/character?${queryFilters}`)
  return data
}

function Characters() {
  //! initial filter query string =>is used when user back to website after a while
  const initialStatus:string= localStorage.getItem("statusFilter") ? localStorage.getItem("statusFilter")! :"";
  const initialGender:string= localStorage.getItem("genderFilter") ? localStorage.getItem("genderFilter")! :"";

  //! 3 state to handle the change of 3 querystring filter 
  const [page,setPage]=useState<number>(1);
  const [name,setName]=useState<string>("");
  const [statusFilter,setStatusFilter]=useState<string>(initialStatus);
  const [genderFilter,setGenderFilter]=useState<string>(initialGender);
  const [reactSelectOption,setReactSelectOption]=useState<IReactSelectOption[]>([])
  //!this useEffect handle the change of all pages when change the status and gender state
  //!and setPages to 1 for pretend the error
useEffect(()=>{
  setPage(1)
},[name,statusFilter,genderFilter])
const ref=useRef([] as IReactSelectOption[])

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
  if(name.length>=3) searchParams.name=name
  if(statusFilter) searchParams.status=statusFilter
  if(genderFilter) searchParams.gender=genderFilter

  //! quryFilters is all the quryString that we want to stick to the url
  const queryFilters:string=queryString.stringify(searchParams);
  
  //! useQuery function
  const { isLoading, isError, data,error:charactersError } = useQuery({
    queryKey: ['characters',page,name,statusFilter,genderFilter],
    queryFn:()=> fetchCharacters(queryFilters),
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  };

  useEffect(()=>{
    axios.get("https://rickandmortyapi.com/api/character")
    .then(({data})=>{
      console.log(data)
      const characters:ICharacter[]=data.results
      setReactSelectOption(characters.map(item=>({label:item.name,value:item.name}))) 
    })
    .catch(err=>toast.error(err.data.message))
  },[])

  if(data)
{
  const characters:ICharacter[]=data.data.results;
  ref.current=(characters.map(item=>({label:item.name,value:item.name})))
}

const chnageReaceSelectHandler=(e:unknown)=>{
 setName(( e as IReactSelectOption).value)
}
if(isError) console.log(charactersError)
return (
    <div>
      <FilterCharacter 
      options={reactSelectOption} chnageReaceSelectHandler={chnageReaceSelectHandler}
      genderFilter={genderFilter} setGenderFilter={setGenderFilter} 
      statusFilter={statusFilter} setStatusFilter={setStatusFilter} />
      {isLoading ? <div className='w-full h-screen flex justify-center items-center'><Loader  size={50} /></div >
      :isError && charactersError instanceof AxiosError ? <div>{toast.error(charactersError?.response?.data.error)}</div> 
      :data && <div>
      <Navigate to={`/characters/?${queryFilters}`} />
    <div className="flex flex-wrap justify-center gap-4 ">
      {data.data.results.map((item:ICharacter)=>{
        return <Character character={item} /> 
      })}
      </div>
      <div className='flex justify-center items-center mt-16'>
    <Pagination color="primary" MuiPaginationItem-textSecondary count={data.data.info.pages} page={page} onChange={handleChange} />
      </div>
    </div>

    }
     
      
      </div>
  )
}

export default Characters


//! one character item
import { FcBusinesswoman, FcBusinessman } from "react-icons/fc";
import { AiOutlineEye } from "react-icons/ai";
import { ICharacter } from "../generalTypes";
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
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
        <Link to={`/characters/${(character.id.toString())}`}><AiOutlineEye className="mobile-icon hover:cursor-pointer"/></Link>
      </div>
    </div>
  )
}
