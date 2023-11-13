import CheckBox from "../FilterComponents/CheckBox";
import SearchInput from "../FilterComponents/SearchInput";

const status=["alive","dead","unknown"];
const gender=["female","male","genderless","unknown"]

function FilterCharacter() {
  return (
    <div>
        <SearchInput placeHolder="search character ..." unique="characterName" />
        <div> 
        {status.map(item=><CheckBox checkBoxId={item} label={item} key={item} />)}
        </div>
        <div>
        {gender.map(item=><CheckBox checkBoxId={item} label={item} key={item} />)}
        </div>
    </div>
  )
}

export default FilterCharacter;




