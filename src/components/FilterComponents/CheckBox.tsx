interface ICheckBoxComponentProps{
  arr:string[];
  title:string
}

function CheckBoxComponent({arr,title}:ICheckBoxComponentProps) {
  return (
    <div className="ring-1 ring-color-secondary rounded-sm px-3 py-1">
      <h2 className="mb-3">{title}</h2>
    <div className="flex flex-wrap items-center gap-3"> 
    {arr.map(item=><CheckBoxItem checkBoxId={item} label={item} key={item} />)}
    </div>
    </div>
  )
}
export default CheckBoxComponent;

interface ICheckBoxProps{
  checkBoxId:string;
  label:string
}
function CheckBoxItem({checkBoxId,label}:ICheckBoxProps) {
  return (
    <div className="inline-block">
      <input type="checkbox" id={checkBoxId} name={checkBoxId} value={checkBoxId} />
                <label className="ml-1 text-sm" htmlFor={checkBoxId}>{label}</label>
            </div>
  )
}
