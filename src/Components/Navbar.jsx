import { Link } from 'react-router-dom';
import { ChevronFirst, Heart, User } from 'lucide-react';
import './Styles/Navbar.css';
import { logoutUser } from '../Services/auth';
import { useContext } from 'react';
import AuthContext from '../Context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = async () => {
    await logoutUser();
    setIsAuthenticated(false);
  }

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
        {isAuthenticated && (
          <Link to="/fav">
            <li className='link'><Heart /> Favorites</li>
          </Link>
        )}
        {!isAuthenticated && (
          <Link to="/login">
            <li className='link'><User /> Login</li>
          </Link>
        )}
        {isAuthenticated && (
          <li className='link' onClick={() => handleLogout()}><ChevronFirst /> Logout</li>
        )}
      </ul>
    </nav>
  );
}
