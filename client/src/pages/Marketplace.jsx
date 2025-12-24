import {  useNavigate } from "react-router-dom"
import { ArrowLeftIcon} from 'lucide-react'
const Marketplace = () => {
  const navigate = useNavigate()
  return (
    <div  className="px-6 md:px-16 lg:px-24 xl: px-32">
       <div className="flex items-center justify-between text-slate-500">
                 <button onClick={() => {scrollTo(0,0);navigate('/')}} className="flex items-center gap-2 py-5"> 
                   <ArrowLeftIcon  className="size-4"/>
                  Back to Home
                  </button>
                 <button>Filters</button>
       </div>
       <div>

       </div>
    </div>
  )
}
export default Marketplace