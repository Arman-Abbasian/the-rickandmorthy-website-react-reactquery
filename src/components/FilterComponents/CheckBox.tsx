interface ICheckBoxProps{
    checkBoxId:string;
    label:string
}

function CheckBox({checkBoxId,label}:ICheckBoxProps) {
  return (
    <div>
                <label htmlFor={checkBoxId}>{label}</label>
                <input type="checkbox" id={checkBoxId} name={checkBoxId} value={checkBoxId} />
            </div>
  )
}
export default CheckBox;