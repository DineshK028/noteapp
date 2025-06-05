import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ setQuery }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">NoteBase</Link>
        
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search notes..."
            onChange={(e) => setQuery(e.target.value)}
            className="px-4 py-2 rounded text-gray-800"
          />
          
          {user ? (
            <>
              <span>Welcome, {user.name}</span>
              <button
                onClick={logout}
                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 