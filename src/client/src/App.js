import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  Home,
  Navbar,
  Post,
  Profile,
  Doxes,
  Error,
  Auth,
  SingleDox,
  Guidelines
} from './pages';
import { config } from './config';
import './pages/styles/css/index.css';
import { useEffect } from 'react';
import { Logout } from './pages/lib/Logout';
import { Toaster } from 'react-hot-toast';
import { Helmet as MetaTags } from 'react-helmet';
import logo from './pages/assets/logo.jpg';

function App() {
  const Login = () => {
    useEffect(() => {
      window.location.href = config.DOMAIN + '/auth/login';
    }, [])
    return <></>
  }
  const Redirect = ({ link }) => {
    useEffect(() => {
      window.location.href = link;
    }, []);
    return <></>
  }

  return (
    <Router>
      <MetaTags>
        <link rel="icon" href={logo} />
      </MetaTags>
      <div className='container'>
        <Navbar />
        <Auth />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Doxes />} path="/dox" />
          <Route element={<SingleDox />} path="/dox/:id" />
          <Route element={<Profile />} path="/profile/:userId" />
          <Route element={<Post />} path="/post" />
          <Route element={<Redirect link='https://discord.com/oauth2/authorize?client_id=948591118113714186&scope=bot&permissions=2146958847' />} path="/bot" />
          <Route element={<Redirect link='https://discord.gg/nBgjCb39RP' />} path="/invite" />
          <Route element={<Guidelines />} path="/tos" />
          <Route element={<Login />} path="/login" />
          <Route element={<Logout />} path="/logout" />
          <Route element={<Error code={404} text={'Página no encontrada'} />} path="*" />
        </Routes>
      </div>
      <Toaster toastOptions={
        {
          style: {
            borderRadius: '50px',
            background: '#333',
            color: '#fff',
          }
        }} />
    </Router>
  );
}

export default App;
