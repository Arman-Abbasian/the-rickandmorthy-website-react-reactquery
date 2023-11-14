import { RingLoader } from "react-spinners";


  
interface ILoaderProps{
    size:number
}
function Loader({size}:ILoaderProps) {
  return (
    <RingLoader
        color="#7c3aed"
        size={size}
      />
  )
}

export default Loader