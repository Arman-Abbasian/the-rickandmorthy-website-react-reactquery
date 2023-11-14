import {Routes,Route} from 'react-router-dom'
import Episode from './components/Episode'
import Layout from './components/Layout/Layout'
import Characters from './components/Characters'
import { Toaster } from 'react-hot-toast';
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/production'
import CharacterDetail from './components/CharacterDetail';


const queryClient = new QueryClient()
function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <div>
     <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Episode />} />
        <Route path='characters' element={<Characters />} />
        <Route path='characters/:id' element={<CharacterDetail />} />
      </Route>
     </Routes>
     <Toaster toastOptions={{style:{backgroundColor:"var(--color-dark-primary)",color:"var(--color-text)",fontSize:"14px"}}} />
    </div>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
