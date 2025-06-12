import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import NoteModal from '../components/NoteModal';
import { FaPlus } from 'react-icons/fa';
import config from '../config';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchNotes();
  }, [user, navigate]);

  useEffect(() => {
    const filtered = notes.filter(
      note =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [query, notes]);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${config.API_URL}/notes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setNotes(response.data.notes);
      }
    } catch (error) {
      toast.error('Error fetching notes');
    }
  };

  const handleAddNote = async (noteData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${config.API_URL}/notes`,
        noteData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (response.data.success) {
        toast.success('Note added successfully');
        setIsModalOpen(false);
        fetchNotes();
      }
    } catch (error) {
      toast.error('Error adding note');
    }
  };

  const handleEditNote = async (noteData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${config.API_URL}/notes/${currentNote._id}`,
        noteData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (response.data.success) {
        toast.success('Note updated successfully');
        setIsModalOpen(false);
        setCurrentNote(null);
        fetchNotes();
      }
    } catch (error) {
      toast.error('Error updating note');
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `${config.API_URL}/notes/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (response.data.success) {
        toast.success('Note deleted successfully');
        fetchNotes();
      }
    } catch (error) {
      toast.error('Error deleting note');
    }
  };

  const handleToggleImportant = async (note) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `${config.API_URL}/notes/${note._id}`,
        { ...note, important: !note.important },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (response.data.success) {
        toast.success(`Note marked as ${!note.important ? 'important' : 'not important'}`);
        fetchNotes();
      }
    } catch (error) {
      toast.error('Error updating note importance');
    }
  };

  const handleSubmit = (noteData) => {
    if (currentNote) {
      handleEditNote(noteData);
    } else {
      handleAddNote(noteData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar setQuery={setQuery} />
      
      <div className="container mx-auto px-6 py-10">
        {filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={(note) => {
                  setCurrentNote(note);
                  setIsModalOpen(true);
                }}
                onDelete={handleDeleteNote}
                onToggleImportant={handleToggleImportant}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No notes found</p>
        )}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600"
      >
        <FaPlus size={24} />
      </button>

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentNote(null);
        }}
        onSubmit={handleSubmit}
        currentNote={currentNote}
      />
    </div>
  );
};

export default Home; 