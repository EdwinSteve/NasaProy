import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Gallery from './Pages/Gallery';
import Landing from './Pages/Landing';
import Navbar from './Components/Navbar';
import Map from './Components/Map';
import './App.css'
import GalleryMissions from './Pages/GalleryMissions';

function AppLayout() {
  const tilesUrl = "https://data.lroc.im-ldi.com/ptif/zoomify/ser/estore/lroc/web/LRO-L-LROC-3-CDR-V1.0/LROLRC_1063C/EXTRAS/BROWSE/2025166/M1504671121RC_pyr.tif/";
  const width = 2532; // line simples
  const height = 52224; // images lines
  
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/missions" element={<GalleryMissions />}/>
        <Route path="/test" element={<Map tilesUrl={tilesUrl} width={width} height={height} />} />
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
