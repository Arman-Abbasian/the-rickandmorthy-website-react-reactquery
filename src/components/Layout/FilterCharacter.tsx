import CheckBoxComponent from "../FilterComponents/CheckBox";
import SearchInput from "../FilterComponents/SearchInput";

const status=["alive","dead","unknown"];
const gender=["female","male","genderless","unknown"]

function FilterCharacter() {
  return (
    <div className="flex flex-col gap-3 mb-8">
        <SearchInput placeHolder="search character ..." unique="characterName" />
        <CheckBoxComponent title="status" arr={status} />
        <CheckBoxComponent title="gender" arr={gender} />
    </div>
  )
}

export default FilterCharacter;




