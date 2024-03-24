
import 'bootstrap/dist/css/bootstrap.min.css'

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './assets/Signup'
import Login from './assets/Login';
import Home from './assets/Home';
function App() {


  return (
    <div>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/home' element={<Home/>}></Route>

      </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App
