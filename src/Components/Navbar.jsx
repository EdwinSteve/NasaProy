import { Link } from 'react-router-dom';
import { Heart, Orbit } from 'lucide-react';
import './Styles/Navbar.css';

export default function Navbar() {

  return (
    <nav className='navbar'>
      <div className='navbar-header'>
        <img src="/space_apps.jpg" alt="icon space apps" />
        <img src="/neiva.png" alt="neiva flag" />
        <Link to="/">
          <h3>Cosmic Gallery</h3>
        </Link>
      </div>

      <ul className='links'>
        <Link to="/">
          <li className='link'><Orbit /> Home</li>
        </Link>
      </ul>
    </nav>
  );
}
