import { Heart, User } from 'lucide-react';
import './Styles/Navbar.css';

export default function Navbar() {
  return (
    <nav className='navbar'>
      <div className='navbar-header'>
        <img src="/space_apps.jpg" alt="logo space apps" />
        <img src="/neiva.png" alt="bandera neiva" />
        <h3>Cosmic Gallery</h3>
      </div>

      <ul className='links'>
        <li className='link'><Heart/> Favoritos</li>
        <li className='link'><User/> Login</li>
      </ul>
    </nav>
  );
}
