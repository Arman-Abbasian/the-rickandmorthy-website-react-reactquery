import CheckBoxComponent from "../FilterComponents/CheckBox";
import SearchInput from "../FilterComponents/SearchInput";

interface IFilterCharacterProps{
  statusFilter:string[];
  setStatusFilter:React.Dispatch<React.SetStateAction<string[]>>;
  genderFilter:string[];
  setGenderFilter:React.Dispatch<React.SetStateAction<string[]>>;


}

const status=["alive","dead","unknown"];
const gender=["female","male","genderless","unknown"]

function FilterCharacter({genderFilter,setGenderFilter,setStatusFilter,statusFilter}:IFilterCharacterProps) {
  

  const changeStatusHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
    if(statusFilter.includes (e.target.value)) setStatusFilter((prev)=>prev.filter((item:string)=>item!==e.target.value))
    if(!statusFilter.includes (e.target.value)) setStatusFilter((prev)=>[...prev,e.target.value])
  }
  const changeGenderHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
    if(genderFilter.includes (e.target.value)) setGenderFilter((prev)=>prev.filter((item:string)=>item!==e.target.value))
    if(!genderFilter.includes (e.target.value)) setGenderFilter((prev)=>[...prev,e.target.value])
  }
  return (
    <div className="flex flex-col gap-3 mb-8">
        <SearchInput placeHolder="search character ..." unique="characterName" />
        <CheckBoxComponent checkedArr={statusFilter} changeHandler={changeStatusHandler} title="status" arr={status} />
        <CheckBoxComponent checkedArr={genderFilter} changeHandler={changeGenderHandler} title="gender" arr={gender} />
    </div>
  )
}

export default FilterCharacter;




