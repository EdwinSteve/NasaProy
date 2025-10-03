import { BrowserRouter, useRoutes } from 'react-router-dom'
import Gallery from './Pages/Gallery';
import Landing from './Pages/Landing';
import Fav from './Pages/Fav';
import Login from './Pages/Login';
import RecoveryPass from './Pages/RecoveryPass';
import Navbar from './Components/Navbar';
import './App.css'
import AuthProvider from './Context/AuthProvider';

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Landing /> },
    { path: '/gallery', element: <Gallery /> },
    { path: '/fav', element: <Fav /> },
    { path: '/login', element: <Login /> },
    { path: '/recovery-pass', element: <RecoveryPass /> }
  ]);

  return routes;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
