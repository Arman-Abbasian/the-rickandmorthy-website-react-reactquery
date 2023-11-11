import {Routes,Route} from 'react-router-dom'
import Episode from './components/Episode'
import Layout from './components/Layout/Layout'
function App() {

  return (
    <div>
     <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Episode />} />
      </Route>
     </Routes>
    </div>
  )
}

export default App
