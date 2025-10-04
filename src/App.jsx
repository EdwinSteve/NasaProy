import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Gallery from './Pages/Gallery';
import Landing from './Pages/Landing';
import Navbar from './Components/Navbar';
import './App.css'

function AppLayout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/gallery" element={<Gallery />} />
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
