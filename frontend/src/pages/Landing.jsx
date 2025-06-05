import { Link, useNavigate } from 'react-router-dom';
import logo from '../logo.svg';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const Landing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/notes');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1500&q=80')] bg-cover bg-center" />
      <div className="relative z-10 text-center p-8 max-w-2xl mx-auto">
        <img src={logo} alt="NoteBase Logo" className="w-24 h-24 mx-auto mb-6" />
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">NoteBase</h1>
        <p className="text-xl mb-8">
          Your ideas, beautifully organized.
        </p>
        <Link to="/login" className="px-10 py-4 bg-white text-purple-600 rounded-full text-lg font-bold shadow-lg hover:bg-gray-200 transition-colors">
          Login to Get Started
        </Link>
      </div>

      {/* Optional: Add more sections or elements below if desired */}

    </div>
  );
};

export default Landing; 