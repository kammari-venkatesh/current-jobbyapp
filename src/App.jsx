import './App.css'
import Login from './components/Login/Login'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import { BrowserRouter } from 'react-router'
import Home from './components/Home/Home'
import { Routes,Route } from 'react-router'
import Jobs from './components/Jobs/Jobs'
import JobitemDetails from './JobsitemDetails/JobitemDetails'
import NotFound from './components/NotFound/NotFound'
const App = () =>{
  return(
<BrowserRouter>
<Routes>
  
  <Route path='/' element={<ProtectedRoute>
    <Home/>
  </ProtectedRoute>}/>
 <Route path='/login' element={<Login />} />
 <Route path='/jobs' element={<Jobs/>}/>
 <Route path='/jobs/:id' element={<JobitemDetails/>}/>
 <Route path='/*' element={<NotFound/>}/>
</Routes>

</BrowserRouter>
)
}
export default App







