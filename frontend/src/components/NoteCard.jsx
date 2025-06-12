import { FaStar } from 'react-icons/fa';

const NoteCard = ({ note, onEdit, onDelete }) => {
  // Truncate description to 2 lines
  const truncatedDescription = note.description.length > 100
    ? note.description.slice(0, 100) + '...'
    : note.description;

  return (
    <div className={`relative bg-white rounded-xl shadow-lg p-4 sm:p-6 flex flex-col min-h-[140px] sm:min-h-[160px] transition-transform hover:scale-105 ${note.important ? 'border-2 border-yellow-400' : 'border border-gray-200'}`}>
      {note.important && (
        <FaStar className="absolute top-2 right-2 sm:top-3 sm:right-3 text-yellow-400" size={20} title="Important" />
      )}
      <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-2 line-clamp-1">{note.title}</h2>
      <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-2">{truncatedDescription}</p>
      <div className="mt-auto flex justify-end space-x-2">
        <button
          onClick={() => onEdit(note)}
          className="text-blue-600 hover:text-blue-800 font-semibold px-2 sm:px-3 py-1 rounded transition-colors text-sm sm:text-base"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(note._id)}
          className="text-red-500 hover:text-red-700 font-semibold px-2 sm:px-3 py-1 rounded transition-colors text-sm sm:text-base"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard; 