import { BrowserRouter, useRoutes } from 'react-router-dom'
import Gallery from './Pages/Gallery';
import Landing from './Pages/Landing';
import Navbar from './Components/Navbar';
import './App.css'

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Landing /> },
    { path: '/gallery', element: <Gallery /> },
    { path: '/fav', element: <Gallery /> }
  ]);

  return routes;
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App
