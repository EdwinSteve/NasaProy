import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Gallery from './Pages/Gallery';
import Navbar from './Components/Navbar';
import './App.css'
import GalleryMissions from './Pages/GalleryMissions';

function AppLayout() {  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/" element={<GalleryMissions />}/>
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AppLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
