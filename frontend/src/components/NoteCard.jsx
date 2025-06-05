import { FaStar } from 'react-icons/fa';

const NoteCard = ({ note, onEdit, onDelete }) => {
  // Truncate description to 2 lines
  const truncatedDescription = note.description.length > 100
    ? note.description.slice(0, 100) + '...'
    : note.description;

  return (
    <div className={`relative bg-white rounded-xl shadow-lg p-6 flex flex-col min-h-[160px] transition-transform hover:scale-105 ${note.important ? 'border-2 border-yellow-400' : 'border border-gray-200'}`}>
      {note.important && (
        <FaStar className="absolute top-3 right-3 text-yellow-400" size={22} title="Important" />
      )}
      <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">{note.title}</h2>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{truncatedDescription}</p>
      <div className="mt-auto flex justify-end space-x-2">
        <button
          onClick={() => onEdit(note)}
          className="text-blue-600 hover:text-blue-800 font-semibold px-3 py-1 rounded transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note._id)}
          className="text-red-500 hover:text-red-700 font-semibold px-3 py-1 rounded transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard; 