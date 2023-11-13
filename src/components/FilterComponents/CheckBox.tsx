interface ICheckBoxComponentProps{
  arr:string[];
  checkedArr:string[];
  title:string;
  changeHandler:(e:React.ChangeEvent<HTMLInputElement>)=>void
}

function CheckBoxComponent({arr,checkedArr,title,changeHandler}:ICheckBoxComponentProps) {
  return (
    <div className="ring-1 ring-color-secondary rounded-sm px-3 py-1">
      <h2 className="mb-3">{title}</h2>
    <div className="flex flex-wrap items-center gap-3"> 
    {arr.map(item=><CheckBoxItem checked={checkedArr.includes(item)?true:false} changeHandler={changeHandler}  checkBoxId={item} label={item} key={item} />)}
    </div>
    </div>
  )
}
export default CheckBoxComponent;

interface ICheckBoxProps{
  checkBoxId:string;
  label:string;
  checked:boolean;
  changeHandler:(e:React.ChangeEvent<HTMLInputElement>)=>void
}
function CheckBoxItem({checkBoxId,label,checked,changeHandler}:ICheckBoxProps) {

  return (
    <div className="inline-block">
      <input type="checkbox" id={checkBoxId} onChange={changeHandler} checked={checked} name={checkBoxId} value={checkBoxId} />
                <label className="ml-1 text-sm" htmlFor={checkBoxId}>{label}</label>
            </div>
  )
}
