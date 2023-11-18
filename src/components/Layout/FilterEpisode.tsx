import { IRadioItem } from "../../generalTypes";
import CheckBoxComponent from "../FilterComponents/RadioButton";
import ReactSelectFilter, { IReactSelectOption } from "../FilterComponents/ReactSelectFilter";

interface IFilterEpisodeProps{
  options:IReactSelectOption[];
  chnageReaceSelectHandler:(e:unknown)=>void
}


function FilterCharacter({options,chnageReaceSelectHandler}:IFilterCharacterProps) {
  


  return (
    <div className=" mb-8 ml-2 w-full ">
      <div className="container max-w-sm mx-auto flex flex-col gap-3">
      <ReactSelectFilter chnageReaceSelectHandler={chnageReaceSelectHandler} options={options} />
        </div>
    </div>
  )
}

export default FilterCharacter;




