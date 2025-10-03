import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Gallery from './Pages/Gallery';
import Landing from './Pages/Landing';
import Fav from './Pages/Fav';
import Login from './Pages/Login';
import RecoveryPass from './Pages/RecoveryPass';
import Navbar from './Components/Navbar';
import './App.css'
import AuthProvider from './Context/AuthProvider';

function AppLayout() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/fav" element={<Fav />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recovery-pass" element={<RecoveryPass />} />
      </Routes>
    </AuthProvider>
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
