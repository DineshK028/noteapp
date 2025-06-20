import { useState, useEffect } from 'react';

const NoteModal = ({ isOpen, onClose, onSubmit, currentNote }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [important, setImportant] = useState(false);

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
      setImportant(!!currentNote.important);
    } else {
      setTitle('');
      setDescription('');
      setImportant(false);
    }
  }, [currentNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, important });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">
          {currentNote ? 'Edit Note' : 'Add New Note'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-sm sm:text-base">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded text-sm sm:text-base"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-sm sm:text-base">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded text-sm sm:text-base"
              rows="4"
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="important"
              checked={important}
              onChange={() => setImportant(!important)}
              className="mr-2"
            />
            <label htmlFor="important" className="text-gray-700 text-sm sm:text-base">Mark as Important</label>
          </div>
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm sm:text-base"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm sm:text-base"
            >
              {currentNote ? 'Update Note' : 'Add Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal; 