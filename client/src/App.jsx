import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './features/general/Navbar';
import ProtectedRoute from './features/general/ProtectedRoute';
import Home from './features/general/Home';
import RegisterUser from './features/user/RegisterUser';
import LoginUser from './features/user/LoginUser';
import EditUser from './features/user/EditUser';
import LinkList from './features/links/LinkList';
import Test from './features/links/Test';
import './App.css';

function App() {
  const isLoggedIn = useSelector(state => state.user.loggedIn);

  return (
    <>
        <BrowserRouter>
        {isLoggedIn && <Navbar />}
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/user/register' element={<RegisterUser />} />
            <Route path='/user/login' element={<LoginUser />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/user' element={<EditUser />} />
              <Route path='/links' element={<LinkList />} />
            </Route>
          </Routes>
        </BrowserRouter>
      {/* <Test /> */}
    </>
  )
}

export default App;
