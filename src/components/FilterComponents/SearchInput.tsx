import { useState } from "react";

interface ISearchInputProps{
  unique:string;
    placeHolder:string
  }
  
  function SearchInput({unique,placeHolder}:ISearchInputProps) {
    const [searchVal,setSearchVal]=useState<string>("")
    return (
      <div>  
          <input type="text" id={unique} name={unique} placeholder={placeHolder}
          value={searchVal} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setSearchVal(e.target.value)} />
              </div>
    )
  }
  export default SearchInput;