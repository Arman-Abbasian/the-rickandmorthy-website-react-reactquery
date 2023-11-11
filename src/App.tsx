import {Routes,Route} from 'react-router-dom'
import Episode from './components/Episode'
import Layout from './components/Layout/Layout'
import Characters from './components/Characters'
function App() {

  return (
    <div>
     <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Episode />} />
        <Route path='characters' element={<Characters />} />
      </Route>
     </Routes>
    </div>
  )
}

export default App
