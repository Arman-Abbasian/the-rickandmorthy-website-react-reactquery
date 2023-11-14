import { IRadioItem } from "../../generalTypes";
import CheckBoxComponent from "../FilterComponents/RadioButton";
import SearchInput from "../FilterComponents/SearchInput";

interface IFilterCharacterProps{
  statusFilter:string;
  setStatusFilter:React.Dispatch<React.SetStateAction<string>>;
  genderFilter:string;
  setGenderFilter:React.Dispatch<React.SetStateAction<string>>;


}

const status:IRadioItem[]=[
  {value:"",label:"all"},
  {value:"alive",label:"alive"},
  {value:"dead",label:"dead"},
  {value:"unknown",label:"unknown"},
]
const gender:IRadioItem[]=[
  {value:"",label:"all"},
  {value:"female",label:"female"},
  {value:"male",label:"male"},
  {value:"genderless",label:"genderless"},
  {value:"unknown",label:"unknown"}
]

function FilterCharacter({genderFilter,setGenderFilter,setStatusFilter,statusFilter}:IFilterCharacterProps) {
  

  const changeStatusHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setStatusFilter(e.target.value)
  }
  const changeGenderHandler=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setGenderFilter(e.target.value)
  }
  return (
    <div className="flex flex-col gap-3 mb-8">
        <SearchInput placeHolder="search character ..." unique="characterName" />
        <CheckBoxComponent filterState={statusFilter} changeHandler={changeStatusHandler} title="status" arr={status} />
        <CheckBoxComponent filterState={genderFilter} changeHandler={changeGenderHandler} title="gender" arr={gender} />
    </div>
  )
}

export default FilterCharacter;




