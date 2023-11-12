import {Routes,Route} from 'react-router-dom'
import Episode from './components/Episode'
import Layout from './components/Layout/Layout'
import Characters from './components/Characters'
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <div>
     <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Episode />} />
        <Route path='characters' element={<Characters />} />
      </Route>
     </Routes>
     <Toaster />
    </div>
  )
}

export default App
