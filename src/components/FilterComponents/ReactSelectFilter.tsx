import makeAnimated from "react-select/animated";
import Select from "react-select";

export interface IReactSelectOption{
    label:string;
    value:string
}
interface IReactSelectProps{
    options:IReactSelectOption[];
    chnageReaceSelectHandler:(e:unknown)=>void
}
function ReactSelectFilter({options,chnageReaceSelectHandler}:IReactSelectProps) {
  const animatedComponents = makeAnimated();
  return (
    <div>
        <Select options={options} 
        onChange={chnageReaceSelectHandler} 
        placeholder="select a name ..."
        isSearchable
        components={animatedComponents}
        className="w-full"
        styles={{
          control: (baseStyles,state) => ({
            ...baseStyles,
            backgroundColor: "var(--color-primary)",
            border: state.isFocused
              ? "2px solid var(--color-secondary)"
              : "1px solid var(--color-secondary)",
            boxShadow: "none",
          }),
          input: (baseStyles,state) => {
            return {
              ...baseStyles,
              border:state.onMouseEnter && "0px solid red",
              color: "var(--color-text)",
            };
          },
          option: (styles) => {
            return {
              ...styles,
              color: "var(--color-text)",
              backgroundColor:"var(--color-primary)",
              ":hover": { backgroundColor: "var(--color-secondary)", color: "var(--color-text)" },
            };
          },
          singleValue: (styles) => {
            return {
              ...styles,
              color: "var(--color-text)",
            };
          },
          placeholder: (styles) => ({
            ...styles,
            color: "var(--color-text)",
          }),
        }}
        />
    </div>
  )
}

export default ReactSelectFilter