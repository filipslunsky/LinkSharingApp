import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './features/general/Navbar';
import ProtectedRoute from './features/general/ProtectedRoute';
import Home from './features/general/Home';
import './App.css';

function App() {
  const isLoggedIn = useSelector(state => state.user.loggedIn);
  console.log(isLoggedIn);
  

  return (
    <>
      <BrowserRouter>
      {isLoggedIn && <Navbar />}
        <Routes>
          <Route path='/' element={<Home />}/>
          {/* <Route path='/user/register' element={<Register />} />
          <Route path='/user/login' element={<Login />} /> */}
          <Route element={<ProtectedRoute />}>
            {/* <Route path='/user/info' element={<User />} />
            <Route path='/user/edit' element={<UserEdit />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
