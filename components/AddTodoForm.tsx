
import React, { useState } from 'react';
import { PlusIcon } from './icons/PlusIcon';

interface AddTodoFormProps {
  onAddTodo: (text: string) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-grow bg-slate-700 text-slate-100 rounded-md px-4 py-2 border border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-shadow"
      />
      <button
        type="submit"
        className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-all duration-200 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!text.trim()}
      >
        <PlusIcon />
        <span>Add</span>
      </button>
    </form>
  );
};

export default AddTodoForm;
