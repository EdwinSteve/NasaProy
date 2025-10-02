import { Link } from 'react-router-dom';
import { ChevronFirst, Heart, User } from 'lucide-react';
import './Styles/Navbar.css';

export default function Navbar() {
  return (
    <nav className='navbar'>
      <div className='navbar-header'>
        <img src="/space_apps.jpg" alt="logo space apps" />
        <img src="/neiva.png" alt="bandera neiva" />
        <Link to="/">
          <h3>Cosmic Gallery</h3>
        </Link>
      </div>

      <ul className='links'>
        <Link to="/fav">
          <li className='link'><Heart/> Favorites</li>
        </Link >
        <Link to="/login">
          <li className='link'><User/> Login</li>
        </Link>
        <li className='link'><ChevronFirst/>Logout</li>
      </ul>
    </nav>
  );
}
