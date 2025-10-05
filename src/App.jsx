import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Gallery from './Pages/Gallery';
import Landing from './Pages/Landing';
import Navbar from './Components/Navbar';
import Map from './Components/Map';
import './App.css'
import GalleryMissions from './Pages/GalleryMissions';

function AppLayout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/missions" element={<GalleryMissions />}/>
        <Route paht="/test" element={<Map/>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
