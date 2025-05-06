import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CadastroUser from './pages/cadastroUser'
import Index from './pages/Index'

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/user' element={<CadastroUser/>}></Route>
        <Route path='/index' element={<Index/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}