import Select from 'react-select'

export interface IReactSelectOption{
    label:string;
    value:string
}
interface IReactSelectProps{
    options:IReactSelectOption[];
    chnageReaceSelectHandler:(e:unknown)=>void
}
function ReactSelectFilter({options,chnageReaceSelectHandler}:IReactSelectProps) {
  return (
    <div>
        <Select options={options} onChange={chnageReaceSelectHandler} placeholder="select a name ..."
        isSearchable
        />
    </div>
  )
}

export default ReactSelectFilter